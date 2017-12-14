import { test } from "tape";
import { PartialReducer, PartialSliceReducer, SliceReducer } from "./plugins";
import * as icepick from "icepick";

test("return partial state", t => {
  // only updates .b
  let r = PartialReducer(s => ({ b: s.b + 1 }));
  t.deepEqual(r({ a: "a", b: 0 }), { a: "a", b: 1 });
  // non-function
  r = PartialReducer<any>({ b: { c: 7 } });
  t.deepEqual(r({ b: { c: 3, d: 4 } }), { b: { c: 7, d: 4 } });
  // creates nested objects if necessary
  r = PartialReducer<any>(() => ({ a: { b: { c: 7 } } }));
  t.deepEqual(r({ y: 7 }), { a: { b: { c: 7 } }, y: 7 });
  t.end();
});

test("return slice state", t => {
  const r = SliceReducer(["c", "b"])((s: any) => ({ a: s.a + 1 }));
  // updates slice at .c.b even though reducer only see's about .a
  t.deepEqual(r({ c: { b: { a: 3 } } }), { c: { b: { a: 4 } } });
  // does not merge
  t.deepEqual(r({ c: { b: { a: 3, x: 7 } } }), { c: { b: { a: 4 } } });
  t.end();
});

test("return partial slice state", t => {
  let r = PartialSliceReducer(["a", "b"])({ z: 3 });
  t.deepEqual(r({ a: { b: { x: 3 } } }), { a: { b: { x: 3, z: 3 } } });
  r = PartialSliceReducer(["a", "b"])(() => ({ z: 3 }));
  t.deepEqual(r({ a: { b: { x: 3 } } }), { a: { b: { x: 3, z: 3 } } });
  t.deepEqual(r({ a: {} }), { a: { b: { z: 3 } } });
  r = PartialSliceReducer(["a", "b"])(() => [1, 3]);
  t.deepEqual(r({}), { a: { b: [1, 3] } });
  t.deepEqual(r({ a: { b: [3, 4, 5] }, c: 8 }), { a: { b: [1, 3, 5] }, c: 8 });
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
