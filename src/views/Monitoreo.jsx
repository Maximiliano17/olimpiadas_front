//Components
import { useState, useEffect } from "react";
import { areaApi } from "../api/area.api";
import io from "socket.io-client";
import Header from "../components/Header";
import SquareArea from "../components/SquareArea";
//Styles
import styles from "../modules/Areas.module.css";
//Imagenes
// import icono from  "../assets/imagenes/iconos/icon_doctor.png"

function Monitoreo() {
  const socket = io("localhost:4000/");

  const [areas, setAreas] = useState([]);

  const handleAlarm = () => {
    const id = "6507725d1d729e8fdf2b24f6";

    socket.emit("client:openAlarm", id);
  };

  const closeAlarm = () => {
    const id = "6507725d1d729e8fdf2b24f6";

    socket.emit("client:closeAlarm", id);
  };

  const getAreas = () => {
    areaApi
      .get("/")
      .then((res) => {
        setAreas(res.data.findAreas);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAreas();
    socket.on("server:reloadAlarm", () => {
      getAreas();
    });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.monitoreo}>
        {/*Ver areas*/}
        <div className={styles.buscador_monitoreo}>
          <input
            type="text"
            name="buscador"
            id="buscador"
            placeholder="Buscar area"
          />
          <select>
            <option value="" selected>
              📁 Filtro
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
        </div>
        <section className={styles.verareas}>
          {areas.map((area, index) => (
            <SquareArea
              name={area.name}
              alarm={area.alarm}
              key={index}
              id={area._id}
              edit={false}
            />
          ))}
        </section>
        <section className={styles.buttonarea}>
          <button onClick={() => handleAlarm()}>Activar Alarma</button>
          <button onClick={() => closeAlarm()}>Desactivar Alarma</button>
        </section>
      </div>
    </>
  );
}
export default Monitoreo;
