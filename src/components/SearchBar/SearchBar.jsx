import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SearchBar extends Component {
  state = {
    name: "",
  };

  handleChange = (e) => {
    this.setState({
      name: e.target.value.toLowerCase(),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.name.trim() === "") {
      return;
    }

    this.props.submit(this.state.name);
    this.setState({ name: "" });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="form-button">
            <span>Search</span>
          </button>

          <input
            className="form-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  submit: PropTypes.func.isRequired,
};