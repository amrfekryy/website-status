from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# configure
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'db.sqlite3')
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
    incidents = db.relationship("Incident")
    @property
    def serialize(self):
        return { 
          'id': self.id, 'url': self.url, 'user_id': self.user_id,
          'incidents': [incident.serialize['id'] for incident in self.incidents] 
        }


class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    website_id = db.Column(db.Integer, db.ForeignKey('website.id'))
    @property
    def serialize(self):
        return { 'id': self.id, 'created_at': self.created_at, 'website_id': self.website_id }


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers['token'] if 'token' in request.headers else None
        if not token: return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.get(data['id'])
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return func(current_user, *args, **kwargs)
    return decorated


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(name=data['name'], password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message' : 'New user created!'})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data['name'] or not data['password']: 
        return jsonify({'message' : 'Missing username or password!'}), 401

    user = User.query.filter_by(name=data['name']).first()
    if not user: return jsonify({'message' : "This username doesn't exist!"}), 401

    if check_password_hash(user.password, data['password']):
        token = jwt.encode({'id' : user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        
        return jsonify({ 
          'token' : token.decode('UTF-8'), 'user' : user.serialize })

    return jsonify({'message' : "Password incorrect!"}), 401


@app.route('/website', methods=['POST'])
@token_required
def add_website(current_user):
    data = request.get_json()
    
    new_website = Website(url=data['url'], user_id=current_user.id)
    db.session.add(new_website)
    db.session.commit()
    return jsonify({'message' : "Website created!"})


@app.route('/website/<website_id>', methods=['PUT', 'DELETE'])
@token_required
def website_action(current_user, website_id):
    data = request.get_json()
    website = Website.query.filter_by(id=website_id, user_id=current_user.id).first()
    if not website: return jsonify({'message' : 'No Website found!'})

    if request.method == 'PUT': website.url = data['url']
    else: db.session.delete(website)

    db.session.commit()
    return jsonify({'message' : "action done!"})


@app.route('/websites', methods=['GET'])
def get_all_websites():
    websites = Website.query.all()
    return jsonify({'websites' : [website.serialize for website in websites]})



if __name__ == '__main__':
    app.run(debug=True)