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
    display.textContent = ""; // Clear any previous error message
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

// Load all books when page loads
document.addEventListener('DOMContentLoaded', getBooks);