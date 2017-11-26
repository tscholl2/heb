// "hyperapp": "git://github.com/tscholl2/hyperapp.git",

declare module "hyperapp" {
  export interface LifeCycleMethods<D> {
    oncreate?(node: Element): any;
    onupdate?(node: Element, oldData: D): any;
    onremove?(node: Element): any;
  }

  export interface VirtualNode<D = {} | undefined> {
    tag: string;
    data: D;
    children: VirtualNodeChildren | VirtualNodeChild;
  }
  export type VirtualNodeChild = VirtualNode | string | number | undefined;
  export interface VirtualNodeChildren extends Array<VirtualNodeChildren | VirtualNodeChild> {}

  export function h<D>(
    tag: string,
    data?: LifeCycleMethods<LifeCycleMethods<D> & D> & D,
    children?: VirtualNode["children"],
  ): VirtualNode<LifeCycleMethods<D> & D>;
  
  type Component<P, O = P> = (
    props: P & LifeCycleMethods<O>,
    children?: VirtualNodeChildren | VirtualNodeChild,
  ) => VirtualNode<O> | undefined;

  export function h<I, O>(
    component: Component<I, O>,
    data: I,
    children?: VirtualNode["children"],
  ): VirtualNode<O>;

  export type State = Object;

  export type ActionResult<S extends State> =
    | Partial<S>
    | Promise<Partial<S>>
    | void
    | Promise<void>;
  export type UserDefinedAction<S extends State, D = any> = (data: D) => ActionResult<S>;
  export type UserDefinedActions<S extends State> = {
    [key: string]: UserDefinedAction<S> | UserDefinedActions<S>;
  };
  export type AppDefinedAction<S extends State, A extends UserDefinedActions<S>, D = any> = (
    state: S,
    actions: A,
  ) => UserDefinedAction<S, D>;
  export type AppDefinedActions<S extends State, A extends UserDefinedActions<S>> = {
    [key in keyof A]: ((state: S, actions: A) => A[key]) | AppDefinedActions<S, any>
  };

  export function app<S extends State, A extends UserDefinedActions<S>>(app: {
    view: (state: S, actions: A) => VirtualNode;
    state: S;
    actions: AppDefinedActions<S, A>;
  }): A;
}
