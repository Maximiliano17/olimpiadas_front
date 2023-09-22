// Styles
import styles from "../modules/Login.module.css";
import "react-toastify/dist/ReactToastify.css";
// Assets
import logoLogin from "../assets/imagenes/logos/logo_login.png";
// Modules
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { authApi } from "../api/auth.api";
function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    if (date == "") error("La fecha de nacimiento es requerida");
    if (date == "") error("El rol es requerida");
    if (gender == "") error("El genero es requerido");

    e.preventDefault();

    console.log("este es" + gender);

    const userData = {
      username,
      fullname,
      password,
      gender,
      phone,
      dataOfBirth: date,
      specialization,
      role,
    };

    authApi
      .post("/signup", userData)
      .then((res) => {
        console.log(res);
        success("Cuenta creada con exito!");
        window.location.href = "/Home";
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

  return (
    <>
      <div className={styles.container}>
        <form className={styles.formularioLogin}>
          <section className={styles.title}>
            <img alt="Logo" src={logoLogin} />
          </section>
          <input
            type="text"
            placeholder="User"
            name="user"
            onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
          />
          <input
            type="text"
            placeholder="Nombre Completo"
            name="name"
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <input
            type="date"
            placeholder="Nacimiento"
            name="nacimiento"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="string"
            placeholder="Phone "
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className={styles.opcionesform}>
            <select
              id="opciones"
              name="opciones"
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled selected>
                Sexo
              </option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
            <select
              id="especialidad"
              name="especialidad"
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option disabled value="" selected>
                Especialidad
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
          <div
            className={styles.chex}
            onChange={(e) => setRole(e.target.value)}
          >
            <input type="radio" name="opcion" value="admin" /> Admin
            <input type="radio" name="opcion" value="user" /> Usuario
          </div>
          <button className={styles.btn} onClick={handleSubmit}>
            Registrar
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
export default Register;
