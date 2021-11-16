import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import "./App.css";

class App extends Component {
  state = {
    searchbar: "",
  };
  onFormSubmit = (searchName) => {
    if (searchName) {
      this.setState({ searchbar: searchName });
    }
    return;
  };

  render() {
    const { searchbar } = this.state;
    return (
      <div className="App">
        <SearchBar submit={this.onFormSubmit} />
        <ImageGallery searchbar={searchbar} />
      </div>
    );
  }
}
export default App;
//////////////////////////////////////////////////////////
