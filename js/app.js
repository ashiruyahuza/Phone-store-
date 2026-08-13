// =====================================================
// ASHIR PHONE STORE
// PHONE SHOP
// =====================================================

const phoneGrid = document.getElementById("phoneGrid");
const phoneSearch = document.getElementById("phoneSearch");
const sortPhones = document.getElementById("sortPhones");
const phoneCount = document.getElementById("phoneCount");
const noResults = document.getElementById("noResults");

let selectedBrand = "all";


// =====================================================
// FORMAT PRICE
// =====================================================

function formatPrice(price) {

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);

}


// =====================================================
// DISPLAY PHONES
// =====================================================

function displayPhones(products) {

    if (!phoneGrid) return;

    phoneGrid.innerHTML = "";

    if (products.length === 0) {

        noResults.style.display = "block";

        phoneCount.textContent =
            "0 phones found";

        return;

    }

    noResults.style.display = "none";

    phoneCount.textContent =
        `${products.length} phone${products.length > 1 ? "s" : ""} found`;


    products.forEach(phone => {

        const card = document.createElement("article");

        card.className = "phone-card";


        card.innerHTML = `

            <div class="phone-image">

                <img
                    src="${phone.image}"
                    alt="${phone.name}"
                    onerror="this.src='images/logo.jpg'"
                >

                <span class="phone-brand">
                    ${phone.brand}
                </span>

            </div>


            <div class="phone-info">

                <span class="phone-storage">
                    ${phone.storage} • ${phone.ram} RAM
                </span>

                <h3>
                    ${phone.name}
                </h3>


                <div class="phone-price">

                    ${formatPrice(phone.price)}

                </div>


                <div class="phone-actions">

                    <a
                        href="product.html?id=${phone.id}"
                        class="view-button"
                    >
                        View Details
                    </a>

                    <a
                        href="order.html?phone=${encodeURIComponent(phone.name)}"
                        class="buy-button"
                    >
                        Order
                    </a>

                </div>

            </div>

        `;


        phoneGrid.appendChild(card);

    });

}


// =====================================================
// FILTER PHONES
// =====================================================

function filterPhones() {

    let filtered = [...phones];


    // BRAND

    if (selectedBrand !== "all") {

        filtered = filtered.filter(
            phone =>
                phone.brand === selectedBrand
        );

    }


    // SEARCH

    const searchTerm =
        phoneSearch?.value
            .toLowerCase()
            .trim();


    if (searchTerm) {

        filtered = filtered.filter(phone =>

            phone.name
                .toLowerCase()
                .includes(searchTerm)

            ||

            phone.brand
                .toLowerCase()
                .includes(searchTerm)

        );

    }


    // SORT

    const sortValue =
        sortPhones?.value;


    if (sortValue === "low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sortValue === "high") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sortValue === "name") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    displayPhones(filtered);

}


// =====================================================
// BRAND BUTTONS
// =====================================================

const brandButtons =
    document.querySelectorAll(
        ".brand-filter"
    );


brandButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            brandButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            button.classList.add("active");


            selectedBrand =
                button.dataset.brand;


            filterPhones();

        }
    );

});


// =====================================================
// SEARCH
// =====================================================

if (phoneSearch) {

    phoneSearch.addEventListener(
        "input",
        filterPhones
    );

}


// =====================================================
// SORT
// =====================================================

if (sortPhones) {

    sortPhones.addEventListener(
        "change",
        filterPhones
    );

}


// =====================================================
// INITIAL LOAD
// =====================================================

if (phoneGrid) {

    displayPhones(phones);

}






// =====================================================
// PRODUCT DETAILS PAGE
// =====================================================

const productDetails =
    document.getElementById("productDetails");


