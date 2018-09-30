import React, { Component } from 'react';
import ImageListItem from '../components/ImageListItem';
import { connect } from 'react-redux';

class ImageList extends Component {

    renderList(){
        return this.props.items.map( item => {return <ImageListItem key={item.date_taken + item.title} item = {item} /> });
    }
    
    render(){
        if(this.props.items && this.props.items != null){
           return<div>{this.renderList()}</div>
        }
        
        return <div></div>;
    }

}

function mapStateToProps(state){
    return {
        items : state.items
    };
}

export default connect(mapStateToProps)(ImageList);