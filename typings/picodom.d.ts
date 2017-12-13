declare module "picodom" {
  export interface VNode<Props extends {} = any> {
    type: string;
    props?: Props;
    children: Array<VNode<{}> | string>;
  }

  export interface Component<Props = {}> {
    (props: Props, children?: Array<VNode<{}> | string>): VNode<Props>;
  }

  export function h<Props extends {}>(
    tag: Component<Props> | string,
    props: Props,
    children?: Array<VNode | string | number | null | undefined>,
  ): VNode<Props>;

  export function h<Props>(
    tag: Component<Props> | string,
    props?: Props,
    children?: Array<VNode | string | number | null | undefined>,
  ): VNode;

  export function patch(
    oldNode: VNode | null | undefined,
    newNode: VNode,
    container?: HTMLElement,
  ): Element;
}
