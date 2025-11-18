export class ModalService {
  constructor(modal, image) {
    this.modal = modal;
    this.image = image;
  }

  bindCloseBehaviour() {
    if (!this.modal) return;
    this.modal.addEventListener("click", () => this.hide());
  }

  show(src) {
    if (!this.modal || !this.image) return;
    this.image.src = src;
    this.modal.style.display = "flex";
  }

  hide() {
    if (!this.modal || !this.image) return;
    this.modal.style.display = "none";
    this.image.removeAttribute("src");
  }
}
