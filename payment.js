document.addEventListener("DOMContentLoaded", function() {
  const gpayBtn = document.getElementById("gpay");
  const codBtn = document.getElementById("cod");

  // Google Pay option
  gpayBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    alert("Redirecting to Google Pay...");
    window.location.href = "https://pay.google.com/";
  });

  // Cash on Delivery option
  codBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    alert("Order placed successfully! You can pay upon delivery.");
    window.location.href = "thankyou.html"; // redirect to thank you page
  });
});


// Redirect to sign-in if not logged in
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if(localStorage.getItem("isLoggedIn") !== "true") {
    alert("You must be signed in to access the payment page.");
    window.location.href = "sign-up.html";
  }
  
  });



