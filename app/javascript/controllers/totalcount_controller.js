import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["newTotalQuantity", "productquantity", "productprice", "subtotal", "trash"]
  static values = {
    newquantity: Number,
    startquantity: Number,
    productquantity: Number,
    productprice: Number
  }

  addproduct() {


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

    // Update subtotal price
    const totalPrice = this.productpriceTargets.reduce((sum, productPrice, index) => {
      const quantity = parseInt(this.productquantityTargets[index].innerText, 10);
      const price = parseFloat(productPrice.getAttribute("data-totalcount-productprice-value"));
      return sum + price * quantity;
    }, 0);
    const updatedSubtotal = totalPrice - priceToSubtract * quantityToSubtract;

    this.subtotalTargets.forEach((subtotalTarget) => {
      subtotalTarget.innerText = `$${updatedSubtotal}`;
    });

    // Remove the product element from the DOM
    productElement.remove();
  }
}
