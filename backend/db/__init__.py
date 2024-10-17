import firebase_admin
from firebase_admin import credentials




# Initialize the Firebase Admin SDK using the credentials JSON file
cred = credentials.Certificate("backend\db\credentials.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://algorizzm-backend-b7ec2-default-rtdb.firebaseio.com/"
})
