declare module "hyperapp" {
  // h function

  export interface VirtualNode<D = undefined | {}> {
    tag: string;
    data: D;
    children: (VirtualNode | string)[];
  }

  type Component<I = any, O = I> = (
    data: I,
    ...children: VirtualNode["children"]
  ) => VirtualNode<O>;

  // h("div",undefined,"a","b")
  export function h<D>(tag: string, data?: D, ...children: VirtualNode["children"]): VirtualNode<D>;
  // h("div",undefined,["a","b"])
  export function h<D>(tag: string, data?: D, children?: VirtualNode["children"]): VirtualNode<D>;

  export function h<I, O>(
    component: Component<I, O>,
    data: I,
    ...children: VirtualNode["children"]
  ): VirtualNode<O>;

  export function h<I, O>(
    component: Component<I, O>,
    data: I,
    children: VirtualNode["children"],
  ): VirtualNode<O>;

  // app function

  export type State = Object;

  // this is how actions are used
  export type ActionResult<S extends State> = Partial<S> | void | Promise<Partial<S>>;
  export type Action<S extends State, D = any> = (data: D) => ActionResult<S>;

  // a bundle of actions
  export type Actions<S extends State> = {
    [domain: string]: Action<S> | { [name: string]: Action<S> };
  };

  // this is how actions are defined
  export type DefAction<S extends State, A extends Actions<S>, D = any> = (
    state: S,
    actions: A,
    data: D,
  ) => Partial<S> | Promise<Partial<S>> | undefined | void;

  // a bundle of action definitions
  export type DefActions<S extends State, A extends Actions<S>> = {
    [// TODO: we should be able to get the data type from Action to DefAction, see below
    domain in keyof A]: { [name in keyof A[domain]]: DefAction<S, A> } | DefAction<S, A>
  };

  // this is how events are defined

  export type Event<S extends State, A extends Actions<S>, DataIn = any, DataOut = DataIn> = (
    state: S,
    actions: A,
    data: DataIn,
  ) => DataOut | void;

  export type DefaultEvents<S extends State, A extends Actions<S>> = {
    load: Event<S, A, HTMLElement, VirtualNode>;
    render: Event<S, A, View<S, A>>;
    action: Event<S, A, { name: string; data: any }>;
    resolve: Event<S, A, any>;
    update: Event<S, A, S, void | boolean>; // (state, actions, nextstate)
  };

  export type Events<S extends State, A extends Actions<S>> = { [name: string]: Event<S, A> };

  // View is the root component

  export interface View<State, Actions, Data = any> {
    (state: State, actions: Actions): VirtualNode<Data>;
  }

  // Emit is how events are fired

  export type Emit<E extends { [key: string]: any }> = <K extends keyof E>(
    name: K,
    data?: any,
  ) => any; // TODO can we infer the output somehow?

  // a mixin allows additional actions/events/etc

  export type Mixin<
    S extends State,
    A extends Actions<S>,
    E extends Events<S, A> = Events<S, A> // TODO this isn't very useful
  > = (
    emit: Emit<E & DefaultEvents<S, A>>,
  ) => {
    state?: Partial<S>;
    actions?: Partial<DefActions<S, A>>;
    events?: E;
    mixins?: Array<Mixin<S, any, any>>;
  };

  // how an app is created

  export function app<
    S extends State,
    A extends Actions<S>,
    E extends Events<S, A> = Events<S, A> // TODO this isn't very useful
  >(app: {
    state?: S;
    actions?: Partial<DefActions<S, A>>;
    events?: E;
    view: View<S, A>;
    mixins?: Array<Mixin<S, A>>;
  }): Emit<E & DefaultEvents<S, A>>;
}

/*
// Question: Can we get better types for DefActions?

// Fn1 is a function with a single parameter.
type Fn1<I = any, O = any> = (input: I) => O;
// Fn2 is a function with a two parameters, where the first is always a number.
type Fn2<I = any, O = any> = (x: number, input: I) => O;
// A dictionary of Fn1.
type Fn1Group = { [key: string]: Fn1 };
// goal: extend every function in Fn1Group to accept a number
// as the first parameter and it's original input as the second
// parameter.
type Fn2Group<T extends Fn1Group> = { [key in keyof T]: Fn2 }; // any does not work

// Example:
const A = {
  foo: (y: number) => y,
  bar: (s: string) => s,
};
// B has same keys as A but all functions
// have a second paramater and return type of "any".
declare const B: Fn2Group<typeof A>;
*/
