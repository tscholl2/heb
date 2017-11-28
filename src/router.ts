export const initialState = {
  path: getCurrentPath(),
};

export type IState = typeof initialState;
export type IActions = {
  go: (url: string) => (state: IState) => Partial<IState> | undefined;
};

export const actions: IActions = {
  go: path => state => {
    if (path !== getCurrentPath()) {
      history.pushState({}, "", path);
    }
    if (path !== state.path) {
      return { path };
    }
    return undefined;
  },
};

// Hot-reloading may add lots of new listeners, so keep track.
// Typically this should only run once.
let oldListener: any;
export const newListener = (go: (path: string) => any) => {
  if (oldListener) removeEventListener("popstate", oldListener);
  oldListener = () => go(getCurrentPath());
  addEventListener("popstate", oldListener);
};

/**
 * Returns the url the browser is currently at.
 */
function getCurrentPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}
