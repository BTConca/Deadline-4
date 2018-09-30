import React from "react";
import "./ImageListItem.css";

const ImageListItem = props => {
  return (
    <div className="card">
      <div className="card-block">
        <h6 className="card-title">{ props.item.title}</h6>
      </div>
      <img className="card-img-bottom card-img" src={props.item.media.m} alt="{props.item.title}" />
    </div>
  );
};

export default ImageListItem;
