import React from 'react';
import Photo from './Photo.js';

// Display the data.Make sure each image gets a unique "key" prop.
// There should be no console warnings regarding unique "key" props.
// The title of each image list should be displayed dynamically via "props".

const PhotoList = (props) => {
    const results = props.photos,
        query = props.query;
    let searchResults = results.map(photo =>
        <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />
    );
        return (
            <div className="photo-container">
                <h2>{query}</h2>
                <ul>
                    {searchResults}
                </ul>
            </div>
        );
}

export default PhotoList;
