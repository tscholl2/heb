import { test } from "tape";
import { setIn } from "./persist";

test("setIn", t => {
  [
    {
      input: { obj: { a: { b: { c: 3 } } }, path: ["a", "b", "c"], value: 8 },
      output: { a: { b: { c: 8 } } },
    },
  ].forEach(a =>
    t.deepEqual(setIn(a.input.obj, a.input.path, a.input.value), a.output, JSON.stringify(a.input)),
  );
  t.end();
});
