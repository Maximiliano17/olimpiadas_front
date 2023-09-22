//Styles
import styles from "../modules/Home.module.css";
//Components
import Header from "../components/Header";
//Imagenes
import doc from "../assets/imagenes/iconos/doctor.png";
// import icon from "../assets/imagenes/iconos/tarjeta1.png";
// import icon2 from "../assets/imagenes/iconos/tarjeta2.png";
//React
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  useEffect(() => {
    const test = localStorage.getItem("user");

    if (!test) return (window.location.href = "/");
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.crearareas}>
          <section className={styles.tarjeta}>
            <img src={doc} alt="Logo" />
            <div className={styles.tarjetainfo}>
              <p>Areas</p>
              <span>
                Ingresa a los pacientes para poder ser atendidos correctamente.
              </span>
              <Link to={`/Areas`} className={styles.item}>
                Crear
              </Link>
            </div>
          </section>
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
          <section className={styles.tarjeta}>
            <img src={doc} alt="Logo" />
            <div className={styles.tarjetainfo}>
            <p>Pacientes</p>
              <span>
                Ingresa a los pacientes para poder ser atendidos correctamente.
              </span>
              <Link to={`/Patients`} className={styles.item}>
                Ver
              </Link>
            </div>
          </section>
        </div>
      </div>
      {/*
           <div className={styles.tarjetas}>
          <section className={styles.tarjetaimagen}>
            <img src={icon} alt="Icon" />
          </section>
          <Link to={`/Crearareas`} className={styles.boton}>
            Monitoreo
          </Link>
        </div>
        <div className={styles.tarjetas}>
          <section className={styles.tarjetaimagen}>
            <img src={icon2} alt="Icon" />
          </section>
          <Link to={`/Crearareas`} className={styles.boton}>
            Crear Areas
          </Link>
        </div>
     */}
    </>
  );
}
export default Home;
