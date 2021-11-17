import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Modal from "../Modal/Modal";
import s from "./ImageGallery.module.css";
import imageApi from "../services";

class ImageGallery extends Component {
  state = {
    status: "idle",
  };

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.searchbar;
    const nextSearch = this.props.searchbar;
    const page = 1;
    if (prevSearch !== nextSearch) {
      this.setState({ status: "pending", page: 1 });

      imageApi
        .fetchImage(nextSearch, page)
        .then((images) => {
          if (images.total === 0) {
            this.setState({ error: "No any picture", status: "rejected" });
          } else {
            this.setState({
              images: images.hits,
              status: "resolved",
              page: 1,
              searchbar: nextSearch,
            });
          }
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }
  loadMore = () => {
    const page = this.state.page + 1;

    imageApi
      .fetchImage(this.state.searchbar, page)
      .then((images) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...images.hits],
          page: prevState.page + 1,
        }))
      )
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error }));
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

  render() {
    const { images, status, error, alt, largeImageURL } = this.state;
    if (status === "idle") {
      return <p>Enter the name of the picture</p>;
    }
    if (status === "pending") {
      return (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={90}
          width={90}
          timeout={2500} //3 secs
        />
      );
    }
    if (status === "resolved") {
      return (
        <ul className={s.ImageGallery}>
          {images.map((image) => {
            return (
              <ImageGalleryItem
                key={image.id}
                tags={image.tags}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                modalOpen={this.modalOpen}
              />
            );
          })}
          <Button onClick={this.loadMore} />
          {largeImageURL && (
            <Modal
              largeImageURL={largeImageURL}
              alt={alt}
              onClick={this.modalClose}
            />
          )}
        </ul>
      );
    }
    if (status === "rejected") {
      return <p>{error}</p>;
    }
  }
}

export default ImageGallery;