if (productDetails) {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            urlParams.get("id")
        );


    const product =
        phones.find(
            phone =>
                phone.id === productId
        );


    if (!product) {

        productDetails.innerHTML = `

            <div class="product-not-found">

                <div>
                    📱
                </div>

                <h2>
                    Phone not found
                </h2>

                <p>
                    This phone may no longer be
                    available in our catalogue.
                </p>

                <a
                    href="phones.html"
                    class="primary-button"
                >
                    Browse Phones →
                </a>

            </div>

        `;

    } else {


        const formattedPrice =
            formatPrice(product.price);


        productDetails.innerHTML = `

            <!-- PRODUCT IMAGE -->

            <div class="product-image-container">

                <div class="product-image-glow"></div>

                <div class="product-badge">
                    ${product.brand}
                </div>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-main-image"
                    onerror="this.src='images/logo.jpg'"
                >

            </div>


            <!-- PRODUCT INFORMATION -->

            <div class="product-information">

                <span class="product-category">
                    ${product.brand}
                    Smartphone
                </span>


                <h1>
                    ${product.name}
                </h1>


                <p class="product-description">

                    Experience reliable performance,
                    modern design and great smartphone
                    features with the
                    ${product.name}.

                </p>


                <!-- PRICE -->

                <div class="product-main-price">

                    ${formattedPrice}

                </div>


                <p class="price-note">
                    Price shown is a catalogue price.
                    Please confirm availability and
                    current price before payment.
                </p>


                <!-- SPECS -->

                <div class="specifications">

                    <div class="spec-item">

                        <span>
                            Storage
                        </span>

                        <strong>
                            ${product.storage}
                        </strong>

                    </div>


                    <div class="spec-item">

                        <span>
                            RAM
                        </span>

                        <strong>
                            ${product.ram}
                        </strong>

                    </div>


                    <div class="spec-item">

                        <span>
                            Brand
                        </span>

                        <strong>
                            ${product.brand}
                        </strong>

                    </div>


                    <div class="spec-item">

                        <span>
                            Availability
                        </span>

                        <strong>
                            Contact Store
                        </strong>

                    </div>

                </div>


                <!-- ACTIONS -->

                <div class="product-actions">

                    <a
                        href="order.html?phone=${encodeURIComponent(product.name)}"
                        class="primary-button"
                    >
                        Order This Phone →
                    </a>


                    <a
                        href="https://wa.me/2348109240024?text=${encodeURIComponent(
                            `Hello ASHIR PHONE STORE, I am interested in the ${product.name} (${product.storage}). Please confirm the current price and availability.`
                        )}"
                        class="secondary-button"
                        target="_blank"
                    >
                        Ask on WhatsApp
                    </a>

                </div>


                <!-- STORE INFO -->

                <div class="product-store-info">

                    <div>
                        📍
                    </div>

                    <div>

                        <strong>
                            ASHIR PHONE STORE
                        </strong>

                        <span>
                            New Market, Shop No. 24,
                            Jos, Plateau State
                        </span>

                    </div>

                </div>

            </div>

        `;

    }

}



// =====================================================
// ORDER PAGE
// =====================================================

const orderForm =
    document.getElementById("orderForm");

const phoneSelect =
    document.getElementById("phoneSelect");

const orderSummary =
    document.getElementById("orderSummary");

const addressGroup =
    document.getElementById("addressGroup");


// =====================================================
// LOAD PHONES INTO ORDER SELECT
// =====================================================

const phoneSelect =
    document.getElementById("phoneSelect");


if (
    phoneSelect &&
    typeof phones !== "undefined" &&
    Array.isArray(phones)
) {

    phones.forEach(phone => {

        const option =
            document.createElement("option");

        option.value = phone.id;

        option.textContent =
            `${phone.name} — ${formatPrice(phone.price)}`;

        phoneSelect.appendChild(option);

    });

}


// =====================================================
// GET PHONE FROM URL
// =====================================================

if (phoneSelect) {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const phoneName =
        params.get("phone");


    if (phoneName) {

        const matchingPhone =
            phones.find(
                phone =>
                    phone.name.toLowerCase() ===
                    phoneName.toLowerCase()
            );


        if (matchingPhone) {

            phoneSelect.value =
                matchingPhone.id;

            updateOrderSummary();

        }

    }

}



// =====================================================
// UPDATE ORDER SUMMARY
// =====================================================

