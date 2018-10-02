import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import NoResults from './NoResults.js';
import Loading from './Flickr.svg';
import 'intersection-observer';
import Gallery from 'react-grid-gallery';

// Build your app components according to the provided mockup.
// Most components should be stateless functional components that focus on the UI rather than behavior.You’ll need:

// A container component that takes in a keyword and api key as props,
// and fetches the photos and other required information from the API


class Results extends Component {

    constructor() {
        super();
        //Lets us use the keyword this inside the constructor within the context of the App
        //class rather than the parent component class we're extending from React.
        //So now in the constructor, we can write this.state and set it equal to an object.
        //Now the state in our app is going to be the photo data we want to display.
        this.state = {
            keyword: '',
            photos: [],
            noResults: false,
            loading: false,
            page: 1,
            prevY: 0,
            nextHref : null
        }
    }


    // Fetch the data from Flickr API.
    // Make sure data fetching and state is managed by a higher- level “container” component.

    getSize(id)
    {
      var size = {
        width : 240,
        height : 240
      }
      var label = [];
      axios.get(' https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${this.props.api}&photo_id=${id}&format=json&nojsoncallback=1')
          .then( response =>
      {
        label = response.data.sizes;
      });


      label.map(i => {
        if(i.size.label === "Thumbnail")
        {

          size.width = i.width;
          size.heght = i.heght;
        }
        else
        {

          size.width = 340;
          size.heght = 250;
        };
    });
    return (
      <a>{label}</a>
    );
    }

    loadItems(page) {
      this.setState(
        {
          loading : true
        }
      );
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${this.props.api}&per_page=20&page=${page}&format=json&nojsoncallback=1`)
            .then( response  => {
                      this.setState({
                        photos: [... this.state.photos,...response.data.photos.photo],
                        loading: false
                    });
                    var tracks = [];
                    this.state.photos.map(track => {

                    track.src = `https://farm${track.farm}.staticflickr.com/${track.server}/${track.id}_${track.secret}.jpg`;
                    track.thumbnail = `https://farm${track.farm}.staticflickr.com/${track.server}/${track.id}_${track.secret}_m.jpg`;
                    var size = this.getSize(43202453550);
                    track.thumbnailWidth = size.width;
                    track.thumbnailHeight = size.height;
                    track.customOverlay = (
                      <div key = {track.id} style={captionStyle}>
                      <div>{track.title}</div>
                      <div
                      style={customTitle}>
                      owner : {track.owner}
                      </div>
                      <div
                      style={customTitle}>
                      Views : {track.id % 3}
                      </div>
                          </div>);
                    tracks.push(track);
                    });
                    this.setState({
                      photos : tracks
                    });

                }
            );
    }


    handleObserver(entities, observer) {
      const y = entities[0].boundingClientRect.y;
      if (this.state.prevY > y) {
        const lastUser = this.state.page;
        const curPage = lastUser + 1;
        this.loadItems(curPage);
        this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

    componentDidMount() {
      this.loadItems(this.state.page);

      var options = {
        root: null, // Page as root
        rootMargin: '0px',
        threshold: 1.0
      };

        this.observer = new IntersectionObserver(
        this.handleObserver.bind(this), //callback
        options
      );

      this.observer.observe(this.loadingRef);
    }
    // Fetch the data from Flickr API.
    // Make sure data fetching and state is managed by a higher- level “container” component.


    setCustomTags (i) {

                    return (<div
                            key={i.id}>
                            <div
                            style={customTitle}>
                            Title : {i.Owner}
                            </div>
                            </div>
                          );
        };

    render() {

        //Add a loading indicator that displays each time the app fetches new data.
        const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
        const loadingCSS = {
          height: '100px',
          margin: '30px'
        };
        const loader = <div className="loader" key = {0}>Loading ...</div>;


                return (
                  <div className="container">
                  <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
                <Gallery
            images={this.state.photos}
            enableImageSelection={false}/>
                </div>
                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                    >
                    <span style={loadingTextCSS}>Loading...</span>
                    </div>
                    </div>
                  );
    }
}

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
      position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

Results.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
        src: PropTypes.string.isRequired,
         thumbnail: PropTypes.string.isRequired,
         thumbnailWidth: PropTypes.number.isRequired,
         thumbnailHeight: PropTypes.number.isRequired
        })
    ).isRequired
};

const customTitle = {
    wordWrap: "break-word",
    display: "inline-block",
    backgroundColor: "white",
    height: "auto",
    fontSize: "75%",
    fontWeight: "600",
    lineHeight: "1",
    padding: ".2em .6em .3em",
    borderRadius: ".25em",
    color: "black",
    verticalAlign: "baseline",
    margin: "2px"
};
export default Results;
