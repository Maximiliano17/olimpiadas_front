//Componets
import Header from "./Header";
//Styles
import styles from "../modules/Editar.module.css";
import { useState } from "react";
import { patientApi } from "../api/patient.api";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function EditarPatient() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [gender, setGender] = useState("");

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    patientApi
      .patch(`/${id}`, {
        fullname,
        dni,
        phone,
        gender,
      })
      .then(() => {
        success("Paciente Actualizado!");
      })
      .catch(() => {
        error("No se Pudo Actualizar el Paciente!");
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
          <label for="nombre_completo">Nombre Completo:</label>
          <input
            type="text"
            id="nombre_completo"
            name="nombre_completo"
            placeholder="Nombre Completo"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <label for="dni">DNI:</label>
          <input
            type="tel"
            id="dni"
            name="dni"
            placeholder="Dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <label for="telefono">Telefono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label for="genero">Género:</label>
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
          <button onClick={(e) => handleSubmit(e)}>Editar</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default EditarPatient;
