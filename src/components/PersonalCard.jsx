import styles from "../modules/PersonalCard.module.css";

function PersonalCard({ fullname, specialization, id, onClick, edit }) {
  return (
    <article className={styles.personalCard}>
      {edit ? (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABeUlEQVRYR+3Wz03DMBQG8Pca9R6pvkME3NsNygaM0BHoBMAEgQ0YgQ3oCNz5e68rZYCCsasGRVGS99nJIUjOpQfH9i+fn10zjezhkXkogqQViQnFhKQEpPb/XUOvSi0vtN5IX1m2f6ZpStPpabbdvqB94ITelbq2L98YooczrW+lCQ6YJMkN8+qb6BL9EAj0NputJsy5RaQOYlF3XagqpoQz8wJJCgK5QT+UerY/y3KCNlQjhug+03otperaYRCC6ovxBnWhhsAEgdpQE2NOXAH/1YzHMlWX0mvJqh3rNVUbFK6Zel0Fg5qSOkYejAleMtexqWaQI0HaaUEJtWGkI0HCBCXUtpvsuTRHzikJ5ZWQtLXRw7MLBYMkTDlJXxQEQjFDoCCQu3YkRO6/7PDYTuLWriVV8H6/yIria7AaOl4/cgRTS2r+Y8z6fLd7lDDeu8z3guYmsFeXK4t5QjDeIHTQPu9BNdRnAt++ESQlFhOKCUkJSO2jq6Ff6om2JeGHWp4AAAAASUVORK5CYII="
          className={styles.delete}
          onClick={() => onClick()}
        />
      ) : null}

      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="220"
          height="220"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
        </svg>
      </button>
      <div className={styles.cardinfopersonal}>
        <p>Nombre: {fullname}</p>
        <p>Especialidad: {specialization}</p>
      </div>
    </article>
  );
}

export default PersonalCard;
