import { h } from "picodom";
import { IDispatch, actions } from "../controller";
import { CombineReducers } from "../controller/plugins";
import { initialState, IState } from "../model";
import { StaticSwitch } from "./components/switch";
import { Calculator } from "./components/calculator";
import { bindDebug as bind } from "../controller/actions";

const AccountIconSVG = require("./components/account-icon.svg");
const MenuIconSVG = require("./components/menu-icon.svg");

import cc from "classcat";
import "./style.scss";

const Switch = StaticSwitch(["/page:id", "/calculator", "*"]);

export function view(dispatch: IDispatch<IState>) {
  // bind actions
  const B = {
    onTitleInput: (e: any) => actions.update(_ => ({ title: e.target.value })),
    addOneToCount: () => actions.update((s: any) => ({ count: s.count + 1 })),
    addOneToCountLater: () => setTimeout(A.addOneToCount, 1000),
    goToFoo: () => CombineReducers<IState>([actions.go("/foo"), B.closeNavigation()]),
    goToCalc: () => CombineReducers<IState>([actions.go("/calculator"), B.closeNavigation()]),
    goToGraph: () => CombineReducers<IState>([actions.go("/graph"), B.closeNavigation()]),
    goToPg3: () => CombineReducers<IState>([actions.go("/page3"), B.closeNavigation()]),
    updateCalc: (value: string) => actions.updateIn(["calculator"])({ value }),
    closeNavigation: () =>
      actions.updateIn(["ui"])({
        obfuscateOn: false,
        topNavigationOpen: false,
        sideNavigationOpen: false,
      }),
    openTopNav: () => actions.updateIn(["ui"])({ topNavigationOpen: true, obfuscateOn: true }),
    openSideNav: () => actions.updateIn(["ui"])({ sideNavigationOpen: true, obfuscateOn: true }),
  };
  const A = bind(dispatch)(B);
  return (state = initialState) =>
    h("div", { class: "container" }, [
      h("header", undefined, [
        h("span", undefined, [
          h("button", { onclick: A.openSideNav }, [h("img", { src: MenuIconSVG })]),
        ]),
        h("h1", undefined, ["Sample App"]),
        h("span", undefined, [
          h("button", { onclick: A.openTopNav }, [h("img", { src: AccountIconSVG })]),
        ]),
      ]),
      h("nav", { class: cc(["side-nav", { ["nav-open"]: state.ui.sideNavigationOpen }]) }, [
        h("button", { onclick: A.goToCalc }, ["Calculator"]),
        h("button", { onclick: A.goToGraph }, ["Graph"]),
        h("button", { onclick: A.goToPg3 }, ["About"]),
      ]),
      h("nav", { class: cc(["top-nav", { ["nav-open"]: state.ui.topNavigationOpen }]) }, [
        h("ul", undefined, [
          h("li", undefined, ["item1"]),
          h("li", undefined, ["item2"]),
          h("li", undefined, ["item3"]),
        ]),
      ]),
      h(
        "main",
        undefined,
        [
          h("h1", undefined, [state.title]),
          h("input", { value: state.title, oninput: A.onTitleInput }),
          h("h1", undefined, [state.router.path]),
          h("button", { onclick: A.goToFoo }, ["→"]),
          h("h1", undefined, [state.count]),
          h("button", { onclick: A.addOneToCount }, ["↑ now"]),
          h("button", { onclick: A.addOneToCountLater }, ["↑ late"]),
          Switch({
            path: state.router.path,
            components: [
              ({ params }) => h("h6", undefined, [`Page #${params.id}`]),
              () => Calculator({ value: state.calculator.value, onchange: A.updateCalc }),
              () => h("h1", undefined, ["page not found"]),
            ],
          }),
        ].concat(new Array(100).fill(h("h1", undefined, ["block"]))),
      ),
      h("footer", undefined, ["Footer"]),
      // portals
      h("div", {
        class: cc(["obfuscatsion", { ["obfuscatsion-on"]: state.ui.obfuscateOn }]),
        onclick: A.closeNavigation,
      }),
      h("div", { class: cc(["modal", { "modal-on": false }]) }, [
        h("div", { style: { backgroundColor: "white", width: "800px", height: "400px" } }, [
          "this is a test",
        ]),
      ]),
    ]);
}
