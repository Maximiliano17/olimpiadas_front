import styles from "../modules/Beds.module.css";

function Bed({ fullname, dni, gender, phone, onClick, edit }) {
  return (
    <article className={styles.cama}>
      {edit ? (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA4klEQVRIS2NkoDFgpLH5DKMWEAzhgQ2i89LSCYZPny7A5czzCgoCDL9+ORg+e7YBlxqcPgAZDpScD9R4weDpU0N0A0CGM/7+vR8obvD///9AXJbgtgDJAHRLkA0Hyf1nZXU0fPDgAzZf4I0DdINAPiHFcJCFBCMZ3UCoKw0IuRzmG4IWgBSiWQISwhssyEFFtgXYIp7kOMDi+gvIQUSMJSRFMii1gCMOmjxxJWGigghfasGWuijKaNjSOcUZDRz+0tIFDKysC3BlIoqKCoLFJJEKiEqmRJqFVdmoBQRDj+ZBBADJOpMZVW1QPAAAAABJRU5ErkJggg=="
          onClick={() => onClick()}
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
