// Store users in localStorage
document.addEventListener("DOMContentLoaded", () => {
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");

// Store or retrieve users
let users = JSON.parse(localStorage.getItem("users")) || [];

// Toggle form
    signInBtn.addEventListener("click", () => {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
    signInBtn.classList.add("active");
    signUpBtn.classList.remove("active");
});

signUpBtn.addEventListener("click", () => {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
    signUpBtn.classList.add("active");
    signInBtn.classList.remove("active");
});

/// Password visibility toggle
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  
  if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye-slash");
  });
}

  // SIGN UP
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = signUpForm.querySelector("input[type=text]").value.trim();
    const email = signUpForm.querySelector("input[type=email]").value.trim();
    const password = signUpForm.querySelectorAll("input[type=password]")[0].value;
    const confirmPassword = signUpForm.querySelectorAll("input[type=password]")[1].value;

    if(password !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    const exists = users.some(user => user.email === email);
    if(exists){
      alert("User already exists!Please sign in.");
      signInBtn.click();
      return;
    }
    // Save new user
  users.push({ fullName, email, password });
  localStorage.setItem("users", JSON.stringify(users));
    users.push({fullName, email, password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign Up Successful! Please Sign In.");
    signInBtn.click(); // switch to sign in
  });

/// SIGN IN
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signInForm.querySelector("input[type=email]").value.trim();
    const password = signInForm.querySelector("input[type=password]").value;

    // Check credentials
    const user = users.find(u => u.email === email && u.password === password);

    if(user){
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect to cart page if coming from there
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get("redirect") || "cart.html";
      window.location.href = redirectUrl;
    } else {
      alert("Invalid credentials!");
    }
  });
});
