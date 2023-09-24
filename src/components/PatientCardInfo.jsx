// Styles
import styles from "../modules/CardInfo.module.css";
//Api
import { authApi } from "../api/auth.api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";

function PatientCardInfo({ fullname, gender, phone, dni, id }) {
  const [translateGender, setTranslateGender] = useState("");

  useEffect(() => {
    if (gender == "male") setTranslateGender("hombre");
    if (gender == "female") setTranslateGender("mujer");
    if (gender == "other") setTranslateGender("otro");
  }, []);

  const deleteUser = () => {
    authApi
      .delete(`/${id}`)
      .then(() => {
        success("usuario eliminado correctamente");
        window.location.reload();
      })
      .catch((err) => {
        error(err.response.data);
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
      <div
        className={styles.container}
        style={{ animation: "pulse 0.5s infinite" }}
      >
        <div className={styles.tarjetasvg}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="220"
            height="220"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
          </svg>
          <div className={styles.infosvg}>
            <p>Nombre: {fullname}</p>
          </div>
        </div>
        <div className={styles.info}>
          <p>DNI: {dni}</p>
          <p>Telefono: {phone}</p>
          <p>Genero: {translateGender}</p>
        </div>
        <div className={styles.boton}>
          <Link to={`/Editar-paciente/${id}`} className={styles.item}>
            Editar
          </Link>
          <button onClick={() => deleteUser()}>Borrar</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PatientCardInfo;
