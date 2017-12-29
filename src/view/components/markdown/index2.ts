import { h, Component, patch, VNode } from "picodom";

class XMarkdown extends HTMLElement {
  private node: VNode<any>;
  static get observedAttributes() {
    return ["markdown"];
  }
  constructor() {
    super();
    // try {super()} catch (e) {}
  }
  attributeChangedCallback(attr: any, oldValue: any, newValue: any) {
    if (attr === "markdown") {
      this.textContent = `Hello, ${newValue}`;
    }
  }
  connectedCallback() {
    console.log("my attribute is ", this.getAttribute("markdown"));
    const newNode = h("progress");
    patch(this.node, newNode, this);
    this.node = newNode;
    setTimeout(() => {
      const newNode = h("div", undefined, [`done: ${this.getAttribute("markdown") || ""}`]);
      patch(this.node, newNode, this);
      this.node = newNode;
    }, 2000);
  }
  disconnectedCallback() {
    console.log("leaving dom!");
  }
}

console.log(XMarkdown);

customElements.define("x-markdown", XMarkdown);

export const Markdown = ({ markdown }: { markdown: string }) => {
  return h("x-markdown", { markdown });
};
