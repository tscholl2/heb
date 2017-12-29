import { addStatefullSample } from "../../../samples";
// import { Markdown } from "./";
const { Markdown } = require("./index3.ts");
import { h } from "picodom";

addStatefullSample<{ value: string }>("markdown", (s = { value: "" }, dispatch) =>
  h("div", undefined, [
    h(
      "button",
      {
        style: { width: "200px", height: "200px" },
        onclick: () => dispatch(() => ({ value: s.value === "1+1" ? "2+2" : "1+1" })),
      },
      ["toggle"],
    ),
    h("br"),
    Markdown({ markdown: s.value, update: () => dispatch(s => Object.assign({}, s)) }),
  ]),
);
