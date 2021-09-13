import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import getCharacters from "./components/getCharacters";
import navImage from "./images/nav-image.png";

const App: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#808080" }}>
      <BrowserRouter>
        <nav
          className="navbar navbar-expand navbar-dark"
          style={{ backgroundColor: "#009ABF" }}
        >
          <div className="navbar-nav mr-5" style={{ justifyContent: "center" }}>
            <img
              src={navImage}
              alt="Ricky and Morty nav"
              style={{
                width: "50%",
                height: "70%",
              }}
            />
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path={["/", "/characters"]}
              component={getCharacters}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
