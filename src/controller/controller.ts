export type ISyncReducer<S = any> = (state: Readonly<S>) => S;
export type IAsyncReducer<S = any> = (state: Readonly<S>) => Promise<S>;
export type IReducer<S = any> = ISyncReducer<S> | IAsyncReducer<S>;
export type IDispatch<S = any> = (reducer: IReducer<S>) => void;
export type IListener<S = any> = (state: Readonly<S>, dispatch: IDispatch<S>) => void;
export type IPlugin<S = any> = (reducer: IReducer<S>) => IReducer<S>;

export class Controller<S> {
  private state: Readonly<S>;
  private isUpdating: boolean;
  private shouldUpdate: boolean;
  private plugins: IPlugin<S>[];
  private listeners: IListener<S>[] = [];
  constructor(plugins: IPlugin<S>[] = []) {
    this.plugins = plugins;
  }

  public getState = () => this.state;

  public addListener = (listener: IListener<S>) => {
    this.listeners.push(listener);
  };

  public removeListener = (listener: IListener<S>) => {
    this.listeners = this.listeners.filter(l => l !== listener);
  };

  public dispatch = async (reducer: IReducer<S>) => {
    this.plugins.forEach(p => (reducer = p(reducer)));
    const result = await reducer(this.state);
    // important: state should be immutable
    if (this.state !== result) {
      this.state = result;
      this.update();
    }
  };

  private update() {
    if (this.isUpdating) {
      this.shouldUpdate = true;
      return;
    }
    this.isUpdating = true;
    // TODO compare requestAnimationFrame and setTimeout
    requestAnimationFrame(() => {
      this.listeners.forEach(l => l(this.state, this.dispatch));
      this.isUpdating = false;
      if (this.shouldUpdate) {
        this.shouldUpdate = false;
        this.update();
      }
    });
    /*
      setTimeout(() => {
        this.listeners.forEach(l => l(this.state, this.dispatch));
        this.isUpdating = false;
        if (this.shouldUpdate) {
          this.shouldUpdate = false;
          this.update();
        }
      }, 17);
    }
    */
  }
}
