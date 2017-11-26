const state = {
  url: getURL(),
};

const actions = {
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

function getURL() {
  const p = location.pathname;
  const s = location.search ? `?${location.search}` : "";
  const h = location.hash ? `#${location.hash}` : "";
  return `${p}${s}${h}`;
}

export const newModule = () => ({ state, actions });

export const newListener = ({ router: { go } }: any) =>
  addEventListener("popstate", () => go(getURL()));
