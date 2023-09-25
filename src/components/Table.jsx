// Styles

import styles from "../modules/Table.module.css";

// Components

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import { authApi } from "../api/auth.api";
import CardInfo from "./CardInfo";

function Table() {
  const [users, setUsers] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [actualUser, setActualUser] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    authApi
      .get("/")
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
        setFilter(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      const hasSelectedSpecialization =
        selectedSpecialization === "" ||
        user.specialization === selectedSpecialization;
      const matchesSearch = user.fullname
        .toLowerCase()
        .includes(search.toLowerCase());

      return hasSelectedSpecialization && matchesSearch;
    });

    setFilter(filteredUsers);
  }, [search, selectedSpecialization, users]);

  function calcularEdad(fechaNacimiento) {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const fechaActual = new Date();

    const diferenciaMilisegundos = fechaActual - fechaNacimientoDate;
    const edadMilisegundos = new Date(diferenciaMilisegundos);

    return Math.abs(edadMilisegundos.getUTCFullYear() - 1970);
  }

  const getInfo = (user) => {
    user.age = calcularEdad(user.dataOfBirth);

    setActualUser(user);
  };

  return (
    <div id={styles.container}>
      <div id={styles.containerTable}>
        <div className={styles.buscador}>
          <div className={styles.search_container}>
            <input
              placeholder="    Buscar..."
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => setSearch("")} className={styles.btn}>
              X
            </button>
            <button className={styles.btn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <select
              className={styles.btn}
              id="especialidad"
              name="especialidad"
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              <option value="" selected>
                📁
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
          <div className={styles.crearpaciente}>
            <Link to="/register-personal" className={styles.btn_create}>
              Crear
            </Link>
          </div>
        </div>
        <div className={styles.buscadorRes}>

            <input type="text" placeholder="Buscar" />
            <div className={styles.opciones_res}>
            <button onClick={() => setSearch("")} className={styles.btn}>
              X
            </button>
              <select
              className={styles.btn}
              id="especialidad"
              name="especialidad"
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
              <option value="" selected>
                📁
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
            <Link to="/register-personal" className={styles.btn_create}>
              Crear
            </Link>
          </div>
          </div>

        <div className={styles.table}>
          {filter.map((user, index) => (
            <UserCard
              key={index}
              fullname={user.fullname}
              specialization={user.specialization}
              onClick={() => getInfo(user)}
            />
          ))}
        </div>
      </div>
      {actualUser.username ? (
        <CardInfo
          username={actualUser.username}
          fullname={actualUser.fullname}
          gender={actualUser.gender}
          age={actualUser.age}
          specialization={actualUser.specialization}
          area={15}
          phone={actualUser.phone}
          role={actualUser.role}
          id={actualUser._id}
        />
      ) : null}
    </div>
  );
}

export default Table;
