import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('jdbc:sqlite:nutriapp.db') or \
        'sqlite:///' + os.path.join(basedir, 'nutriapp.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'thisissecret'