import sys
import os
import jwt
from src import app
from src.models import *
from flask import Response, request, json, make_response
from werkzeug.security import check_password_hash
from datetime import *
from functools import wraps
from datetime import datetime


# ########################## #
# >>>> Useful functions <<<< #
# ########################## #


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
            if not token:
                return json_response({"error": "Token is missing!"}, 401)
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.get(public_id=data['public_id'])
        except Exception as ex:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            return json_response({"error": "Token is invalid!"}, 401)
        return f(current_user, *args, **kwargs)
    return decorated


def json_response(data, status=200):
    return Response(json.dumps(data,
                               sort_keys=False,
                               indent=4,
                               ensure_ascii=False,
                               separators=(',', ': ')) if data else None,
                    mimetype="text/json",
                    status=status)


# ##################### #
# >>>> RESTful API <<<< #
# ##################### #


'''
Block of MEASUREMENT endpoints
'''


@app.route('/measurements', defaults={'patient_id': None}, methods=['GET'])
@app.route('/measurements/<patient_id>', methods=['GET'])
@token_required
def get_measurements(current_user, patient_id):
    if current_user.isPatient:
        measurements = Patient.get(current_user.patient_id).measurements
        return json_response([m.to_dict() for m in measurements], 200)
    if current_user.isNutritionist and patient_id:
        measurements = Patient.get(patient_id).measurements
        return json_response([m.to_dict() for m in measurements], 200)
    return json_response({"error": "Forbidden!"}, 403)


@app.route('/measurements', methods=['POST'])
@token_required
def add_measurement(current_user):
    if not current_user.isNutritionist:
        return json_response({"error": "Forbidden!"}, 403)

    try:
        measurement = Measurement.from_dict(request.json)
        Measurement.add(measurement)
        return json_response({}, 200)
    except Exception as ex:
        return json_response({"error": "Internal server error at adding a measurement!"}, 500)


@app.route('/measurements/<measurement_id>', methods=['DELETE'])
@token_required
def delete_measurement(current_user, measurement_id):
    if not current_user.isNutritionist:
        return json_response({"error": "Forbidden!"}, 403)

    try:
        measurement = Measurement.get(measurement_id)
        Measurement.delete(measurement)
        return json_response({}, 200)
    except Exception as ex:
        return json_response({"error": "Internal server error at deleting a measurement!"}, 500)


'''
Block of DIET endpoints
'''


@app.route('/diets', defaults={'patient_id': None}, methods=['GET'])
@app.route('/diets/<patient_id>', methods=['GET'])
@token_required
def get_diets(current_user, patient_id):
    if current_user.isPatient:
        diets = Patient.get(current_user.patient_id).diets
        return json_response([d.to_dict() for d in diets], 200)
    if current_user.isNutritionist and patient_id:
        diets = Patient.get(patient_id).diets
        return json_response([d.to_dict() for d in diets], 200)
    return json_response({"error": "Forbidden!"}, 403)
    

@app.route('/diets', methods=['POST'])
@token_required
def add_diet(current_user):
    if not current_user.isNutritionist:
        return json_response({"error": "Forbidden!"}, 403)

    try:
        diet = Diet.from_dict(request.json)
        Diet.add(diet)
        for f in request.json['foods']:
            food = Food.from_dict(dict(diet_id=diet.id, type_id=f['type_id'], day=f['day']))
            for d in f['dishes']:
                food.append_dish(d)
            Food.add(food)
        return json_response({}, 200)
    except Exception as ex:
        return json_response({"error": "Internal server error at adding a diet!"}, 500)


@app.route('/diets/<diet_id>', methods=['DELETE'])
@token_required
def delete_diet(current_user, diet_id):
    if not current_user.isNutritionist:
        return json_response({"error": "Forbidden!"}, 403)

    try:
        diet = Diet.get(diet_id)
        Diet.delete(diet)
        return json_response({}, 200)
    except Exception as ex:
        return json_response({"error": "Internal server error at deleting a diet!"}, 500)


'''
Block of DISH endpoints
'''


@app.route('/dishes', methods=['GET'])
@token_required
def get_dishes(current_user):
    if not current_user.isNutritionist:
        return json_response({"error: Forbidden!"}, 403)

    try:
        dishes = Dish.all()
        return json_response([d.to_dict() for d in dishes], 200)
    except Exception as ex:
        return json_response({"error": "Internal server error at getting dishes!"}, 500)

    
@app.route('/dishes', methods=['POST'])
@token_required
def add_dish(current_user):
    if not current_user.isNutritionist:
        return json_response({"error": "Forbidden!"}, 403)

    try:
        dish = Dish.from_dict(request.json)
        Dish.add(dish)
        return json_response({}, 200)
    except Exception as ex:
        return json_response({"error": "Internal server error at adding a dish!"}, 500)


