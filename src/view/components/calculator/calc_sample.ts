import { addStatefullSample } from "../../../samples";
import { Calculator } from "./";

addStatefullSample<string>("calculator", (value = "", dispatch) =>
  Calculator({ value, onchange: s => dispatch(() => s) }),
);
