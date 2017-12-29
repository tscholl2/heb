import { h, Component, VNode } from "picodom";

const cache: { [key: string]: { view?: () => VNode } } = {};

export interface IMarkdownProps {
  markdown: string;
  update(): void;
}

export const Markdown: Component<IMarkdownProps> = ({ markdown, update }) => {
  const c = cache[markdown];
  if (c !== undefined && c.view !== undefined) {
    return h("div", undefined, [c.view()]);
  }
  // async call if not in progress
  if (c === undefined) {
    cache[markdown] = {};
    setTimeout(() => {
      cache[markdown].view = () => h("p", undefined, [markdown]);
      update();
    }, 2000);
  }
  return h("progress");
};
