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
  const socket = io("http://localhost:4000/");

  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("");

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
        setFiltered(res.data.findAreas);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const filteredAreas = areas.filter((area) => {
      const hasSelectedLevel = filter === "" || area.level === filter;

      const matchesSearch = area.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return hasSelectedLevel && matchesSearch;
    });

    setFiltered(filteredAreas);
  }, [filter, search]);

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar area"
          />
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="" selected>
              📁 Filtro
            </option>
            <option value="low">bajo</option>
            <option value="normal">normal</option>
            <option value="high">urgente</option>
          </select>
        </div>
        <section className={styles.verareas}>
          {filtered.map((area, index) => (
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
