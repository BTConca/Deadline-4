import React from 'react';

// Install React Router and set up your and components.

import { BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import './App.css';
import Explore from './Explore.js';
import Search from './Search.js';
import Photo from './Photo.js'
// Get a Flickr API key

import apiKey from './myconfig.js';
import NotFound from './NotFound.js';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
const App = () =>{

    return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" render={(props) => (<Explore {...props} api={apiKey} />)}/>
          <Route  path="/search" render={(props) => (<Search {...props} api={apiKey} />)} />
          <Route  path="/photo" render={(props) => (<Photo {...props} api={apiKey} />)} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }

export default App;
