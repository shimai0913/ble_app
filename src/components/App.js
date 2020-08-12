import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NewAppBar from './AppBar';
import Home from './Home';
import Setting from './Setting';


function App(props) {

  return (
    <div>
      <NewAppBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Setting" component={Setting} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
export default App;
