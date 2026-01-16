import pymysql

# =====================================================
# DATABASE CONNECTION
# =====================================================

def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="dalandb",
        cursorclass=pymysql.cursors.DictCursor
    )

# =====================================================
# DATABASE MANAGEMENT
# =====================================================

def reinitialize_database(conn):
    with conn.cursor() as cursor:
        with open("dalandb.sql") as f:
            for statement in f.read().split(';'):
                if statement.strip():
                    cursor.execute(statement)
    conn.commit()

# =====================================================
# AUTH QUERIES
# =====================================================

def find_user_by_email(cursor, email):
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    return cursor.fetchone()

def create_user(cursor, first_name, last_name, email, hashed_password):
    cursor.execute(
        '''
        INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES (%s, %s, %s, %s)
        ''',
        (first_name, last_name, email, hashed_password)
    )
    return cursor.lastrowid

# =====================================================
# USER PROFILE QUERIES
# =====================================================

def upsert_user_profile(cursor, user_id, shs_strand_id, municipality_id, institution_type_id, budget_id):
    cursor.execute('''
        INSERT INTO user_profile
            (user_id, strand_id, municipality_id, preferred_institution_type, budget_id)
        VALUES (%s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            strand_id = VALUES(strand_id),
            municipality_id = VALUES(municipality_id),
            preferred_institution_type = VALUES(preferred_institution_type),
            budget_id = VALUES(budget_id)
    ''', (
        user_id,
        shs_strand_id,
        municipality_id,
        institution_type_id,
        budget_id
    ))

def delete_user_program_preferences(cursor, user_id):
    cursor.execute("DELETE FROM user_interests WHERE user_id = %s", (user_id,))

def insert_user_program_preference(cursor, user_id, program_id):
    cursor.execute(
        "INSERT INTO user_interests (user_id, interest_program_id) VALUES (%s, %s)",
        (user_id, program_id)
    )

# =====================================================
# USER PROFILE FETCH QUERIES
# =====================================================

def fetch_user_basic_info(cursor, user_id):
    cursor.execute("""
        SELECT
            user_id,
            first_name,
            last_name,
            email,
            profile_picture_url
        FROM users
        WHERE user_id = %s
    """, (user_id,))
    return cursor.fetchone()


def fetch_user_profile(cursor, user_id):
    cursor.execute("""
        SELECT
            up.strand_id,
            ss.strand_name,
            up.municipality_id,
            CONCAT(m.municipality_name, ', Pangasinan') AS municipality,
            up.preferred_institution_type,
            it.type_name AS institution_type,
            up.budget_id,
            br.label AS budget_label
        FROM user_profile up
        LEFT JOIN shs_strands ss ON up.strand_id = ss.strand_id
        LEFT JOIN municipalities m ON up.municipality_id = m.municipality_id
        LEFT JOIN institution_type it ON up.preferred_institution_type = it.type_id
        LEFT JOIN budget_ranges br ON up.budget_id = br.budget_id
        WHERE up.user_id = %s
    """, (user_id,))
    return cursor.fetchone()


def fetch_user_interests(cursor, user_id):
    cursor.execute("""
        SELECT
            ip.program_name,
            ui.interest_level
        FROM user_interests ui
        JOIN interest_programs ip
            ON ui.interest_program_id = ip.interest_program_id
        WHERE ui.user_id = %s
        ORDER BY ip.program_name
    """, (user_id,))
    return cursor.fetchall()


def fetch_user_interest_program_names(cursor, user_id):
    cursor.execute("""
        SELECT ip.program_name
        FROM user_interests ui
        JOIN interest_programs ip
            ON ui.interest_program_id = ip.interest_program_id
        WHERE ui.user_id = %s
        ORDER BY ip.program_name
    """, (user_id,))
    return [row["program_name"] for row in cursor.fetchall()]


def fetch_budget_range(cursor, budget_id):
    cursor.execute("""
        SELECT min_amount, max_amount
        FROM budget_ranges
        WHERE budget_id = %s
    """, (budget_id,))
    return cursor.fetchone()

# =====================================================
# SETUP DATA QUERIES (for dropdowns)
# =====================================================

def fetch_shs_strands(cursor):
    cursor.execute("SELECT strand_id, strand_name FROM shs_strands ORDER BY strand_name")
    return cursor.fetchall()

