import "./style.scss";
import { samples } from "./";
import "./imports";

const sidebar = document.querySelector("#container>nav")!;
sidebar.innerHTML = "";
const ul = document.createElement("ul");

Object.keys(samples).forEach(s => {
  const li = document.createElement("li");
  li.onclick = () => {
    history.pushState({}, "", samples[s].name);
    update();
  };
  li.innerText = samples[s].name;
  ul.appendChild(li);
});
sidebar.appendChild(ul);

function update() {
  const path = location.pathname;
  const name = Object.keys(samples).find(s => `/${s}` === path);
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
