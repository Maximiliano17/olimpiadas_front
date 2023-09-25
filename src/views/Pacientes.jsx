// Styles

import styles from "../modules/Pacientes.module.css";

//Components

import Header from "../components/Header";
import TablePatients from "../components/TablePatients";
import { patientApi } from "../api/patient.api";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";

// Assets
import icono1 from "../assets/imagenes/iconos/pacientes_icon1.png";
import icono2 from "../assets/imagenes/iconos/pacientes_icon2.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Pacientes() {
  const [fullname, setFullname] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [modalIsOpen2, setIsOpen2] = useState(false);

  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {}

  function closeModal2() {
    setIsOpen2(false);
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    patientApi
      .post("/signup", {
        fullname,
        dni,
        phone,
        gender,
      })
      .then((res) => {
        console.log(res);
        success("paciente creado");
      })
      .catch((err) => {
        error("paciente no creado");
        console.log(err);
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
        <Modal
          className={styles.modal}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <section className={styles.barrasuperior}>
            <p>- Buscar Pacientes -</p>
            <button className={styles.botonmodal} onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="red"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
            </button>
          </section>
          <section className={styles.modalcontiner}>
            <TablePatients />
            {/* aca esta */}
          </section>
        </Modal>
        <Modal
          className={styles.modalForm}
          isOpen={modalIsOpen2}
          onAfterOpen={afterOpenModal2}
          onRequestClose={closeModal2}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <section className={styles.barrasuperior}>
            <p>- Registrar Pacientes -</p>
            <button className={styles.botonmodal} onClick={closeModal2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="red"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
            </button>
          </section>
          <section className={styles.modalcontiner}>
            {/*Formulario de registro de pacientes*/}
            <form className={styles.formulario}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="name"
                name="nombre"
                placeholder="Nombre del paciente"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
              <label htmlFor="dni">DNI:</label>
              <input
                type="text"
                id="dni"
                name="dni"
                placeholder="DNI del paciente"
                required
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
              <label htmlFor="telefono">Número de Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="Ingrese su número de teléfono"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="genero">Sexo:</label>
              <select
                id="genero"
                name="genero"
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled selected>
                  Selecciona tu género
                </option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
              <section className={styles.bottonesForm}>
                <button onClick={handleSubmit}>Ingresar</button>
                <button type="submit">Donwload</button>
              </section>
            </form>
          </section>
        </Modal>

        <section className={styles.cardpasientes}>
          <img src={icono1} alt="Icono" />
          <button onClick={openModal2}>Ingresar usuario</button>
        </section>
        <section className={styles.cardpasientes}>
          <img src={icono2} alt="Icono" />
          <button onClick={openModal}>Buscar usuario</button>
        </section>
      </div>
      <ToastContainer />
    </>
  );
}

export default Pacientes;
