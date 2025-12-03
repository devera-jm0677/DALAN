from flask import *
from flask_mysqldb import MySQL

app=Flask(__name__)
app.secret_key='d4l4n'

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='dalandb'
app.config['MYSQL_CURSORCLASS']='DictCursor'
mysql=MySQL(app)

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.clear()
    return render_template('logout.html')

@app.route('/login')
def login():
    return render_template('login.html')

