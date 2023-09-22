import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { areaApi } from "../api/area.api";
import { authApi } from "../api/auth.api";
import { ToastContainer, toast } from "react-toastify";
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
  const socket = io(
    "https://olimpiadas-informatica-production.up.railway.app/"
  );

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
  const { id } = useParams();

  useEffect(() => {
    areaApi
      .get(`/${id}`)
      .then((res) => {
        setAreaInfo(res.data.findArea);
        setLoading(true);

        const obj = [];

        res.data.findArea.patients.forEach((patient) => {
          patientApi
            .get(`/${patient}`)
            .then((res) => {
              obj.push(res.data.findPatient);
              // setListOfPatients((prev) => [...prev, res.data.findPatient]);
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
      <div className={styles.container} id="container">
        <section className={styles.cardtotal}>
          <div className={styles.cardinfoarea}>
            <p>Nombre: {areaInfo.name}</p>
            <p>Camas Disponibles: {areaInfo.beds}</p>
            <p>Horario De atencion: {areaInfo.schedule} 24hs</p>
            <p>prioridad: {areaInfo.level}</p>
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
                  onClick={() => deletePersonal(data)}
                />
              ))}
            </div>
          </div>
        </section>
        <button onClick={() => handleAlarm()}>Activar Alarma</button>
        <button onClick={() => closeAlarm()}>Desactivar Alarma</button>
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
                    onClick={() => deletePatient(element._id)}
                    gender={element.gender}
                  />
                );
              })
            : null}
          {components}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AreaInfo;