function updateOrderSummary() {

    if (!phoneSelect || !orderSummary) {
        return;
    }


    const selectedId =
        Number(phoneSelect.value);


    const phone =
        phones.find(
            item =>
                item.id === selectedId
        );


    if (!phone) {

        orderSummary.innerHTML = `

            <div class="summary-empty">

                📱

                <p>
                    Select a phone to see
                    your order summary.
                </p>

            </div>

        `;

        return;

    }


    const quantity =
        Number(
            document.getElementById("quantity")?.value || 1
        );


    const total =
        phone.price * quantity;


    orderSummary.innerHTML = `

        <div class="summary-product">

            <img
                src="${phone.image}"
                alt="${phone.name}"
                onerror="this.src='images/logo.jpg'"
            >

            <div>

                <strong>
                    ${phone.name}
                </strong>

                <span>
                    ${phone.brand}
                </span>

            </div>

        </div>


        <div class="summary-line">

            <span>
                Unit Price
            </span>

            <strong>
                ${formatPrice(phone.price)}
            </strong>

        </div>


        <div class="summary-line">

            <span>
                Quantity
            </span>

            <strong>
                ${quantity}
            </strong>

        </div>


        <div class="summary-total">

            <span>
                Estimated Total
            </span>

            <strong>
                ${formatPrice(total)}
            </strong>

        </div>


        <small class="summary-warning">

            Final price and availability will be
            confirmed by ASHIR PHONE STORE.

        </small>

    `;

}



// =====================================================
// PHONE CHANGE
// =====================================================

if (phoneSelect) {

    phoneSelect.addEventListener(
        "change",
        updateOrderSummary
    );

}



// =====================================================
// QUANTITY CHANGE
// =====================================================

const quantityInput =
    document.getElementById("quantity");


if (quantityInput) {

    quantityInput.addEventListener(
        "input",
        updateOrderSummary
    );

}



// =====================================================
// DELIVERY ADDRESS
// =====================================================

const deliveryOptions =
    document.querySelectorAll(
        'input[name="delivery"]'
    );


deliveryOptions.forEach(option => {

    option.addEventListener(
        "change",
        () => {

            if (option.value === "delivery") {

                addressGroup.style.display =
                    "block";

                document
                    .getElementById("address")
                    .required = true;

            }

            else {

                addressGroup.style.display =
                    "none";

                document
                    .getElementById("address")
                    .required = false;

            }

        }
    );

});



// =====================================================
// SUBMIT ORDER TO WHATSAPP
// =====================================================

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("customerName")
                    .value
                    .trim();


            const customerPhone =
                document
                    .getElementById("customerPhone")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("customerEmail")
                    .value
                    .trim();


            const selectedId =
                Number(phoneSelect.value);


            const phone =
                phones.find(
                    item =>
                        item.id === selectedId
                );


            if (!phone) {

                alert(
                    "Please select a phone."
                );

                return;

            }


            const storage =
                document
                    .getElementById("storage")
                    .value;


            const quantity =
                document
                    .getElementById("quantity")
                    .value;


            const delivery =
                document.querySelector(
                    'input[name="delivery"]:checked'
                ).value;


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            const total =
                phone.price *
                Number(quantity);


            let whatsappMessage =

`🛍️ *NEW ORDER — ASHIR PHONE STORE*

━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER*
Name: ${name}
Phone: ${customerPhone}
Email: ${email || "Not provided"}

━━━━━━━━━━━━━━━━━━

📱 *PHONE*
Model: ${phone.name}
Brand: ${phone.brand}
Storage: ${storage || phone.storage}
Quantity: ${quantity}

💰 Catalogue Price:
${formatPrice(phone.price)}

💵 Estimated Total:
${formatPrice(total)}

━━━━━━━━━━━━━━━━━━

🚚 *FULFILMENT*
Method: ${
    delivery === "pickup"
        ? "Store Pickup"
        : "Delivery"
}

Address:
${address || "Not provided"}

━━━━━━━━━━━━━━━━━━

📝 *MESSAGE*
${message || "No additional message"}

━━━━━━━━━━━━━━━━━━

📍 *STORE*
ASHIR PHONE STORE
New Market, Shop No. 24
Jos, Plateau State

`;



            const whatsappURL =
                "https://wa.me/2348109240024?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}