/* ================================
   MEMORYCRAFTS - SIMPLE JAVASCRIPT
================================ */
/* ================================
   1. IMAGE PATH HELPER
================================ */

function getImagePath(filename) {
    // If the filename already has a slash (like "../Images/..."), it's old data.
    // Just return it as it is, so it doesn't break!
    if (filename.indexOf("/") !== -1) {
        return filename;
    }

    // If we are inside the "pages" folder, we need to go up one level
    if (window.location.pathname.indexOf("/pages/") !== -1) {
        return "../Images/products/" + filename;
    }

    // Otherwise, we are on the home page (index.html) in the main folder
    return "Images/products/" + filename;
}

/* ================================
   2. MOBILE SEARCH TOGGLE
================================ */

var mobileSearch = document.querySelector(".mobile-search");
var mobileSearchBtn = document.querySelector(".mobile-search-btn");

if (mobileSearch && mobileSearchBtn) {
    mobileSearchBtn.addEventListener("click", function () {
        mobileSearch.classList.toggle("active");

        if (mobileSearch.classList.contains("active")) {
            var searchInput = mobileSearch.querySelector("input");
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}


/* ================================
   3. PRODUCT DATA (Just filenames now!)
================================ */

var products = [
    { id: "memory-box", name: "Memory Box", category: "gift-hampers", price: 1499, image: "Memory Box.jpg", description: "A beautiful personalized memory box." },
    { id: "personalized-frame", name: "Personalized Frame", category: "photo-frame", price: 799, image: "Personalized Frame.jpg", description: "A beautiful personalized frame for special memories." },
    { id: "photo-album", name: "Photo Album", category: "photo-frame", price: 999, image: "Photo Album.jpg", description: "Keep your favorite memories together." },
    { id: "photo-frame", name: "Photo Frame", category: "photo-frame", price: 699, image: "Photo Frame.jpg", description: "Turn your favorite photo into a beautiful gift." },
    { id: "personalized-mug", name: "Personalized Mug", category: "mug", price: 499, image: "Personalized Mug.jpg", description: "Make every morning special with a personalized mug." },
    { id: "gift-hamper", name: "Gift Hamper", category: "gift-hampers", price: 1299, image: "Gift Hamper.jpg", description: "A thoughtful collection of gifts for your loved ones." },
    { id: "resin-art", name: "Resin Art", category: "resin-art", price: 1199, image: "Resin Art.jpg", description: "Beautiful handmade resin art for your special moments." },
    { id: "canvas-frame", name: "Canvas Frame", category: "canvas-frame", price: 1099, image: "Canvas Frame.jpg", description: "Turn your favorite memories into beautiful canvas art." }
];


/* ================================
   4. CATEGORY PAGE (category-products.html)
================================ */

var categoryTitle = document.querySelector("#category-title");
var categoryProductsContainer = document.querySelector("#category-products");

if (categoryTitle && categoryProductsContainer) {
    var urlParams = new URLSearchParams(window.location.search);
    var currentCategory = urlParams.get("category");
    var searchQuery = urlParams.get("search");
    var htmlContent = "";
    var foundCount = 0;

    // Search Products
    if (searchQuery) {
        searchQuery = searchQuery.toLowerCase();
        categoryTitle.textContent = 'Search Results for "' + searchQuery + '"';

        for (var i = 0; i < products.length; i++) {
            var productName = products[i].name.toLowerCase();
            var productDescription = products[i].description.toLowerCase();

            if (productName.includes(searchQuery) || productDescription.includes(searchQuery)) {
                foundCount++;
                htmlContent += `
        <div class="col-6 col-md-4 col-lg-3">
          <div class="card product-card h-100 rounded-3 shadow-sm position-relative">
            <a href="product-details.html?id=${products[i].id}" class="product-image-link">
              <img src="${getImagePath(products[i].image)}" class="card-img-top product-image" alt="${products[i].name}">
            </a>
            <button class="btn btn-light wishlist-btn wishlist-btn-home" type="button" data-id="${products[i].id}">
              <i class="bi bi-heart"></i>
            </button>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title h6 mb-1">
                <a href="product-details.html?id=${products[i].id}" class="text-decoration-none">${products[i].name}</a>
              </h2>
              <p class="card-text text-muted">${products[i].description}</p>
              <div class="product-price mb-2">₹${products[i].price}</div>
              <button class="btn btn-primary btn-sm w-100 mt-auto add-to-cart-home" type="button" data-id="${products[i].id}">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
            }
        }
    }

    // Category Products
    else {
        if (currentCategory) {
            var niceTitle = currentCategory.replace("-", " ");
            categoryTitle.textContent = niceTitle.charAt(0).toUpperCase() + niceTitle.slice(1);
        } else {
            categoryTitle.textContent = "All Products";
        }

        for (var j = 0; j < products.length; j++) {
            if (!currentCategory || products[j].category === currentCategory) {
                foundCount++;
                htmlContent += `
        <div class="col-6 col-md-4 col-lg-3">
          <div class="card product-card h-100 rounded-3 shadow-sm position-relative">
            <a href="product-details.html?id=${products[j].id}" class="product-image-link">
              <img src="${getImagePath(products[j].image)}" class="card-img-top product-image" alt="${products[j].name}">
            </a>
            <button class="btn btn-light wishlist-btn wishlist-btn-home" type="button" data-id="${products[j].id}">
              <i class="bi bi-heart"></i>
            </button>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title h6 mb-1">
                <a href="product-details.html?id=${products[j].id}" class="text-decoration-none">${products[j].name}</a>
              </h2>
              <p class="card-text text-muted">${products[j].description}</p>
              <div class="product-price mb-2">₹${products[j].price}</div>
              <button class="btn btn-primary btn-sm w-100 mt-auto add-to-cart-home" type="button" data-id="${products[j].id}">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
            }
        }
    }

    // Display Results
    if (foundCount > 0) {
        categoryProductsContainer.innerHTML = htmlContent;
    } else {
        categoryProductsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <h2 class="h5">No products found.</h2>
        <p class="text-muted">Try searching for another product.</p>
      </div>
    `;
    }
}



/* ================================
   5. PRODUCT DETAILS PAGE (product-details.html)
================================ */

var productDetailsContainer = document.querySelector("#product-details");

if (productDetailsContainer) {

    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get("id");
    var currentProduct = null;

    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            currentProduct = products[i];
            break;
        }
    }

    if (currentProduct) {

        // Notice we use getImagePath() here
        var productHtml = `
      <div class="row g-4 align-items-center">
        <div class="col-12 col-md-6 text-center">
          <img src="${getImagePath(currentProduct.image)}" class="img-fluid rounded-4" alt="${currentProduct.name}">
        </div>
        <div class="col-12 col-md-6">
          <h1 class="fw-bold mb-3">${currentProduct.name}</h1>
          <p class="text-muted mb-3">${currentProduct.description}</p>
          <div class="product-price fs-4 mb-4">₹${currentProduct.price}</div>
          <div id="product-total" class="fw-semibold mb-4">Total: ₹${currentProduct.price}</div>
          
          <div class="mb-4">
            <label for="product-quantity" class="form-label fw-semibold">Quantity</label>
            <div class="input-group" style="max-width: 150px;">
              <button class="btn btn-outline-primary" type="button" id="quantity-minus">-</button>
              <input type="number" id="product-quantity" class="form-control text-center" value="1" min="1" readonly>
              <button class="btn btn-outline-primary" type="button" id="quantity-plus">+</button>
            </div>
          </div>

          <!-- FIXED: Added a unique class to target this specific button -->
          <button class="btn btn-outline-primary me-2 detail-wishlist-btn" type="button">
            <i class="bi bi-heart"></i> Wishlist
          </button>
          <button id="add-to-cart-btn" class="btn btn-primary" type="button">
            <i class="bi bi-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    `;

        productDetailsContainer.innerHTML = productHtml;

        // Quantity Logic
        var quantityInput = document.querySelector("#product-quantity");
        var quantityMinus = document.querySelector("#quantity-minus");
        var quantityPlus = document.querySelector("#quantity-plus");
        var productTotal = document.querySelector("#product-total");

        quantityMinus.addEventListener("click", function () {
            var currentQty = parseInt(quantityInput.value);
            if (currentQty > 1) {
                currentQty = currentQty - 1;
                quantityInput.value = currentQty;
                productTotal.textContent = "Total: ₹" + (currentProduct.price * currentQty);
            }
        });

        quantityPlus.addEventListener("click", function () {
            var currentQty = parseInt(quantityInput.value);
            currentQty = currentQty + 1;
            quantityInput.value = currentQty;
            productTotal.textContent = "Total: ₹" + (currentProduct.price * currentQty);
        });

        // Add to Cart Logic
        var addToCartBtn = document.querySelector("#add-to-cart-btn");

        addToCartBtn.addEventListener("click", function () {
            var quantity = parseInt(quantityInput.value);
            var cart = JSON.parse(localStorage.getItem("cart")) || [];
            var itemExists = false;

            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id === currentProduct.id) {
                    cart[i].quantity = cart[i].quantity + quantity;
                    itemExists = true;
                    break;
                }
            }

            if (itemExists === false) {
                // We save just the filename to localStorage
                cart.push({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    price: currentProduct.price,
                    image: currentProduct.image,
                    quantity: quantity
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Item added to cart!");
        });

        // FIXED: Wishlist Logic for Product Details Page
        var detailWishlistBtn = document.querySelector(".detail-wishlist-btn");

        if (detailWishlistBtn) {
            detailWishlistBtn.addEventListener("click", function () {
                var wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                var exists = false;

                for (var j = 0; j < wishlist.length; j++) {
                    if (wishlist[j] === currentProduct.id) {
                        exists = true;
                        break;
                    }
                }

                if (exists === false) {
                    wishlist.push(currentProduct.id);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    alert("Added to wishlist!");
                } else {
                    alert("Already in your wishlist!");
                }
            });
        }

    } else {
        productDetailsContainer.innerHTML = `<h2 class="text-center">Product not found.</h2>`;
    }
}


/* ================================
   6. CART PAGE (cart.html)
================================ */

var cartContainer = document.querySelector("#cart-container");

if (cartContainer) {

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-center text-muted">Your cart is empty.</p>`;
    } else {

        var cartHtml = "";
        var subtotal = 0;

        for (var i = 0; i < cart.length; i++) {
            var itemTotal = cart[i].price * cart[i].quantity;
            subtotal = subtotal + itemTotal;

            // Notice we use getImagePath() here too
            cartHtml += `
        <div class="card mb-3">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-4 col-md-2">
                <img src="${getImagePath(cart[i].image)}" class="img-fluid rounded">
              </div>
              <div class="col-8 col-md-4">
                <h5>${cart[i].name}</h5>
                <p>₹${cart[i].price}</p>
              </div>
              <div class="col-6 col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                  <button class="btn btn-outline-primary cart-minus" type="button" data-id="${cart[i].id}">-</button>
                  <input type="text" class="form-control text-center" value="${cart[i].quantity}" readonly>
                  <button class="btn btn-outline-primary cart-plus" type="button" data-id="${cart[i].id}">+</button>
                </div>
              </div>
              <div class="col-6 col-md-3 text-end mt-3 mt-md-0">
                <button class="btn btn-outline-danger cart-remove" type="button" data-id="${cart[i].id}">Remove</button>
              </div>
            </div>
          </div>
        </div>
      `;
        }

        cartContainer.innerHTML = cartHtml;

        var delivery = 0;
        if (subtotal < 300) {
            delivery = 99;
        }
        var total = subtotal + delivery;

        document.querySelector("#cart-subtotal").textContent = "₹" + subtotal;
        document.querySelector("#cart-delivery").textContent = delivery === 0 ? "FREE" : "₹" + delivery;
        document.querySelector("#cart-total").textContent = "₹" + total;

        // Cart Buttons (Plus, Minus, Remove)
        cartContainer.addEventListener("click", function (event) {
            var button = event.target;
            var productId = button.getAttribute("data-id");

            if (!productId) return;

            var cartData = JSON.parse(localStorage.getItem("cart")) || [];

            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].id === productId) {

                    if (button.classList.contains("cart-plus")) {
                        cartData[i].quantity = cartData[i].quantity + 1;
                    }
                    else if (button.classList.contains("cart-minus")) {
                        if (cartData[i].quantity > 1) {
                            cartData[i].quantity = cartData[i].quantity - 1;
                        }
                    }
                    else if (button.classList.contains("cart-remove")) {
                        cartData.splice(i, 1);
                    }
                    break;
                }
            }

            localStorage.setItem("cart", JSON.stringify(cartData));
            window.location.reload();
        });
    }
}


