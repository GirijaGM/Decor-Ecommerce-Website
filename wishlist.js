document.addEventListener("DOMContentLoaded", () => {
  const wishlistContainer = document.getElementById("wishlist-items");
  const emptyMsg = document.getElementById("empty-msg");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  function displayWishlist() {
    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {
      emptyMsg.style.display = "block";
      return;
    } else {
      emptyMsg.style.display = "none";
    }

    wishlist.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("wishlist-item");
      div.dataset.index = index;

      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="details">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
          <div class="buttons">
            <button class="add-to-cart" data-index="${index}">Move to Cart</button>
            <button class="remove" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
      wishlistContainer.appendChild(div);
    });

    //Remove from wishlist
    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        displayWishlist();
      });
    });

    //Move to Cart
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        const product = wishlist[index];
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!cart.some(item => item.name === product.name)) {
          cart.push({ ...product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));

          // Remove from wishlist
          wishlist.splice(index, 1);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          displayWishlist();

          alert("Moved to Cart!");
          setTimeout(() => {
            window.location.href = "cart.html";
          }, 300);
        } else {
          alert("Product already in cart!");
        }
      });
    });
  }

  displayWishlist();
});