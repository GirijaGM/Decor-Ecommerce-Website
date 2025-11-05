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

// FIXED: Redirect to sign-in if not logged in
document.addEventListener("DOMContentLoaded", () => {
  const isSignedIn = localStorage.getItem("isSignedIn"); 
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // optional but useful

  if (isSignedIn !== "true" || !currentUser) {
    alert("You must be signed in to access the payment page.");
    window.location.href = "sign-up.html?redirect=payment.html";
    return;
  }
});