/* ================================
   7. CHECKOUT PAGE (checkout.html)
================================ */

var checkoutItems = document.querySelector("#checkout-items");

if (checkoutItems) {

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        checkoutItems.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
    } else {

        var summaryHtml = "";
        var subtotal = 0;

        for (var i = 0; i < cart.length; i++) {
            var itemTotal = cart[i].price * cart[i].quantity;
            subtotal = subtotal + itemTotal;

            summaryHtml += `
        <div class="d-flex justify-content-between mb-2">
          <span>${cart[i].name} (x${cart[i].quantity})</span>
          <span>₹${itemTotal}</span>
        </div>
      `;
        }

        checkoutItems.innerHTML = summaryHtml;

        var delivery = 0;
        if (subtotal < 300) {
            delivery = 99;
        }
        var total = subtotal + delivery;

        document.querySelector("#checkout-subtotal").textContent = "₹" + subtotal;
        document.querySelector("#checkout-delivery").textContent = delivery === 0 ? "FREE" : "₹" + delivery;
        document.querySelector("#checkout-total").textContent = "₹" + total;

        var shippingCharge = document.querySelector("#shipping-charge");
        if (shippingCharge) {
            if (delivery === 0) {
                shippingCharge.textContent = "FREE delivery";
            } else {
                shippingCharge.textContent = "₹" + delivery + " delivery charges";
            }
        }
    }

    var sameAsDelivery = document.querySelector("#same-as-delivery");

    if (sameAsDelivery) {
        sameAsDelivery.addEventListener("change", function () {

            var deliveryAddress = document.querySelector("#customer-address").value;
            var deliveryCity = document.querySelector("#customer-city").value;
            var deliveryState = document.querySelector("#customer-state").value;
            var deliveryPincode = document.querySelector("#customer-pincode").value;

            var billingAddress = document.querySelector("#billing-address");
            var billingCity = document.querySelector("#billing-city");
            var billingState = document.querySelector("#billing-state");
            var billingPincode = document.querySelector("#billing-pincode");

            if (sameAsDelivery.checked) {
                billingAddress.value = deliveryAddress;
                billingCity.value = deliveryCity;
                billingState.value = deliveryState;
                billingPincode.value = deliveryPincode;

                billingAddress.readOnly = true;
                billingCity.readOnly = true;
                billingState.readOnly = true;
                billingPincode.readOnly = true;
            } else {
                billingAddress.value = "";
                billingCity.value = "";
                billingState.value = "";
                billingPincode.value = "";

                billingAddress.readOnly = false;
                billingCity.readOnly = false;
                billingState.readOnly = false;
                billingPincode.readOnly = false;
            }
        });
    }

    var placeOrderBtn = document.querySelector("#place-order-btn");

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", function () {

            var name = document.querySelector("#customer-name").value;
            var email = document.querySelector("#customer-email").value;
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var phone = document.querySelector("#customer-phone").value;
            var address = document.querySelector("#customer-address").value;
            var city = document.querySelector("#customer-city").value;
            var state = document.querySelector("#customer-state").value;
            var pincode = document.querySelector("#customer-pincode").value;


            if (name === "" || email === "" || phone === "" || address === "" || city === "" || state === "" || pincode === "") {
                alert("Please fill in all customer and delivery details.");
                return;
            }

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (phone.length !== 10) {
                alert("Please enter a valid 10-digit phone number.");
                return;
            }

            if (pincode.length !== 6) {
                alert("Please enter a valid 6-digit pincode.");
                return;
            }

            // Save the order 
            var orders = JSON.parse(localStorage.getItem("orders")) || [];

            var order = {
                id: "MC" + Date.now(),
                date: new Date().toLocaleDateString("en-IN"),
                status: "Processing",
                items: cart,
                subtotal: subtotal,
                delivery: delivery,
                total: total
            };

            orders.push(order);

            localStorage.setItem("orders", JSON.stringify(orders));

            alert("Order placed successfully!");

            localStorage.removeItem("cart");

            window.location.href = "orders.html";
        });
    }
}


