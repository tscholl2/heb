import { h } from "picodom";
import { asyncComponent } from "../async-component";

export interface IMarkdownProps {
  markdown: string;
}

export const Markdown = asyncComponent<IMarkdownProps>(
  props =>
    new Promise(resolve =>
      setTimeout(() => resolve(h("p", undefined, [`done: ${props.markdown}`])), 2000),
    ),
  () => h("progress"),
);