@app.route('/dishes/<dish_id>', methods=['DELETE'])
@token_required
def delete_dish(current_user, dish_id):
    if not current_user.isNutritionist:
        return json_response({"error": "Forbidden!"}, 403)

    try:
        dish = Dish.get(dish_id)
        Dish.delete(dish)
        return json_response({}, 200)
    except Exception as ex:
        return json_response({"error": "Internal server error at deleting a dish!"}, 500)


'''
Block of LOGIN/USER endpoints
'''


@app.route('/login', methods=['GET'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.get(username=auth.username)

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id': user.public_id, 'exp': datetime.utcnow() + timedelta(minutes=30)},
                           app.config['SECRET_KEY'])
        return json_response({'token': token.decode('UTF-8')}, 200)

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})


@app.route('/current_user', methods=['GET'])
@token_required
def get_current_user(current_user):
    try:
        if current_user.isAdmin:
            admin = Administrator.get(current_user.admin_id)
            return json_response(admin.to_dict(), 200)
        if current_user.isPatient:
            patient = Patient.get(current_user.patient_id)
            return json_response(patient.to_dict(), 200)
        if current_user.isNutritionist:
            nutritionist = Nutritionist.get(current_user.nutritionist_id)
            return json_response(nutritionist.to_dict(), 200)
        return json_response({"error": "There is no current_user identity!"}, 400)
    except Exception as ex:
        return json_response({"error": "Internal server error at getting current_user!"}, 500)


@app.route('/users', methods=['GET'])
@token_required
def get_users(current_user):
    if not current_user.isAdmin:
        return json_response({"error": "Forbidden!"}, 403)

    users = [p.to_dict() for p in Patient.all()] + \
            [n.to_dict() for n in Nutritionist.all()] + \
            [a.to_dict() for a in Administrator.all()]
    return json_response(users, 200)


@app.route('/patients', methods=['GET'])
@token_required
def get_patients(current_user):
    if not current_user.isNutritionist:
        return json_response({"error": "Forbidden!"}, 403)
    patients = Patient.all()
    return json_response([p.to_dict() for p in patients], 200)


@app.route('/users/<public_id>', methods=['PUT'])
@token_required
def update_user(current_user, public_id):
    if not current_user.isAdmin and not current_user.public_id == public_id:
        return json_response({"error": "Forbidden!"}, 403)

    data = request.get_json()
    try:
        user = User.get(public_id=current_user.public_id)
        if not user:
            return json_response({"error": "There is no user to update!"}, 400)
        user.update(data)
        if user.isAdmin:
            admin = Administrator.get(user.admin_id)
            admin.update(data)
            return json_response({}, 200)
        if user.isNutritionist:
            nutritionist = Nutritionist.get(user.nutritionist_id)
            nutritionist.update(data)
            return json_response({}, 200)
        if user.isPatient:
            patient = Patient.get(user.patient_id)
            patient.update(data)
            return json_response({}, 200)
        return json_response({"error": "There is no identity to update!"}, 400)
    except Exception as ex:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return json_response({"error": "Internal server error at updating the user!"}, 500)


# For security reasons the password must be hashed on the app an not on the server: data transmission is NOT SECURE
@app.route('/users', methods=['POST'])
#@token_required
def add_user():
 #   if not current_user.isAdmin:
  #      return json_response({"error": "Forbidden!"}, 403)

    data = request.get_json()
    new_user = User.from_dict(data)
    try:
        User.add(new_user)
        user = User.get(username=new_user.username)
        if user.isAdmin:
            admin = Administrator.from_dict(data)
            Administrator.add(admin, user)
            user.admin_id = admin.id
            db.session.commit()
            return json_response(admin.to_dict(), 200)
        if user.isNutritionist:
            nutritionist = Nutritionist.from_dict(data)
            Nutritionist.add(nutritionist, user)
            user.nutritionist_id = nutritionist.id
            db.session.commit()
            return json_response(nutritionist.to_dict(), 200)
        if user.isPatient:
            patient = Patient.from_dict(data)
            Patient.add(patient, user)
            user.patient_id = patient.id
            db.session.commit()
            return json_response(patient.to_dict(), 200)
        return json_response({"error": "There is no identity associated to the user!"}, 400)
    except Exception as ex:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        return json_response({"error": "Internal server error at adding a user!"}, 500)


@app.route('/users/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    if not current_user.isAdmin:
        return json_response({"error": "Forbidden!"}, 403)

    try:
        user = User.get(public_id=public_id)
        if not user:
            return json_response({"error": "No user found with this public_id!"}, 400)
        if user.isAdmin:
            administrator = Administrator.get(user.admin_id)
            Administrator.delete(administrator)
            return json_response({}, 200)
        if user.isNutritionist:
            nutritionist = Nutritionist.get(user.nutritionist_id)
            Nutritionist.delete(nutritionist)
            return json_response({}, 200)
        if user.isPatient:
            patient = Patient.get(user.patient_id)
            Patient.delete(patient)
            return json_response({}, 200)
        return json_response({"error": "There is no identity associated to the user!"}, 400)
    except Exception as ex:
        return json_response({"error": "Internal server error at deleting user!"}, 500)
