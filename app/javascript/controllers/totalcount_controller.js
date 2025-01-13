import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["newTotalQuantity", "productquantity", "productprice", "subtotal", "finaltotal"]
  static values = {
    newquantity: Number,
    startquantity: Number,
    productquantity: Number,
    productprice: Number
  }

  addproduct() {
    console.log(this.subtotalTarget.innerText)
    const totalProductQuantity = this.productquantityTargets.reduce((sum, product) => {
    return sum + parseInt(product.innerText, 10) }, 0);
    this.newTotalQuantityTarget.innerText = `${totalProductQuantity} items`;

    const subtotalPrice = this.productpriceTargets.reduce((sum, productPrice, index) => {
      const quantity = parseInt(this.productquantityTargets[index].innerText, 10);
      const price = parseFloat(productPrice.getAttribute("data-totalcount-productprice-value"))
      return sum + price * quantity;
      }, 0);

    this.subtotalTargets.forEach((subtotalTarget) => {
      subtotalTarget.innerText = `$${subtotalPrice}`;
    });
    this.finaltotalTarget.innerText = `$${subtotalPrice - 25}`
  }

  substractproduct() {
    const totalProductQuantity = this.productquantityTargets.reduce((sum, product) => {
    return sum + parseInt(product.innerText, 10) }, 0);
    this.newTotalQuantityTarget.innerText = `${totalProductQuantity} items`;

    const subtotalPrice = this.productpriceTargets.reduce((sum, productPrice, index) => {
      const quantity = parseInt(this.productquantityTargets[index].innerText, 10);
      const price = parseFloat(productPrice.getAttribute("data-totalcount-productprice-value"))
      return sum + price * quantity;
      }, 0);

    this.subtotalTargets.forEach((subtotalTarget) => {
      subtotalTarget.innerText = `$${subtotalPrice}`;
    });;
    this.finaltotalTarget.innerText = `$${subtotalPrice - 25}`
  }

  deleteproduct(event) {
    const productElement = event.target.closest(".listed-item");

    const quantityToSubtract = parseInt(
      productElement.querySelector("[data-totalcount-target='productquantity']").innerText, 10 );
    const priceToSubtract = parseFloat(
      productElement.querySelector("[data-totalcount-target='productprice']").getAttribute("data-totalcount-productprice-value") );

    const totalProductQuantity = this.productquantityTargets.reduce((sum, product) => {
      return sum + parseInt(product.innerText, 10);
    }, 0);
    const updatedQuantity = totalProductQuantity - quantityToSubtract;
    this.newTotalQuantityTarget.innerText = `${updatedQuantity} items`;

    const totalPrice = this.productpriceTargets.reduce((sum, productPrice, index) => {
      const quantity = parseInt(this.productquantityTargets[index].innerText, 10);
      const price = parseFloat(productPrice.getAttribute("data-totalcount-productprice-value"));
      return sum + price * quantity;
    }, 0);
    const updatedSubtotal = totalPrice - priceToSubtract * quantityToSubtract;

    this.subtotalTargets.forEach((subtotalTarget) => {
      subtotalTarget.innerText = `$${updatedSubtotal}`;
    });

    this.finaltotalTarget.innerText = `$${updatedSubtotal - 25}`

    this.checkEmptyCart();
  }

  checkEmptyCart() {
    console.log(parseInt(this.newTotalQuantityTarget.innerText))

    const totalProductQuantity = this.productquantityTargets.reduce((sum, product) => {
      return sum + parseInt(product.innerText, 10);
    }, 0);

    const totalPrice = this.productpriceTargets.reduce((sum, productPrice, index) => {
      const quantity = parseInt(this.productquantityTargets[index].innerText, 10);
      const price = parseFloat(productPrice.getAttribute("data-totalcount-productprice-value"));
      return sum + price * quantity;
    }, 0);

    const cartContainer = this.element.querySelector(".main-container");
    const emptyMessage = document.querySelector(".empty-cart-message");

    if (parseInt(this.newTotalQuantityTarget.innerText) === 0) {

        const message = document.createElement("div");
        message.className = "empty-cart-message";
        message.innerHTML = `
        <div class="empty-cart">
          <i class="fa-solid fa-box-open openbox"></i>
          <div class="empty-cart-text">
            <h2>The cart is empty</h2>
            <h5>Add items from the catalog</h5>
          </div>
        </div>
        `;
        cartContainer.appendChild(message);

      this.element.querySelector(".items").classList.add("hidden");
      this.element.querySelector(".summary").classList.add("hidden");
      this.element.querySelector(".order-btn").classList.add("hidden");
      this.element.querySelector(".btn-reset").classList.add("hidden");  
    }
  }
}
