import { dishes } from "./collection.js";
import { actionOrderCart } from "./menu/basket.js";
import { updateTotalAmount } from "./menu/basket.js";
import { checkIfCartIsEmpty } from "./menu/basket.js";

const cards = document.querySelector(".cards");
const filterInput = document.querySelector(".filter");

function displayCards(dishes) {
    cards.innerHTML = "";

    dishes.forEach((dish) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Card Logo and Price
        const cardLogoPrice = document.createElement("div");
        cardLogoPrice.classList.add("card-logo-price");

        const image = document.createElement("img");
        image.src = dish.image;
        image.alt = dish.name;
        cardLogoPrice.appendChild(image);

        const category = document.createElement("p");

        dish.category.forEach((cat) => {
            const span = document.createElement("span");
            span.textContent = cat;
            category.appendChild(span);
        });

        cardLogoPrice.appendChild(category);

        const price = document.createElement("span");
        price.textContent = `$${dish.price.toFixed(2)}`;
        cardLogoPrice.appendChild(price);

        card.appendChild(cardLogoPrice);

        // Card Description
        const cardDescription = document.createElement("div");
        cardDescription.classList.add("card-description");

        const name = document.createElement("h3");
        name.textContent = dish.name;
        cardDescription.appendChild(name);

        const description = document.createElement("p");
        description.textContent = dish.description;
        cardDescription.appendChild(description);

        const basketLink = document.createElement("a");
        basketLink.classList.add("basket-button");
        basketLink.href = "#";
        basketLink.textContent = "Add to cart";

        basketLink.style.backgroundImage = `url(${dish.basketIcon})`;

        cardDescription.appendChild(basketLink);

        card.appendChild(cardDescription);

        cards.appendChild(card);

        basketLink.addEventListener("click", (event) => {
            event.preventDefault();
            let dishJSON = localStorage.getItem(`${dish.id}`);
            if (!dishJSON) {
                // If the item is not in the cart, add it with quantity 1
                let dishObj = { ...dish, quantity: 1 };
                localStorage.setItem(`${dish.id}`, JSON.stringify(dishObj));
                actionOrderCart();
                updateTotalAmount();
                checkIfCartIsEmpty();
            } else {
                // Optional: Display a message to the user that the item is already in the cart
                console.log("Item is already in the cart!");
            }
        });
    });
}

displayCards(dishes);

// Filter
filterInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCollection = dishes.filter((item) =>
        item.category.some((cat) => cat.toLowerCase().includes(searchTerm))
    );
    displayCards(filteredCollection);
});

// Modal window
const modalWindow = document.getElementById("modalWindow");
const closeBtn = document.getElementById("closeBtn");
const testButton = document.querySelector(".checkout");

function openModal() {
    modalWindow.style.display = "block";
}

function closeModal() {
    modalWindow.style.display = "none";
}

testButton.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
    if (event.target === modalWindow) {
        closeModal();
    }
});

document
    .getElementById("modalForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            region: document.getElementById("region").value,
            city: document.getElementById("city").value,
            zip: document.getElementById("zip").value,
            street: document.getElementById("street").value,
            streetNumber: document.getElementById("streetNumber").value,
        };

        localStorage.setItem("userDetails", JSON.stringify(formData));
        closeModal();
    });

// Theme switcher
const page = document.querySelector(".page");
const switcher = document.querySelector(".theme-switcher");

switcher.addEventListener("click", () => {
    if (page.classList.contains("page--theme--dark")) {
        page.classList.remove("page--theme--dark");
        switcher.classList.remove("theme-switcher--theme--dark");
    } else {
        page.classList.add("page--theme--dark");
        switcher.classList.add("theme-switcher--theme--dark");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let headers = document.querySelectorAll(".first-level-footer h3");

    headers.forEach(function (header) {
        header.addEventListener("click", function () {
            let parentDiv = header.parentNode;

            parentDiv.classList.toggle("active");
        });
    });
});
