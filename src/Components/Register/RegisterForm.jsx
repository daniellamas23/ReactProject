import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PaisSelect from "./PaisSelect";
import styles from "../../styles/Register/RegisterForm.module.css"; // Importamos estilos modulares

const RegisterForm = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [idPais, setIdPais] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !password || !idPais) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const dataToSend = {
      usuario,
      password,
      idPais: parseInt(idPais),
    };

    try {
      const response = await fetch("https://movetrack.develotion.com/usuarios.php?user=probando&pass=asd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();

      if (result.codigo === 200) {
        toast.success(`Te registraste exitosamente, ${usuario}!!`);
        
        // Autologin después del registro
        const loginResponse = await fetch("https://movetrack.develotion.com/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario, password }),
        });
        const loginResult = await loginResponse.json();

        if (loginResult.codigo === 200) {
          toast.success("Login exitoso. Redireccionando a Inicio...");
          localStorage.setItem("apikey", loginResult.apiKey);
          localStorage.setItem("id", loginResult.id);
          setTimeout(() => navigate("/home"), 3000);
        } else {
          toast.error("Error en el login: " + loginResult.mensaje);
        }
      } else {
        toast.error("Error: " + result.mensaje);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Error al enviar los datos.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.mb3}>
            <label htmlFor="usuario" className={styles.formLabel}>
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              className={styles.inputCustom}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className={styles.mb3}>
            <label htmlFor="password" className={styles.formLabel}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={styles.inputCustom}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
            {password.length > 0 && password.length < 6 && (
              <div className="form-text text-danger">Tu contraseña es muy débil :(</div>
            )}
            {password.length >= 6 && <div className="form-text text-success">✓</div>}
          </div>

          <PaisSelect onSelect={(paisId) => setIdPais(paisId)} />

          <button type="submit" className={styles.btnCustom}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
