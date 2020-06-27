import React from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";
import "./tabs.css"
import App from "./App";
import Tabs from "./components/Tabs"
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route } from "react-router-dom";
import DashboardTab from "./pages/DashboardTab";
import SettingsTab from "./pages/SettingsTab"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Tabs>
          <div label="Dashboard">
            <Route key="index" exact path="/" component={DashboardTab} />
          </div>
          <div label="Settings">
            <SettingsTab />
          </div>
        </Tabs>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
