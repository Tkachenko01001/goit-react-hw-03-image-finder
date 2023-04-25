import { Component } from "react";
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal'
import LoadMore from "./LoadMore/LoadMore";
import axios from "axios";
import { URL_API, KEY_API } from "./ImageGallery/ImageGallery";
import PropTypes from "prop-types";

class App extends Component {
  state = {
    name: '',
    showModal: false,
    selectedImage: null,
    loadedImages: [],
    page: 1,
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.setState({ showModal: false });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = (name) => {
    this.setState({
      name: name,
      loadedImages: [],
      page: 1,
    });
  };

  handleImageClick = (imageUrl) => {
    this.setState({ selectedImage: imageUrl }, () => {
      this.toggleModal();
    });
  };

  handleLoadMoreClick = async () => {
    const { name, page, loadedImages, searchId } = this.state;
    try {
      const response = await axios.get(
        `${URL_API}q=${name}&page=${page + 1}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits;
      if (this.state.searchId === searchId) {
        this.setState({
          loadedImages: [...loadedImages, ...newImages],
          page: page + 1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleImages = (loadedImages) => {
    this.setState({ loadedImages: loadedImages });
  }

  render() {
    const { showModal, selectedImage, loadedImages, page } = this.state;

    return (
      <>
        <SearchBar submit={this.handleFormSubmit} />
        <ImageGallery
          name={this.state.name}
          onClick={this.handleImageClick}
          loadedImages={this.handleImages}
          page={page}
        />
        {loadedImages.length > 0 && (
          <LoadMore click={this.handleLoadMoreClick} page={page} />
        )}
        {showModal && (
          <Modal selectedImage={selectedImage} onCloseModal={this.toggleModal} />
        )}
      </>
    );
  }
}

App.propTypes = {
  name: PropTypes.string,
  showModal: PropTypes.bool,
  selectedImage: PropTypes.string,
  loadedImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  page: PropTypes.number,
};

export default App;