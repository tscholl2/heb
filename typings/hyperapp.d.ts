// "hyperapp": "git://github.com/tscholl2/hyperapp.git",

declare module "hyperapp" {
  export interface LifeCycleMethods<D> {
    oncreate?(node: Element): void;
    onupdate?(node: Element, oldData: D): void;
    onremove?(node: Element, done: () => void): void;
  }

  export interface VirtualNode<D = {} | undefined> {
    tag: string;
    data: D;
    children: VirtualNodeChildren | VirtualNodeChild;
  }
  export type VirtualNodeChild = VirtualNode | string | number | undefined;
  export interface VirtualNodeChildren extends Array<VirtualNodeChildren | VirtualNodeChild> { }

  export function h<D>(
    tag: string,
    data?: LifeCycleMethods<LifeCycleMethods<D> & D> & D,
    children?: VirtualNode["children"],
  ): VirtualNode<LifeCycleMethods<D> & D>;

  type IComponent<P, O = any> = (
    props: P & LifeCycleMethods<O>,
    children?: VirtualNodeChildren | VirtualNodeChild,
  ) => VirtualNode<O> | undefined;

  export function h<I, O>(
    component: IComponent<I, O>,
    data: I,
    children?: VirtualNode["children"],
  ): VirtualNode<O>;

  export type IState = Object;

  export type IActionResult<S extends IState> =
    | Partial<S>
    | Promise<Partial<S>>
    | void
    | Promise<void>;

  export type IAction<S extends IState, D = any> =
    | ((data: D) => IActionResult<S>)
    | ((data: D) => (state: S) => IActionResult<S>)
    | ((data: D) => (state: S) => (actions: IActions<S>) => IActionResult<S>);

  export type IActions<S extends IState> = {
    [key: string]: IAction<S> | IActions<any>;
  };

  export function app<S extends IState, A extends IActions<S>>(app: {
    state: S;
    actions: A;
    view: (state: S) => (actions: A) => VirtualNode;
  }): A;
}
