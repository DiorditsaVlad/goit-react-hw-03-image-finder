import PropTypes from "prop-types";
import s from "./Button.module.css";

const Button = ({ onClick }) => {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      Load more
    </button>
  );
};
export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};
// handleLoadButton = () => {
//   const page = this.state.page + 1;
//   imageApi.fetchImage(this.state.searchbar, page).then((images) =>
//     this.setState((prevState) => ({
//       result: [...prevState.result, ...images.hits],
//       page: prevState.page + 1,
//     }))
//   );
// };
