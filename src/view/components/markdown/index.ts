import { h, patch, Component, VNode } from "picodom";

type ICache = {
  [key: string]: VNode;
};

const cache: ICache = {};

export interface IMarkdownProps {
  markdown: string;
}

export const Markdown: Component<IMarkdownProps> = props => {
  return h("div", {
    ["data-md"]: props.markdown,
    oncreate: update,
    onupdate: update,
  });
};

function update(el: any) {
  if (!document.contains(el)) {
    return;
  }
  const value = el.getAttribute("data-md")!;
  const node = cache[value] || h("progress");
  console.log("updating...");
  console.log("value = ", value);
  console.log("current node = ", node);
  patch(el.__node, node, el);
  el.__node = node;
  setTimeout(() => {
    if (!cache[value]) {
      cache[value] = h("p", undefined, [`done: ${value}`]);
      update(el);
    }
  }, 2000);
}
