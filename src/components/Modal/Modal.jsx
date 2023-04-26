import { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.props.onEscapeKey();
    }
  };

    render() {
        return (<div className="overlay" onClick={this.props.onCloseModal}>
        <div className="modal">
        <img src={this.props.selectedImage} alt="" />
        </div>
      </div>
    )
    }
    
}

Modal.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

export default Modal;