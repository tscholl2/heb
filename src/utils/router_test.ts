import { test } from "tape";
import { routesMatcher } from "./router";

test("route matcher", t => {
  const matcher = routesMatcher(["/foo/:id", "/bar/:id1/:id2", "/zoo", "/goo:id"]);
  [
    { input: "/foo/2", output: { index: 0, params: { id: "2" }, match: "/foo/2" } },
    { input: "/bar/3/5", output: { index: 1, params: { id1: "3", id2: "5" }, match: "/bar/3/5" } },
    { input: "/foo/1", output: { index: 0, params: { id: "1" }, match: "/foo/1" } },
    { input: "/zoo", output: { index: 2, params: {}, match: "/zoo" } },
    { input: "/goo", output: undefined },
    { input: "/zoo/1", output: { index: 2, params: {}, match: "/zoo/" } },
    { input: "/bar/3", output: undefined },
    { input: "/goo7", output: { index: 3, params: { id: "7" }, match: "/goo7" } },
    { input: "/foo/1/bar", output: { index: 0, params: { id: "1" }, match: "/foo/1/" } },
  ].forEach(a => t.deepEqual(matcher(a.input), a.output, a.input));
  t.end();
});