def fetch_interest_programs(cursor):
    cursor.execute("SELECT interest_program_id, program_name FROM interest_programs ORDER BY program_name")
    return cursor.fetchall()

def fetch_institution_types(cursor):
    cursor.execute("SELECT type_id, type_name FROM institution_type ORDER BY type_id")
    return cursor.fetchall()

def fetch_budget_ranges(cursor):
    cursor.execute("SELECT budget_id, label FROM budget_ranges ORDER BY budget_id")
    return cursor.fetchall()

def fetch_districts(cursor):
    cursor.execute("SELECT district_id, district_name FROM districts ORDER BY district_id")
    return cursor.fetchall()

def fetch_municipalities(cursor):
    cursor.execute("SELECT municipality_id, district_id, municipality_name FROM municipalities ORDER BY municipality_name")
    return cursor.fetchall()

# =====================================================
# FEATURES QUERIES
# =====================================================

def fetch_program_recommendations(cursor):
    query = '''
    SELECT
        p.program_id,
        p.program_name,
        p.description,
        p.is_licensure_based,
        u.university_name,
        u.logo_url,
        u.abbreviation,
        u.tuition_range,
        CONCAT(m.municipality_name, ', Pangasinan') AS location,
        it.type_name AS institution_type,
        (
            SELECT
                ROUND(
                    (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                    2
                )
            FROM exam_results er
            WHERE er.program_id = p.program_id
            AND er.university_id = p.university_id
            AND er.year = (
                SELECT MAX(er2.year)
                FROM exam_results er2
                WHERE er2.program_id = p.program_id
                    AND er2.university_id = p.university_id
            )
        ) AS passing_rate
    FROM programs p
    JOIN universities u ON p.university_id = u.university_id
    JOIN municipalities m ON u.municipality_id = m.municipality_id
    JOIN institution_type it ON u.type_id = it.type_id
    ORDER BY p.program_id
    LIMIT 4;
    '''
    cursor.execute(query)
    return cursor.fetchall()


def fetch_program_recommendations_for_preferences(
    cursor,
    interest_terms=None,
    municipality_id=None,
    institution_type_id=None,
    budget_min=None,
    budget_max=None,
    limit=4
):
    interest_terms = interest_terms or []
    query = '''
    SELECT
        p.program_id,
        p.program_name,
        p.description,
        p.is_licensure_based,
        u.university_name,
        u.logo_url,
        u.abbreviation,
        u.tuition_range,
        CONCAT(m.municipality_name, ', Pangasinan') AS location,
        it.type_name AS institution_type,
        (
            SELECT
                ROUND(
                    (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                    2
                )
            FROM exam_results er
            WHERE er.program_id = p.program_id
            AND er.university_id = p.university_id
            AND er.year = (
                SELECT MAX(er2.year)
                FROM exam_results er2
                WHERE er2.program_id = p.program_id
                    AND er2.university_id = p.university_id
            )
        ) AS passing_rate
    FROM programs p
    JOIN universities u ON p.university_id = u.university_id
    JOIN municipalities m ON u.municipality_id = m.municipality_id
    JOIN institution_type it ON u.type_id = it.type_id
    LEFT JOIN prog_tuition pt ON pt.program_id = p.program_id
    WHERE 1=1
    '''

    params = []
    if municipality_id:
        query += " AND u.municipality_id = %s"
        params.append(municipality_id)
    if institution_type_id:
        query += " AND u.type_id = %s"
        params.append(institution_type_id)

    if interest_terms:
        clauses = []
        for _ in interest_terms:
            clauses.append("p.program_name LIKE %s")
        query += " AND (" + " OR ".join(clauses) + ")"
        params.extend([f"%{term}%" for term in interest_terms])

    if budget_min is not None or budget_max is not None:
        if budget_max is None:
            query += " AND pt.amount_per_year >= %s"
            params.append(budget_min)
        else:
            query += " AND pt.amount_per_year BETWEEN %s AND %s"
            params.extend([budget_min, budget_max])

    query += " ORDER BY passing_rate DESC, p.program_name LIMIT %s"
    params.append(limit)

    cursor.execute(query, params)
    return cursor.fetchall()


