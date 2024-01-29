import styles from "./Button.module.css";
import PropTypes from 'prop-types';
const Button = ({children, onClick, type}) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
  )
}

Button.propTypes = {
    children: PropTypes.array.isRequired,
    onClick: PropTypes.bool.isRequired,
     type: PropTypes.string.isRequired, 
    
  };

export default Button