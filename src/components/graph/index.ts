import { h } from "hyperapp";
import { memoize } from "../../utils/memoize";

import "./style.scss";

export const evaluate = memoize((f: string, a = 0, b = 20, N = 100) => {
  f = f
    .replace(/\^/g, "**")
    .replace(/(sin|cos|tan)/g, "Math.$1")
    .replace(/pi/g, "Math.PI");
  return new Array(N)
    .fill(null)
    .map((_, i) => a + (b - a) * i / (N - 1))
    .map(x => [x, parseFloat(eval(f.replace("x", `(${x})`)))]);
});

export interface IGraphProps {
  f: string;
  a: number;
  b: number;
  N: number;
  update(
    v: Partial<{
      f: string;
      a: number;
      b: number;
      N: number;
    }>,
  ): any;
}

export function Graph(props: IGraphProps) {
  const { f = "10*sin(x)", a = 0, b = 10, N = 100, update } = props;
  let graph: any;
  try {
    const data = evaluate(f, a, b, N);
    data.forEach((P, i) => {
      if (isNaN(P[0]) || isNaN(P[1])) {
        throw new Error(`NaN at ${i}`);
      }
    });
    const xMin = Math.min(...data.map(P => P[0]));
    const xMax = Math.max(...data.map(P => P[0]));
    const yMin = Math.min(...data.map(P => P[1]));
    const yMax = Math.max(...data.map(P => P[1]));
    graph = h(
      "svg",
      {
        width: "100",
        height: "100",
        viewBox: `${xMin - 0.5} ${yMin - 0.5} ${xMax - xMin + 1} ${yMax - yMin + 1}`,
        transform: "scale(1,-1)",
      },
      [
        h(
          "g",
          {
            strokeWidth: "0.1",
            fill: "none",
          },
          [
            h("path", { stroke: "black", d: `M 0,${yMin - 1} L 0,${yMax + 1}` }),
            h("path", { stroke: "black", d: `M ${xMin - 1},0 L ${xMax + 1},0` }),
            h("path", {
              stroke: "blue",
              d: data.map((P, i) => `${i === 0 ? "M" : "L"}${P[0]},${P[1]}`).join(" "),
            }),
          ],
        ),
      ],
    );
  } catch (e) {
    graph = h("div", { color: "red" }, `${e}`);
  }
  return h("div", undefined, [
    h("label", undefined, [
      "f(x) = ",
      h("input", {
        type: "text",
        oninput: (e: any) => update({ f: e.target.value }),
        value: f,
      }),
    ]),
    ["a", "b", "N"].map(k =>
      h("label", undefined, [
        k,
        h("input", {
          type: "number",
          value: (props as any)[k],
          oninput: (e: any) => update({ [k]: parseInt(e.target.value, 10) }),
        }),
      ]),
    ),
    graph,
  ]);
}
