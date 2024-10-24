document.addEventListener("DOMContentLoaded", () => {

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  const products = [
    {id: 1, name: "Product 1", price: 20.99},
    {id: 2, name: "Product 2", price: 25.99},
    {id: 3, name: "Product 3", price: 30.00},
    {id: 4, name: "Product 4", price: 60.00},
  ];

  let cart = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    const productDiv = document.createElement("div");

    productDiv.classList.add("product");
    productDiv.innerHTML = `${product.name} - $${product.price.toFixed(2)}
    <button data-id="${product.id}">Add to cart</button>
    `;

    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((product) => product.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    console.log(cart);
    renderCart();
    saveProducts();
  }

  function renderCart() {
    let totalPrice = 0;
    cartItems.innerHTML = "";

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price; 
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart")

        cartDiv.innerHTML = `${item.name} - $${item.price.toFixed(2)}
          <button class="remove-btn" data-id="${item.id}">Remove Product</button>
        `;
        cartItems.appendChild(cartDiv);

        totalPriceDisplay.innerHTML = `$${totalPrice.toFixed(2)}`
      })
    } else {
      totalPriceDisplay.innerHTML = `$0.00`;
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      cartItems.innerHTML = `Your cart is empty.`;
    }
  }  

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    renderCart();
    alert("checkout successfully");
  })

  function saveProducts() {
    localStorage.setItem("products", JSON.stringify(cart));
  }


  cartItems.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON"){
      const id = parseInt(e.target.getAttribute("data-id"));
      
      cart = cart.filter(product => product.id !== id);
      saveProducts();
      renderCart()
    }
  })
  renderCart();

})
