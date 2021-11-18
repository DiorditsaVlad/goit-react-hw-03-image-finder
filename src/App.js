import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import imageApi from "./components/services/services";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./App.css";

class App extends Component {
  state = {
    searchbar: "",
    status: "idle",
    result: [],
    isLoading: false,
    page: null,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchbar;
    const nextSearch = this.state.searchbar;

    if (prevSearch !== nextSearch) {
      this.setState({ status: "pending", page: 1 });
      this.fetchImageApi();
    }
  }
  fetchImageApi = () => {
    const { searchbar, page } = this.state;
    imageApi(searchbar, page)
      .then((images) => {
        if (images.total === 0) {
          this.setState({ error: "No any picture", status: "rejected" });
        } else {
          this.setState((prevState) => ({
            result: [...prevState.result, ...images.hits],
            status: "resolved",
            page: prevState.page + 1,
            searchbar: searchbar,
          }));
        }
      })
      .catch((error) => this.setState({ error, status: "rejected" }));
  };

  loadMore = () => {
    this.fetchImageApi();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  modalOpen = (moduleUrl, moduleAlt) => {
    this.setState({
      largeImageURL: moduleUrl,
      alt: moduleAlt,
    });
  };
  modalClose = () => {
    this.setState({ largeImageURL: "", alt: "" });
  };
  onFormSubmit = (searchName) => {
    if (searchName) {
      this.setState({ searchbar: searchName });
    }
    return;
  };

  render() {
    const { result, status, error, alt, largeImageURL } = this.state;
    return (
      <div>
        <SearchBar submit={this.onFormSubmit} />
        {status === "pending" && (
          <div>
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={90}
              width={90}
              timeout={2500} //3 secs
            />
          </div>
        )}
        {status === "resolved" && (
          <>
            <ImageGallery modalOpen={this.modalOpen} result={result} />
            <Button onClick={this.loadMore} />
            {largeImageURL && (
              <Modal
                largeImageURL={largeImageURL}
                alt={alt}
                onClick={this.modalClose}
              />
            )}
          </>
        )}

        {status === "rejected" && <p>{error}</p>}
      </div>
    );
  }
}
export default App;
//////////////////////////////////////////////////////////
