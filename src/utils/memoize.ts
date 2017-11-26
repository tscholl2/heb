/**
 * Returns a (very simple) memoized version of the given function.
 * Uses shallow comparison on the arguments.
 * @param {function} fn
 * @returns {function}
 */
export function memoize<T>(fn: T): T {
  let input: any;
  let output: any;
  return function(...args: any[]) {
    // not optimal shallow comparison
    if (
      input === undefined ||
      args.length !== input.length ||
      args.reduce((p, n, i) => p || n !== input[i], false)
    ) {
      input = args;
      output = (fn as any)(...args);
    }
    return output;
  } as any;
}
