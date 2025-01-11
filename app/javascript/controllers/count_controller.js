import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    quantity: Number,
  }
  static targets = ["newQuantity"]

  addproduct() {
    this.quantityValue += 1;
    this.newQuantityTarget.innerText = this.quantityValue;
  }

  substractproduct() {
    if (this.quantityValue > 1) {
      this.quantityValue -= 1;
      this.newQuantityTarget.innerText = this.quantityValue;
    }
  }
}
