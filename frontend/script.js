// function to get all books from the API
async function getBooks() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/books');
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = ''; // Clear existing list

        response.data.books.forEach(book => {
            booksList.innerHTML += `
                <div class="book-card">
                    <h3>${book.title}</h3>
                    <p>Genre: ${book.genre}</p>
                    <p>Price: ${book.price}</p>
                    <p>Quantity: ${book.quantity}</p>
                    <p>Loan Status: ${book.loan_status}</p>
                    <p>Customer Loaning: ${book.customer_id}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to load books');
    }
}

// function to add a new book to the database
async function addBook() {
    const title = document.getElementById('book-title').value;
    const genre = document.getElementById('book-author').value;
    const price = document.getElementById('book-year-published').value;
    const quantity = document.getElementById('game-quantity').value;
    const loan_status = document.getElementById('loan-status').value === '1';
    const customer_id = document.getElementById('user-id').value;

    try {
        await axios.post('http://127.0.0.1:5000/books', {
            title: title,
            genre: genre,
            price: price,
            quantity: quantity,
            loan_status: loan_status,
            customer_id: customer_id
        });
        
        // Clear form fields
        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('book-year-published').value = '';
        document.getElementById('game-quantity').value = '';
        document.getElementById('loan-status').value = '';
        document.getElementById('user-id').value = '';
        // Refresh the books list
        getBooks();
        
        alert('Game added successfully!');
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Failed to add book');
    }
}

// Load all books when page loads
document.addEventListener('DOMContentLoaded', getBooks);