def fetch_university_recommendations_for_preferences(
    cursor,
    interest_terms=None,
    municipality_id=None,
    institution_type_id=None,
    budget_min=None,
    budget_max=None,
    limit=4
):
    interest_terms = interest_terms or []
    query = """
        SELECT
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            u.tuition_range,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            it.type_name AS institution_type,

            COUNT(DISTINCT p.program_id) AS program_count,

            ROUND(
                AVG(
                    (er.total_passers / NULLIF(er.total_examinees, 0)) * 100
                ),
                0
            ) AS avg_passing_rate

        FROM universities u
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        LEFT JOIN programs p ON p.university_id = u.university_id
        LEFT JOIN exam_results er ON er.program_id = p.program_id
        WHERE 1=1
    """

    params = []
    if municipality_id:
        query += " AND u.municipality_id = %s"
        params.append(municipality_id)
    if institution_type_id:
        query += " AND u.type_id = %s"
        params.append(institution_type_id)

    if interest_terms:
        clauses = []
        for _ in interest_terms:
            clauses.append("p2.program_name LIKE %s")
        query += " AND EXISTS ("
        query += "SELECT 1 FROM programs p2 WHERE p2.university_id = u.university_id AND ("
        query += " OR ".join(clauses)
        query += "))"
        params.extend([f"%{term}%" for term in interest_terms])

    if budget_min is not None or budget_max is not None:
        query += " AND EXISTS ("
        query += "SELECT 1 FROM programs p3 "
        query += "JOIN prog_tuition pt ON pt.program_id = p3.program_id "
        query += "WHERE p3.university_id = u.university_id"
        if budget_max is None:
            query += " AND pt.amount_per_year >= %s)"
            params.append(budget_min)
        else:
            query += " AND pt.amount_per_year BETWEEN %s AND %s)"
            params.extend([budget_min, budget_max])

    query += """
        GROUP BY
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            u.tuition_range,
            location,
            institution_type
        ORDER BY avg_passing_rate DESC
        LIMIT %s
    """
    params.append(limit)

    cursor.execute(query, params)
    return cursor.fetchall()

def fetch_program_details_ssr(cursor, program_id):
    query = '''
    SELECT
        p.program_id,
        p.program_name,
        p.logo_url AS program_logo,
        p.description AS short_description,
        p.long_description AS long_description,
        p.is_licensure_based,
        p.university_id,
        u.university_name,
        u.abbreviation AS university_abbreviation,
        u.logo_url AS university_logo,
        u.tuition_range,
        CONCAT(m.municipality_name, ', Pangasinan') AS location,
        it.type_name AS institution_type,
        u.latitude,
        u.longitude
    FROM programs p
    JOIN universities u ON p.university_id = u.university_id
    JOIN municipalities m ON u.municipality_id = m.municipality_id
    JOIN institution_type it ON u.type_id = it.type_id
    WHERE p.program_id = %s;
    '''
    cursor.execute(query, (program_id,))
    return cursor.fetchone()


def fetch_program_tuition(cursor, program_id):
    query = "SELECT amount_per_year FROM prog_tuition WHERE program_id = %s"
    cursor.execute(query, (program_id,))
    return cursor.fetchone()

def fetch_program_requirements(cursor, program_id):
    query = """
        SELECT requirement AS item_name
        FROM prog_req
        WHERE program_id = %s
        ORDER BY requirement
    """
    cursor.execute(query, (program_id,))
    return [row['item_name'] for row in cursor.fetchall()]


def fetch_program_scholarships(cursor, program_id):
    query = "SELECT scholarship_name FROM prog_scholarship WHERE program_id = %s ORDER BY scholarship_name"
    cursor.execute(query, (program_id,))
    return [row['scholarship_name'] for row in cursor.fetchall()]

def fetch_exam_results_by_program(cursor, program_id, university_id, years):
    query = '''
    SELECT 
        year,
        ROUND(
            (SUM(total_passers) / SUM(total_examinees)) * 100,
            2
        ) AS passing_rate
    FROM exam_results
    WHERE program_id = %s AND university_id = %s
    GROUP BY year
    ORDER BY year DESC
    LIMIT %s;
    '''
    cursor.execute(query, (program_id, university_id, years))
    return cursor.fetchall()

