function validateRegister(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const displayUser = document.getElementById("username-requirement");
    const displayPass = document.getElementById("password-requirement");
    flag = true

        if (username.length <= 2) {
            displayUser.textContent = "Must be longer than 2 characters"
            flag = false;
        }

        if (password.length <= 2) {
            displayPass.textContent = "Must be longer than 2 characters"
            flag = false;
        }
        return flag;
}

async function checkUserExists(username) {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/admin/${username}`);
        console.log('Response:', response);  // Log the response
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false;
        }
        console.error('Error checking user:', error);
        return false;
    }
}




async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const displayUser = document.getElementById("username-requirement");
    // alert(await checkUserExists(username))
  
    if (!validateRegister()) {
        return;
    }
    else if(await checkUserExists(username)){
        displayUser.textContent = "Admin already exists"
        return
    }

    try {
        const response = await axios.post("http://127.0.0.1:5000/register", {
            username: username,
            password: password
        });
        console.log("Response Data:", response.data);  // Debugging line
        if (response.data.success) {
            window.location.href = "index.html"; // Redirect
        } else {
            alert("Registration failed: " + response.data.message);
        }
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        alert("Error during registration. Please try again.");
    }
}