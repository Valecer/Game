import React from 'react';
import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter,Switch,Route} from "react-router-dom";
import register from "./autentif/register";
import help from "./help/help";
import login from "./autentif/login";
import Cat from "./cat";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
          <Navbar/>
          <Cat/>
          <Switch>
              <Route>
                  <Route path="/help" component={help}/>
                  <Route path="/signin" component={login}/>
                  <Route path="/signup" component={register}/>
              </Route>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
