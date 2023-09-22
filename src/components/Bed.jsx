import styles from "../modules/Beds.module.css";

function Bed({ fullname, dni, gender, phone, onClick, edit }) {
  return (
    <article className={styles.cama}>
      {edit ? (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABc0lEQVRYR+2WzY3CMBCFPR1wJkikg8UdsB1sCZQAFcBWwNIBJdAB20EogQNBHLlHyIwRWUVWknl2cshK9iUH/8znN8+TITWwQQPjURFIykhUKCokKSDN/28PZZPJXF8uv9Ity/ksTUeqKFKd5yd0D6xQliRLXrw2xuz09bqRAlgYKootr1sYok/0IhAQwyx4oT18ZEEY6rsNqgpTghulNKIUBGQPPSXJkT/zvwANUHUwHOTnI89Xkqp2HgZCoLrCeAO1QfUBEwTUBEVEU2vgMi0+aaqm0itl1Y2up5xDYc+4vgoGqlPqLXkwTHDK7MY6zyAlQXppQQo1wUglQYIJUqjpNXHhmyF1SoLyUkh62mjxbIOCgSSYMkhXKAgIhekDCgPitoOMsf+y10CKnqPU3TweWt9u59489G4/tgiMo9SMDb/iP/1egvF+Zb4N2qtejcdf3KocEBhvIPTQLusgD3UJ4Ls3AkmKRYWiQpIC0vzgPPQEgpzaJU4QPjYAAAAASUVORK5CYII="
          onClick={() => onClick()}
          className={styles.delete}
        />
      ) : null}

      <div className={styles.top}>
        <div className={styles.alm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
          </svg>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTop}></div>
        <div className={styles.info}>
          <p>Nombre: {fullname}</p>
          <p>DNI: {dni}</p>
          <p>Telefono: {phone}</p>
          <p>Sexo: {gender}</p>
        </div>
      </div>
    </article>
  );
}

export default Bed;
