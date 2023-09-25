//Styles

import styles from "../modules/Editar.module.css";

//Componets
import Header from "./Header";
import { useState } from "react";
import { authApi } from "../api/auth.api";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

function Editar() {
  const [fullname, setFullname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    authApi
      .patch(`/${id}`, {
        fullname,
        specialization,
        phone,
        gender,
        dataOfBirth: date,
      })
      .then(() => {
        success("Personal Actualizado!");
      })
      .catch(() => {
        error("No se Pudo Actualizar el Personal!");
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
      <Header />
      <div className={styles.container}>
        <form className={styles.formEditar}>
          <label htmlFor="nombre_completo">Nombre Completo:</label>
          <input
            type="text"
            id="nombre_completo"
            name="nombre_completo"
            placeholder="Nombre Completo"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label htmlFor="especialidad">Especialidad:</label>
          <select
            id="especialidad"
            name="especialidad"
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option disabled value="" selected>
              Especialidad
            </option>
            <option value="cirugia">Cirugía</option>
            <option value="pediatria">Pediatría</option>
            <option value="ginecologia">Ginecología</option>
            <option value="obstetricia">Obstetricia</option>
            <option value="cardiologia">Cardiología</option>
            <option value="neurologia">Neurología</option>
            <option value="oftalmologia">Oftalmología</option>
            <option value="dermatologia">Dermatología</option>
            <option value="otorrinolaringologia">Otorrinolaringología</option>
            <option value="ortopedia">Ortopedia</option>
            <option value="psiquiatria">Psiquiatría</option>
            <option value="anestesiologia">Anestesiología</option>
            <option value="radiologia">Radiología</option>
            <option value="urologia">Urología</option>
            <option value="oncologia">Oncología</option>
          </select>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="genero">Género:</label>
          <select
            id="opciones"
            name="opciones"
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled selected>
              Sexo
            </option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
          <label htmlFor="cumpleanos">Cumpleaños:</label>
          <input
            type="date"
            id="cumpleanos"
            name="cumpleanos"
            placeholder="Cumpleaños"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e)}>Editar</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Editar;
