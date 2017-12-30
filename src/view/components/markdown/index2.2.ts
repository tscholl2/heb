import { h, patch, Component, VNode } from "picodom";

export interface IMarkdownProps {
  markdown: string;
}

export const Markdown: Component<any> = props => {
  return h("div", {
    ["data-md"]: props.markdown,
    oncreate: update,
    onupdate: update,
  });
};

function update(el: any) {
  console.log("updating el");
  console.log(document.contains(el));
  if (!document.contains(el)) {
    console.log("shortcut 0");
    return;
  }
  const newValue = el.getAttribute("data-md")!;
  if (el.__value === newValue) {
    console.log("shortcut 1");
    return;
  }
  el.__value = newValue;
  console.log("set loadding");
  if (!el.__loading) {
    console.log("actualy laoding");
    const node = h("progress");
    patch(el.__node, node, el);
    el.__loading = true;
    el.__node = node;
  }
  setTimeout(() => {
    console.log("cb time");
    if (!document.contains(el)) {
      console.log("shortcut 0");
      return;
    }
    if (el.__value !== newValue) {
      console.log("shortcut 2");
      return;
    }
    const node = h("p", undefined, [`done: ${newValue}`]);
    console.log(`patching new value: ${newValue}`);
    patch(el.__node, node, el);
    el.__node = node;
    el.__loading = false;
  }, 2000);
}
