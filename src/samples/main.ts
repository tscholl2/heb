import "./style.scss";
import { samples } from "./";
import "./imports";

function update() {
  const sidebar = document.querySelector("#container>nav")!;
  sidebar.innerHTML = "";
  const ul = document.createElement("ul");
  for (const k in samples) {
    const { name, filename } = samples[k];
    const li = document.createElement("li");
    li.onclick = () => {
      history.pushState({}, "", `${location.pathname}?name=${encodeURIComponent(name)}`);
      update();
    };
    li.innerText = name;
    li.title = filename;
    ul.appendChild(li);
  }
  sidebar.appendChild(ul);
  const m = /name=([^\&]+)/g.exec(location.search);
  const path = m ? m[1] : "";
  const name = Object.keys(samples).find(k => k === path);
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
