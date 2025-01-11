import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["newTotalQuantity", "minusbutton", "productquantity"]
  static values = {
    newquantity: Number,
    startquantity: Number,
    productquantity: Number
  }


  addproduct() {
    const totalProductQuantity = this.productquantityTargets.reduce((sum, product) => {
    return sum + parseInt(product.innerText, 10) }, 0);

    this.newTotalQuantityTarget.innerText = `${totalProductQuantity} items`
  }

  substractproduct() {
    const totalProductQuantity = this.productquantityTargets.reduce((sum, product) => {
    return sum + parseInt(product.innerText, 10) }, 0);

    this.newTotalQuantityTarget.innerText = `${totalProductQuantity} items`
  }
}
