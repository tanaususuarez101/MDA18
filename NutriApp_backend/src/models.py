from src import db
from datetime import datetime
from werkzeug.security import generate_password_hash
import uuid


# #################################### #
# >>>> Many-To-Many helper tables <<<< #
# #################################### #


dish_food = db.Table('dish_food',
                     db.Column('dish_id', db.Integer, db.ForeignKey('dishes.id'), primary_key=True),
                     db.Column('diet_id', db.Integer, primary_key=True),
                     db.Column('type_id', db.Integer, primary_key=True),
                     db.Column('day', primary_key=True),
                     db.ForeignKeyConstraint(['diet_id', 'type_id', 'day'],
                                             ['foods.diet_id', 'foods.type_id', 'foods.day']))

# ################ #
# >>>> Models <<<< #
# ################ #


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(64), nullable=False)
    isAdmin = db.Column(db.Boolean, nullable=True)
    isNutritionist = db.Column(db.Boolean, nullable=True)
    isPatient = db.Column(db.Boolean, nullable=True)
    public_id = db.Column(db.String(50), unique=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('administrators.id'), nullable=True)
    nutritionist_id = db.Column(db.Integer, db.ForeignKey('nutritionists.id'), nullable=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=True)

    @staticmethod
    def add(user):
        db.session.add(user)
        db.session.commit()

    @staticmethod
    def get(username=None, password=None, public_id=None):
        if username and password and not public_id:
            return User.query.filter_by(username=username.lower(), password=password).first()
        if not username and not password and public_id:
            return User.query.filter_by(public_id=public_id).first()
        if username and not password and not public_id:
            return User.query.filter_by(username=username.lower()).first()
        return None

    @staticmethod
    def delete(user):
        db.session.delete(user)
        db.session.commit()

    def update(self, data):
        if "username" in data and data['username'] != "":
            self.username = data['username'].lower()
        if "password" in data and data['password'] != "":
            self.password = generate_password_hash(data['password'], method='sha256')
        db.session.commit()

    @staticmethod
    def from_dict(data):
        return User(public_id=str(uuid.uuid4()),
                    username=data['username'].lower(),
                    password=generate_password_hash(data['password'], method='sha256'),
                    isAdmin=False if data['isAdmin'] == "false" else True,
                    isNutritionist=False if data['isNutritionist'] == "false" else True,
                    isPatient=False if data['isPatient'] == "false" else True)

    def to_dict(self):
        return dict(id=self.id,
                    username=self.username,
                    public_id=self.public_id,
                    isAdmin=self.isAdmin,
                    isNutritionist=self.isNutritionist,
                    isPatient=self.isPatient)


class Administrator(db.Model):
    __tablename__ = 'administrators'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    birth_date = db.Column(db.Date)
    dni = db.Column(db.String(24))
    user = db.relationship('User', uselist=False, backref='administrator', lazy=True, cascade="all, delete-orphan")

    @staticmethod
    def add(administrator, user):
        administrator.user_id = user
        db.session.add(administrator)
        db.session.commit()

    @staticmethod
    def all():
        return Administrator.query.all()

    @staticmethod
    def get(admin_id):
        return Administrator.query.get(admin_id)

    @staticmethod
    def delete(admin):
        db.session.delete(admin)
        db.session.commit()

    def update(self, data):
        if "name" in data and data['name'] != "":
            self.name = data['name']
        if "last_name" in data and data['last_name'] != "":
            self.last_name = data['last_name']
        if "birth_date" in data and data['birth_date'] != "":
            self.birth_date = datetime.strptime(data['birth_date'], '%Y-%m-%d').date()
        if "dni" in data and data['dni'] != "":
            self.dni = data['dni']
        db.session.commit()

    @staticmethod
    def from_dict(data):
        return Administrator(name=data['name'],
                             last_name=data['last_name'],
                             birth_date=datetime.strptime(data['birth_date'], '%Y-%m-%d').date(),
                             dni=data['dni'])

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    last_name=self.last_name,
                    birth_date=self.birth_date,
                    dni=self.dni,
                    user=self.user.to_dict())


