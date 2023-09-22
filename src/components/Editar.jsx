//Componets
import Header from "./Header"
//Styles
import styles from "../modules/Editar.module.css"

function Editar(){
    return(
        <>
        <Header />
         <div className={styles.container}>
           <form className={styles.formEditar}>
            <label for="nombre_completo">Nombre Completo:</label>
            <input type="text" id="nombre_completo" name="nombre_completo" placeholder="Nombre Completo" />
            <label for="especialidad">Especialidad:</label>
            <input type="text" id="especialidad" name="especialidad" placeholder="Especialidad" />
            <label for="telefono">Teléfono:</label>
            <input type="tel" id="telefono" name="telefono" placeholder="Teléfono" />
            <label for="genero">Género:</label>
            <input type="text" id="genero" name="genero" placeholder="Género" />
            <label for="cumpleanos">Cumpleaños:</label>
            <input type="date" id="cumpleanos" name="cumpleanos" placeholder="Cumpleaños" />
            <button> 
              Editar
            </button>
           </form>
         </div> 
        </>
    )
}

export default Editar;