import React, {useState} from "react";
import Main from "../../pages/Main/Main";
import {Route, Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from "../../pages/Registration/Registration";
import Home from "../../pages/Home/Home";

const App = () => {

  const [shouldShowNameInput, setShouldShowNameInput] = useState(true);

  const showNameInput = () => {
    setShouldShowNameInput(true)
  };

  const hideNameInput = () => {
    setShouldShowNameInput(false)
  };

  return (
    <>
      <Switch>
        <Route exact
               path='/'>
          <Main
            showInput={showNameInput}
            hideNameInput={hideNameInput}/>
        </Route>
        <Route exact
               path='/home'>
          <Home
            showInput={showNameInput}
            hideNameInput={hideNameInput}/>
        </Route>
        <Route exact
               path='/registration'>
          <Registration
            shouldShowNameInput={shouldShowNameInput}>
          </Registration>
        </Route>
        <Route path='/'
               component={Registration}/>
      </Switch>
    </>
  );
};

export default App;
