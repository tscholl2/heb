export const initialState = {
  url: getURL(),
};

export type IState = typeof initialState;

export const actions = {
  go: (state: any) => (url: string) => {
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
  go: (url: string) => Partial<IState>;
};

function getURL() {
  const p = location.pathname;
  const s = location.search ? `?${location.search}` : "";
  const h = location.hash ? `#${location.hash}` : "";
  return `${p}${s}${h}`;
}

// Hot-reloading may add lots of new listeners, so keep track
let oldListener: any;
export const newListener = ({ router: { go } }: any) => {
  if (oldListener) removeEventListener("popstate", oldListener);
  oldListener = () => go(getURL());
  addEventListener("popstate", oldListener);
};
