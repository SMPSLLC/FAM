from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse, abort
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://azure_sa:kUvkyh-wyfbi4-dujvok@studentsserver.mysql.database.azure.com:8889/students_db'
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
api = Api(app)

@dataclass
class StudentModel(db.Model):
    __tablename__ = 'student_model'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return self.serialize()
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone
        }

class Student(Resource):
    def get(self, id):
        student = StudentModel.query.filter_by(id=id).first()
        if not student:
            abort(404, message="Student not found")
        return jsonify(student.serialize())

    def put(self, id):
        student = StudentModel.query.filter_by(id=id).first()
        if not student:
            abort(404, message="Student not found")
        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=True)
        parser.add_argument("email", type=str, required=True)
        parser.add_argument("phone", type=str, required=True)
        args = parser.parse_args()
        student.name = args["name"]
        student.email = args["email"]
        student.phone = args["phone"]
        db.session.commit()
        return jsonify(student.serialize())

    def delete(self, id):
        student = StudentModel.query.filter_by(id=id).first()
        if not student:
            abort(404, message="Student not found")
        db.session.delete(student)
        db.session.commit()
        return '', 204

class StudentList(Resource):
    def get(self):
        students = StudentModel.query.all()
        return jsonify([s.serialize() for s in students])

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=True)
        parser.add_argument("email", type=str, required=True)
        parser.add_argument("phone", type=str, required=True)
        args = parser.parse_args()
        student = StudentModel(name=args["name"], email=args["email"], phone=args["phone"])
        db.session.add(student)
        db.session.commit()
        return 201

api.add_resource(Student, "/students/<int:id>")
api.add_resource(StudentList, "/students")
