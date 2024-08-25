import { dishes } from "../collection.js";

const orderWindow = document.querySelector(".order-window");
const overlay = document.querySelector(".order-overlay");
const headerElement = document.createElement("div");
headerElement.classList.add("cart-header");

const footerElement = document.createElement("div");
footerElement.classList.add("cart-footer");

const aElement = document.createElement("a");
aElement.classList.add("cart-arrow-a");
aElement.href = "#";

headerElement.appendChild(aElement);
const iconArrow = document.createElement("img");
iconArrow.src = "../icons/next.png";
iconArrow.alt = "next arrow";
iconArrow.style.width = "28px";
iconArrow.style.height = "28px";

aElement.appendChild(iconArrow);
const yourCartElement = document.createElement("div");
yourCartElement.textContent = "Your cart";
yourCartElement.style.marginLeft = "12rem";
headerElement.appendChild(yourCartElement);

const bodyDivElement = document.createElement("div");
bodyDivElement.classList.add("cart-body");
orderWindow.append(headerElement, bodyDivElement, footerElement);

export function actionOrderCart() {
    bodyDivElement.innerHTML = "";

    dishes.forEach((element, i) => {
        const dishFromLocalStorage = localStorage.getItem(`${i + 1}`);
        if (dishFromLocalStorage) {
            const divElement = document.createElement("div");
            divElement.classList.add("cart-item");
            bodyDivElement.appendChild(divElement);

            const imageDiv = document.createElement("div");
            divElement.append(imageDiv);
            const imageFood = document.createElement("img");
            const dishObj = JSON.parse(dishFromLocalStorage);
            imageFood.src = dishObj.image;
            imageFood.alt = `Image: ${dishObj.name}`;

            const cartItemDetail = document.createElement("div");
            cartItemDetail.classList.add("cart-item-detail");
            divElement.append(cartItemDetail);

            const h3Element = document.createElement("h3");
            h3Element.textContent = dishObj.name;
            h3Element.style.marginTop = "0";
            cartItemDetail.appendChild(h3Element);

            const h5Element = document.createElement("h5");
            h5Element.textContent = `$ ${dishObj.price}`;
            cartItemDetail.appendChild(h5Element);

            const cartItemAmount = document.createElement("div");
            cartItemAmount.classList.add("cart-item-amount");
            cartItemDetail.appendChild(cartItemAmount);

            const decreaseElement = document.createElement("i");
            decreaseElement.classList.add("bt", "decrease");

            const spanElement = document.createElement("span");
            spanElement.classList.add("qty");
            // spanElement.textContent = "1";
            const quantity = dishObj.quantity || 1;
            spanElement.textContent = String(quantity);

            const increaseElement = document.createElement("i");
            increaseElement.classList.add("bt", "increase");

            cartItemAmount.append(
                decreaseElement,
                spanElement,
                increaseElement
            );
            imageDiv.append(imageFood);

            const cartItemPrice = document.createElement("span");
            cartItemPrice.classList.add("cart-item-price");
            cartItemPrice.textContent = `$${String(
                Number(spanElement.textContent * element.price)
            )}`;
            cartItemAmount.append(cartItemPrice);

            decreaseElement.addEventListener("click", () => {
                let counter = Number(spanElement.textContent);

                if (counter > 1) {
                    counter--;
                    spanElement.textContent = String(counter);
                    dishObj.quantity = counter;
                    localStorage.setItem(`${i + 1}`, JSON.stringify(dishObj));

                    cartItemPrice.textContent = `$${Number(
                        spanElement.textContent * element.price
                    ).toFixed(2)}`;
                    updateTotalAmount();
                    checkIfCartIsEmpty();
                } else {
                    divElement.remove();
                    localStorage.removeItem(`${i + 1}`);
                    updateTotalAmount();
                    checkIfCartIsEmpty();
                }
            });

            increaseElement.addEventListener("click", () => {
                let counter = Number(spanElement.textContent);
                counter++;
                spanElement.textContent = String(counter);
                dishObj.quantity = counter;
                localStorage.setItem(`${i + 1}`, JSON.stringify(dishObj));

                cartItemPrice.textContent = `$${Number(
                    spanElement.textContent * element.price
                ).toFixed(2)}`;
                updateTotalAmount();
            });
        }
    });
}

const totalElement = document.createElement("div");
footerElement.appendChild(totalElement);
const strongElement = document.createElement("strong");
strongElement.textContent = "Total (VAT included 21%)";

const totalElementSpan = document.createElement("span");
totalElementSpan.classList.add("cart-total");

export function updateTotalAmount() {
    let totalAmount = 0;
    const allCartItemPrice = document.querySelectorAll(".cart-item-price");
    allCartItemPrice.forEach((item) => {
        const price = parseFloat(item.textContent.replace("$", ""));
        totalAmount += price;
    });
    let totalAmountWithVAT = totalAmount + totalAmount * 0.21;
    totalElementSpan.textContent = `$${totalAmountWithVAT.toFixed(2)}`;
}

totalElement.append(strongElement, totalElementSpan);

const clearCartButton = document.createElement("button");
clearCartButton.classList.add("cart-clear");
clearCartButton.textContent = "clear Cart";

const checkoutButton = document.createElement("button");
checkoutButton.classList.add("checkout");
checkoutButton.textContent = "checkout";

footerElement.append(clearCartButton, checkoutButton);

function eventOpenCloseCart(event) {
    event.preventDefault();
    orderWindow.classList.remove("show");
    overlay.classList.remove("show");
}

const basketIcon = document.getElementsByClassName("basket-icon");
console.log(basketIcon);
basketIcon[0].addEventListener("click", (event) => {
    event.preventDefault();
    orderWindow.classList.toggle("show");
    overlay.classList.toggle("show");
});

overlay.addEventListener("click", eventOpenCloseCart);
aElement.addEventListener("click", eventOpenCloseCart);

function displayEmptyCartMessage() {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "Your cart is empty.";
    bodyDivElement.appendChild(emptyMessage);
}

function hideFooter() {
    footerElement.style.display = "none";
}

function showFooter() {
    footerElement.style.display = "grid";
}

export function checkIfCartIsEmpty() {
    if (bodyDivElement.children.length === 0) {
        displayEmptyCartMessage();
        hideFooter();
    } else {
        showFooter();
    }
}

function clearCart() {
    clearCartButton.addEventListener("click", (event) => {
        bodyDivElement.innerHTML = "";
        localStorage.clear();
        checkIfCartIsEmpty();
    });
}

actionOrderCart();
updateTotalAmount();
checkIfCartIsEmpty();
clearCart();
