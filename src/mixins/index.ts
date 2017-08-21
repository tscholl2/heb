import { Mixin } from "hyperapp";
import { State } from "../state";
import { Actions } from "../actions";
import hmr from "hyperapp-webpack-hmr";
import { Promises } from "./promises";
import { Widgets } from "./widgets";
import { Router } from "./router";

const HMRMixin = hmr({ name: "state" }) as Mixin<State, Actions>;

export const mixins = [HMRMixin, Router, Promises, Widgets];
