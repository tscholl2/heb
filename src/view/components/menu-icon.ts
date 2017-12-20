import { h } from "picodom";
import { h } from "picodom";

// import url from "./menu-icon.svg":
const url = require("./menu-icon.svg");

export const MenuIcon = () => h("img", { src: "dist/" + url });

/*
const fs = require("fs");
// Read contents as a string
declare const __dirname: string;
const svg = fs.readFileSync(__dirname + "/menu-icon.svg", "utf8");

export const MenuIcon = () => h("img", { src: `data:image/svg+xml;base64,${btoa(svg)}` });

*/
