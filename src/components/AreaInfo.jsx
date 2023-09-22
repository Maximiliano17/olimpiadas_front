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
        dni="Libre"
        phone="Libre"
        gender="Libre"
        edit={false}
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
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={styles.modalContainer}
          className={styles.modalContainer}
          contentLabel="Example Modal"
        >
          <section className={styles.barrasuperior}>
            <p>- Buscar Personal -</p>
            <button className={styles.botonmodal} onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="red"
                class="bi bi-x-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
            </button>
          </section>
          <div className={styles.search_container} id="search_container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="#8b949e"
              color="red"
              viewBox="0 0 16 16"
              className={styles.search_icon}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input
              placeholder="Buscar..."
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input_text}
            />
          </div>
          {showUser ? (
            <UserSearch
              fullname={selectedUser.fullname}
              username={selectedUser.username}
              save={true}
            />
          ) : null}
          {search ? (
            <ul className={styles.userList}>
              {filter.map((user, index) => {
                return (
                  <UserSearch
                    fullname={user.fullname}
                    username={user.username}
                    key={index}
                    save={false}
                    cb={() => cb()}
                    onClick={() => isSelectedUser(user)}
                  />
                );
              })}
            </ul>
          ) : null}

          <button onClick={() => saveAddPersonal()} id="btn_confirm">
            confirmar personal
          </button>
        </Modal>

        <Modal
          isOpen={modalIsOpen2}
          onAfterOpen={afterOpenModal2}
          onRequestClose={closeModal}
          style={styles.modalContainer}
          className={styles.modalContainer}
          contentLabel="Example Modal"
        >
          <section className={styles.barrasuperior}>
            <p>- Buscar Pacientes -</p>
            <button className={styles.botonmodal} onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="red"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
            </button>
          </section>
          <div className={styles.search_container} id="search_container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="#8b949e"
              color="red"
              viewBox="0 0 16 16"
              className={styles.search_icon}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input
              placeholder="Buscar..."
              type="text"
              name="search"
              id="search"
              value={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
              className={styles.input_text}
            />
          </div>
          {showUser ? (
            <UserSearch
              fullname={selectedUser.fullname}
              username={selectedUser.username}
              save={true}
            />
          ) : null}
          {searchPatient ? (
            <ul className={styles.userList}>
              {filterPatient.map((patient, index) => {
                return (
                  <UserSearch
                    fullname={patient.fullname}
                    username={"DNI: " + patient.dni}
                    key={index}
                    save={false}
                    // cb={() => cb()}
                    onClick={() => isSelectedUser(patient)}
                  />
                );
              })}
            </ul>
          ) : null}

          <button onClick={() => saveAddPatient()} id="btn_confirm">
            confirmar personal
          </button>
        </Modal>
        {/*Tarjeta informacion del area*/}
        <section className={styles.cardtotal}>
          <div className={styles.cardinfoarea}>
            <p>Nombre: {areaInfo.name}</p>
            <p>Camas Disponibles: {areaInfo.beds}</p>
            <p>Horario De atencion: {areaInfo.schedule} 24hs</p>
            <p>prioridad: {areaInfo.level}</p>
          </div>
          <div className={styles.cardasignar}>
            <section className={styles.addpersonal}>
              <p
                className={styles.addboton}
                onClick={() => setIsOpen(!modalIsOpen)}
              >
                Agregar Personal
              </p>
              <p
                className={styles.addboton}
                onClick={() => setIsOpen2(!modalIsOpen2)}
              >
                Agregar Paciente
              </p>
            </section>
            <div className={styles.personal}>
              {personal.map((data, index) => (
                <PersonalCard
                  key={index}
                  id={data._id}
                  fullname={data.fullname}
                  edit={true}
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
                    edit={true}
                    dni={element.dni}
                    phone={element.phone}
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
