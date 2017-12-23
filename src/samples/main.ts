import "./style.scss";
import { samples } from "./";
import "./imports";

const sidebar = document.querySelector("#container>nav")!;
sidebar.innerHTML = "";
const ul = document.createElement("ul");
for (const k in samples) {
  const { name, filename } = samples[k];
  const li = document.createElement("li");
  li.onclick = () => {
    history.pushState({}, "", name);
    update();
  };
  li.innerText = name;
  li.title = filename;
  ul.appendChild(li);
}
sidebar.appendChild(ul);

function update() {
  const path = location.pathname;
  const name = Object.keys(samples).find(k => `/${k}` === path);
  if (name === undefined) {
    return;
  }
  document.querySelector("#container>main")!.remove();
  const host = document.createElement("main");
  document.querySelector("#container")!.appendChild(host);
  // TODO: try shadow dom?
  // const shadow = host.attachShadow({ mode: "open" });
  // TODO: iframe is probably better
  samples[name].render(host);
}

addEventListener("popstate", update);

update();
