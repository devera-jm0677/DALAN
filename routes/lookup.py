from flask import Blueprint, jsonify
import db_queries

lookup_bp = Blueprint('lookup_bp', __name__)

@lookup_bp.route("/api/shs_strands", methods=["GET"])
def get_shs_strands():
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            return jsonify(db_queries.fetch_shs_strands(cursor))
    finally:
        conn.close()

@lookup_bp.route("/api/programs", methods=["GET"])
def get_interest_programs():
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            return jsonify(db_queries.fetch_interest_programs(cursor))
    finally:
        conn.close()

@lookup_bp.route("/api/institution_type", methods=["GET"])
def get_institution_type():
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            return jsonify(db_queries.fetch_institution_types(cursor))
    finally:
        conn.close()

@lookup_bp.route("/api/budget_ranges", methods=["GET"])
def get_budget_ranges():
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            return jsonify(db_queries.fetch_budget_ranges(cursor))
    finally:
        conn.close()

@lookup_bp.route("/api/districts", methods=["GET"])
def get_districts():
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            return jsonify(db_queries.fetch_districts(cursor))
    finally:
        conn.close()

@lookup_bp.route("/api/municipalities", methods=["GET"])
def get_municipalities():
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            return jsonify(db_queries.fetch_municipalities(cursor))
    finally:
        conn.close()
