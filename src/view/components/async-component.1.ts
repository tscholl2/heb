import { h, patch, Component, VNode } from "picodom";

export function asyncComponent<P>(
  fn: (props: P & { forceUpdate: () => void }) => VNode<any> | Promise<VNode<any>>,
  loader: (props: P & { forceUpdate: () => void }) => VNode<any>,
) {
  let oldProps: P & { forceUpdate: () => void };
  let oldNode: VNode<any>;
  let loading: boolean;
  return (props: P & { forceUpdate: () => void }) => {
    if (oldNode && shallowEquals(props, oldProps)) {
      return oldNode;
    }
    oldProps = props;
    loading = true;
    const n: any = fn(props);
    if (typeof n.then !== "function") {
      loading = false;
      oldNode = n;
      return n;
    }
    n.then((node: VNode<any>) => {
      if (!loading || oldProps !== props) {
        return;
      }
      loading = false;
      oldNode = node;
      props.forceUpdate();
    });
    return loader(props);
  };
}

function shallowEquals(a = {}, b = {}) {
  if (a === b) {
    return true;
  }
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