/* ================================
   8. ADD TO CART BUTTONS
================================ */

document.addEventListener("click", function (event) {

    var button = event.target.closest(".add-to-cart-home");

    if (!button) {
        return;
    }

    var productId = button.getAttribute("data-id");

    var currentProduct = null;

    for (var i = 0; i < products.length; i++) {

        if (products[i].id === productId) {

            currentProduct = products[i];
            break;
        }
    }

    if (!currentProduct) {
        return;
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var itemExists = false;

    for (var j = 0; j < cart.length; j++) {

        if (cart[j].id === currentProduct.id) {

            cart[j].quantity = cart[j].quantity + 1;
            itemExists = true;
            break;
        }
    }

    if (!itemExists) {

        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(currentProduct.name + " added to cart!");
});


/* ================================
   9. HOME PAGE - WISHLIST BUTTONS
================================ */

var homeWishlistButtons = document.querySelectorAll(".wishlist-btn-home");

if (homeWishlistButtons.length > 0) {
    for (var i = 0; i < homeWishlistButtons.length; i++) {

        homeWishlistButtons[i].addEventListener("click", function () {

            var productId = this.getAttribute("data-id");
            var wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            var exists = false;

            for (var j = 0; j < wishlist.length; j++) {
                if (wishlist[j] === productId) {
                    exists = true;
                    break;
                }
            }

            if (exists === false) {
                wishlist.push(productId);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                alert("Added to wishlist!");
            } else {
                alert("Already in your wishlist!");
            }
        });
    }
}

/* ================================
   10. WISHLIST PAGE (wishlist.html)
================================ */

var wishlistContainer = document.querySelector("#wishlist-container");

if (wishlistContainer) {
    var wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {
        // Show empty state
        wishlistContainer.innerHTML = `
            <div class="col-12">
                <div class="text-center p-5 bg-light rounded-4 border">
                    <i class="bi bi-heart text-muted" style="font-size: 3rem;"></i>
                    <h2 class="h5 fw-semibold mt-3">Your wishlist is empty</h2>
                    <p class="text-muted mb-4">Save items you love and they will appear here.</p>
                    <a href="categories.html" class="btn btn-primary">Start Shopping</a>
                </div>
            </div>
        `;
    } else {
        // Loop through wishlist and create product cards
        var wishlistHtml = "";

        for (var i = 0; i < wishlist.length; i++) {
            var wishlistId = wishlist[i];
            var currentProduct = null;

            // Find product details from our products data
            for (var j = 0; j < products.length; j++) {
                if (products[j].id === wishlistId) {
                    currentProduct = products[j];
                    break;
                }
            }

            if (currentProduct) {
                wishlistHtml += `
                    <div class="col-6 col-md-4 col-lg-3">
                        <div class="card product-card h-100 rounded-3 shadow-sm position-relative">
                            <a href="product-details.html?id=${currentProduct.id}" class="product-image-link">
                                <img src="${getImagePath(currentProduct.image)}" class="card-img-top product-image" alt="${currentProduct.name}">
                            </a>
                            <!-- Filled heart to remove from wishlist -->
                            <button class="btn btn-light wishlist-btn remove-wishlist-btn" type="button" data-id="${currentProduct.id}" aria-label="Remove from wishlist">
                                <i class="bi bi-heart-fill text-danger"></i>
                            </button>
                            <div class="card-body d-flex flex-column">
                                <h2 class="card-title h6 mb-1">
                                    <a href="product-details.html?id=${currentProduct.id}" class="text-decoration-none">${currentProduct.name}</a>
                                </h2>
                                <div class="product-price mb-2">₹${currentProduct.price}</div>
                                <button class="btn btn-primary btn-sm w-100 mt-auto add-to-cart-home" type="button" data-id="${currentProduct.id}">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        wishlistContainer.innerHTML = wishlistHtml;

        // Logic to Remove item from Wishlist when heart is clicked
        wishlistContainer.addEventListener("click", function (event) {
            var button = event.target.closest(".remove-wishlist-btn");

            if (button) {
                var productId = button.getAttribute("data-id");
                var currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                var newWishlist = [];

                // Filter out the removed item
                for (var k = 0; k < currentWishlist.length; k++) {
                    if (currentWishlist[k] !== productId) {
                        newWishlist.push(currentWishlist[k]);
                    }
                }

                localStorage.setItem("wishlist", JSON.stringify(newWishlist));

                // Reload page to show updated list
                window.location.reload();
            }
        });
    }
}



/* ================================
   11. PRODUCT SEARCH
================================ */

var searchInputs = document.querySelectorAll('input[type="search"]');

if (searchInputs.length > 0) {
    for (var i = 0; i < searchInputs.length; i++) {
        searchInputs[i].addEventListener("keydown", function (event) {
            if (event.key !== "Enter") {
                return;
            }
            var searchText = this.value.trim().toLowerCase();
            if (searchText === "") {
                return;
            }
            // Check if we are inside the "pages" folder
            if (window.location.pathname.indexOf("/pages/") !== -1) {
                window.location.href = "category-products.html?search=" + encodeURIComponent(searchText);
            } else {
                window.location.href = "pages/category-products.html?search=" + encodeURIComponent(searchText);
            }
        });
    }
}


/* ================================
   12. SEARCH BUTTON CLICK
================================ */

var searchButtons = document.querySelectorAll(".search-button");

if (searchButtons.length > 0) {
    for (var i = 0; i < searchButtons.length; i++) {
        searchButtons[i].addEventListener("click", function () {
            var searchInput = this.parentElement.querySelector('input[type="search"]');
            if (!searchInput) {
                return;
            }
            var searchText = searchInput.value.trim().toLowerCase();
            if (searchText === "") {
                return;
            }
            if (window.location.pathname.indexOf("/pages/") !== -1) {
                window.location.href = "category-products.html?search=" + encodeURIComponent(searchText);
            } else {
                window.location.href = "pages/category-products.html?search=" + encodeURIComponent(searchText);
            }
        });
    }
}


/* ================================
   15. SIGNUP FORM VALIDATION
================================ */

var signupForm = document.querySelector("#signup-form");
var signupName = document.querySelector("#signup-name");
var signupEmail = document.querySelector("#signup-email");
var signupPhone = document.querySelector("#signup-phone");
var signupPassword = document.querySelector("#signup-password");
var signupConfirmPassword = document.querySelector("#signup-confirm-password");

if (signupName && signupEmail && signupPhone && signupPassword && signupConfirmPassword) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = signupName.value.trim();
        var email = signupEmail.value.trim();
        var phone = signupPhone.value.trim();
        var password = signupPassword.value;
        var confirmPassword = signupConfirmPassword.value;

        // Check empty fields
        if (name === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Check email
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check phone (must start with 6-9 and be 10 digits)
        var phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Check password
        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        // Check password match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        /* SAVE USER ACCOUNT */

        var user = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Account created successfully!");

        window.location.href = "login.html";
    });
}


/* ================================
   16. LOGIN AUTHENTICATION
================================ */

var loginForm = document.querySelector("#login-form");
var loginEmail = document.querySelector("#login-email");
var loginPassword = document.querySelector("#login-password");

if (loginForm && loginEmail && loginPassword) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        var email = loginEmail.value.trim();
        var password = loginPassword.value;

        var savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("No account found. Please sign up first.");
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {

            localStorage.setItem("isLoggedIn", "true");

            alert("Login successful!");

            var redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");

            if (redirectAfterLogin) {

                sessionStorage.removeItem("redirectAfterLogin");

                window.location.href = redirectAfterLogin;

            } else {

                window.location.href = "account.html";
            }

        } else {

            alert("Invalid email or password.");
        }
    });
}


/* ================================
   17. LOGOUT
================================ */

var logoutLinks = document.querySelectorAll(".logout-link");

if (logoutLinks.length > 0) {

    for (var i = 0; i < logoutLinks.length; i++) {

        logoutLinks[i].addEventListener("click", function () {

            localStorage.removeItem("isLoggedIn");

        });
    }
}


/* ================================
   18. PROTECT ACCOUNT PAGE
================================ */

var accountPage = document.querySelector("#account-page");

if (accountPage) {

    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        alert("Please login to access your account.");

        window.location.href = "login.html";
    }
}


/* ================================
   19. PROTECT ORDERS PAGE
================================ */

var ordersPage = document.querySelector("#orders-page");

if (ordersPage) {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        alert("Please login to access your orders.");
        window.location.href = "login.html";
    }
}

/* ================================
   20. PROTECT ADDRESSES PAGE
================================ */

var addressesPage = document.querySelector("#addresses-page");

if (addressesPage) {

    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        alert("Please login to manage your addresses.");

        window.location.href = "login.html";
    }
}

/* ================================
   21. PROTECT SETTINGS PAGE
================================ */

var settingsPage = document.querySelector("#settings-page");

if (settingsPage) {

    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        alert("Please login to access your settings.");

        window.location.href = "login.html";
    }
}

/* ================================
   22. PROTECT CHECKOUT PAGE
================================ */

var checkoutPage = document.querySelector("#checkout-page");

if (checkoutPage) {

    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        alert("Please login to proceed to checkout.");

        sessionStorage.setItem("redirectAfterLogin", "checkout.html");
        window.location.href = "login.html";
    }
}

/* ================================
   23. SHOW LOGGED-IN USER NAME
================================ */

var accountWelcome = document.querySelector("#account-welcome");

if (accountWelcome) {

    var savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {

        accountWelcome.textContent = "Welcome, " + savedUser.name.split(" ")[0] + " 👋";
    }
}


/* ================================
   24. ACCOUNT DROPDOWN STATE
================================ */

var accountDropdown = document.querySelector("#account-dropdown");

if (accountDropdown) {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    // Check if current page is inside the pages folder
    var isInsidePagesFolder = window.location.pathname.indexOf("/pages/") !== -1;

    // Set correct paths based on current location
    var loginPath, signupPath, accountPath, ordersPath, addressesPath, settingsPath, helpPath;

    if (isInsidePagesFolder) {
        loginPath = "login.html";
        signupPath = "signup.html";
        accountPath = "account.html";
        ordersPath = "orders.html";
        addressesPath = "addresses.html";
        settingsPath = "settings.html";
        helpPath = "help.html";
    } else {
        loginPath = "pages/login.html";
        signupPath = "pages/signup.html";
        accountPath = "pages/account.html";
        ordersPath = "pages/orders.html";
        addressesPath = "pages/addresses.html";
        settingsPath = "pages/settings.html";
        helpPath = "pages/help.html";
    }

    // Logged-in user
    if (isLoggedIn === "true") {
        accountDropdown.innerHTML = `
            <li><a class="dropdown-item" href="${accountPath}">My Account</a></li>
            <li><a class="dropdown-item" href="${ordersPath}">My Orders</a></li>
            <li><a class="dropdown-item" href="${addressesPath}">Addresses</a></li>
            <li><a class="dropdown-item" href="${settingsPath}">Settings</a></li>
            <li><a class="dropdown-item" href="${helpPath}">Help &amp; Support</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger logout-link" href="${loginPath}" onclick="localStorage.removeItem('isLoggedIn')">Logout</a></li>
        `;
    }

    // Logged-out user
    else {
        accountDropdown.innerHTML = `
            <li><a class="dropdown-item" href="${loginPath}">Login</a></li>
            <li><a class="dropdown-item" href="${signupPath}">Sign Up</a></li>
        `;
    }
}


/* ================================
   25. SHOW USER NAME IN ACCOUNT BUTTON
================================ */

var accountUserName = document.querySelector("#account-user-name");

if (accountUserName) {
    var savedUser = JSON.parse(localStorage.getItem("user"));
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true" && savedUser) {
        accountUserName.textContent = savedUser.name.split(" ")[0];
    } else {
        accountUserName.textContent = "Account";
    }
}


/* ================================
   26. DISPLAY SAVED ORDERS
================================ */

var ordersContainer = document.querySelector("#orders-container");

if (ordersContainer) {
    var orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="card border-0 shadow-sm">
                <div class="card-body text-center p-5">
                    <div class="mb-3">
                        <i class="bi bi-box-seam" style="font-size: 4rem; color: var(--primary-pink);"></i>
                    </div>
                    <h2 class="h4 fw-bold mb-2">No orders yet</h2>
                    <p class="text-muted mb-4">
                        You haven't placed any orders yet. Start shopping and your orders will appear here.
                    </p>
                    <a href="categories.html" class="btn btn-primary">
                        <i class="bi bi-shop me-2"></i>
                        Start Shopping
                    </a>
                </div>
            </div>
        `;
    } else {
        var ordersHtml = "";

        // Show newest order first
        for (var i = orders.length - 1; i >= 0; i--) {
            var order = orders[i];
            ordersHtml += `
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-body p-4">
                        <!-- Order Header -->
                        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                            <div>
                                <h2 class="h5 fw-bold mb-1">Order #${order.id}</h2>
                                <small class="text-muted">Date: ${order.date}</small>
                            </div>
                            <span class="badge ${order.status === "Cancelled" ? "bg-danger" :
                    order.status === "Delivered" ? "bg-success" :
                        order.status === "Shipped" ? "bg-info text-dark" :
                            "bg-warning text-dark"
                }">${order.status}</span>
                        </div>
                        <hr>
                        <!-- Order Items -->
                        <div class="mb-3">
                            <h3 class="h6 fw-semibold mb-3">Items</h3>
                            ${order.items.map(function (item) {
                    return `
                                    <div class="d-flex justify-content-between mb-2">
                                        <span>${item.name} × ${item.quantity}</span>
                                        <span class="fw-semibold">₹${item.price * item.quantity}</span>
                                    </div>
                                `;
                }).join("")}
                        </div>
                        <hr>
                        <!-- Order Summary -->
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Subtotal</span>
                            <span>₹${order.subtotal}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Delivery</span>
                            <span>${order.delivery === 0 ? "FREE" : "₹" + order.delivery}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="fw-bold">Total</span>
                            <span class="fw-bold" style="color: var(--primary-pink);">₹${order.total}</span>
                        </div>
                        <!-- Cancel Button (only for Processing) -->
                        ${order.status === "Processing" ? `
                            <div class="text-end mt-3">
                                <button type="button" class="btn btn-outline-danger btn-sm cancel-order-btn" data-order-id="${order.id}">
                                    Cancel Order
                                </button>
                            </div>
                        ` : ""}
                    </div>
                </div>
            `;
        }

        ordersContainer.innerHTML = ordersHtml;
    }
}


/* ================================
   27. ORDER TABS FILTER
================================ */

var allOrdersBtn = document.querySelector("#all-orders-btn");
var processingBtn = document.querySelector("#processing-orders-btn");
var shippedBtn = document.querySelector("#shipped-orders-btn");
var deliveredBtn = document.querySelector("#delivered-orders-btn");
var cancelledBtn = document.querySelector("#cancelled-orders-btn");

if (allOrdersBtn) {
    function filterOrders(status) {
        var orders = JSON.parse(localStorage.getItem("orders")) || [];

        // Reset all buttons
        var allBtns = [allOrdersBtn, processingBtn, shippedBtn, deliveredBtn, cancelledBtn];
        for (var i = 0; i < allBtns.length; i++) {
            allBtns[i].classList.remove("btn-primary");
            allBtns[i].classList.add("btn-outline-primary");
        }

        // Highlight active button
        if (status === "All") {
            allOrdersBtn.classList.remove("btn-outline-primary");
            allOrdersBtn.classList.add("btn-primary");
        } else if (status === "Processing") {
            processingBtn.classList.remove("btn-outline-primary");
            processingBtn.classList.add("btn-primary");
        } else if (status === "Shipped") {
            shippedBtn.classList.remove("btn-outline-primary");
            shippedBtn.classList.add("btn-primary");
        } else if (status === "Delivered") {
            deliveredBtn.classList.remove("btn-outline-primary");
            deliveredBtn.classList.add("btn-primary");
        } else if (status === "Cancelled") {
            cancelledBtn.classList.remove("btn-outline-primary");
            cancelledBtn.classList.add("btn-primary");
        }

        // Filter orders
        var filteredOrders = [];
        for (var j = 0; j < orders.length; j++) {
            if (status === "All" || orders[j].status === status) {
                filteredOrders.push(orders[j]);
            }
        }

        // Empty state
        if (filteredOrders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="card border-0 shadow-sm">
                    <div class="card-body text-center p-5">
                        <i class="bi bi-box-seam" style="font-size: 4rem; color: var(--primary-pink);"></i>
                        <h2 class="h4 fw-bold mt-3 mb-2">No ${status === "All" ? "" : status} orders</h2>
                        <p class="text-muted mb-0">Nothing to show here yet.</p>
                    </div>
                </div>
            `;
            return;
        }

        // Build order cards
        var html = "";
        for (var k = filteredOrders.length - 1; k >= 0; k--) {
            var order = filteredOrders[k];
            html += `
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-body p-4">
                        <!-- Order Header -->
                        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                            <div>
                                <h2 class="h5 fw-bold mb-1">Order #${order.id}</h2>
                                <small class="text-muted">Date: ${order.date}</small>
                            </div>
                            <span class="badge ${order.status === "Cancelled" ? "bg-danger" :
                    order.status === "Delivered" ? "bg-success" :
                        order.status === "Shipped" ? "bg-info text-dark" :
                            "bg-warning text-dark"
                }">${order.status}</span>
                        </div>
                        <hr>
                        <!-- Order Items -->
                        <div class="mb-3">
                            <h3 class="h6 fw-semibold mb-3">Items</h3>
                            ${order.items.map(function (item) {
                    return `
                                    <div class="d-flex justify-content-between mb-2">
                                        <span>${item.name} × ${item.quantity}</span>
                                        <span class="fw-semibold">₹${item.price * item.quantity}</span>
                                    </div>
                                `;
                }).join("")}
                        </div>
                        <hr>
                        <!-- Order Summary -->
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Subtotal</span>
                            <span>₹${order.subtotal}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Delivery</span>
                            <span>${order.delivery === 0 ? "FREE" : "₹" + order.delivery}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="fw-bold">Total</span>
                            <span class="fw-bold" style="color: var(--primary-pink);">₹${order.total}</span>
                        </div>
                        <div class="text-end mt-3">
                           <button type="button" class="btn btn-outline-primary btn-sm view-order-btn"
                                data-order-id="${order.id}">
                                    View Details
                            </button>
                        </div>
                        <!-- Cancel Button (only for Processing) -->
                        ${order.status === "Processing" ? `
                            <div class="text-end mt-3">
                                <button type="button" class="btn btn-outline-danger btn-sm cancel-order-btn" data-order-id="${order.id}">
                                    Cancel Order
                                </button>
                            </div>
                        ` : ""}
                    </div>
                </div>
            `;
        }

        ordersContainer.innerHTML = html;
    }

    // Attach click listeners
    allOrdersBtn.addEventListener("click", function () { filterOrders("All"); });
    processingBtn.addEventListener("click", function () { filterOrders("Processing"); });
    shippedBtn.addEventListener("click", function () { filterOrders("Shipped"); });
    deliveredBtn.addEventListener("click", function () { filterOrders("Delivered"); });
    cancelledBtn.addEventListener("click", function () { filterOrders("Cancelled"); });

    // Auto-open Cancelled tab after cancelling an order
    if (localStorage.getItem("openCancelledTab") === "true") {
        localStorage.removeItem("openCancelledTab");
        filterOrders("Cancelled");
    }
}


/* ================================
   28. CANCEL ORDER
================================ */

if (ordersContainer) {
    ordersContainer.addEventListener("click", function (event) {
        var button = event.target.closest(".cancel-order-btn");
        if (!button) {
            return;
        }

        var orderId = button.getAttribute("data-order-id");
        var orders = JSON.parse(localStorage.getItem("orders")) || [];

        // Find the selected order
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].id === orderId) {
                // Only Processing orders can be cancelled
                if (orders[i].status !== "Processing") {
                    alert("This order cannot be cancelled.");
                    return;
                }

                // Ask for confirmation
                var confirmCancel = confirm("Are you sure you want to cancel this order?");
                if (!confirmCancel) {
                    return;
                }

                // Change status
                orders[i].status = "Cancelled";
                break;
            }
        }

        // Save updated orders
        localStorage.setItem("orders", JSON.stringify(orders));
        alert("Order cancelled successfully!");

        // Open Cancelled tab after reload
        localStorage.setItem("openCancelledTab", "true");
        window.location.reload();
    });
}


/* ================================
   29. VIEW ORDER DETAILS
================================ */

if (ordersContainer) {
    ordersContainer.addEventListener("click", function (event) {
        var button = event.target.closest(".view-order-btn");
        if (!button) {
            return;
        }

        var orderId = button.getAttribute("data-order-id");
        var orders = JSON.parse(localStorage.getItem("orders")) || [];
        var selectedOrder = null;

        // Find the selected order
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].id === orderId) {
                selectedOrder = orders[i];
                break;
            }
        }

        if (!selectedOrder) {
            alert("Order not found.");
            return;
        }

        // Build items text
        var itemsText = "";
        for (var j = 0; j < selectedOrder.items.length; j++) {
            var item = selectedOrder.items[j];
            itemsText += item.name + " × " + item.quantity + " = ₹" + (item.price * item.quantity) + "\n";
        }

        // Show order details
        alert(
            "Order Details\n\n" +
            "Order ID: " + selectedOrder.id + "\n" +
            "Date: " + selectedOrder.date + "\n" +
            "Status: " + selectedOrder.status + "\n\n" +
            "Items:\n" + itemsText +
            "\nSubtotal: ₹" + selectedOrder.subtotal +
            "\nDelivery: " + (selectedOrder.delivery === 0 ? "FREE" : "₹" + selectedOrder.delivery) +
            "\nTotal: ₹" + selectedOrder.total
        );
    });
}