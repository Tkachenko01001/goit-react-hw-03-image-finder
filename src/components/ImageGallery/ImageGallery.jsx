import { Component } from "react";
import PropTypes from "prop-types";

export default class ImageGallery extends Component {

  static propTypes = {
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {

    return (
      <>
          <ul className="gallery">
         {this.props.images.map((image) => {
          return (
           <li key={image.id} className="gallery-item">
           <img
          src={image.webformatURL}
          alt={image.tags}
          className="imageGalleryItem-image"
          onClick={(e) => this.props.onClick(e, image.largeImageURL)}
        />
      </li>
    );
  })}
</ul></>);
  }
}