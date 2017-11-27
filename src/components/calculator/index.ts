import { h } from "hyperapp";

import "./style.scss";

export const initialState = { value: "" };

export type IState = typeof initialState;

export type IActions = {
  update<S extends Partial<IState>>(s: S): S;
};

export const actions = { update: () => (s: Partial<IState>) => s };

export interface ICalculatorProps {
  state: IState;
  actions: IActions;
}

export function Calculator({ state: { value }, actions: { update } }: ICalculatorProps) {
  const B = (c: string, f?: any) =>
    h(
      "button",
      { class: "calculator-button", onclick: f ? f : () => update({ value: value + c }) },
      c,
    );
  const R = (children: any) => h("div", { class: "calculator-buttons-row" }, children);
  return h("div", { class: "calculator-container" }, [
    h("code", { class: "calculator-screen" }, value),
    h("div", { class: "calculator-buttons-container" }, [
      R([B("0"), B("1"), B("2"), B("3")]),
      R([B("4"), B("5"), B("6"), B("7")]),
      R([B("8"), B("9"), B("+"), B("-")]),
      R([
        B("*"),
        B("/"),
        B("clear", () => update({ value: "" })),
        B("=", () => update({ value: `${eval(value)}` })),
      ]),
    ]),
  ]);
}