class Nutritionist(db.Model):
    __tablename__ = 'nutritionists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    birth_date = db.Column(db.Date)
    dni = db.Column(db.String(24))
    user = db.relationship('User', uselist=False, backref='nutritionist', lazy=True, cascade="all, delete-orphan")

    @staticmethod
    def add(nutritionist, user):
        nutritionist.user_id = user
        db.session.add(nutritionist)
        db.session.commit()

    @staticmethod
    def all():
        return Nutritionist.query.all()

    @staticmethod
    def get(nutritionist_id):
        return Nutritionist.query.get(nutritionist_id)

    @staticmethod
    def delete(nutritionist):
        db.session.delete(nutritionist)
        db.session.commit()

    def update(self, data):
        if "name" in data and data['name'] != "":
            self.name = data['name']
        if "last_name" in data and data['last_name'] != "":
            self.last_name = data['last_name']
        if "birth_date" in data and data['birth_date'] != "":
            self.birth_date = datetime.strptime(data['birth_date'], '%Y-%m-%d').date()
        if "dni" in data and data['dni'] != "":
            self.dni = data['dni']
        db.session.commit()

    @staticmethod
    def from_dict(data):
        return Nutritionist(name=data['name'],
                            last_name=data['last_name'],
                            birth_date=datetime.strptime(data['birth_date'], '%Y-%m-%d').date(),
                            dni=data['dni'])

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    last_name=self.last_name,
                    birth_date=self.birth_date,
                    dni=self.dni,
                    user=self.user.to_dict())


class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    birth_date = db.Column(db.Date)
    dni = db.Column(db.String(24))
    user = db.relationship('User', uselist=False, backref='patient', lazy=True, cascade="all, delete-orphan")
    diets = db.relationship('Diet', backref='patient', lazy=True, cascade="all, delete-orphan")
    measurements = db.relationship('Measurement', backref='patient', lazy=True, cascade="all, delete-orphan")

    @staticmethod
    def add(patient, user):
        patient.user_id = user
        db.session.add(patient)
        db.session.commit()

    @staticmethod
    def all():
        return Patient.query.all()

    @staticmethod
    def get(patient_id):
        return Patient.query.get(patient_id)

    @staticmethod
    def delete(patient):
        db.session.delete(patient)
        db.session.commit()

    def update(self, data):
        if "name" in data and data['name'] != "":
            self.name = data['name']
        if "last_name" in data and data['last_name'] != "":
            self.last_name = data['last_name']
        if "birth_date" in data and data['birth_date'] != "":
            self.birth_date = datetime.strptime(data['birth_date'], '%Y-%m-%d').date()
        if "dni" in data and data['dni'] != "":
            self.dni = data['dni']
        db.session.commit()

    @staticmethod
    def from_dict(data):
        return Patient(name=data['name'],
                       last_name=data['last_name'],
                       birth_date=datetime.strptime(data['birth_date'], '%Y-%m-%d').date(),
                       dni=data['dni'])

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    last_name=self.last_name,
                    birth_date=self.birth_date,
                    dni=self.dni,
                    user=self.user.to_dict(),
                    diets=[d.to_dict() for d in self.diets],
                    measurements=[m.to_dict() for m in self.measurements])


class Diet(db.Model):
    __tablename__ = 'diets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    init_date = db.Column(db.Date)
    expiration_date = db.Column(db.Date)
    recommendations = db.Column(db.Text)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    foods = db.relationship('Food',
                            lazy='subquery',
                            backref=db.backref('foods', lazy=True),
                            cascade="all, delete-orphan")

    @staticmethod
    def add(diet):
        db.session.add(diet)
        db.session.commit()

    @staticmethod
    def all():
        return Diet.query.all()

    @staticmethod
    def get(diet_id):
        return Diet.query.get(diet_id)

    @staticmethod
    def delete(diet):
        db.session.delete(diet)
        db.session.commit()

    @staticmethod
    def from_dict(data):
        return Diet(name=data['name'],
                    init_date=datetime.strptime(data['init_date'], '%Y-%m-%d').date(),
                    expiration_date=datetime.strptime(data['expiration_date'], '%Y-%m-%d').date(),
                    recommendations=data['recommendations'],
                    patient_id=data['patient_id'])

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    init_date=self.init_date,
                    expiration_date=self.expiration_date,
                    recommendations=self.recommendations,
                    patient_id=self.patient_id,
                    foods=[f.to_dict() for f in self.foods])


