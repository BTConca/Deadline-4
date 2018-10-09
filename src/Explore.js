import React, { Component } from 'react';
import Nav from './Nav.js';
import Results from './Results.js';

// Add search field feature.The field should be visible only in the 'Search' route.

export default class Explore extends Component {

    state = {
        query: '',
    };
    render() {
        return (
            <div >
                <Nav />
                <Results query={this.state.query} api={this.props.api} />
            </div>
        );
    }
}
