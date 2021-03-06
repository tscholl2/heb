import { addStatefullSample } from "../../../samples";
// import { Markdown } from "./";
const { Markdown } = require("./index2.4.ts");
import { h } from "picodom";

addStatefullSample<{ value: string; fake: number }>(
  "markdown",
  dispatch => (s = { value: "", fake: 0 }) =>
    h("div", undefined, [
      h("h1", undefined, [s.fake]),
      h("button", { onclick: () => dispatch(() => ({ ...s, fake: s.fake + 1 })) }, ["counter"]),
      h("br"),
      h(
        "button",
        {
          style: { width: "200px", height: "200px" },
          onclick: () => dispatch(() => ({ ...s, value: s.value === "1+1" ? "2+2" : "1+1" })),
        },
        ["toggle"],
      ),
      h("br"),
      h("h1", undefined, [s.value]),
      Markdown({ markdown: s.value }), //, update: () => dispatch(s => Object.assign({}, s)) }),
    ]),
);
