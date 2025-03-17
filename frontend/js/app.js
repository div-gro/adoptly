document.addEventListener("DOMContentLoaded", function () {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // Update Navbar visibility
    if (userLoggedIn) {
        document.getElementById("adopt-link").style.display = "block";
        document.getElementById("rehome-link").style.display = "block";
        document.querySelector(".login-btn").style.display = "none";
        document.querySelector(".logout-btn").style.display = "inline-block";
    } else {
        document.getElementById("adopt-link").style.display = "none";
        document.getElementById("rehome-link").style.display = "none";
        document.querySelector(".login-btn").style.display = "inline-block";
        document.querySelector(".logout-btn").style.display = "none";
    }

    // Logout functionality
    document.querySelector(".logout-btn").addEventListener("click", function () {
        localStorage.removeItem("userLoggedIn");
        window.location.reload();
    });
});

// Toggle between login and register forms
function toggleAuth() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    document.getElementById("authModalLabel").textContent = loginForm.style.display === "none" ? "Login" : "Sign Up";
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
}

// Register user and save to localStorage
function registerUser() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (localStorage.getItem(email)) {
        alert("User already exists!");
        toggleAuth();
        return;
    }

    localStorage.setItem(email, JSON.stringify({ email, password }));
    alert("Registration successful!");
    toggleAuth();
}

// Login user by checking localStorage
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        localStorage.setItem("userLoggedIn", email);
        alert("Login successful!");
        window.location.reload();
    } else {
        alert("Invalid email or password.");
    }
}
