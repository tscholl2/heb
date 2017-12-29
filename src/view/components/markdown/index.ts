import { h, patch, Component, VNode } from "picodom";

type ICache = {
  [key: string]: {
    node: VNode;
    loading: () => VNode;
    view: () => VNode;
  };
};

const cache: ICache = {};

export interface IMarkdownProps {
  markdown: string;
}

export const Markdown: Component<IMarkdownProps> = props => {
  const value = props.markdown;
  return h("div", {
    ["data-md"]: value,
    oncreate: update,
    onupdate: update,
  });
  function update(el: HTMLElement) {
    const currentValue = el.getAttribute("data-md") || "";
    const node = cache[currentValue] && cache[currentValue].node;
    console.log("updating...");
    console.log("value = ", value);
    console.log("current = ", currentValue);
    console.log("current node = ", node);
    if (cache[currentValue] && cache[currentValue].view) {
      const newNode = cache[currentValue].view();
      patch(node, newNode, el);
      cache[currentValue].node = newNode;
      return;
    }
    // TODO async set cache
    console.log("patching progress");
    const newNode = h("progress");
    patch(node, newNode, el);
    cache[currentValue] = cache[currentValue] || {};
    cache[currentValue].node = newNode;
    console.log("patched");
    setTimeout(() => {
      // this is using the wrong "node"???
      console.log("patching node ", node);
      cache[currentValue].view = () => h("p", undefined, [currentValue]);
      update(el);
    }, 2000);
  }
};