def fetch_universities_for_homescreen(cursor, limit=4):
    cursor.execute("""
        SELECT
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            u.tuition_range,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            it.type_name AS institution_type,

            COUNT(DISTINCT p.program_id) AS program_count,

            ROUND(
                AVG(
                    (er.total_passers / NULLIF(er.total_examinees, 0)) * 100
                ),
                0
            ) AS avg_passing_rate

        FROM universities u
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        LEFT JOIN programs p ON p.university_id = u.university_id
        LEFT JOIN exam_results er ON er.program_id = p.program_id

        GROUP BY
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            u.tuition_range,
            location,
            institution_type

        ORDER BY avg_passing_rate DESC
        LIMIT %s
    """, (limit,))

    return cursor.fetchall()

# =====================================================
# SEARCH QUERIES
# =====================================================

def search_programs(cursor, query):
    is_numeric = query.isdigit()
    id_clause = " OR p.program_id = %s" if is_numeric else ""
    sql = """
        SELECT
            p.program_id,
            p.program_name,
            p.description,
            u.university_name,
            u.logo_url,
            u.tuition_range,
            it.type_name AS institution_type,
            p.is_licensure_based,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            (
                SELECT
                    ROUND(
                        (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                        2
                    )
                FROM exam_results er
                WHERE er.program_id = p.program_id
                AND er.university_id = p.university_id
                AND er.year = (
                    SELECT MAX(er2.year)
                    FROM exam_results er2
                    WHERE er2.program_id = p.program_id
                        AND er2.university_id = p.university_id
                )
            ) AS passing_rate,
            (
                SELECT amount_per_year
                FROM prog_tuition t
                WHERE t.program_id = p.program_id
                LIMIT 1
            ) AS tuition_fee
        FROM programs p
        JOIN universities u ON p.university_id = u.university_id
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        WHERE p.program_name LIKE %s
           OR u.university_name LIKE %s
           OR m.municipality_name LIKE %s
    """
    sql += id_clause + """
        ORDER BY p.program_name
    """
    like = f"%{query}%"
    params = [like, like, like]
    if is_numeric:
        params.append(int(query))
    cursor.execute(sql, params)
    return cursor.fetchall()

def search_programs_by_name(cursor, query):
    is_numeric = query.isdigit()
    id_clause = " OR p.program_id = %s" if is_numeric else ""
    sql = """
        SELECT
            p.program_id,
            p.program_name,
            p.description,
            u.university_name,
            u.logo_url,
            u.tuition_range,
            it.type_name AS institution_type,
            p.is_licensure_based,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            (
                SELECT
                    ROUND(
                        (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                        2
                    )
                FROM exam_results er
                WHERE er.program_id = p.program_id
                AND er.university_id = p.university_id
                AND er.year = (
                    SELECT MAX(er2.year)
                    FROM exam_results er2
                    WHERE er2.program_id = p.program_id
                        AND er2.university_id = p.university_id
                )
            ) AS passing_rate,
            (
                SELECT amount_per_year
                FROM prog_tuition t
                WHERE t.program_id = p.program_id
                LIMIT 1
            ) AS tuition_fee
        FROM programs p
        JOIN universities u ON p.university_id = u.university_id
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        WHERE p.program_name LIKE %s
    """
    sql += id_clause + """
        ORDER BY p.program_name
    """
    like = f"%{query}%"
    params = [like]
    if is_numeric:
        params.append(int(query))
    cursor.execute(sql, params)
    return cursor.fetchall()

def search_programs_by_university(cursor, query):
    sql = """
        SELECT
            p.program_id,
            p.program_name,
            p.description,
            u.university_name,
            u.logo_url,
            u.tuition_range,
            it.type_name AS institution_type,
            p.is_licensure_based,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            (
                SELECT
                    ROUND(
                        (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                        2
                    )
                FROM exam_results er
                WHERE er.program_id = p.program_id
                AND er.university_id = p.university_id
                AND er.year = (
                    SELECT MAX(er2.year)
                    FROM exam_results er2
                    WHERE er2.program_id = p.program_id
                        AND er2.university_id = p.university_id
                )
            ) AS passing_rate,
            (
                SELECT amount_per_year
                FROM prog_tuition t
                WHERE t.program_id = p.program_id
                LIMIT 1
            ) AS tuition_fee
        FROM programs p
        JOIN universities u ON p.university_id = u.university_id
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        WHERE u.university_name LIKE %s
        ORDER BY p.program_name
    """
    like = f"%{query}%"
    cursor.execute(sql, (like,))
    return cursor.fetchall()

