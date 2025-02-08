from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from models import db
from models.customer import Customer
from models.game import Game
from models.admin import Admin


app = Flask(__name__)  # - create a flask instance
# - enable all routes, allow requests from anywhere (optional - not recommended for security)
CORS(app, resources={r"/*": {"origins": "*"}})


# Specifies the database connection URL. In this case, it's creating a SQLite database
# named 'library.db' in your project directory. The three slashes '///' indicate a
# relative path from the current directory
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
db.init_app(app)  # initializes the databsewith the flask application

CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5500"])

# this is a decorator from the flask module to define a route for for adding a book, supporting POST requests.(check the decorator summary i sent you and also the exercises)
@app.route('/books', methods=['POST'])
def add_book():
    data = request.json  # this is parsing the JSON data from the request body
    new_book = Game(
        title=data['title'],  # Set the title of the new book.
        genre=data['genre'],  # Set the author of the new book.
        price=data['price'],
        quantity=data['quantity'],
        loan_status = data['loan_status'],
        customer_id = data['customer_id']
        # add other if needed...
    )
    db.session.add(new_book)  # add the bew book to the database session
    db.session.commit()  # commit the session to save in the database
    return jsonify({'message': 'Book added to database.'}), 201


# a decorator to Define a new route that handles GET requests
@app.route('/books', methods=['GET'])
def get_books():
    try:
        books = Game.query.all()                    # Get all the books from the database

        # Create empty list to store formatted book data we get from the database
        books_list = []

        for book in books:                         # Loop through each book from database
            book_data = {                          # Create a dictionary for each book
                'id': book.id,
                'title': book.title,
                'genre': book.genre,
                'price': book.price,
                'quantity': book.quantity,
                'loan_status': book.loan_status,
                'customer_id': book.customer_id
            }
            # Add the iterated book dictionary to our list
            books_list.append(book_data)

        return jsonify({                           # Return JSON response
            'message': 'Books retrieved successfully',
            'books': books_list
        }), 200

    except Exception as e:
        return jsonify({
            'error': 'Failed to retrieve books',
            'message': str(e)
        }), 500                                    #

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Please enter both username and password."}), 400

    user = Admin.query.filter_by(username=username).first()

    if user and user.check_password(password):
        # If credentials are valid, return a success response
        return jsonify({"success": True}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials."}), 401



@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    try:
        # Query the database for the book with the given ID
        book = Game.query.get(book_id)

        # If the book doesn't exist, return a 404 error
        if not book:
            return jsonify({
                'error': 'Book not found',
                'message': f'No book found with ID {book_id}'
            }), 404

        # Delete the book from the database
        db.session.delete(book)
        db.session.commit()

        # Return a success message
        return jsonify({
            'message': 'Book deleted successfully',
            'deleted_book_id': book_id
        }), 200

    except Exception as e:
        # Rollback the session in case of an error
        db.session.rollback()
        return jsonify({
            'error': 'Failed to delete book',
            'message': str(e)
        }), 500







@app.route('/books/loaned', methods=['GET'])
def get_loaned_books():
    try:
        books = Game.query.filter_by(loan_status=1).all()             

        # Create empty list to store formatted book data we get from the database
        books_list = []

        for book in books:                         # Loop through each book from database
            book_data = {                          # Create a dictionary for each book
                'id': book.id,
                'title': book.title,
                'genre': book.genre,
                'price': book.price,
                'quantity': book.quantity,
                'loan_status': book.loan_status,
                'customer_id': book.customer_id
            }
            # Add the iterated book dictionary to our list
            books_list.append(book_data)

        return jsonify({                           # Return JSON response
            'message': 'Books retrieved successfully',
            'books': books_list
        }), 200

    except Exception as e:
        return jsonify({
            'error': 'Failed to retrieve books',
            'message': str(e)
        }), 500                                    #
















if __name__ == '__main__':
    # with app.app_context():
        # new_user = Admin(username="admin")
        # new_user.set_password("password123")  # Securely hash password
        # db.session.add(new_user)
        # db.session.commit()

    # with app.test_client() as test:
    #     response = test.post('/books', json={  # Make a POST request to /books endpoint with book  data
    #         'title': 'Harry Potter',
    #         'author': 'J.K. Rowling',
    #         'year_published': 1997,
    #         'types': '1'  # lets say 1 is fantasy
    #     })
    #     print("Testing /books endpoint:")
    #     # print the response from the server
    #     print(f"Response: {response.data}")

    #     #  GET test here
    #     get_response = test.get('/books')
    #     print("\nTesting GET /books endpoint:")
    #     print(f"Response: {get_response.data}")

    app.run(debug=True)  # start the flask application in debug mode

    # DONT FORGET TO ACTIVATE THE ENV FIRST:
    # /env/Scripts/activate - for windows
    # source ./env/bin/activate - - mac
