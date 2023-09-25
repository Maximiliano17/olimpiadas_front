//Styles

import styles from "../modules/Editar.module.css";

//Componets
import Header from "./Header";
import { useState } from "react";
import { areaApi } from "../api/area.api";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditarArea() {
  const [name, setName] = useState("");
  const [cantOfBeds, setCantOfBeds] = useState(1);
  const [schedule, setSchedule] = useState("");
  const [level, setLevel] = useState("");

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    areaApi
      .patch(`/${id}`, {
        name,
        beds: cantOfBeds,
        schedule,
        level,
      })
      .then(() => {
        success("Area Actualizada!");
      })
      .catch(() => {
        error("No se Pudo Actualizar el Area!");
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
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="beds">Cantidad de camas:</label>
          <input
            type="number"
            id="beds"
            name="beds"
            placeholder="Camas"
            value={cantOfBeds}
            onChange={(e) => setCantOfBeds(e.target.value)}
          />
          <label htmlFor="schedule">Horario:</label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            placeholder="Horario"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
          <label htmlFor="level">Prioridad:</label>
          <select
            id="level"
            name="level"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option disabled value="" selected>
              Prioridad
            </option>
            <option value="low">Bajo</option>
            <option value="normal">normal</option>
            <option value="high">urgente</option>
          </select>
          <button onClick={(e) => handleSubmit(e)}>Editar</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default EditarArea;