def fetch_all_programs(cursor):
    query = """
        SELECT
            p.program_id,
            p.program_name,
            p.description,
            p.is_licensure_based,

            u.university_name,
            u.logo_url,
            u.abbreviation,
            u.tuition_range,

            it.type_name AS institution_type,

            (
                SELECT
                    ROUND(
                        (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                        2
                    )
                FROM exam_results er
                WHERE er.program_id = p.program_id
                AND er.university_id = p.university_id
                AND er.year = (
                    SELECT MAX(er2.year)
                    FROM exam_results er2
                    WHERE er2.program_id = p.program_id
                        AND er2.university_id = p.university_id
                )
            ) AS passing_rate

        FROM programs p
        JOIN universities u ON p.university_id = u.university_id
        JOIN institution_type it ON u.type_id = it.type_id

        ORDER BY p.program_name
    """
    cursor.execute(query)
    return cursor.fetchall()

def search_universities(cursor, query):
    like = f"%{query}%"
    cursor.execute("""
        SELECT
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            it.type_name AS institution_type,

            COUNT(DISTINCT p.program_id) AS program_count

        FROM universities u
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        LEFT JOIN programs p ON p.university_id = u.university_id

        WHERE u.university_name LIKE %s
           OR m.municipality_name LIKE %s

        GROUP BY
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            location,
            institution_type

        ORDER BY u.university_name
    """, (like, like))
    return cursor.fetchall()

def search_universities_by_name(cursor, query):
    like = f"%{query}%"
    cursor.execute("""
        SELECT
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            it.type_name AS institution_type,

            COUNT(DISTINCT p.program_id) AS program_count

        FROM universities u
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        LEFT JOIN programs p ON p.university_id = u.university_id

        WHERE u.university_name LIKE %s

        GROUP BY
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            location,
            institution_type

        ORDER BY u.university_name
    """, (like,))
    return cursor.fetchall()

def search_universities_by_location(cursor, query):
    like = f"%{query}%"
    cursor.execute("""
        SELECT
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            it.type_name AS institution_type,

            COUNT(DISTINCT p.program_id) AS program_count

        FROM universities u
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        LEFT JOIN programs p ON p.university_id = u.university_id

        WHERE m.municipality_name LIKE %s

        GROUP BY
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            location,
            institution_type

        ORDER BY u.university_name
    """, (like,))
    return cursor.fetchall()

def search_universities_by_program(cursor, query):
    like = f"%{query}%"
    cursor.execute("""
        SELECT
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            it.type_name AS institution_type,

            COUNT(DISTINCT p.program_id) AS program_count

        FROM universities u
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        JOIN programs p ON p.university_id = u.university_id

        WHERE p.program_name LIKE %s

        GROUP BY
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            location,
            institution_type

        ORDER BY u.university_name
    """, (like,))
    return cursor.fetchall()

def fetch_all_universities(cursor):
    cursor.execute("""
        SELECT
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            it.type_name AS institution_type,

            COUNT(DISTINCT p.program_id) AS program_count,

            ROUND(
                AVG(
                    (er.total_passers / NULLIF(er.total_examinees, 0)) * 100
                ),
                0
            ) AS avg_passing_rate

        FROM universities u
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        LEFT JOIN programs p ON p.university_id = u.university_id
        LEFT JOIN exam_results er ON er.program_id = p.program_id

        GROUP BY
            u.university_id,
            u.university_name,
            u.short_description,
            u.logo_url,
            location,
            institution_type

        ORDER BY u.university_name
    """)
    return cursor.fetchall()

# =====================================================
# COMPARE QUERIES
# =====================================================
def fetch_programs_by_ids(cursor, program_ids):
    if not program_ids:
        return []

    placeholders = ",".join(["%s"] * len(program_ids))

    sql = f"""
        SELECT
            p.program_id AS id,
            p.program_name AS name,
            u.university_name AS university,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            it.type_name AS institutionType
        FROM programs p
        JOIN universities u ON p.university_id = u.university_id
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        WHERE p.program_id IN ({placeholders})
    """

    cursor.execute(sql, tuple(program_ids))
    return cursor.fetchall()

