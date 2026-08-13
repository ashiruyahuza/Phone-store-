document.addEventListener("DOMContentLoaded", function () {

    const phoneSelect = document.getElementById("phoneSelect");
    const orderSummary = document.getElementById("orderSummary");
    const orderForm = document.getElementById("orderForm");
    const quantityInput = document.getElementById("quantity");

    // Check that products.js loaded
    if (typeof phones === "undefined") {
        console.error("ERROR: phones data was not loaded.");
        return;
    }

    // Format Nigerian Naira
    function naira(price) {
        return "₦" + Number(price).toLocaleString("en-NG");
    }


    // ==========================================
    // LOAD PHONES INTO SELECT BOX
    // ==========================================

    if (phoneSelect) {

        phoneSelect.innerHTML =
            '<option value="">Choose a phone</option>';

        phones.forEach(function (phone) {

            const option =
                document.createElement("option");

            option.value = phone.id;

            option.textContent =
                phone.name +
                " — " +
                naira(phone.price);

            phoneSelect.appendChild(option);

        });

    }


    // ==========================================
    // UPDATE ORDER SUMMARY
    // ==========================================

    function updateSummary() {

        if (!phoneSelect || !orderSummary) {
            return;
        }

        const id =
            Number(phoneSelect.value);

        const phone =
            phones.find(function (item) {
                return item.id === id;
            });


        if (!phone) {

            orderSummary.innerHTML = `

                <div class="summary-empty">

                    <div style="font-size:40px;">
                        📱
                    </div>

                    <p>
                        Select a phone to see
                        your order summary.
                    </p>

                </div>

            `;

            return;
        }


        const quantity =
            Number(quantityInput?.value || 1);


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
                    Price
                </span>

                <strong>
                    ${naira(phone.price)}
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
                    ${naira(total)}
                </strong>

            </div>

        `;

    }


    // ==========================================
    // PHONE SELECT CHANGE
    // ==========================================

    if (phoneSelect) {

        phoneSelect.addEventListener(
            "change",
            updateSummary
        );

    }


    // ==========================================
    // QUANTITY CHANGE
    // ==========================================

    if (quantityInput) {

        quantityInput.addEventListener(
            "input",
            updateSummary
        );

    }


    // ==========================================
    // DELIVERY
    // ==========================================

    const deliveryOptions =
        document.querySelectorAll(
            'input[name="delivery"]'
        );

    const addressGroup =
        document.getElementById("addressGroup");

    const address =
        document.getElementById("address");


    deliveryOptions.forEach(function (option) {

        option.addEventListener(
            "change",
            function () {

                if (this.value === "delivery") {

                    addressGroup.style.display =
                        "block";

                    address.required = true;

                } else {

                    addressGroup.style.display =
                        "none";

                    address.required = false;

                }

            }
        );

    });


    // ==========================================
    // SUBMIT ORDER
    // ==========================================

    if (orderForm) {

        orderForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const selectedId =
                    Number(phoneSelect.value);


                const phone =
                    phones.find(function (item) {

                        return item.id === selectedId;

                    });


                if (!phone) {

                    alert(
                        "Please select a phone first."
                    );

                    return;

                }


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


                const storage =
                    document
                        .getElementById("storage")
                        .value;


                const quantity =
                    Number(
                        quantityInput.value || 1
                    );


                const delivery =
                    document.querySelector(
                        'input[name="delivery"]:checked'
                    ).value;


                const customerAddress =
                    address.value.trim();


                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                const total =
                    phone.price * quantity;


                const whatsappMessage =

`*NEW ORDER — ASHIR PHONE STORE*

--------------------------------

CUSTOMER

Name: ${name}

Phone: ${customerPhone}

Email: ${email || "Not provided"}


--------------------------------

PHONE

Phone: ${phone.name}

Brand: ${phone.brand}

Storage: ${storage || phone.storage}

Quantity: ${quantity}


Price: ${naira(phone.price)}

Estimated Total: ${naira(total)}


--------------------------------

FULFILMENT

Method: ${
    delivery === "pickup"
        ? "Store Pickup"
        : "Delivery"
}


Address:
${customerAddress || "Not provided"}


--------------------------------

MESSAGE

${message || "No additional message"}


--------------------------------

STORE

ASHIR PHONE STORE

New Market, Shop No. 24

Jos, Plateau State

Phone: 08109240024
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


    // ==========================================
    // CHECK URL FOR PRODUCT
    // ==========================================

    const url =
        new URLSearchParams(
            window.location.search
        );


    const phoneFromURL =
        url.get("phone");


    if (phoneFromURL && phoneSelect) {

        const found =
            phones.find(function (phone) {

                return phone.name.toLowerCase()
                    === phoneFromURL.toLowerCase();

            });


        if (found) {

            phoneSelect.value =
                found.id;

            updateSummary();

        }

    }

});