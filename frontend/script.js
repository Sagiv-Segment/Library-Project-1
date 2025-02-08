function logout(){
    window.location.href = "login.html"
}

// function to get all books from the API
async function getBooks() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/books');
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = ''; // Clear existing list

        response.data.books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <label for="genre-${book.id}">Genre</label>
                <input type="text" id="genre-${book.id}" value="${book.genre}">
                <label for="price-${book.id}">Price</label>
                <input type="text" id="price-${book.id}" value="${book.price}">
                <label for="quantity-${book.id}">Quantity</label>
                <input type="text" id="quantity-${book.id}" value="${book.quantity}">
                <label for="loan-status-${book.id}">Loan Status</label>
                <input type="text" id="loan-status-${book.id}" value="${book.loan_status ? '1' : '0'}">
                <label for="customer-loaning-${book.id}">Customer Loaning</label>
                <input type="text" id="customer-loaning-${book.id}" value="${book.customer_id}">
                <div class="button-container">
                    <button class="update-btn" data-id="${book.id}">Update</button>
                    <button class="delete-btn" data-id="${book.id}">Delete</button>
                </div>
            `;

            // Add event listener to the delete button
            const deleteButton = bookCard.querySelector('.delete-btn');
            deleteButton.addEventListener('click', async () => {
                try {
                    await axios.delete(`http://127.0.0.1:5000/books/${book.id}`);
                    bookCard.remove(); // Remove the book card from the DOM
                    alert('Game deleted successfully');
                } catch (error) {
                    console.error('Error deleting game:', error);
                    alert('Failed to delete book');
                }
            });

            // Add event listener to the update button
            const updateButton = bookCard.querySelector('.update-btn');
            updateButton.addEventListener('click', async () => {
                try {
                    const genre = document.getElementById(`genre-${book.id}`).value
                    const price = document.getElementById(`price-${book.id}`).value
                    const quantity = document.getElementById(`quantity-${book.id}`).value
                    const loan_status = document.getElementById(`loan-status-${book.id}`).value === '1' 
                    const customer_id = document.getElementById(`customer-loaning-${book.id}`).value
                    if(!ValidateFormElements(genre, price, quantity, loan_status, customer_id)){
                        alert("One of the fields is invalid. Check guide for details")
                    }else{
                        const updatedData = {
                            genre: document.getElementById(`genre-${book.id}`).value,
                            price: document.getElementById(`price-${book.id}`).value,
                            quantity: document.getElementById(`quantity-${book.id}`).value,
                            loan_status: document.getElementById(`loan-status-${book.id}`).value === '1', 
                            customer_id: document.getElementById(`customer-loaning-${book.id}`).value,
                        };
    
                        await axios.put(`http://127.0.0.1:5000/updbooks/${book.id}`, updatedData);
                        alert('Book updated successfully');
                    }
                    
                } catch (error) {
                    console.error('Error updating book:', error);
                    alert('Failed to update book');
                }
            });

            booksList.appendChild(bookCard);
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


    if(!ValidateForm()){
        return
    }

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
        getLoanedBooks();
        
        alert('Game added successfully!');
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Failed to add book');
    }
}


// script.js

function toggleTab() {
    const tab = document.getElementById("action-tab");
    const overlay = document.querySelector(".overlay");
  
    // Toggle visibility of the tab and overlay
    tab.classList.toggle("hidden");
    overlay.classList.toggle("active");
  }
  
  // Optional: Close the tab when clicking outside of it
  document.querySelector(".overlay").addEventListener("click", () => {
    toggleTab();
  });



  //Handle add game input validation
function TitleValidation(){
    const title = document.getElementById('book-title').value;
    const display = document.getElementById('book-title-requirements')
    if(title == ''){
        display.textContent = "Title can't be empty"
        return false
    }
    display.textContent = ""; // Clear any previous error message
    return true
}

function GenreValidation(){
    const genre = document.getElementById('book-author').value;
    const display = document.getElementById('book-author-requirements')
    if(genre == ''){
        display.textContent = "Genre can't be empty"
        return false
    }
    display.textContent = ""; // Clear any previous error message
    return true
}

function PriceValidation(){
    const genre = document.getElementById('book-author').value;
    const display = document.getElementById('book-author-requirements')
    if(title == ''){
        display.textContent = "Genre can't be empty"
        return false
    }
    display.textContent = ""; // Clear any previous error message
    return true
}


function PriceValidation() {
    const price = document.getElementById('book-year-published').value;
    const display = document.getElementById('book-year-published-requirements');

    if (price === '') {
        display.textContent = "Price can't be empty";
        return false;
    } else if (isNaN(price)) {
        display.textContent = "Price must be numeric";
        return false;
    }
    display.textContent = ""; // Clear any previous error message
    return true;
}


function QuantityValidation() {
    const quantity = document.getElementById('game-quantity').value;
    const display = document.getElementById('game-quantity-requirements');

    if (quantity === '') {
        display.textContent = "Quantity can't be empty";
        return false;
    } else if (isNaN(quantity)) {
        display.textContent = "Quantity must be numeric";
        return false;
    }
    display.textContent = ""; 
    return true;
}