def fetch_programs_for_compare(cursor, program_ids):
    placeholders = ",".join(["%s"] * len(program_ids))

    sql = f"""
    SELECT
        p.program_id AS id,
        p.program_name,
        u.university_name,
        u.abbreviation AS university_abbreviation,
        CONCAT(m.municipality_name, ', Pangasinan') AS location,
        it.type_name AS institution_type,
        p.is_licensure_based,
        (
            SELECT amount_per_year
            FROM prog_tuition t
            WHERE t.program_id = p.program_id
            LIMIT 1
        ) AS tuition,
        (
            SELECT
            ROUND(
                (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                2
                )
            FROM exam_results er
            WHERE er.program_id = p.program_id
            AND er.university_id = p.university_id
            AND er.year = (
                SELECT MAX(er2.year)
                FROM exam_results er2
                WHERE er2.program_id = p.program_id
                    AND er2.university_id = p.university_id
            )
        ) AS passing_rate
    FROM programs p
    JOIN universities u ON p.university_id = u.university_id
    JOIN municipalities m ON u.municipality_id = m.municipality_id
    JOIN institution_type it ON u.type_id = it.type_id
    WHERE p.program_id IN ({placeholders})
    """

    cursor.execute(sql, tuple(program_ids))
    return cursor.fetchall()

def fetch_compare_programs_by_year(cursor, program_ids, year):
    if not program_ids:
        return []

    placeholders = ",".join(["%s"] * len(program_ids))

    sql = f"""
        SELECT
            p.program_id AS id,
            p.program_name,
            u.logo_url AS university_logo,
            u.university_name,
            u.abbreviation AS university_abbreviation,
            u.tuition_range AS tuition_range,
            it.type_name AS institution_type,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            p.is_licensure_based,

            pt.amount_per_year AS tuition,

            -- YEARLY AGGREGATES (ALL EXAMS IN THE YEAR)
            COALESCE(SUM(er.total_examinees), 0) AS total_examinees,
            COALESCE(SUM(er.total_passers), 0) AS total_passers,

            COALESCE(SUM(er.first_timers_total), 0) AS first_timers_total,
            COALESCE(SUM(er.first_timers_passed), 0) AS first_timers_passed,

            COALESCE(SUM(er.repeaters_total), 0) AS repeaters_total,
            COALESCE(SUM(er.repeaters_passed), 0) AS repeaters_passed,

              COALESCE(SUM(er.number_of_topnotchers), 0) AS number_of_topnotchers,
              COALESCE(
                  ROUND(
                      (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                      2
                  ),
                  0
              ) AS passing_rate

        FROM programs p
        JOIN universities u ON p.university_id = u.university_id
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        LEFT JOIN prog_tuition pt ON pt.program_id = p.program_id
        LEFT JOIN exam_results er 
            ON er.program_id = p.program_id
            AND er.year = %s

        WHERE p.program_id IN ({placeholders})
        GROUP BY
            p.program_id,
            p.program_name,
            u.logo_url,
            u.university_name,
            u.abbreviation,
            it.type_name,
            location,
            p.is_licensure_based,
            pt.amount_per_year
    """

    params = [year] + program_ids
    cursor.execute(sql, params)
    return cursor.fetchall()

