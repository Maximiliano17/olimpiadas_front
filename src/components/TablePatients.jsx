// Styles

import styles from "../modules/Table.module.css";

// Components
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { patientApi } from "../api/patient.api";
import PatientCardInfo from "./PatientCardInfo";

function TablePatients() {
  const [patients, setPatients] = useState([]);
  const [actualUser, setActualUser] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    patientApi
      .get("/")
      .then((res) => {
        console.log(res.data[0].fullname);
        setPatients(res.data);
        setFilter(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filteredUsers = patients.filter((patient) => {
      const matchesSearch = patient.fullname
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch;
    });

    setFilter(filteredUsers);
  }, [search, patients]);

  const getInfo = (patient) => {
    setActualUser(patient);
  };

  return (
    <div id={styles.container}>
      <div id={styles.containerTable}>
        <div className={styles.buscador}>
          <div className={styles.search_container} style={{ width: "100%" }}>
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
              // onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              <option value="" selected>
                📁
              </option>
              <option value="active">Activos</option>
              <option value="hidden">Dados de alta</option>
            </select>
          </div>
        </div>

        <div className={styles.table}>
          {filter.map((patient, index) => (
            // <p>{patient.fullname}</p>
            <UserCard
              key={index}
              fullname={patient.fullname}
              specialization={patient.phone}
              area={patient.dni}
              onClick={() => getInfo(patient)}
            />
          ))}
        </div>
      </div>
      {actualUser.fullname ? (
        <PatientCardInfo
          fullname={actualUser.fullname}
          gender={actualUser.gender}
          dni={actualUser.dni}
          phone={actualUser.phone}
          id={actualUser._id}
        />
      ) : null}
    </div>
  );
}

export default TablePatients;
