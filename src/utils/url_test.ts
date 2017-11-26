import { test } from "tape";

test("timing test", t => {
  t.plan(2);
  t.equal(typeof Date.now, "function");
  var start = Date.now();
  setTimeout(function() {
    t.equal(Date.now() - start, 100);
  }, 100);
});

/*
declare const describe: (description: string, test: () => void) => void;
declare const it: (description: string, test: () => void) => void;
declare const require: (s: string) => any;
const { deepStrictEqual } = require("assert");
const { routesMatcher } = require("./url");

describe("addition", () => it("1+1 = 2", () => deepStrictEqual(1 + 1, 2)));


const matcher = routesMatcher(["/foo/:id", "/bar/:id1/:id2", "/zoo", "/goo:id"]);
describe("routes matches", () => {
  it("/foo/2", () => deepStrictEqual(matcher("/foo/2"), { index: 0, params: { id: "2" } }));
  it("works", () =>
    deepStrictEqual(matcher("/bar/3/5"), { index: 1, params: { id1: "3", id2: "5" } }));
  it("works", () => deepStrictEqual(matcher("/foo/1"), { index: 0, params: { id: "1" } }));
  it("works", () => deepStrictEqual(matcher("/zoo"), { index: 0, params: {} }));
  it("works", () => deepStrictEqual(matcher("/goo"), undefined));
  it("works", () => deepStrictEqual(matcher("/zoo/1"), undefined));
  it("works", () => deepStrictEqual(matcher("/bar/3"), undefined));
  it("works", () => deepStrictEqual(matcher("/goo7"), { index: 3, params: { id: "7" } }));
});
*/
