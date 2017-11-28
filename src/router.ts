export const initialState = {
  url: getURL(),
};

export type IState = typeof initialState;
export type IActions = {
  go: (url: string) => (state: IState) => Partial<IState> | undefined;
};

export const actions: IActions = {
  go: url => state => {
    if (url !== getURL()) {
      history.pushState({}, "", url);
    }
    if (url !== state.url) {
      return { url };
    }
    return undefined;
  },
};

// Hot-reloading may add lots of new listeners, so keep track
let oldListener: any;
export const newListener = (go: (path: string) => any) => {
  if (oldListener) removeEventListener("popstate", oldListener);
  oldListener = () => go(getURL());
  addEventListener("popstate", oldListener);
};

/**
 * Returns the url the browser is currently at.
 */
function getURL() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}
