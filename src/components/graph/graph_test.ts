import { test } from "tape";
import { evaluate } from "./index";

test("graphing function", t => {
  [
    { input: ["x", 0, 1, 2], output: [[0, 0], [1, 1]] },
    { input: ["x", 0, 2, 3], output: [[0, 0], [1, 1], [2, 2]] },
    { input: ["x^2", 0, 3, 2], output: [[0, 0], [3, 9]] },
  ].forEach(
    (a: any) => t.deepEqual((evaluate as any)(...a.input), a.output, a.input) || t.comment(a.input),
  );
  t.end();
});
