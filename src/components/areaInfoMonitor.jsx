import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { areaApi } from "../api/area.api";
import { authApi } from "../api/auth.api";
import io from "socket.io-client";
import { patientApi } from "../api/patient.api";
import PersonalCard from "./PersonalCard";
//Styles
import styles from "../modules/Areasinfo.module.css";
//Components
import Header from "../components/Header";
import Bed from "./Bed";

// Modal.setAppElement("#container");

function AreaInfo() {
  const socket = io("https://olimpiadas-informatica-production.up.railway.app/");

  const handleAlarm = () => {
    socket.emit("client:openAlarm", id);
  };

  const closeAlarm = () => {
    socket.emit("client:closeAlarm", id);
  };

  const [areaInfo, setAreaInfo] = useState([]);
  const [listOfPatients, setListOfPatients] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("");
  const { id } = useParams();

  useEffect(() => {
    areaApi
      .get(`/${id}`)
      .then((res) => {
        setAreaInfo(res.data.findArea);

        if (res.data.findArea.level == "low") setLevel("bajo");
        if (res.data.findArea.level == "normal") setLevel("normal");
        if (res.data.findArea.level == "high") setLevel("urgente");
        console.log(level);

        setLoading(true);

        const obj = [];

        res.data.findArea.patients.forEach((patient) => {
          patientApi
            .get(`/${patient}`)
            .then((res) => {
              obj.push(res.data.findPatient);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setListOfPatients(obj);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    if (loading) {
      const promises = areaInfo.personal.map((element, index) => {
        return authApi
          .get(`/${areaInfo.personal[index]}`)
          .then((user) => user.data.user);
      });

      Promise.all(promises)
        .then((users) => {
          setPersonal(users);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loading, areaInfo.personal]);

  const cantOfBeds = areaInfo.beds - listOfPatients.length;
  const components = [];

  for (let index = 0; index < cantOfBeds; index++) {
    components.push(
      <Bed
        key={index}
        fullname="Libre"
        edit={false}
        dni="Libre"
        phone="Libre"
        gender="Libre"
      />
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container} id="container">
        <section className={styles.cardtotal}>
          <div className={styles.cardinfoarea}>
            <p>Nombre: {areaInfo.name}</p>
            <p>Camas Disponibles: {areaInfo.beds}</p>
            <p>Horario De atencion: {areaInfo.schedule} 24hs</p>
            <p>prioridad: {level}</p>
          </div>
          <div className={styles.cardasignar}>
            <section className={styles.addpersonal}>
              <span>Personal Asignado</span>
            </section>
            <div className={styles.personal}>
              {personal.map((data, index) => (
                <PersonalCard
                  key={index}
                  id={data._id}
                  fullname={data.fullname}
                  edit={false}
                  specialization={data.specialization}
                />
              ))}
            </div>
          </div>
        </section>
        <div className={styles.mostrarcamas}>
          {listOfPatients
            ? listOfPatients.map((element, index) => {
                return (
                  <Bed
                    key={index}
                    fullname={element.fullname}
                    dni={element.dni}
                    phone={element.phone}
                    edit={false}
                    gender={element.gender}
                  />
                );
              })
            : null}
          {components}
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.addboton} onClick={() => handleAlarm()}>
          Activar Alarma
        </button>
        <button className={styles.addboton} onClick={() => closeAlarm()}>
          Desactivar Alarma
        </button>
      </div>

      {/* <button
        className={styles.btn_alarm}
        onClick={() => setIsAlarm(!isAlarm)}
      ></button> */}
    </>
  );
}

export default AreaInfo;
