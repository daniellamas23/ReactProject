import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import ButtonLogin from "./ButtonLogin";
import { loginUser } from "./LoginService";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/Login/LoginForm.module.css'; // ✅ Importar correctamente

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const dataToSend = { usuario, password };

    try {
      const result = await loginUser(dataToSend);
      if (result.codigo === 200) {
        toast.success("Login exitoso. Redireccionando a Inicio...");
        localStorage.setItem('apikey', result.apiKey);
        localStorage.setItem('id', result.id);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      } else {
        toast.error("Error: " + result.mensaje);
      }
    } catch (error) {
      toast.error("Error al enviar los datos");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className="text-center mb-4">Login de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            id="usuario"
            label="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese su usuario"
          />
          <InputField
            id="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Ingrese su contraseña"
          />
          <ButtonLogin
            disabled={usuario.length === 0 || password.length === 0}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
