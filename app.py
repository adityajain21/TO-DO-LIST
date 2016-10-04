import requests
from flask import Flask, render_template, request, json, redirect, url_for, redirect
from flaskext.mysql import MySQL


app = Flask(__name__)


mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'asdf12'
app.config['MYSQL_DATABASE_DB'] = 'bucketlist'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route("/", methods=['GET','POST'])
def main():
	return render_template('index.html')





@app.route("/SignUp", methods=['GET', 'POST'])
def SignUp() :
	return render_template('signup.html')

@app.route("/signup_check", methods=['GET','POST'])
def signup_check():
	
	try:
		_name = request.form['inputName']
		_email = request.form['inputEmail']
		_password = request.form['inputPassword']
		conn = mysql.connect()
		cursor = conn.cursor()
		
		if _name and _email and _password:
			cursor.callproc('sp_createUser',(_name,_email,_password))
			data = cursor.fetchall()

			if len(data) is 0:
				conn.commit()
				return json.dumps({'message':'User created successfully !'})
			else:
				return json.dumps({'error':str(data[0])})
		else:
			return json.dumps({'html':'<span>Enter the required fields</span>'})

	except Exception as e:
		return json.dumps({'error':str(e)})
	finally:
		cursor.close()
		conn.close()



@app.route("/Signin", methods=['GET','POST'])
def Signin():
	return render_template('signin.html')

@app.route("/signin_check", methods=['GET','POST'])
def signin_check():
	
	try:
		_email = request.form['inputEmail']
		_password = request.form['inputPassword']
		conn = mysql.connect()
		cursor = conn.cursor()
		
		if _email and _password:
			cursor.callproc('sp_getuserid1',(_email,_password))
			data = cursor.fetchall()
			u_id=data[0][0]
			return redirect(url_for('tasks', u_id=u_id))
		else:
			return json.dumps({'html':'<span>Enter the required fields</span>'})

	except Exception as e:
		return json.dumps({'error':str(e)})
	finally:
		cursor.close()
		conn.close()



@app.route("/tasks", methods=['GET', 'POST'])
def tasks() :
	try:
		u_id = request.args.get('u_id')
		print u_id
		conn = mysql.connect()
		cursor = conn.cursor()
		if u_id!='0':
			print "Aditya"
			cursor.callproc('sp_tasks_sp',(u_id))
			data = cursor.fetchall()
			print "Aditya"
			print data
			return "Aditya"
		else:
			print "NOT ADITYA"
			return "INVALID USER!"
	except Exception as e:
		return json.dumps({'error':str(e)})
	finally:
		cursor.close()
		conn.close()



if __name__ == "__main__" :
	app.run(debug=True)