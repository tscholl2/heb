import { test } from "tape";
import { PartialReducer, SliceReducer } from "./plugins";

test("return partial state", t => {
  const r = PartialReducer(s => ({ b: s.b + 1 }));
  // reducer only updates .b
  t.deepEqual(r({ a: "a", b: 0 }), { a: "a", b: 1 });
  t.end();
});

test("return slice state", t => {
  const r = SliceReducer(["c", "b"])(s => ({ a: s.a + 1 }));
  // updates slice at .c.b even though reducer only see's about .a
  t.deepEqual(r({ c: { b: { a: 3 } } }), { c: { b: { a: 4 } } });
  // does not merge
  t.deepEqual(r({ c: { b: { a: 3, x: 7 } } }), { c: { b: { a: 4 } } });
  t.end();
});