class Type(db.Model):
    __tablename__ = 'types'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))


class Food(db.Model):
    __tablename__ = 'foods'
    diet_id = db.Column(db.ForeignKey('diets.id'), primary_key=True)
    type_id = db.Column(db.ForeignKey('types.id'), primary_key=True)
    day = db.Column(db.String(64), primary_key=True)
    dishes = db.relationship('Dish',
                             secondary=dish_food,
                             lazy='subquery',
                             backref=db.backref('foods', lazy=True))

    def append_dish(self, dish_id):
        if not self.has_dish(dish_id):
            self.dishes.append(Dish.get(dish_id))

    def remove_dish(self, dish_id):
        if self.has_dish(dish_id):
            self.dishes.remove(Dish.get(dish_id))

    def has_dish(self, dish_id):
        return True if Dish.get(dish_id) in self.dishes else False

    @staticmethod
    def add(food):
        db.session.add(food)
        db.session.commit()

    @staticmethod
    def all():
        return Food.query.all()

    @staticmethod
    def from_dict(data):
        return Food(diet_id=data['diet_id'],
                    type_id=data['type_id'],
                    day=data['day'])

    def to_dict(self):
        return dict(diet_id=self.diet_id,
                    type_id=self.type_id,
                    day=self.day,
                    dishes=[d.to_dict() for d in self.dishes])


class Dish(db.Model):
    __tablename__ = 'dishes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    ingredients = db.Column(db.Text)
    elaboration = db.Column(db.Text)
    difficulty = db.Column(db.String(64))
    thumbnail = db.Column(db.String(255))

    @staticmethod
    def add(dish):
        db.session.add(dish)
        db.session.commit()

    @staticmethod
    def all():
        return Dish.query.all()

    @staticmethod
    def get(dish_id):
        return Dish.query.get(dish_id)

    @staticmethod
    def delete(dish):
        db.session.delete(dish)
        db.session.commit()

    @staticmethod
    def from_dict(data):
        return Dish(name=data['name'],
                    ingredients=data['ingredients'],
                    elaboration=data['elaboration'],
                    difficulty=data['difficulty'],
                    thumbnail=data['thumbnail'])

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    ingredients=self.ingredients,
                    elaboration=self.elaboration,
                    difficulty=self.difficulty,
                    thumbnail=self.thumbnail)


class Measurement(db.Model):
    __tablename__ = 'measurements'
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime, index=True, default=datetime.utcnow())
    height = db.Column(db.Numeric(scale=2))
    weight = db.Column(db.Numeric(scale=2))
    imc = db.Column(db.Numeric(scale=2))
    fat_percentage = db.Column(db.Numeric(scale=2))
    muscle_mass = db.Column(db.Numeric(scale=2))
    water_percentage = db.Column(db.Numeric(scale=2))
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)

    @staticmethod
    def add(measurement):
        db.session.add(measurement)
        db.session.commit()

    @staticmethod
    def all():
        return Measurement.query.all()

    @staticmethod
    def get(measurement_id):
        return Measurement.query.get(measurement_id)

    @staticmethod
    def delete(measurement):
        db.session.delete(measurement)
        db.session.commit()

    @staticmethod
    def from_dict(data):
        return Measurement(height=data['height'],
                           weight=data['weight'],
                           imc=data['imc'],
                           fat_percentage=data['fat_percentage'],
                           muscle_mass=data['muscle_mass'],
                           water_percentage=data['water_percentage'],
                           patient_id=data['patient_id'])

    def to_dict(self):
        return dict(id=self.id,
                    datetime=self.datetime,
                    height=str(self.height),
                    weight=str(self.weight),
                    imc=str(self.imc),
                    fat_percentage=str(self.fat_percentage),
                    muscle_mass=str(self.muscle_mass),
                    water_percentage=str(self.water_percentage))
