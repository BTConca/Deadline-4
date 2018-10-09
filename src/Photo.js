import React, { Component } from 'react';
import Nav from './Nav.js';
import './Photo.css'

export default class Photo extends Component {
    render() {
        return (
            <div className="Photobody" >
                <Nav />
                  <img src={this.props.location.src} alt="" key={this.props.location.id} />
            </div>
        )
    }
}
