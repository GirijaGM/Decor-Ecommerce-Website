
  document.addEventListener("DOMContentLoaded", function() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const purchaseBtn = document.getElementById("purchase-btn");

    // Stop running if cart container not present
if (!cartContainer || !totalElement || !purchaseBtn) return;

  // Load cart and fix missing quantity
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach(item => {
    if (!item.quantity || item.quantity < 1) {
      item.quantity = 1; // Fix undefined quantity
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart)); 

// display cart
  function displayCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p>Your cart is empty</p>`;
      totalElement.textContent = "0";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const priceNumber = parseFloat(item.price.replace(/[₹,]/g, "").trim());
      const subtotal = priceNumber * item.quantity;
      total += subtotal;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
        <h4>${item.name}</h4>
        <span class="price"> ${item.price}</span>
        
        <div class="quantity-controls">
        <button class="qty-btn minus" data-index="${index}">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="qty-btn plus" data-index="${index}">+</button>
          </div>
        <p class="subtotal">Subtotal: ₹${subtotal.toFixed(2)}</p>        
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
    });

    totalElement.textContent = total.toFixed(2);
    addEventListeners();
  }

  //+ and _ Quantity & Remove Events
  function addEventListeners() {
    const plusBtns = document.querySelectorAll(".plus");
    const minusBtns = document.querySelectorAll(".minus");
    const removeBtns = document.querySelectorAll(".remove-btn");

    plusBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        cart[index].quantity++;
        updateCart();
      });
    });

    minusBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1); // remove item if qty = 0
        }
        updateCart();
      });
    });

    removeBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
      });
    });
  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
  }


  // Update Cart Count (badge in header)
  function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector(".fa-cart-shopping");
    if (cartIcon) {
      let badge = cartIcon.nextElementSibling;
      if (!badge || !badge.classList.contains("cart-count")) {
        badge = document.createElement("span");
        badge.classList.add("cart-count");
        badge.style.position = "absolute";
        badge.style.top = "10px";
        badge.style.right = "10px";
        badge.style.background = "red";
        badge.style.color = "white";
        badge.style.borderRadius = "50%";
        badge.style.padding = "2px 6px";
        badge.style.fontSize = "12px";
        cartIcon.parentElement.style.position = "relative";
        cartIcon.after(badge);
      }
      badge.textContent = totalCount;
    }
  }
  // Important: call these on page load
  displayCart();
  updateCartCount();


  // Purchase Button
    if (purchaseBtn) {
  purchaseBtn.addEventListener("click", () => {
  const isSignedIn = localStorage.getItem("isSignedIn");

  if (isSignedIn === "true") {
    // User is signed in → redirect to payment page
    window.location.href = "payment.html";
  } else {
    alert("You must sign in to make a purchase!");
    // User not signed in → redirect to sign-up page
    window.location.href = "sign-up.html?redirect=payment.html";
  }
});
}
});

