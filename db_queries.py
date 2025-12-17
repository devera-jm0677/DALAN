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
        INSERT INTO users (first_name, last_name, email, password)
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
        INSERT INTO user_profiles
            (user_id, shs_strand_id, municipality_id, institution_type_id, budget_id)
        VALUES (%s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            shs_strand_id = VALUES(shs_strand_id),
            municipality_id = VALUES(municipality_id),
            institution_type_id = VALUES(institution_type_id),
            budget_id = VALUES(budget_id)
    ''', (
        user_id,
        shs_strand_id,
        municipality_id,
        institution_type_id,
        budget_id
    ))

def delete_user_program_preferences(cursor, user_id):
    cursor.execute("DELETE FROM user_program_preferences WHERE user_id = %s", (user_id,))

def insert_user_program_preference(cursor, user_id, program_id):
    cursor.execute(
        "INSERT INTO user_program_preferences (user_id, interest_program_id) VALUES (%s, %s)",
        (user_id, program_id)
    )

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
