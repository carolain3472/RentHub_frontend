# RENT-HUB

Para ejecutar el back (con gitbash):

python3 -m venv venv

source venv/Scripts/activate

pip install -r requirements.txt


# Crear migraciones

python manage.py makemigrations modulo_login_renthub

python manage.py migrate

# Correr el proyecto

python manage.py runserver

--------------------------------------------------------------

# Frontend

Para ejecutar el front (con gitbash):

cd frontend

npm install

npm run dev