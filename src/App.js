import React from 'react';

// Install React Router and set up your and components.

import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Search from './Search.js';

// Get a Flickr API key

import apiKey from './config.js';
import NotFound from './NotFound.js';

const App = () =>{

    return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => (<Search api={apiKey} />)}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }

export default App;
