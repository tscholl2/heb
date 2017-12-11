declare module "picodom" {
  export interface VNode<Props={}> {
    type: string;
    props?: Props;
    children: Array<VNode<{}> | string>;
  }

  export interface Component<Props = {}> {
    (props: Props, children: Array<VNode<{}> | string>): VNode<Props>;
  }

  export function h<Props extends {}>(
    tag: Component<Props> | string,
    props: Props,
    children?: Array<VNode | string | number | null>,
  ): VNode<Props>;

  export function h<Props>(
    tag: Component<Props> | string,
    props: null,
    children?: Array<VNode | string | number | null>,
  ): VNode;

  export function patch(
    oldNode: VNode | null,
    newNode: VNode,
    container?: HTMLElement,
  ): Element;
}
