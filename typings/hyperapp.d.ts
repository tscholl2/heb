declare module "hyperapp" {
  // h function

  export interface VirtualNode<D = undefined | {}> {
    tag: string;
    data: D;
    children: (VirtualNode | string)[];
  }

  export function h<D>(
    tag: string,
    data?: D,
    ...children: (VirtualNode<any> | string)[]
  ): VirtualNode<D>;

  export function h<D>(
    component: (data?: D, ...children: (VirtualNode<any> | string)[]) => VirtualNode<D>,
    data?: D,
    ...children: (VirtualNode<any> | string)[]
  ): VirtualNode<D>;

  // app function

  export type State = Object;

  // this is how actions are used
  export type Action<D = any> = (data: D) => any;

  export type Actions = { [domain: string]: Action | { [name: string]: Action } };

  // this is how actions are defined
  export type DefAction<S extends State, A extends Actions, D = any> = (
    state: S,
    actions: A,
    data: D,
  ) => Partial<S> | Promise<Partial<S>> | undefined | void;

  export type DefActions<S extends State, A extends Actions> = {
    [domain in keyof A]: { [name in keyof A[domain]]: DefAction<S, A> } | DefAction<S, A>
  };

  // this is how events are defined

  export type Event<S extends State, A extends Actions, DataIn = any, DataOut = DataIn> = (
    state: S,
    actions: A,
    data: DataIn,
  ) => DataOut | void;

  export type DefaultEvents<S extends State, A extends Actions> = {
    load: Event<S, A, HTMLElement, VirtualNode>;
    render: Event<S, A, View<S, A>>;
    action: Event<S, A, { name: string; data: any }>;
    resolve: Event<S, A, any>;
    update: Event<S, A, S, void | boolean>; // (state, actions, nextstate)
  };

  export type Events<S extends State, A extends Actions> = { [name: string]: Event<S, A> };

  export interface View<State, Actions, Data = any> {
    (state: State, actions: Actions): VirtualNode<Data>;
  }

  export type Emit<Events, K extends keyof Events = keyof Events> = (name: K, data?: any) => any;

  export type Mixin<S extends State = {}, A extends Actions = {}, E extends Events<S, A> = {}> = (
    emit: Emit<E & DefaultEvents<S, A>>,
  ) => {
    state?: Partial<S>;
    actions?: Partial<DefActions<S, A>>;
    events?: Partial<E & DefaultEvents<S, A>>;
    mixins?: Array<Mixin<S, any, any>>;
  };

  export function app<S extends State, A extends Actions, E extends Events<S, A>>(app: {
    state?: S;
    actions?: Partial<DefActions<S, A>>;
    events?: Partial<E & DefaultEvents<S, A>>;
    view: View<S, A>;
    mixins?: Array<Mixin<S, A, E & DefaultEvents<S, A>>>;
  }): Emit<E & DefaultEvents<S, A>>;
}
