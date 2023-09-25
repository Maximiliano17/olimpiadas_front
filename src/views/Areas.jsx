// Components

import { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "../modules/Areas.module.css";
import { areaApi } from "../api/area.api";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import SquareArea from "../components/SquareArea";

function Areas() {
  const socket = io("http://localhost:4000/");
  const [areas, setAreas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [beds, setBeds] = useState(0);
  const [schedule, setSchedule] = useState("");
  const [level, setLevel] = useState("");

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
    getAreas();
    socket.on("server:reloadAlarm", () => {
      getAreas();
    });
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let dataJson = {
      name,
      beds: parseInt(beds),
      schedule,
      level,
    };

    areaApi
      .post("/", dataJson)
      .then(() => {
        success("Area creada exitosamente!");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.data.length > 0) {
          error(err.response.data[0].message);
        } else {
          error(err.response.data.message);
        }
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

  const handleDelete = (id) => {
    const confirmDelete = confirm("Quiere borrar este area ?");

    if (confirmDelete) {
      areaApi
        .delete(`/${id}`)
        .then((res) => {
          console.log(res);
          success("se borro el area con exito!");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          error(err);
        });
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <form className={styles.formularioareas} onSubmit={handleSubmit}>
          <span>Nombre del área.</span>
          <input
            type="text"
            placeholder="Nombre del área"
            name="nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Número de camas.</span>
          <input
            type="number"
            placeholder="Número de camas"
            name="numeroCamas"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          />
          <span>Horario de atención</span>
          <input
            type="text"
            name="horarioAtencion"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
          <span>Nivel de urgencia.</span>
          <div className={styles.chex}>
            <label>
              <input
                type="radio"
                name="nivelUrgencia"
                value="low"
                onChange={(e) => setLevel(e.target.value)}
              />
              Bajo
            </label>
            <label>
              <input
                type="radio"
                name="nivelUrgencia"
                value="normal"
                onChange={(e) => setLevel(e.target.value)}
              />
              Normal
            </label>
            <label>
              <input
                type="radio"
                name="nivelUrgencia"
                value="high"
                onChange={(e) => setLevel(e.target.value)}
              />
              Urgente
            </label>
          </div>
          <button type="submit">Crear</button>
        </form>

        <section className={styles.verareas_container}>
          <div className={styles.buscador_monitoreo}>
            <input
              type="text"
              name="buscador"
              id="buscador"
              placeholder="Buscar area"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          <section className={styles.verareas_v2}>
            {filtered.map((area, index) => (
              <SquareArea
                name={area.name}
                key={index}
                id={area._id}
                alarm={area.alarm}
                edit={true}
                onClick={() => handleDelete(area._id)}
              />
            ))}
          </section>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}

export default Areas;
