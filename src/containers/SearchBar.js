import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchImage } from '../actions/index';
import { bindActionCreators } from 'redux';
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = { searchTerm : '' };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }
  render() {
    return (
      <div className="search-container">
        <input value={this.state.searchTerm} placeholder="Enter search text" className="search-text-box"
          onChange={this.handleSearchTermChange} onKeyPress={this.onKeyPress.bind(this)} type="text" />
        <button onClick={ ()=> this.props.fetchImage(this.state.searchTerm) } className="btn-primary button">Search</button>
      </div>
    );
  }

  handleSearchTermChange(event){
    console.log("search term changed");
    this.setState( {searchTerm:event.target.value} );
  } 

  onKeyPress(e){
    if (e.key === 'Enter') {
      console.log('onEnterKeyPress ..');
      this.props.fetchImage(this.state.searchTerm);
    }
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators( { fetchImage }, dispatch );
}

export default connect(null, mapDispatchToProps)(SearchBar);
