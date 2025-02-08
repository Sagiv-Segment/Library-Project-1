async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
      alert("Please enter both username and password.");
      return;
  }

  try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
          username: username,
          password: password
      }, { withCredentials: true });

      if (response.data.success) {
          alert("Login successful!");
          window.location.href = "http://127.0.0.1:5500/frontend/index.html"; // Redirect
      } else {
          alert("Invalid credentials.");
      }
  } catch (error) {
      alert("Error logging in. Please try again.");
      console.error("Login error:", error.response?.data || error.message);
  }
}

function register(){
    window.location.href = "register.html"
}