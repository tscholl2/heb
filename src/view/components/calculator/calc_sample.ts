import { addStatefullSample } from "../../../samples";
import { Calculator } from "./";

addStatefullSample<string>("calculator", dispatch => (value = "") =>
  Calculator({ value, onchange: s => dispatch(() => s) }),
);
