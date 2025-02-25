import React from 'react';
import styles from '../../styles/Login/LoginForm.module.css';

const ButtonLogin = ({ disabled, onClick }) => {
  return (
    <button 
      type="submit" 
      className={styles.btnCustom}
      disabled={disabled}
      onClick={onClick}
    >
      Iniciar Sesión
    </button>
  );
};

export default ButtonLogin;
