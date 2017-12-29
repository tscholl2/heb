declare module "picodom" {
  export interface VNode<Props extends {} = any> {
    type: string;
    props?: Props;
    children: Array<VNode<{}> | string>;
  }

  export interface LifeCycleEvents<Props = any> {
    /**
     * Fired after the element is created and attached to the DOM.
     */
    oncreate?(el: HTMLElement): void;
    /**
     * Fired after the element attributes are updated.
     * This event will fire even if the attributes have not changed.
     */
    onupdate?(el: HTMLElement, oldProps: Props): void;
    /**
     * Fired before the element is removed from the DOM.
     * Return a function that takes a remove() function and use it to remove the element asynchronously.
     */
    onremove?(el: HTMLElement): void | ((remove: () => void) => void);
  }

  export interface Component<Props = {}> {
    (props: Props, children?: Array<VNode | string>): VNode;
  }

  export function h<Props = {}>(
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
