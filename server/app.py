from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
import os
from flask_cors import CORS
import httplib2

app = Flask(__name__)
CORS(app)
# configure
current_dir = os.path.abspath(os.path.dirname(__file__))
database_path = os.path.join(current_dir, 'db.sqlite3')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + database_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'thisissecret'

db = SQLAlchemy(app)




class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable = False)
    password = db.Column(db.String(80), nullable = False)
    websites = db.relationship("Website")
    @property
    def serialize(self):
        """returns object data in easily serializable format"""
        return {
            'name': self.name,
            'websites': [website.serialize['id'] for website in self.websites]
        }


class Website(db.Model):
    __tablename__ = 'website'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(30))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    is_up = db.Column(db.Boolean)
    incidents = db.relationship("Incident")
    @property
    def serialize(self):
        return { 
          'id': self.id, 'url': self.url, 'user_id': self.user_id, 'is_up': self.is_up,
          'incidents': [incident.serialize['id'] for incident in self.incidents] 
        }


class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    website_id = db.Column(db.Integer, db.ForeignKey('website.id'))
    @property
    def serialize(self):
        return { 'id': self.id, 'created_at': self.created_at, 'website_id': self.website_id }


# create database if it doesn't already exist
if not os.path.exists(database_path):
    print('Creating New Database')
    db.create_all()


def website_is_up(url):
    # check if url returns a valid status code
    h = httplib2.Http()
    try: resp = h.request(url, 'HEAD')
    except: return False
    return int(resp[0]['status']) < 400


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers['token'] if 'token' in request.headers else None
        if not token: return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.get(data['id'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return func(current_user, *args, **kwargs)
    return decorated



@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    user = User.query.filter_by(name=data['name']).first()
    if user: return jsonify({'message' : "This username already exists!"}), 401

    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(name=data['name'], password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message' : f'Hi {new_user.name}! Please Login'})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data['name'] or not data['password']: 
        return jsonify({'message' : 'Missing username or password!'}), 401

    user = User.query.filter_by(name=data['name']).first()
    if not user: return jsonify({'message' : "This username doesn't exist!"}), 401

    if check_password_hash(user.password, data['password']):
        token = jwt.encode({'id' : user.id }, app.config['SECRET_KEY'])
        
        # add the following for expiry date
        # 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        
        return jsonify({ 
          'token' : token.decode('UTF-8'), 
          'user' : user.serialize,
          'message' : f"Welcome back {user.name}!" 
        })

    return jsonify({'message' : "Password incorrect!"}), 401


@app.route('/website', methods=['POST'])
@token_required
def add_website(current_user):
    data = request.get_json()
    
    url = data['url']
    is_up=website_is_up(url)
    new_website = Website(url=url, user_id=current_user.id, is_up=is_up)
    db.session.add(new_website)
    db.session.commit()
    return jsonify({
      'message' : "Website created!",
      'website': new_website.serialize
    })


@app.route('/website/<website_id>', methods=['PUT', 'DELETE'])
@token_required
def website_action(current_user, website_id):
    data = request.get_json()
    website = Website.query.filter_by(id=website_id, user_id=current_user.id).first()
    if not website: return jsonify({'message' : 'No Website found!'})

    if request.method == 'PUT':
      url = data['url']
      website.url = url
      website.is_up=website_is_up(url)
      db.session.commit()
      return jsonify({
        'message' : "Website Updated!",
        'website': website.serialize
      })

    else: 
      db.session.delete(website)
      db.session.commit()
      return jsonify({'message' : "Website Deleted!"})


@app.route('/websites', methods=['GET'])
def get_all_websites():
    websites = Website.query.all()
    # update is_up status for all websites
    for website in websites:
        website.is_up=website_is_up(website.url)
    db.session.commit()

    return jsonify({'websites': dict((website.id, website.serialize) for website in websites)})



if __name__ == '__main__':
    app.run(debug=True)