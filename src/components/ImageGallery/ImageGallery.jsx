import { Component } from "react";
import axios from "axios";
import { MutatingDots } from 'react-loader-spinner'
import PropTypes from "prop-types";

export const KEY_API = "35689360-928715b1acfc50b960ec2f2b7";
export const URL_API = "https://pixabay.com/api/?";

export default class ImageGallery extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    loadedImages: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  
  state = {
    isLoading: false,
    selectedImage: null,
    page: 1,
    loadedImages: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.name !== this.props.name ||
      prevProps.page !== this.props.page ||
      prevProps.loadedImages.length !== this.props.loadedImages.length
    ) {
      this.setState({ isLoading: true, page: this.props.page });
      try {
        const response = await axios.get(
          `${URL_API}q=${this.props.name}&page=${this.props.page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.props.loadedImages(response.data.hits);
        this.setState((prevState) => ({
          loadedImages: [...prevState.loadedImages, ...response.data.hits],
          isLoading: false,
        }));
      } catch (error) {
        console.log(error);
        this.setState({ isLoading: false });
      }
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.name !== prevState.name) {
      return {
        loadedImages: [],
        page: 1,
        name: nextProps.name
      };
    }
    return null;
  }

  render() {
    const { isLoading, loadedImages } = this.state;

    return (
      <>
        {isLoading ? (
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="spiner"
            visible={true}
          />
        ) : (
          <ul className="gallery">
         {loadedImages.map((image) => {
          return (
           <li key={image.id} className="gallery-item">
           <img
          src={image.webformatURL}
          alt={image.tags}
          className="imageGalleryItem-image"
          onClick={() => this.props.onClick(image.largeImageURL)}
        />
      </li>
    );
  })}
</ul>
        )}
      </>
    );
  }
}