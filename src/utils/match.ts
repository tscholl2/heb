export function match(pathname: string, routes: Array<string>) {
  var match;
  var index;
  var params: { [key: string]: string } = {};

  for (var i = 0; i < routes.length && !match; i++) {
    var route = routes[i];
    var keys: Array<string> = [];

    pathname.replace(
      RegExp(
        route === "*"
          ? ".*"
          : "^" +
            route.replace(/\//g, "\\/").replace(/:([\w]+)/g, function(_, key) {
              keys.push(key);
              return "([-\\.%\\w]+)";
            }) +
            "/?$",
        "g",
      ),
      function() {
        for (var j = 1; j < arguments.length - 2; ) {
          params[keys.shift()!] = arguments[j++];
        }
        match = route;
        index = i;
      } as any,
    );
  }

  return {
    match: match,
    index: index,
    params: params,
  };
}
