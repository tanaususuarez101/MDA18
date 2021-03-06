"""empty message

Revision ID: c1c1159d7e2e
Revises: 
Create Date: 2018-04-17 16:39:34.276431

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c1c1159d7e2e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('administrators',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('last_name', sa.String(length=64), nullable=True),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('dni', sa.String(length=24), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dishes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('ingredients', sa.Text(), nullable=True),
    sa.Column('elaboration', sa.Text(), nullable=True),
    sa.Column('difficulty', sa.String(length=64), nullable=True),
    sa.Column('thumbnail', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('nutritionists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('last_name', sa.String(length=64), nullable=True),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('dni', sa.String(length=24), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('last_name', sa.String(length=64), nullable=True),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('dni', sa.String(length=24), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('nutritionist_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('isConfirmed', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['nutritionist_id'], ['nutritionists.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('diets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('init_date', sa.String(length=64), nullable=True),
    sa.Column('expiration_date', sa.String(length=64), nullable=True),
    sa.Column('recommendations', sa.Text(), nullable=True),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('password', sa.String(length=64), nullable=False),
    sa.Column('isAdmin', sa.Boolean(), nullable=True),
    sa.Column('isNutritionist', sa.Boolean(), nullable=True),
    sa.Column('isPatient', sa.Boolean(), nullable=True),
    sa.Column('public_id', sa.String(length=50), nullable=True),
    sa.Column('admin_id', sa.Integer(), nullable=True),
    sa.Column('nutritionist_id', sa.Integer(), nullable=True),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['admin_id'], ['administrators.id'], ),
    sa.ForeignKeyConstraint(['nutritionist_id'], ['nutritionists.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('public_id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('foods',
    sa.Column('diet_id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.Column('day', sa.String(length=64), nullable=False),
    sa.ForeignKeyConstraint(['diet_id'], ['diets.id'], ),
    sa.ForeignKeyConstraint(['type_id'], ['types.id'], ),
    sa.PrimaryKeyConstraint('diet_id', 'type_id', 'day')
    )
    op.create_table('dish_food',
    sa.Column('dish_id', sa.Integer(), nullable=False),
    sa.Column('diet_id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.Column('day', sa.String(length=64), nullable=False),
    sa.ForeignKeyConstraint(['diet_id', 'type_id', 'day'], ['foods.diet_id', 'foods.type_id', 'foods.day'], ),
    sa.ForeignKeyConstraint(['dish_id'], ['dishes.id'], ),
    sa.PrimaryKeyConstraint('dish_id', 'diet_id', 'type_id', 'day')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('dish_food')
    op.drop_table('foods')
    op.drop_table('users')
    op.drop_table('diets')
    op.drop_table('appointments')
    op.drop_table('types')
    op.drop_table('patients')
    op.drop_table('nutritionists')
    op.drop_table('dishes')
    op.drop_table('administrators')
    # ### end Alembic commands ###
