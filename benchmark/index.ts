import * as Benchmark from "benchmark";
import * as icepick from "icepick";
// import * as immutable from "immutable";

// given a list [3,4,10]
// return object which has 3 keys, each of which is an object with 4 keys,
// each of which is an object with 10 keys, each of which contains a random
// number, string, or boolean.
const sampleObj = (sizes: number[] = []): any => {
  if (sizes.length === 0) {
    const x = Math.random();
    if (x < 0.3) {
      return Math.random() < 0.5;
    }
    if (x < 0.6) {
      return `${Math.random()}`;
    }
    return Math.random();
  }
  const obj: any = {};
  for (let i = 0; i < sizes[0]; i++) {
    obj[`k${i}`] = sampleObj(sizes.slice(1));
  }
  return obj;
};

const getIn = (obj: any, path: string[]) => path.reduce((p, n) => p[n], obj);
const setIn = (obj: any, path: string[], val: any): any =>
  path.length > 0 ? { ...obj, ...{ [path[0]]: setIn(obj[path[0]], path.slice(1), val) } } : val;
function setIn2(obj: any, path: string[], val: any): any {
  if (path.length === 0) {
    return val;
  }
  const x = path.shift()!;
  const o: any = {};
  if (!obj.hasOwnProperty(x)) {
    obj[x] = {};
  }
  Object.keys(obj).forEach(k => {
    if (k === x) {
      o[x] = setIn2(obj[x], path, val);
    } else {
      o[k] = obj[k];
    }
  });
  return o;
}

const obj = sampleObj([2, 100, 100, 1, 1]);
// const iobj = immutable.fromJS(obj);
new Benchmark.Suite()
  .add("get: vanilla", () => {
    obj.k0.k0.k0.k0.k0;
  })
  .add("get: custom", () => {
    getIn(obj, ["k0", "k0", "k0", "k0", "k0"]);
  })
  .add("get: icepick", () => {
    icepick.getIn(obj, ["k0", "k0", "k0", "k0", "k0"]);
  })
  /*
  .add("get: immutable", () => {
    iobj.getIn(["k0", "k0", "k0", "k0", "k0"]);
  })
  */
  .add("set: vanilla (non-immutable)", () => {
    obj.k0.k0.k0.k0.k0 = 7;
  })
  .add("set: custom", () => {
    setIn(obj, ["k0", "k0", "k0", "k0", "k0"], 7);
  })
  .add("set: custom 2", () => {
    setIn2(obj, ["k0", "k0", "k0", "k0", "k0"], 7);
  })
  .add("set: icepick", () => {
    icepick.setIn(obj, ["k0", "k0", "k0", "k0", "k0"], 7);
  })
  /*
  .add("set: immutable", () => {
    iobj.setIn(["k0", "k0", "k0", "k0", "k0"], 7);
  })
  */
  // add listeners
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  // run async
  .run({ async: false });
