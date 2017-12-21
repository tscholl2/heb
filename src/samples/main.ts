import "./style.scss";
import { getSamples } from "./";
import "./imports";

const ul = document.createElement("ul");
getSamples().forEach(s => {
  const li = document.createElement("li");
  li.onclick = () => {
    const host = document.querySelector("#host")!;
    host.innerHTML = "";
    // TODO: try shadow dom?
    // const shadow = host.attachShadow({ mode: "open" });
    // TODO: iframe is probably better
    s.render(host as any);
  };
  li.innerText = s.name;
  ul.appendChild(li);
});
document.getElementById("sidebar")!.appendChild(ul);
