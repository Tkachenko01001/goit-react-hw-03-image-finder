import { Component } from "react";
import { MutatingDots } from 'react-loader-spinner'
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal'
import LoadMore from "./LoadMore/LoadMore";

const KEY_API = "35689360-928715b1acfc50b960ec2f2b7";
const URL_API = "https://pixabay.com/api/?";

class App extends Component {
  state = {
    name: '',
    showModal: false,
    selectedImage: null,
    images: [],
    page: 1,
    isloading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      this.setState({isloading: true});
  
      fetch(
        `${URL_API}q=${this.state.name}&page=${this.state.page}&key=${KEY_API}&images_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => response.json())
  
      .then(image => {
        if (!image.total) {
          return alert('К сожалению по Вашему запросу ничего не найдено');
        }
      this.setState(prevState => ({
        images: [...prevState.images, ...image.hits],
        loadedImages: image.total
      }))
      })
      .catch(error => error)
      .finally(() => {
        this.setState({isloading: false});
      });
    }
  }

  handleImages = (loadedImages) => {
    this.setState({ loadedImages: loadedImages });
  }

  toggleModal = (e) => {

    if (e.target.tagName === 'IMG' && this.state.showModal) {
      return;
    }

    this.setState(({ showModal }) => ({
        showModal: !showModal,
      }));
    };
  
  handleImageClick = (e, imageUrl) => {
    this.setState({ selectedImage: imageUrl }, () => {
      this.toggleModal(e);
    });
  };

  handleFormSubmit = (name) => {
    this.setState({
      name: name,
      loadedImages: [],
      page: 1,
    });
  };

  handleClickLoadMore = (page) => {
    this.setState({page: page})
  }

  handleEscapeKey = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal, selectedImage, page, isloading, images } = this.state;

    return (
      <>
        <SearchBar submit={this.handleFormSubmit} />

        {isloading ? <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="spiner"
            visible={true}
          /> : 
          <ImageGallery
            onClick={this.handleImageClick}
            page={page}
            images={images}
        /> }
        {images.length > 0 && (
          <LoadMore page={page} click={this.handleClickLoadMore} />
        )}
        {showModal && (
          <Modal selectedImage={selectedImage} onCloseModal={(e) => this.toggleModal(e)} onEscapeKey={this.handleEscapeKey} />
        )}
      </>
    );
  }
}

export default App;