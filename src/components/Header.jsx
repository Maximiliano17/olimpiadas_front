// Styles

import styles from "../modules/Home.module.css";

// Components

import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";

// Assets

import logo from "../assets/imagenes/logos/logo_tarjeta.png";

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

function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>

        <div className={styles.nav}>
          <Link to={`/Home`} className={styles.nav_item}>
            Home
          </Link>
          <Link to={`/Areas`} className={styles.nav_item}>
            Areas
          </Link>
          <Link to={`/Monitoreo`} className={styles.nav_item}>
            Monitoreo
          </Link>
          <Link to={`/Patients`} className={styles.nav_item}>
            Pacientes
          </Link>
          <Link to={`/Personal`} className={styles.nav_item}>
            Personal
          </Link>
        </div>
        <div className={styles.botonvolver}>
          <Link to={`/`} className={styles.volverlink}>
            Dashboard
          </Link>
        </div>
        <div className={styles.burger}>
          <button onClick={openModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>
      </header>
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
          <Link to={`/Home`} className={styles.nav_item}>
            Home
          </Link>
          <Link to={`/Areas`} className={styles.nav_item}>
            Areas
          </Link>
          <Link to={`/Monitoreo`} className={styles.nav_item}>
            Monitoreo
          </Link>
          <Link to={`/Patients`} className={styles.nav_item}>
            Pacientes
          </Link>
          <Link to={`/Personal`} className={styles.nav_item}>
            Personal
          </Link>
        </section>
      </Modal>
    </>
  );
}
export default Home;
