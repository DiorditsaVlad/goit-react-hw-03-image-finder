import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, modalOpen }) => {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => {
        modalOpen(largeImageURL, tags);
      }}
    >
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