def fetch_compare_programs_all_years(cursor, program_ids):
    if not program_ids:
        return []

    placeholders = ",".join(["%s"] * len(program_ids))

    sql = f"""
        SELECT
            p.program_id AS id,
            p.program_name,
            u.logo_url AS university_logo,
            u.university_name,
            u.abbreviation AS university_abbreviation,
            u.tuition_range AS tuition_range,
            it.type_name AS institution_type,
            CONCAT(m.municipality_name, ', Pangasinan') AS location,
            p.is_licensure_based,

            pt.amount_per_year AS tuition,

            COALESCE(SUM(er.total_examinees), 0) AS total_examinees,
            COALESCE(SUM(er.total_passers), 0) AS total_passers,

            COALESCE(SUM(er.first_timers_total), 0) AS first_timers_total,
            COALESCE(SUM(er.first_timers_passed), 0) AS first_timers_passed,

            COALESCE(SUM(er.repeaters_total), 0) AS repeaters_total,
            COALESCE(SUM(er.repeaters_passed), 0) AS repeaters_passed,

            COALESCE(SUM(er.number_of_topnotchers), 0) AS number_of_topnotchers,
            COALESCE(
                ROUND(
                    (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                    2
                ),
                0
            ) AS passing_rate

        FROM programs p
        JOIN universities u ON p.university_id = u.university_id
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        LEFT JOIN prog_tuition pt ON pt.program_id = p.program_id
        LEFT JOIN exam_results er
            ON er.program_id = p.program_id

        WHERE p.program_id IN ({placeholders})
        GROUP BY
            p.program_id,
            p.program_name,
            u.logo_url,
            u.university_name,
            u.abbreviation,
            it.type_name,
            location,
            p.is_licensure_based,
            pt.amount_per_year
    """

    cursor.execute(sql, program_ids)
    return cursor.fetchall()

# =====================================================
# CHART
# =====================================================

def fetch_top_programs_by_year(cursor, year, limit=5):
    sql = """
        SELECT
            p.program_name,
            ROUND(
                (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                2
            ) AS passing_rate
        FROM exam_results er
        JOIN programs p ON er.program_id = p.program_id
        WHERE er.year = %s
        GROUP BY p.program_name
        HAVING SUM(er.total_examinees) > 0
        ORDER BY passing_rate DESC
        LIMIT %s
    """
    cursor.execute(sql, (year, limit))
    return cursor.fetchall()

def fetch_top_programs_all_years(cursor, limit=5):
    sql = """
        SELECT
            p.program_name,
            ROUND(
                (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                2
            ) AS passing_rate
        FROM exam_results er
        JOIN programs p ON er.program_id = p.program_id
        GROUP BY p.program_name
        HAVING SUM(er.total_examinees) > 0
        ORDER BY passing_rate DESC
        LIMIT %s
    """
    cursor.execute(sql, (limit,))
    return cursor.fetchall()

def fetch_top_universities_by_year(cursor, year, limit=5):
    sql = """
        SELECT
            u.university_name,
            u.abbreviation,
            ROUND(
                (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                2
            ) AS passing_rate
        FROM exam_results er
        JOIN universities u ON er.university_id = u.university_id
        WHERE er.year = %s
        GROUP BY u.university_id, u.university_name, u.abbreviation
        HAVING SUM(er.total_examinees) > 0
        ORDER BY passing_rate DESC
        LIMIT %s
    """
    cursor.execute(sql, (year, limit))
    return cursor.fetchall()

def fetch_top_universities_all_years(cursor, limit=5):
    sql = """
        SELECT
            u.university_name,
            u.abbreviation,
            ROUND(
                (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                2
            ) AS passing_rate
        FROM exam_results er
        JOIN universities u ON er.university_id = u.university_id
        GROUP BY u.university_id, u.university_name, u.abbreviation
        HAVING SUM(er.total_examinees) > 0
        ORDER BY passing_rate DESC
        LIMIT %s
    """
    cursor.execute(sql, (limit,))
    return cursor.fetchall()

def update_user_names(cursor, user_id, first_name, last_name):
    cursor.execute("""
        UPDATE users
        SET first_name = %s, last_name = %s
        WHERE user_id = %s
    """, (first_name, last_name, user_id))

def update_user_account(cursor, user_id, first_name, last_name, email, profile_picture_url=None):
    if profile_picture_url:
        cursor.execute("""
            UPDATE users
            SET first_name=%s, last_name=%s, email=%s, profile_picture_url=%s
            WHERE user_id=%s
        """, (first_name, last_name, email, profile_picture_url, user_id))
    else:
        cursor.execute("""
            UPDATE users
            SET first_name=%s, last_name=%s, email=%s
            WHERE user_id=%s
        """, (first_name, last_name, email, user_id))


def update_user_password(cursor, user_id, password_hash):
    cursor.execute("""
        UPDATE users
        SET password_hash=%s
        WHERE user_id=%s
    """, (password_hash, user_id))


