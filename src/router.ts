export const initialState = {
  url: getURL(),
};

export type IState = typeof initialState;

export const actions = {
  go: (url: string) => (state: IState) => {
    if (url !== getURL()) {
      history.pushState({}, "", url);
    }
    if (url !== state.url) {
      return { url };
    }
    return undefined;
  },
};

export type IActions = {
  go: (url: string) => any;
};

// Hot-reloading may add lots of new listeners, so keep track
let oldListener: any;
export const newListener = ({ router: { go } }: any) => {
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
