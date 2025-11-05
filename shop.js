document.addEventListener("DOMContentLoaded", () => {
  const wishButtons = document.querySelectorAll(".wish-btn");
  const cartButtons = document.querySelectorAll(".add-cart"); // add-to-cart buttons

  wishButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".container"); // product container
      const name = product.querySelector(".rows h3").textContent;
      const price = product.querySelector(".rows p").textContent;
      const image = product.querySelector(".cols-img").src;

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      // Check if already in wishlist
      const existingIndex = wishlist.findIndex(item => item.name === name);
      if (existingIndex !== -1) {
        // Update price + image if it already exists
        wishlist[existingIndex].price = price;
        wishlist[existingIndex].image = image;
      } else {
        // Otherwise add new product
        wishlist.push({ name, price, image });
      }

      // Save updated wishlist
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // Redirect to wishlist page
      window.location.href = "wishlist.html"; // replace with your actual wishlist page
    });
  });

  // --- Add to Cart Button Logic ---
  cartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".container");
      const name = product.querySelector(".rows h3").textContent;
      const price = product.querySelector(".rows p").textContent;
      const image = product.querySelector(".cols-img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingIndex = cart.findIndex(item => item.name === name);
      if (existingIndex !== -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "cart.html";
    });
  });
});


