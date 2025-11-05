document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const navMenu = document.querySelector(".nav");

    menuIcon.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
  const searchContainer = document.querySelector(".search-container");
  const searchBox = document.getElementById("search-box");

  searchContainer.addEventListener("click", () => {
    searchBox.style.width = "180px";
    searchBox.style.opacity = "1";
  });

  searchContainer.addEventListener("mouseleave", () => {
    searchBox.style.width = "0";
    searchBox.style.opacity = "0";
  });
});

    

window.addEventListener("scroll", function(){
const header=document.querySelector("header");
header.classlist.toggle("sticky",window.scrollY>0);
});


document.addEventListener("DOMContentLoaded", function() {
const cartCount = document.getElementById("cart-count");

  // Update the count when the page loads
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
  }

  updateCartCount();


  // ADD TO CART
  const cartButtons = document.querySelectorAll(".add-cart");
  cartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".whole-separate");
      const name = item.querySelector("h3").textContent;
      const price = item.querySelector(".price").textContent;
      const image = item.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const exists = cart.some(product => product.name === name);
      if (!exists) {
        cart.push({ name, price, image,quality:1 }); //Quality=1
        localStorage.setItem("cart", JSON.stringify(cart));


        // Update count instantly
        updateCartCount();

        button.textContent = "Added ✔";
        button.style.backgroundColor = "#4CAF50";
        setTimeout(() => {
          button.textContent = "Add Cart";
          button.style.backgroundColor = "";
        }, 1500);
      } else {
        alert(`${name} is already in your cart.`);
      }
    });
  });

  // WISHLIST
  const wishlistButtons = document.querySelectorAll(".wishlist");
  wishlistButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".whole-separate");
      const name = item.querySelector("h3").textContent;
      const price = item.querySelector(".price").textContent;
      const image = item.querySelector("img").src;

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const exists = wishlist.some(product => product.name === name);
      if (!exists) {
        wishlist.push({ name, price, image });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        button.querySelector("i").classList.replace("fa-regular", "fa-solid");
        button.querySelector("i").style.color = "red";
        alert(`${name} added to wishlist ❤️`);
      } else {
        alert(`${name} is already in wishlist ❤️`);
      }
    });
  });

  

  // MAIN_PURCHASE BUTTON
  const purchaseBtn = document.querySelector(".purchase-btn");
  if (purchaseBtn) {
    purchaseBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }
});







