import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Button.module.scss";

const Button = ({
  btnText = "Button Text",
  btnType = "primary",
  onClick = () => {},
}) => {
  return (
    <button
      className={classnames([styles.container, styles[btnType]])}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

Button.propTypes = {
  btnText: PropTypes.string,
  btnType: PropTypes.oneOf(["primary", "secondary", "success"]),
  onClick: PropTypes.func,
};

export default Button;
