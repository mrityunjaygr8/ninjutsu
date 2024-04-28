/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

import "solid-devtools";

const root = document.getElementById("root");

render(() => <App />, root!);
