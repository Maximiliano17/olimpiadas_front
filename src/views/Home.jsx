//Styles
import styles from "../modules/Home.module.css";
//Components
import Header from "../components/Header";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Assets
import doc from "../assets/imagenes/iconos/doctor.png";

const Home = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("user");
    let json = JSON.parse(data);
    setRole(json.role);
    console.log("Role: " + json.role);
    if (!data) return (window.location.href = "/");
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.crearareas}>
          {role != "user" ? (
            <section className={styles.tarjeta}>
              <img src={doc} alt="Logo" />
              <div className={styles.tarjetainfo}>
                <p>Areas</p>
                <span>
                  Ingresa a los pacientes para poder ser atendidos
                  correctamente.
                </span>
                <Link to={`/Areas`} className={styles.item}>
                  Crear
                </Link>
              </div>
            </section>
          ) : null}

          <section className={styles.tarjeta}>
            <img src={doc} alt="Logo" />
            <div className={styles.tarjetainfo}>
              <p>Monitoreo</p>
              <span>
                Ingrese los datos de los miembros del personal médico en el
                sistema.
              </span>
              <Link to={`/Monitoreo`} className={styles.item}>
                Ver
              </Link>
            </div>
          </section>
        </div>
        <div className={styles.crearpersonas}>
          {role != "user" ? (
            <section className={styles.tarjeta}>
              <img src={doc} alt="Logo" />
              <div className={styles.tarjetainfo}>
                <p>Personal</p>
                <span>
                  Ingrese los datos de los miembros del personal médico en el
                  sistema.
                </span>
                <Link to={`/Personal`} className={styles.item}>
                  Ver
                </Link>
              </div>
            </section>
          ) : null}

          {role != "user" ? (
            <section className={styles.tarjeta}>
              <img src={doc} alt="Logo" />
              <div className={styles.tarjetainfo}>
                <p>Pacientes</p>
                <span>
                  Ingresa a los pacientes para poder ser atendidos
                  correctamente.
                </span>
                <Link to={`/Patients`} className={styles.item}>
                  Ver
                </Link>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Home;
