import { h, Component, patch } from "picodom";

class XMarkdown extends HTMLElement {
  static get observedAttributes() {
    return ["markdown"];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === "markdown") {
      this.textContent = `Hello, ${newValue}`;
    }
  }
  connectedCallback() {
    console.log("hello");
    console.log("my attribute is ", this.getAttribute("markdown"));
    const oldNode = this.node;
    const newNode = h("progress");
    patch(oldNode, newNode, this);
    this.node = newNode;
    setTimeout(() => {
      const oldNode = this.node;
      const newNode = h("div", undefined, [`done: ${this.getAttribute("markdown") || ""}`]);
      patch(oldNode, newNode, this);
      this.node = newNode;
    }, 2000);
  }
  disconnectedCallback() {
    console.log("leaving dom!");
  }
}

console.log(XMarkdown);

customElements.define("x-markdown", XMarkdown);

export const Markdown = ({ markdown }) => {
  return h("x-markdown", { markdown });
};