def is_email_taken(cursor, email, user_id):
    cursor.execute("""
        SELECT 1 FROM users
        WHERE email=%s AND user_id != %s
        LIMIT 1
    """, (email, user_id))
    return cursor.fetchone() is not None

# =====================================================
# BOOKMARK QUERIES
# =====================================================

def add_bookmark(cursor, user_id, program_id):
    cursor.execute("""
        INSERT IGNORE INTO user_bookmarks (user_id, program_id)
        VALUES (%s, %s)
    """, (user_id, program_id))


def remove_bookmark(cursor, user_id, program_id):
    cursor.execute("""
        DELETE FROM user_bookmarks
        WHERE user_id = %s AND program_id = %s
    """, (user_id, program_id))


def fetch_user_bookmarks(cursor, user_id):
    cursor.execute("""
        SELECT
            p.program_id,
            p.program_name,
            p.description,
            u.university_name,
            u.logo_url,
            u.tuition_range,
            it.type_name AS institution_type,
            p.is_licensure_based,
            (
                SELECT
                    ROUND(
                        (SUM(er.total_passers) / NULLIF(SUM(er.total_examinees), 0)) * 100,
                        2
                    )
                FROM exam_results er
                WHERE er.program_id = p.program_id
                  AND er.university_id = p.university_id
                  AND er.year = (
                      SELECT MAX(er2.year)
                      FROM exam_results er2
                      WHERE er2.program_id = p.program_id
                        AND er2.university_id = p.university_id
                  )
            ) AS passing_rate,
            (
                SELECT amount_per_year
                FROM prog_tuition t
                WHERE t.program_id = p.program_id
                LIMIT 1
            ) AS tuition_fee
        FROM user_bookmarks ub
        JOIN programs p ON ub.program_id = p.program_id
        JOIN universities u ON p.university_id = u.university_id
        JOIN institution_type it ON u.type_id = it.type_id
        WHERE ub.user_id = %s
        ORDER BY ub.created_at DESC
    """, (user_id,))

    return cursor.fetchall()

def is_program_bookmarked(cursor, user_id, program_id):
    cursor.execute("""
        SELECT 1
        FROM user_bookmarks
        WHERE user_id = %s AND program_id = %s
        LIMIT 1
    """, (user_id, program_id))
    return cursor.fetchone() is not None

def fetch_university_details(cursor, university_id):
    cursor.execute("""
        SELECT
            u.university_id,
            u.university_name,
            u.logo_url,
            u.long_description,
            u.website,
            u.email,
            u.phone,
            u.latitude,
            u.longitude,

            m.municipality_name,
            CONCAT(m.municipality_name, ', Pangasinan') AS full_location,

            it.type_name

        FROM universities u
        JOIN municipalities m ON u.municipality_id = m.municipality_id
        JOIN institution_type it ON u.type_id = it.type_id
        WHERE u.university_id = %s
    """, (university_id,))
    return cursor.fetchone()

def fetch_university_tuition_range(cursor, university_id):
    cursor.execute("""
        SELECT
            MIN(amount_per_year) AS min_tuition,
            MAX(amount_per_year) AS max_tuition
        FROM prog_tuition pt
        JOIN programs p ON pt.program_id = p.program_id
        WHERE p.university_id = %s
    """, (university_id,))
    return cursor.fetchone()


def fetch_university_requirements(cursor, university_id):
    cursor.execute("""
        SELECT DISTINCT pr.requirement
        FROM prog_req pr
        JOIN programs p ON pr.program_id = p.program_id
        WHERE p.university_id = %s
        ORDER BY pr.requirement
    """, (university_id,))
    return [r["requirement"] for r in cursor.fetchall()]


def fetch_university_scholarships(cursor, university_id):
    cursor.execute("""
        SELECT DISTINCT ps.scholarship_name
        FROM prog_scholarship ps
        JOIN programs p ON ps.program_id = p.program_id
        WHERE p.university_id = %s
        ORDER BY ps.scholarship_name
    """, (university_id,))
    return [s["scholarship_name"] for s in cursor.fetchall()]

def fetch_programs_by_university(cursor, university_id):
    cursor.execute("""
        SELECT
            program_id,
            program_name
        FROM programs
        WHERE university_id = %s
        ORDER BY program_name
    """, (university_id,))
    return cursor.fetchall()




