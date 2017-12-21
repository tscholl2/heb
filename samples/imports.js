// TODO: generate these from _sample.* files
import { h, patch } from "picodom";
import sample1 from "./test";

export const samples = [
  { name: "button", sample: root => patch(undefined, h("button", undefined, ["clickme"]), root) },
  { name: "p", sample: root => patch(undefined, h("p", undefined, ["paragraph"]), root) },
  sample1,
];
