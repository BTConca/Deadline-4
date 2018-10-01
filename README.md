# flickr-api-search
Treehouse Front End Web Development Project 11

### Project Overview

-   #### Set up your project with create-react-app.

-   #### Build your app components according to the provided mockup. Most components should be stateless functional components that focus on the UI rather than behavior. You'll need:

    -   A container component that takes in a keyword and api key as props, and fetches the photos and other required information from the API
    -   A navigation menu component
    -   A component for each category you wish to display. For example, a Sunset component, a Flowers component, and a Clouds component.
    
````
componentDidMount() {
  if (this.props.query !== "") {
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.props.api}&tags=${this.props.query}&per_page=16&format=json&nojsoncallback=1`)
          .then(response => {
              this.setState({
                  keyword: this.props.query,
                  photos: response.data.photos.photo,
                  loading: false
              })
          })
          .catch(error => {
              console.log('Error fetching and parsing data', error);
          });
  }
}
````

````

// A navigation menu component

const Nav = () => {

  return (
      <div>
          <nav className="main-nav">
              <ul>
                  <li>
                      <Link to="/cats">Cats</Link>
                  </li>
                  <li>
                      <Link to="/dogs">Dogs</Link>
                  </li>
                  <li>
                      <Link to="/computers">Computers</Link>
                  </li>
              </ul>
          </nav>
      </div>
  );
}

export default Nav;
````

-   #### Update the CSS to style the app in a way that resembles the mockup.

-   #### Install React Router and set up your and components.

````
import React from 'react';

// Install React Router and set up your and components.

import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Search from './Search.js';

// Get a Flickr API key

import apiKey from './config.js';
import Cats from './Cats.js';
import Computers from './Computers.js';
import Dogs from './Dogs.js';
import NotFound from './NotFound.js';

const App = () =>{

    return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => (<Search api={apiKey} />)}/>
          <Route path="/cats" render={() => (<Cats api={apiKey} />)} />
          <Route path="/computers" render={() => (<Computers api={apiKey} />)} />
          <Route path="/dogs" render={() => (<Dogs api={apiKey} />)} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }

export default App;
````
You'll import your API into your application and save it to a variable like you would any other module, and use the variable where applicable. That way, your app's users will only need to enter in an API key once. When you submit this project for grading, your project reviewer will create their own config.js file and use their own API key to run the project.

-   #### Fetch the data from Flickr API. Make sure data fetching and state is managed by a higher-level "container" component. We recommend using <https://www.flickr.com/services/api/explore/flickr.photos.search>. Enter a tag to search for, such as "sunsets." You may also want to limit the number of results using the per_page argument. Choose JSON as the output, then "Do not sign call." Click "Call Method." At the bottom of the page, you'll see an example of the API call you'll need to make. You can click on the URL to see what the response will look like.

-   #### Display the data. Make sure each image gets a unique "key" prop. There should be no console warnings regarding unique "key" props. The title of each image list should be displayed dynamically via "props".

````
render() {

  //Add a loading indicator that displays each time the app fetches new data.

  if (this.state.loading === true && this.props.query !=='') {
      return (
          <div>
              <img src={Loading} alt="Loading Results" />
          </div>
      );

      } else {

          // Include a 404-like error route that displays when a URL path does not match a route.

      if (this.state.photos.length === 0 && this.state.keyword !== '') {
          return (<NoResults />);
      } else {
          return (
              <PhotoList photos={this.state.photos} query={this.state.keyword} />
          );
      }
}
````

-   #### Add search field feature. The field should be visible only in the 'Search' route.

````
render() {
  return (
      <div>
          <form className="search-form" onSubmit={this.handleSubmit}>
              <input type="search" name="search" placeholder="Search" onChange={this.onSearchChange} />
              <button type="submit" className="search-button">
                  <img src={icon} alt="search icon" />
              </button>
          </form>
          <Nav />
          <Results query={this.state.query} api={this.props.api} />
      </div>
  );
}
````
