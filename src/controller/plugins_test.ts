import { test } from "tape";
import { PartialReducer, SliceReducer } from "./plugins";
import * as icepick from "icepick";

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

test("getIn", t => {
  t.deepEqual(icepick.getIn({ a: { b: 7 } }, ["a"]), { b: 7 });
  t.deepEqual(icepick.getIn({ a: { b: 7 } }, ["a", "b"]), 7);
  const obj = { a: { b: 7 } };
  t.deepEqual(icepick.getIn(obj, ["a"]), obj.a);
  t.end();
});

test("setIn", t => {
  t.deepEqual(icepick.setIn({ a: { b: 1 } }, ["a"], 3), { a: 3 });
  t.deepEqual(icepick.setIn({ a: { b: 7 } }, ["a", "b"], 8), { a: { b: 8 } });
  t.deepEqual(icepick.setIn({}, ["a", "b"], 4), { a: { b: 4 } });
  const obj1 = { a: { x: 7 }, b: { y: 11 } };
  const obj2 = icepick.setIn(obj1, ["a", "x"], 2);
  t.notOk(obj1 === obj2);
  t.notOk(obj1.a === obj2.a);
  t.notOk(obj1.a.x === obj2.a.x);
  t.ok(obj1.b === obj2.b);
  t.end();
});
