import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { areaApi } from "../api/area.api";
import { authApi } from "../api/auth.api";
import { ToastContainer, toast } from "react-toastify";
import { patientApi } from "../api/patient.api";
import PersonalCard from "./PersonalCard";
import Modal from "react-modal";
//Styles
import styles from "../modules/Areasinfo.module.css";
//Components
import Header from "../components/Header";
import UserSearch from "./UserSearch";
import Bed from "./Bed";

// Modal.setAppElement("#container");

function AreaInfo() {
  const [areaInfo, setAreaInfo] = useState([]);
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [listOfPatients, setListOfPatients] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filterPatient, setFilterPatient] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [search, setSearch] = useState("");
  const [searchPatient, setSearchPatient] = useState("");
  const { id } = useParams();

  const afterOpenModal = () => {
    let btn = document.querySelector("#btn_confirm");
    btn.style.background = "gray";
    btn.disabled = true;
    setShowUser(false);
    setSelectedUser([]);
    authApi
      .get("/")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const afterOpenModal2 = () => {
    let btn = document.querySelector("#btn_confirm");
    btn.style.background = "gray";
    btn.disabled = true;
    setShowUser(false);
    setSelectedUser([]);

    patientApi
      .get("/")
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsOpen2(false);
    setShowUser(false);
    setSelectedUser([]);
  };

  const isSelectedUser = (user) => {
    let btn = document.querySelector("#btn_confirm");
    setSearch("");
    setSearchPatient("");
    const search = document.querySelector("#search_container");
    search.style.display = "none";

    let data = {
      fullname: user.fullname,
      username: user.username,
      id: user._id,
    };

    setSelectedUser(data);
    setShowUser(true);
    btn.style.background = "";
    btn.disabled = false;
  };

  const saveAddPersonal = () => {
    areaApi
      .put("/personal", {
        areaId: areaInfo._id,
        userId: selectedUser.id,
      })
      .then(() => {
        setShowUser(false);
        setIsOpen(false);
        setSelectedUser([]);
        success("agregaste un personal");
        window.location.reload();
      })
      .catch((err) => {
        setShowUser(false);
        setIsOpen(false);
        setSelectedUser([]);
        error("no se pudo agregar personal");
        console.log(err);
      });
  };

  const saveAddPatient = () => {
    areaApi
      .put("/patient", {
        areaId: areaInfo._id,
        patientId: selectedUser.id,
      })
      .then(() => {
        setShowUser(false);
        setIsOpen2(false);
        setSelectedUser([]);
        success("agregaste un paciente");
        window.location.reload();
      })
      .catch((err) => {
        setShowUser(false);
        setIsOpen2(false);
        setSelectedUser([]);
        error("no se pudo agregar el paciente");
        console.log(err);
      });
  };

  const deletePersonal = (data) => {
    const deleteConfirm = confirm("Quieres eliminar a esta persona?");
    if (deleteConfirm) {
      areaApi
        .delete(`/personal/${areaInfo._id}/${data._id}`)
        .then(() => {
          success("se borro con exito");
          window.location.reload();
        })
        .catch((err) => {
          error("no se pudo borrar");
          console.log(err);
        });
    }

    // data._id
  };

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
          // Manejar el error apropiadamente, por ejemplo, mostrando un mensaje al usuario
        });
    }
  }, [loading, areaInfo.personal]);

  useEffect(() => {
    const filteredPatients = patients.filter((patient) => {
      const matchesSearch = patient.fullname
        .toLowerCase()
        .includes(searchPatient.toLowerCase());

      const isAlreadyInArea = areaInfo.patients.includes(patient._id);

      return matchesSearch && !isAlreadyInArea;
    });

    setFilterPatient(filteredPatients);
  }, [searchPatient]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      const matchesSearch = user.fullname
        .toLowerCase()
        .includes(search.toLowerCase());

      const isNotInPersonal = !personal.some(
        (p) => p.fullname === user.fullname
      );

      return matchesSearch && isNotInPersonal;
    });

    setFilter(filteredUsers);
  }, [search]);

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

  const deletePatient = (patientId) => {
    const confirmDelete = confirm("Quieres borrar a este paciente?");
    if (confirmDelete) {
      areaApi
        .delete(`/patient/${id}/${patientId}`)
        .then(() => {
          success("borraste al paciente");
          window.location.reload();
        })
        .catch(() => {
          error("no se pudo borrar al paciente");
        });
    }
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
