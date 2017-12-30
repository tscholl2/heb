import { h, patch, Component, VNode } from "picodom";

export interface IMarkdownProps {
  markdown: string;
}

export const Markdown: Component<any> = props => {
  return h("div", {
    oncreate: el => update(el, props),
    onupdate: el => update(el, props),
  });
};

function update(
  el: HTMLElement & {
    __stuffstuff: { node?: VNode<any>; props: IMarkdownProps; isLoading: boolean };
  },
  props: any,
) {
  const { node: oldNode = undefined, props: oldProps = { markdown: "" }, isLoading = false } =
    el.__stuffstuff || {};

  // TODO shallow equals
  if (shallowEquals(props, oldProps)) {
    console.log("shortcut 0");
    return;
  }

  el.__stuffstuff = Object.assign({}, el.__stuffstuff, { props });

  if (!isLoading) {
    const node = h("progress");
    console.log("patching loader");
    patch(oldNode, node, el);
    el.__stuffstuff = Object.assign({}, el.__stuffstuff, { isLoading: true, node });
  }

  renderMarkdown(props.markdown).then((node: any) => {
    if (props.markdown === el.__stuffstuff.props.markdown && el.__stuffstuff.isLoading) {
      console.log("patching node");
      patch(el.__stuffstuff.node, node, el);
      el.__stuffstuff = Object.assign({}, el.__stuffstuff, { isLoading: false, node });
    }
  });
}

async function renderMarkdown(md: string) {
  return await new Promise(resolve =>
    setTimeout(() => resolve(h("p", undefined, [`done: ${md}`])), 2000),
  );
}

function shallowEquals(a: Object, b: Object) {
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) {
    return false;
  }
  for (let i = 0; i < ka.length; i++) {
    if (!b.hasOwnProperty(ka[i]) || b[ka[i]] !== a[ka[i]]) {
      return false;
    }
  }
  return true;
}
