import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";
// import imageApi from "../services";

export default function ImageGallery({ modalOpen, result }) {
  return (
    <ul className={s.ImageGallery}>
      {result.map((image) => (
        <ImageGalleryItem
          key={image.id}
          tags={image.tags}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          modalOpen={modalOpen}
        />
      ))}
    </ul>
  );
}
