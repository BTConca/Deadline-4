import React from 'react';

// Display the data.Make sure each image gets a unique "key" prop.
// There should be no console warnings regarding unique "key" props.
// The title of each image list should be displayed dynamically via "props".

const Photo = props => (
    <li key={props.id}>
        <img src={props.url} alt="" key={props.id} />
    </li>
);

export default Photo;