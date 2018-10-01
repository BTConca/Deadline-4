import React, { Component } from 'react';
import icon from './search.svg';
import Nav from './Nav.js';
import Results from './Results.js';

// Add search field feature.The field should be visible only in the 'Search' route.

export default class Search extends Component {

    state = {
        query: '',
    };

    passThrough = {
        input: ''
    };

    onSearchChange = e => {
        this.passThrough.input = e.target.value;
    };

    handleSubmit = e => {
        e.preventDefault();
        e.currentTarget.reset();
        this.setState({ query: this.passThrough.input });
    };

    render() {
        return (
            <div>

                <Nav />
                <Results query={this.state.query} api={this.props.api} />
            </div>
        );
    }
}
