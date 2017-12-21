import "./style.scss";
import { getSamples } from "./sampler";
import "./imports";

const ul = document.createElement("ul");
getSamples().forEach(s => {
  const li = document.createElement("li");
  li.onclick = () => {
    document.querySelector("#host")!.remove();
    const host = document.createElement("div");
    host.id = "host";
    document.getElementById("container")!.appendChild(host);
    // TODO: iframe is probably better
    const shadow = host.attachShadow({ mode: "open" });
    s.render(shadow as any);
  };
  li.innerText = s.name;
  ul.appendChild(li);
});
document.getElementById("sidebar")!.appendChild(ul);
