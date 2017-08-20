export type Params = { [key: string]: string };

// Given a route, this returns a function which matches
// a given path to the route.
// Example: If `route = "/foo/:id"` and `path = "/foo/123"`,
// then the matcher should return `{id: 123}`.
// If path = "/bar/123" then the matcher should return `undefined`.
// This also allows `route = "*"`, which matches all paths
// and has no paramaters.
function routeMatcher(route: string): (path: string) => Params | undefined {
  // Find all the parameter names in the route.
  // The `|| []` allows for `route = "*"`.
  const parameters = /:(\w+)/g.exec(route) || [];
  const re = new RegExp(
    // Build a regexp to compare paths to this route by
    `^${route
      // escaping "/",
      .replace(/\*/g, ".*")
      // replacing parameters with "(\w+)",
      .replace(/\//g, "\\/")
      // and looking for an optional ending slash.
      .replace(/:\w+/g, "(\\w+)")}\\/?$`,
  );
  return path => {
    const m = re.exec(path);
    if (!m) {
      return;
    }
    // If the regexp matches the path, then it has the same number of
    // capture groups as `paramaters`. So we go through in order and
    // "zip" the lists into an object. For example, ["id"],["123"] ---> {"id":"123"}.
    // If the route has no paramaters but matches (e.g. `"*"`), then
    // the matcher will return `{}`.
    return parameters.slice(1).reduce((p, n, i) => Object.assign(p, { [n]: m[i + 1] }), {});
  };
}

// Given a list of routes, this will return a function
// that matches a given path to the first route.
// That function will return the index of the match
// along with the matched parameters.
export function routesMatcher(
  routes: Array<string>,
): (path: string) => { index: number; params: Params } | undefined {
  const matchers = routes.map(routeMatcher);
  return (path: string) => {
    for (let i = 0; i < matchers.length; i++) {
      const params = matchers[i](path);
      if (params) {
        return { index: i, params };
      }
    }
    return;
  };
}
