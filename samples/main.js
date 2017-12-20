import { h, patch } from "picodom";
import "./style.scss";


// TODO: generate these from _sample.* files

const samples = [
  { name: "button", sample: root => patch(undefined, h("button", undefined, ["clickme"]), root) },
  { name: "p", sample: root => patch(undefined, h("p", undefined, ["paragraph"]), root) },
];

const ul = document.createElement("ul");
samples.forEach(s => {
  const li = document.createElement("li");
  li.onclick = () => {
    document.querySelector("#host").remove();
    const host = document.createElement("div");
    host.id = "host";
    document.getElementById("container").appendChild(host);
    // TODO: iframe is probably better
    const shadow = host.attachShadow({ mode: "open" });
    s.sample(shadow);
  };
  li.innerText = s.name;
  ul.appendChild(li);
});
document.getElementById("sidebar").appendChild(ul);
