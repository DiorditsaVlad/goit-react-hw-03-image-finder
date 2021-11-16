import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";

// ////////////////////////////////////////////////////////
class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  state = {
    searchbar: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.searchbar);
    this.reset();
  };
  handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ searchbar: "" });
  };

  render() {
    const { searchbar } = this.state;
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            name="searchbar"
            value={searchbar}
            onChange={this.handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
// ////////////////////////////////////////////////////////
