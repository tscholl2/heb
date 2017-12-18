import { h } from "picodom";
import { IDispatch, actions } from "../controller";
import { initialState, IState } from "../model";
import { StaticSwitch } from "./components/switch";
import { MenuIcon } from "./components/menu-icon";
import { AccountIcon } from "./components/account-icon";
import { Calculator } from "./components/calculator";
import cc from "classcat";
import "./style.scss";

const Switch = StaticSwitch(["/page:id", "/calculator", "*"]);

export function view(dispatch: IDispatch<IState>) {
  // bind actions
  const onTitleInput = (e: any) => dispatch(actions.update(_ => ({ title: e.target.value })));
  const goToFoo = () => dispatch(actions.go("/foo"));
  const addOneToCount = () => dispatch(actions.update((s: any) => ({ count: s.count + 1 })));
  const addOneToCountLater = () => setTimeout(addOneToCount, 1000);
  const goToCalc = () => dispatch(actions.go("/calculator"));
  const goToGraph = () => dispatch(actions.go("/graph"));
  const goToPg3 = () => dispatch(actions.go("/page3"));
  const updateCalc = (value: string) => dispatch(actions.updateIn(["calculator"])({ value }));
  const closeObf = () =>
    dispatch(
      actions.update<IState>(state => {
        if (state.ui.navigationOpen) {
          return { ui: { obfuscateOn: false, navigationOpen: false } };
        }
        return;
      }),
    );
  const openNav = () =>
    dispatch(actions.updateIn(["ui"])({ navigationOpen: true, obfuscateOn: true }));
  return (state = initialState) =>
    h("div", { class: "container" }, [
      h("header", undefined, [
        h("span", undefined, [h("button", { onclick: openNav }, [MenuIcon()])]),
        h("h1", undefined, ["Sample App"]),
        h("span", undefined, [h("button", { onclick: openNav }, [AccountIcon()])]),
      ]),
      h("nav", { class: cc([{ ["nav-open"]: state.ui.navigationOpen }]) }, [
        h("button", { onclick: goToCalc }, ["Calculator"]),
        h("button", { onclick: goToGraph }, ["Graph"]),
        h("button", { onclick: goToPg3 }, ["About"]),
      ]),
      h(
        "main",
        undefined,
        [
          h("h1", undefined, [state.title]),
          h("input", { value: state.title, oninput: onTitleInput }),
          h("h1", undefined, [state.router.path]),
          h("button", { onclick: goToFoo }, ["→"]),
          h("h1", undefined, [state.count]),
          h("button", { onclick: addOneToCount }, ["↑ now"]),
          h("button", { onclick: addOneToCountLater }, ["↑ late"]),
          Switch({
            path: state.router.path,
            components: [
              ({ params }) => h("h6", undefined, [`Page #${params.id}`]),
              () => Calculator({ value: state.calculator.value, onupdate: updateCalc }),
              () => h("h1", undefined, ["page not found"]),
            ],
          }),
        ].concat(new Array(100).fill(h("h1", undefined, ["block"]))),
      ),
      h("footer", undefined, ["Footer"]),
      // portals
      h("div", {
        class: cc(["obfuscatsion", { ["obfuscatsion-on"]: state.ui.obfuscateOn }]),
        onclick: closeObf,
      }),
      h("div", { class: cc(["modal", { "modal-on": false }]) }, [
        h("div", { style: { backgroundColor: "white", width: "800px", height: "400px" } }, [
          "this is a test",
        ]),
      ]),
    ]);
}
