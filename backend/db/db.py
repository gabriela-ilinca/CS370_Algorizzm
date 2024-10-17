from firebase_admin import db
from firebase_admin import credentials
from __init__ import firebase_admin




def get_data(path):
    ref = db.reference(path)
    return ref.get()




def set_data(path, data):
    ref = db.reference(path)
    ref.set(data)




def update_data(path, data):
    ref = db.reference(path)
    ref.update(data)




def example_operations():
    ref = db.reference("/")
    print(ref.get())  # Get all data at the root




    name_data = db.reference("/name").get()  # Get data at '/name'




    db.reference("/videos").set(4)  # Set the value at '/videos' to 5




    db.reference("/").update({"language": "python"})  # Update the root with a new value for 'language'




    print(ref.get())  # Fetch the updated root data




# Example usage of the functions
example_operations()  # Uncomment to run the example operations
