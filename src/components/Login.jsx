// Styles
import styles from "../modules/Login.module.css";
import "react-toastify/dist/ReactToastify.css";
// Assets
import logoLogin from "../assets/imagenes/logos/logo_login.png";
// Components
import { authApi } from "../api/auth.api";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    authApi
      .post("/signin", userData)
      .then((res) => {
        success("Logeado con exito!");
        console.log(res.data.user);
        let user = {
          username: res.data.user.username,
          role: res.data.user.role,
        };

        const userJSON = JSON.stringify(user);
        localStorage.setItem("user", userJSON);
        window.location.href = "/Home";
      })
      .catch((err) => {
        if (err.response.data.length > 0) {
          error(err.response.data[0].message);
        } else {
          error(err.response.data.message);
        }
      });
  };

  const success = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const error = (message) =>
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <>
      <div className={styles.container}>
        <form className={styles.formularioLogin}>
          <section className={styles.title}>
            <img alt="Logo" src={logoLogin} />
          </section>
          <input
            type="text"
            placeholder="Usuario"
            name="user"
            id="user"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <p>
            El usuario y código de tu cuenta es algo que no debes compartir,
            nadie tiene por qué pedírtelo, es algo de uso personal para el
            trabajo.
          </p>
          <button className={styles.btn} onClick={handleSubmit}>
            Login
          </button>
          <Link to={`/Home`} className={styles.item}>
            Entrar sin cuenta.
          </Link>  
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
export default Login;
