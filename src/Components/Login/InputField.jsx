import React from 'react';
import styles from '../../styles/Login/LoginForm.module.css';

const InputField = ({ id, label, value, onChange, type = 'text', placeholder }) => {
  return (
    <div className={styles.mb3}> {/* Aplicar margen correctamente */}
      <label htmlFor={id} className={styles.formLabel}>{label}</label>
      <input 
        type={type} 
        id={id}
        className={styles.inputCustom} // Aplicar el estilo correctamente
        value={value} 
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
