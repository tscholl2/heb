import { h, Component, patch, VNode } from "picodom";

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function `fn` will be called after it stops being called for
// `N` milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(N: number, fn: (...args: any[]) => void, immediate = false) {
  let timeout: any;
  return function(...args: any[]) {
    const later = function() {
      timeout = undefined;
      if (!immediate) fn(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, N);
    if (callNow) fn(...args);
  };
}

function renderMarkdown(markdown: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(h("p", undefined, [`done: ${markdown}`]));
    }, 2000);
  });
}

class XMarkdown extends HTMLElement {
  private node: VNode;
  private renderedMarkdown: VNode<any> | undefined;
  private render: any;
  public static get observedAttributes() {
    return ["markdown"];
  }
  private loading = h("progress");
  constructor() {
    super();
    this.render = debounce(16, () => {
      console.log("rendering");
      const newNode = this.renderedMarkdown || this.loading;
      console.log(newNode);
      console.log(this.node);
      if (newNode !== this.node) {
        patch(this.node, newNode, this);
        this.node = newNode;
      }
    });
  }
  private update(newValue: string) {
    this.renderedMarkdown = undefined;
    renderMarkdown(newValue).then((value: any) => {
      this.renderedMarkdown = value;
      this.render();
    });
    this.render();
  }
  attributeChangedCallback(attr: any, oldValue: any, newValue: any) {
    if (attr === "markdown") {
      console.log(`value changed from ${oldValue} to ${newValue}`);
      this.update(newValue);
    }
  }
  connectedCallback() {
    console.log("connected to dom");
    this.update(this.getAttribute("markdown") || "");
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