function UserIdValidation() {
    const userId = document.getElementById('user-id').value;
    const loanStatus = document.getElementById('loan-status').value;
    const display = document.getElementById('user-id-requirements');

    if (loanStatus === '1' && userId === '') {
        display.textContent = "User ID is required when Loan Status is '1'";
        return false;
    }
    if(loanStatus != '1' && userId != ''){
        display.textContent = "Can't have User ID without true loan status";
        return false;
    }
    display.textContent = ""; // Clear any previous error message
    return true;
}



// function LoanStatusValidation() {
//     const loanStatus = document.getElementById('loan-status').value;
//     const display = document.getElementById('loan-status-requirements');

//     if (loanStatus === '') {
//         display.textContent = "Loan Status can't be empty";
//         return false;
//     }
//     display.textContent = ""; // Clear any previous error message
//     return true;
// }


function ValidateForm() {
    const isTitleValid = TitleValidation();
    const isGenreValid = GenreValidation();
    const isPriceValid = PriceValidation();
    const isQuantityValid = QuantityValidation();
    const isUserIdValid = UserIdValidation();

    return isTitleValid && isGenreValid && isPriceValid && isQuantityValid && isUserIdValid;
}



function ValidateFormElements(genre, price, quantity, loanStatus, userId) {
    // const isTitleValid = TitleValidation();
    // const isGenreValid = GenreValidation();
    // const isPriceValid = PriceValidation();
    // const isQuantityValid = QuantityValidation();
    // const isUserIdValid = true;

// Title
    // if(title == ''){
    //     return false
    // }

// Genre
    if(genre == ''){
        return false
    }

// Price
    if (price === '') {
        return false;
    } else if (isNaN(price)) {
        return false;
    }

// Quantity
    if (quantity === '') {
        return false;
    } else if (isNaN(quantity)) {
        return false;
    }

    //Loan and user validation
    if (loanStatus === '1' && userId === '') {
        return false;
    }
    if(loanStatus != '1' && userId != ''){
        return false;
    }


    return true;

}






//Loaned books


async function getLoanedBooks() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/books/loaned');
        const booksList = document.getElementById('loaned-books-list');
        booksList.innerHTML = ''; // Clear existing list

        response.data.books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <label for="loan-genre-${book.id}">Genre</label>
                <input type="text" id="loan-genre-${book.id}" value="${book.genre}">
                <label for="loan-price-${book.id}">Price</label>
                <input type="text" id="loan-price-${book.id}" value="${book.price}">
                <label for="loan-quantity-${book.id}">Quantity</label>
                <input type="text" id="loan-quantity-${book.id}" value="${book.quantity}">
                <label for="loan-loan-status-${book.id}">Loan Status</label>
                <input type="text" id="loan-loan-status-${book.id}" value="${book.loan_status ? '1' : '0'}">
                <label for="loan-customer-loaning-${book.id}">Customer Loaning</label>
                <input type="text" id="loan-customer-loaning-${book.id}" value="${book.customer_id}">
                <div class="button-container">
                    <button class="update-btn" data-id="${book.id}">Update</button>
                    <button class="delete-btn" data-id="${book.id}">Delete</button>
                </div>
            `;

            // Add event listener to the delete button
            const deleteButton = bookCard.querySelector('.delete-btn');
            deleteButton.addEventListener('click', async () => {
                try {
                    await axios.delete(`http://127.0.0.1:5000/books/${book.id}`);
                    bookCard.remove(); // Remove the book card from the DOM
                    alert('Game deleted successfully');
                } catch (error) {
                    console.error('Error deleting game:', error);
                    alert('Failed to delete book');
                }
            });

            // Add event listener to the update button
            const updateButton = bookCard.querySelector('.update-btn');
            updateButton.addEventListener('click', async () => {
                try {
                    const genre = document.getElementById(`loan-genre-${book.id}`).value
                    const price = document.getElementById(`loan-price-${book.id}`).value
                    const quantity = document.getElementById(`loan-quantity-${book.id}`).value
                    const loan_status = document.getElementById(`loan-loan-status-${book.id}`).value === '1' 
                    const customer_id = document.getElementById(`loan-customer-loaning-${book.id}`).value
                    if(!ValidateFormElements(genre, price, quantity, loan_status, customer_id)){
                        alert("One of the fields is invalid. Check guide for details")
                    }else{
                        const updatedData = {
                            genre: document.getElementById(`loan-genre-${book.id}`).value,
                            price: document.getElementById(`loan-price-${book.id}`).value,
                            quantity: document.getElementById(`loan-quantity-${book.id}`).value,
                            loan_status: document.getElementById(`loan-loan-status-${book.id}`).value === '1', 
                            customer_id: document.getElementById(`loan-customer-loaning-${book.id}`).value,
                        };
    
                        await axios.put(`http://127.0.0.1:5000/updbooks/${book.id}`, updatedData);
                        alert('Book updated successfully');
                    }
                    
                } catch (error) {
                    console.error('Error updating book:', error);
                    alert('Failed to update book');
                }
            });

            booksList.appendChild(bookCard);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to load books');
    }
}









// Load all books when page loads
document.addEventListener('DOMContentLoaded', getBooks);
document.addEventListener('DOMContentLoaded', getLoanedBooks);