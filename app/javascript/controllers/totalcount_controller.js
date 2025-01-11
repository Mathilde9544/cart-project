import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["newTotalQuantity", "productquantity", "productprice", "subtotal"]
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
}
