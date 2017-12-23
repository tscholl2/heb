// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {

},{}],12:[function(require,module,exports) {
"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(n,r){"object"==("undefined"==typeof exports?"undefined":e(exports))&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(n.picodom={})}(void 0,function(e){function n(e,n){var r={};for(var o in e)r[o]=e[o];for(var o in n)r[o]=n[o];return r}function r(e,n){if("string"==typeof e)var t=document.createTextNode(e);else{t=(n=n||"svg"===e.type)?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type);e.props&&e.props.oncreate&&l.push(function(){e.props.oncreate(t)});for(var p=0;p<e.children.length;p++)t.appendChild(r(e.children[p],n));for(var p in e.props)o(t,p,e.props[p])}return t}function o(e,r,o,t){if("key"===r);else if("style"===r)for(var r in n(t,o=o||{}))e.style[r]=o[r]||"";else{try{e[r]=o}catch(e){}"function"!=typeof o&&(o?e.setAttribute(r,o):e.removeAttribute(r))}}function t(e,n,r){function o(){e.removeChild(n)}r&&r.onremove&&"function"==typeof(r=r.onremove(n))?r(o):o()}function p(e){if(e&&e.props)return e.props.key}function i(e,f,u,c,s,y){if(null==u)f=e.insertBefore(r(c,s),f);else if(null!=c.type&&c.type===u.type){(function(e,r,t){for(var p in n(r,t)){var i=t[p],f="value"===p||"checked"===p?e[p]:r[p];i!==f&&o(e,p,i,f)}t&&t.onupdate&&l.push(function(){t.onupdate(e,r)})})(f,u.props,c.props),s=s||"svg"===c.type;for(var d=c.children.length,a=u.children.length,v={},h=[],m={},g=0;g<a;g++){var b=h[g]=f.childNodes[g];null!=(B=p(x=u.children[g]))&&(v[B]=[b,x])}g=0;for(var S=0;S<d;){b=h[g];var x=u.children[g],k=c.children[S];if(m[B=p(x)])g++;else{var w=p(k),A=v[w]||[];null==w?(null==B&&(i(f,b,x,k,s),S++),g++):(B===w?(i(f,A[0],A[1],k,s),g++):A[0]?(f.insertBefore(A[0],b),i(f,A[0],A[1],k,s)):i(f,b,null,k,s),S++,m[w]=k)}}for(;g<a;){var B;null==(B=p(x=u.children[g]))&&t(f,h[g],x.props),g++}for(var g in v){var N=(A=v[g])[1];m[N.props.key]||t(f,A[0],N.props)}}else f&&c!==f.nodeValue&&("string"==typeof c&&"string"==typeof u?f.nodeValue=c:(f=e.insertBefore(r(c,s),y=f),t(e,y,u.props)));return f}var f,u=[],l=[];e.h=function(e,n){var r,o=[];for(f=arguments.length;f-- >2;)u.push(arguments[f]);for(;u.length;)if(Array.isArray(r=u.pop()))for(f=r.length;f--;)u.push(r[f]);else null!=r&&!0!==r&&!1!==r&&o.push("number"==typeof r?r+="":r);return"string"==typeof e?{type:e,props:n||{},children:o}:e(n||{},o)},e.patch=function(e,n,r,o){for(var t=i(r||(r=document.body),r.children[0],e,n);o=l.pop();)o();return t}});
},{}],14:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(){var t=this;this.plugins=[],this.listeners=[],this.getState=function(){return t.state},this.dispatch=function(e){t.plugins.forEach(function(t){return e=t(e)});var i=e(t.state);t.state!==i&&(t.state=i,t.update())}}return t.prototype.addPlugin=function(t){this.plugins.push(t)},t.prototype.removePlugin=function(t){this.plugins=this.plugins.filter(function(e){return e!==t})},t.prototype.addListener=function(t){this.listeners.push(t)},t.prototype.removeListener=function(t){this.listeners=this.listeners.filter(function(e){return e!==t})},t.prototype.update=function(){var t=this;this.isUpdating?this.shouldUpdate=!0:(this.isUpdating=!0,requestAnimationFrame(function(){t.listeners.forEach(function(e){return e(t.state,t.dispatch)}),t.isUpdating=!1,t.shouldUpdate&&(t.shouldUpdate=!1,t.update())}))},t}();exports.Controller=t;
},{}],16:[function(require,module,exports) {
"use strict";function t(t){n&&removeEventListener("popstate",n),n=function(){return t(e())},addEventListener("popstate",n)}function e(){return""+window.location.pathname+window.location.search+window.location.hash}Object.defineProperty(exports,"__esModule",{value:!0}),exports.addListener=t;var n,o=exports.initialState={path:e()},r=exports.go=function(t){return function(n){return t!==e()&&history.pushState({},"",t),t!==n.path?{path:t}:n}};
},{}],18:[function(require,module,exports) {
"use strict";function t(t,e){return(e||[]).reduce((t,e)=>{if(t)return t[e]},t)}function e(t,e){return Object.keys(e).reduce((t,r)=>n.assoc(t,r,e[r]),t)}function r(t,e,o){return null==t||null==e?t:Object.keys(e).reduce((t,i)=>{const u=e[i],a=t[i],p=o?o(a,u,i):u;return c(u)&&c(a)?p===a?t:Array.isArray(u)?n.assoc(t,i,p):s(t,i,r(a,p,o)):s(t,i,p)},t)}function s(t,e,r){return t[e]===r?t:n.assoc(t,e,r)}const n=exports,o=t=>t,c=t=>null!==t&&(Array.isArray(t)||i(t)),i=t=>"object"==typeof t&&t.constructor===Object&&Object.getPrototypeOf(t)===Object.prototype,u=(t,e)=>{let r,s;if(Array.isArray(t))for(r=t.length;r--;)e(r);else for(r=(s=Object.keys(t)).length;r--;)e(s[r])},a=t=>{const e={},r=Object.keys(t);let s,n=r.length;for(;n--;)e[s=r[n]]=t[s];return e},p=t=>Array.isArray(t)?t.slice():a(t),f=o,l=o,h=[],x=t=>{if(h.some(e=>e===t))throw new Error("object has a reference cycle");return h.push(t),u(t,e=>{const r=t[e];c(r)&&x(r)}),h.pop(),Object.freeze(t),t};exports.freeze=o,exports.thaw=function t(e){if(!c(e)||!Object.isFrozen(e))return e;const r=Array.isArray(e)?new Array(e.length):{};return u(e,s=>{r[s]=t(e[s])}),r},exports.assoc=function(t,e,r){if(t[e]===r)return l(t);const s=p(t);return s[e]=f(r),l(s)},exports.set=exports.assoc,exports.dissoc=function(t,e){const r=p(t);return delete r[e],l(r)},exports.unset=exports.dissoc,exports.assocIn=function t(e,r,s){const o=r[0];return 1===r.length?n.assoc(e,o,s):n.assoc(e,o,t(e[o]||{},r.slice(1),s))},exports.setIn=exports.assocIn,exports.getIn=t,exports.updateIn=function(e,r,s){const o=t(e,r);return n.assocIn(e,r,s(o))},["push","unshift","pop","shift","reverse","sort"].forEach(t=>{exports[t]=function(e,r){const s=[...e];return s[t](f(r)),l(s)},exports[t].displayName="icepick."+t}),exports.splice=function(t,...e){const r=[...t],s=e.map(f);return r.splice.apply(r,s),l(r)},exports.slice=function(t,e,r){const s=t.slice(e,r);return l(s)},["map","filter"].forEach(t=>{exports[t]=function(e,r){const s=r[t](e);return l(s)},exports[t].displayName="icepick."+t}),exports.extend=exports.assign=function(t,...r){const s=r.reduce(e,t);return l(s)},exports.merge=r;const y={value:function(){return this.val},thru:function(t){return this.val=f(t(this.val)),this}};Object.keys(exports).forEach(t=>{t.match(/^(map|filter)$/)?y[t]=function(e){return this.val=exports[t](e,this.val),this}:y[t]=function(...e){return this.val=exports[t](this.val,...e),this}}),exports.chain=function(t){const e=Object.create(y);return e.val=t,e};
},{}],17:[function(require,module,exports) {
"use strict";function e(e){return function(r){var t="function"==typeof e?e(r):e;return void 0===r?t:null==t?r:(0,n.merge)(r,t)}}function r(e){return function(r){return function(t){return(0,n.setIn)(t,e,r((0,n.getIn)(t,e)))}}}function t(e){return function(r){return e.reduce(function(e,r){return r(e)},r)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.PartialSliceReducer=void 0,exports.PartialReducer=e,exports.SliceReducer=r,exports.CombineReducerList=t;var n=require("icepick"),u=exports.PartialSliceReducer=function(t){return function(n){return r(t)(e(n))}};
},{"icepick":18}],15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.actions=void 0;var e=require("../addons/router"),r=require("./plugins"),t=exports.actions={go:function(t){return(0,r.SliceReducer)(["router"])((0,e.go)(t))},updateCalculator:function(e){return(0,r.SliceReducer)(["calculator"])(function(){return{value:e}})},update:r.PartialReducer,updateIn:r.PartialSliceReducer};
},{"../addons/router":16,"./plugins":17}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./controller");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})});var r=require("./actions");Object.defineProperty(exports,"actions",{enumerable:!0,get:function(){return r.actions}});
},{"./controller":14,"./actions":15}],6:[function(require,module,exports) {
"use strict";function e(e){Object.keys(i).forEach(function(t){return i[t].filename=i[t].filename||e})}function t(e,t){i[e]={name:e,render:t,filename:""}}function n(e,n){t(e,function(e){return(0,o.patch)(void 0,n(),e)})}function r(e,n){t(e,function(e){var t,r=new a.Controller,i=function(r,a){return(0,o.patch)(t,t=n(r,a),e)};r.addListener(i),r.addListener(function(e){return history.pushState({},"",""+location.pathname+location.search+"#"+btoa(JSON.stringify(e)))});var s=window.location.hash.substr(1);""!==s?r.dispatch(function(){return JSON.parse(atob(s))}):i(void 0,r.dispatch)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.samples=void 0,exports._addSampleFilename=e,exports.addStatelessSample=n,exports.addStatefullSample=r;var o=require("picodom"),a=require("../controller"),i=exports.samples={};
},{"picodom":12,"../controller":13}],9:[function(require,module,exports) {
module.exports="41a531b35152bbe3ca9bfda8581cc225.svg";
},{}],7:[function(require,module,exports) {
"use strict";function t(t,e){return void 0===t&&(t=0),(0,n.h)("div",void 0,[(0,n.h)("h1",void 0,["counter"]),(0,n.h)("button",{onclick:e},["↑"]),(0,n.h)("h2",void 0,[t])])}var n=require("picodom"),e=require("./");(0,e.addStatelessSample)("img",function(){return(0,n.h)("img",{src:"dist/"+require("../view/components/account-icon.svg")})}),(0,e.addStatefullSample)("counter",function(n,e){return void 0===n&&(n=0),t(n,function(){return e(function(){return n+1})})}),(0,e.addStatelessSample)("button",function(){return(0,n.h)("button",void 0,["clickme"])}),(0,e.addStatelessSample)("p",function(){return(0,n.h)("p",void 0,["paragraph"])});
},{"./":6,"../view/components/account-icon.svg":9,"picodom":12}],10:[function(require,module,exports) {
"use strict";function Calculator(_a){var _b=_a.value,value=void 0===_b?"":_b,onchange=_a.onchange,B=function(o,c){return(0,_picodom.h)("button",{class:"calculator-button",onclick:c||function(){return onchange(value+o)}},[o])},R=function(o){return(0,_picodom.h)("div",{class:"calculator-buttons-row"},o)};return(0,_picodom.h)("div",{class:"calculator-container"},[(0,_picodom.h)("code",{class:"calculator-screen"},[value]),(0,_picodom.h)("div",{class:"calculator-buttons-container"},[R([B("0"),B("1"),B("2"),B("3")]),R([B("4"),B("5"),B("6"),B("7")]),R([B("8"),B("9"),B("+"),B("-")]),R([B("*"),B("/"),B("c",function(){return onchange("")}),B("=",function(){return onchange(""+eval(value))})])])])}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Calculator=Calculator;var _picodom=require("picodom");require("./style.scss");
},{"./style.scss":4,"picodom":12}],8:[function(require,module,exports) {
"use strict";var r=require("../../../samples"),e=require("./");(0,r.addStatefullSample)("calculator",function(r,u){return void 0===r&&(r=""),(0,e.Calculator)({value:r,onchange:function(r){return u(function(){return r})}})});
},{"./":10,"../../../samples":6}],5:[function(require,module,exports) {
"use strict";var e=require("./");require("../../src/samples/test_sample.ts"),(0,e._addSampleFilename)("../../src/samples/test_sample.ts"),require("../../src/view/components/calculator/calc_sample.ts"),(0,e._addSampleFilename)("../../src/view/components/calculator/calc_sample.ts");
},{"./":6,"../../src/samples/test_sample.ts":7,"../../src/view/components/calculator/calc_sample.ts":8}],2:[function(require,module,exports) {
"use strict";function e(){var t=document.querySelector("#container>nav");t.innerHTML="";var r=document.createElement("ul"),a=function(t){var a=n.samples[t],i=a.name,o=a.filename,c=document.createElement("li");c.onclick=function(){history.pushState({},"",location.pathname+"?name="+encodeURIComponent(i)),e()},c.innerText=i,c.title=o,r.appendChild(c)};for(var i in n.samples)a(i);t.appendChild(r);var o=/name=([^\&]+)/g.exec(location.search),c=o?o[1]:"",m=Object.keys(n.samples).find(function(e){return e===c});if(void 0!==m){document.querySelector("#container>main").remove();var l=document.createElement("main");document.querySelector("#container").appendChild(l),n.samples[m].render(l)}}require("./style.scss");var n=require("./");require("./imports"),addEventListener("popstate",e),e();
},{"./style.scss":4,"./imports":5,"./":6}]},{},[2])