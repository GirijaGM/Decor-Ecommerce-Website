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
  document.querySelectorAll(".fa-eye").forEach(icon => {
    icon.addEventListener("click", () => {
      const input = icon.previousElementSibling;
      if (input && input.type === "password") {
        input.type = "text";
        icon.classList.add("fa-eye-slash");
      } else if (input) {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
      }
    });
  });

  // SIGN UP
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = signUpForm.querySelector("input[type=text]").value.trim();
    const email = signUpForm.querySelector("input[type=email]").value.trim();
    const passwords = signUpForm.querySelectorAll("input[type=password]");
    const password = passwords[0].value;
    const confirmPassword = passwords[1].value;

    // Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const exists = users.some(user => user.email === email);
    if (exists) {
      alert("User already exists! Please sign in.");
      signInBtn.click();
      return;
    }

    // Save new user
    users.push({ fullName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign Up Successful! Please Sign In.");
    signInBtn.click(); // Switch to sign in form
  });

/// SIGN IN
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signInForm.querySelector("input[type=email]").value.trim();
    const password = signInForm.querySelector("input[type=password]").value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Save login session
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Check if they came from a purchase flow
  const redirectFrom = localStorage.getItem("redirectAfterLogin");
  localStorage.removeItem("redirectAfterLogin");

      if (redirectFrom === "cart.html") {
    // If they came from Purchase → go directly to payment
    window.location.href = "payment.html";
  } else {
    // Otherwise return to previous page or homepage
    const redirectUrl =
      new URLSearchParams(window.location.search).get("redirect") ||
      "index.html";
    window.location.href = redirectUrl;
  }
}
  });
});
