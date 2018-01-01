import { h, patch, Component, VNode } from "picodom";

export interface IMarkdownProps {
  markdown: string;
}

export const Markdown: Component<any> = props => {
  return h("x-md", { // important for node re-cycling
    oncreate: update(props.markdown),
    onupdate: update(props.markdown), // the new update function gets called with old props
  });
};

function update(newValue: string) {
  return (el: HTMLElement & { __value: string; __loading: boolean; __node: VNode<any> }) => {
    if (!document.contains(el)) {
      return;
    }
    if (el.__value === newValue) {
      return;
    }
    el.__value = newValue;
    if (!el.__loading) {
      const node = h("progress");
      patch(el.__node, node, el);
      el.__loading = true;
      el.__node = node;
    }
    renderMarkdown(newValue).then(node => {
      if (!document.contains(el) || el.__value !== newValue || !el.__loading) {
        return;
      }
      patch(el.__node, node, el);
      el.__node = node;
      el.__loading = false;
    });
  };
}

function renderMarkdown(md: string): Promise<VNode<any>> {
  return new Promise(resolve =>
    setTimeout(() => resolve(h("p", undefined, [`done: ${md}`])), 2000),
  );
}
