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
    "http://localhost:4000/"
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
  const [isAlarm, setIsAlarm] = useState([]);
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (isAlarm) {
      socket.emit("client:closeAlarm", id);
    } else {
      socket.emit("client:openAlarm", id);
    }
  }, [isAlarm]);

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
                  onClick={() => deletePersonal(data)}
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
      <button className={styles.btn_alarm} onClick={() => setIsAlarm(!isAlarm)}>
        {isAlarm ? (
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAFXElEQVR4Xu2cgXHbMAxF4w2SDZIJ2kxQZ4I2EzSZoM0EdSdoOkG9QdMJ6k7QbFBv0Gzg4t+RV0kmgC+JiSibvNPZd6ZA4AkEQFrS4qS2rAQWWaVVYScVaGYnqEAr0MwEMourHlqBZiaQWVyxHrrb7U7F1o9yvJHjPNj9KJ/bxWJxl5lDNnGDgYrBMPZUjFtl0yYIEtlL+fqtATI1xJWMvXmGsWHXk8heD5E9CKgYfCODfQFQOT7nhCqy3wWYkO21axn7wevE/h6cBHahDZLdG6gM+loG+xlgRl3vxLB7VnGtX5jmvx3PbJ4OTzobOy7O78CMInvPgl5AFZhZoIZp/l6Ewfv7tI10xgVFfB3UFJiQ9SQHoNKyaaCk9/Ty1EbieSuKw/PHNBj9Q461ANiyggyYUQSgXrIy+wD9LoIR36x2z2TgAPJT8EYmVrJ8Yj9KD3QWXVbyAV2sthG7rhglKKDEVcRYlBFkBmd09/rAszBj1l5H0QkVxY3Tj5p9LlAnbkYdoDQGhBHJ1vBKlCUv2RACbr0BSaiY+mY8ZYAioy8NhTAAArcHE17ghQzP7qG/Q0eUQVtLgED1bHWrChNoqDcBQmtuwBYZ53IyFMXnlM3N2GTivbXCiAo0CAcIK/uaxS8p4yUhA+qFM5swG2G36kRW7WsBXYlEK/uZSSjAnHKaa0AeBcilM/WxWrJivbo6tID+MaYpYhECtBU3mcz5kt7ZHOtBdL92oFr2q7E0CTSsp1F3as0sIYjzpwLZHNcLV0igFoNkLNWAWkW8OWUKjJtqLCTiqeWlSS/fAxqAQJC2gjF3l8iVRwkeCh3MGpWocs66YS8F1MpyZplEXIxSQDb1QNZHTthrwZ6/htJ70z4FFNkt7gl2ZZnBfGbeGW3zZpyVXPfOTQG14qc6OFkUl+ih5urHmfZ7DpYCagViLDE3yvSwQkWJIJs6qasfZ9rvXYwU0J1mvcAcsxAoGao37RFHtSTdSkwtQGHdDQ9NNfzbeKFRkXOZ/dJSoXrTHn/LaEvw1g5UF6g1bdVN1plm9+7F3SuBYgdnF6oVBrtArdWBWrOFPVNcxTk3Kz9Ya/tW/M0FdM4JKTqBuhQVhxkM9Eaka/uf6u4SsaKYg+eq+xMO0NZ5XQ8dCtRaDMwBJnS0auyV/K5tZT4LUGvAowZqeZo15Y8ZaMuzu1O+Ak3MJ2ePwgSK4rX7zyR2mHBgHzT5F+pMN0W66KwYiioGR/Mfivgd9fk2CnP/RmYC4KEDZRhUoPuUzPU8C7V66H9SFSjrNWS/CpQExXarQFlSZL8KlATFdqtAWVJkvwqUBMV2q0BZUmS/CpQExXarQFlSZL8ygM7o5jCPKzY4zFs0PQH4fdTS84BgRlajoQ4GeoAws0AdBPSAYY6G2hvoEcAcBbUX0COCORhqX6Bzvn+JSdKpPvRznr2yvHjnUk6wnt8ZqvAczqNfRkB7qAA9hJsZhl48uujvA3Ql2niPQQ9VuPTzKtDMV6gCnQNQ78myzDYUJU69B7+rZZ8YinvMrWd2iiKQURncIYIsv2Fk0kAhbCbPcDJ2s30Ak3rNRhTYC2iAivufUJNqT0WwypbeDzBR1Cfv59KU7w20dApT61eBZr4CFeihAZVEl/PND9QrhTIzbImb3EOJR6hZ+9233rCCxvSbHGioHFbyOXafgHqz2RhYzLlFAA1Qx0z9dagX1ZfKMDBy9CkG6AioxcCEDUUBDVCx7/pBjnPHY7by+1c5kIgm98yoa3FAo2JhQ/tVALuUT0ADRBy/SgNZPNAc8WwKGcV66BQwcoxZgeag2JBRgVagmQlkFlc9tALNTCCzuH+yRqlziEl+UwAAAABJRU5ErkJggg==" />
        ) : (
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAESElEQVR4Xu3cUXLTMBAAUCv0n/YG9ASQGQrDV6wT0J6A9ARtT0A5QcsJmhtQTmDzCWWmOUJuQL6ZUrEKzpBkmmjXWlnaRJnJl21Zel7JsmxJFfnHKqBYU8uJFRmUOQgyaAZlFmBOLkdoBmUWYE4u2Qi9r6r930Vx3lNqAJl8YcttimJcKDU5GgwumB3YkiOD3lXVuT37kdbXbLlYSQjOUSqlbgBwBvnkzxgNeahD5aFtuiTQGaZSV7OTGXMRAvV7VR1DVN7AGfZdhXo05uSt1reu/brcjgZdwpznkBnVVvM/St1vjMxlnelRWR50CeY6Fwr0SUxm1KaafwDMoSvTK9trAxf2jdZj4nFBdneCbsT0RF248byHpF55lnAMTcDXx6IYvdN64plW68OdoNCmXUKb9tF5BkL1X4A8w7SVznOv7qDUdayegBPU5pUTFXUHJws+ecC0aQpGPMnhUkGBcqE2FyZMVK4pLxRw9LosT3Ec/nuhQX1QbRV/+NcVOvbPcqsUxg/QxeqibSWBtkFNAHN+BWwToEP3BsigVFR4EBhEjMzVcJ7uGXPY13raKs4RB7UCJaEiMtHxLmN4GOiHOmdrUOGot4B6EgLVC1QyaqhxAG9QwahB2lMWUKmoIfqobKBSUaF/esjZP2UFlYgKbeknGFO95LpBsYMKRGUdUw0CKg0VnqBO4QlqxBGlwUAloXJW+6CgglDZqn1wUCmo8Ix/wPGM3wmoCFSm19IsoD+qavY+yDU0hh7557g7ENPgehTlAh3ChwlXmPHGZFEJ78Q2XSsW0IU3o6hB3BRRue70LKArQCJRUwa1NUIcauqg4lAlgIpClQIqBlUSqAhUaaDJo0oETRpVKmiyqJJBk0SVDpoc6jaAJoW6LaDJoG4TaBKo2wYaHXUbQaOiJgPafKFcgYbvtJj5QHiUoT8YGJ48M6bv+6LOa4A5AKZ41NagATFFo7YC7QBTLCoZtENMkagk0AiY4lBJoHd1/QVKGGvyVpS7P5S3hgkOGvvdBBrUztGEOUe2exTzFwWV8lUJBfT/ag4xSSO8oqZ0+tGgiX3t0Wmk7gJop4+puwLaGWooULtajb3Lp/YLXv2D3JSaPuiv1DSb/ARFpcxlQt+UbMabNZVSjNJQ1Z+8zAYJ1Obafq0MB5Ww+oxzoaquo7kHXSrM4lzYHgul7ZyXlQzaNVKo82FRqXOYdha0acJQSyhRUHcaNARqdNCfdW1XYRxyVO2207U5q390UMbuGKrrtO7CoVARK5ZFB6VUu41RjCisqxZsREWmnwSoLahP1bdVHd5YXvi+sVx7cZGY9vhkQNuicmLOI3gpUgmYyYHaDNlJZDAr78y1KKt9jw7dmc97EJ0ckbnaHMxQe73n1FUek4rQxUI1sC8b2BK22dXAJrO/Md9CQbraWdf2ZEFdGU91ewZlvjIZNIMyCzAnlyM0gzILMCeXI5QZ9C/6X8eC0yw0EgAAAABJRU5ErkJggg==" />
        )}
      </button>
    </>
  );
}

export default AreaInfo;
