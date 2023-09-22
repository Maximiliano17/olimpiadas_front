import icono from "../assets/imagenes/iconos/icon_doctor.png";
import styles from "../modules/SquareArea.module.css";

function SquareArea({ name, alarm = true, id, onClick, edit }) {
  const getInfo = (isEdit) => {
    if (isEdit) {
      window.location.href = `/area-edit/${id}`;
    } else {
      window.location.href = `/area-info/${id}`;
    }
  };

  if (alarm) {
    console.log("alertaaaaaa");
    const audio = new Audio("../../public/Alarm sound effect￼.mp4");
    audio.addEventListener("ended", () => {
      audio.currentTime = 0; // Reiniciar la reproducción
      audio.play();
    });
    audio.play();
  }

  return (
    <article className={`${styles.area} ${alarm ? styles.alarm : ""}`}>
      {edit ? (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA6ElEQVRIS2NkoDFgpLH5DKMWEAzhgQ2iU8LCCWZv3y7A5czzAgICv5iZHczfvt2ASw1OH4AMB0rOZ/j//4Lpu3eG6AaADP/DxLSfgZHR4B8DQyAuS3BagGwAuiXociz//jkafvjwAZsv8MYBNktIMRxkIcFIRjcQ7EpgsIB8hc/lMN8QtACkEMUSkACRhhPlA1wWYIt4kuMAw3Cgy5GDiBhLSIpkUJiDLIAlT1xJGNknRCdT5AjFl4TRg4mojIYttVCc0UAuOS0kVAA0fAGuTERRUUGwmCRSAVH5gEizsCobtYBg6NE8iAAf66gZGiCN3gAAAABJRU5ErkJggg=="
          className={styles.delete}
          onClick={() => onClick()}
        />
      ) : null}
      {alarm ? (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAFaElEQVR4Xu2cXVLbMBDHZSB9pm8MYYZwgsYnaDgBcILCCQongJwAegLgBHCDuidIOEHNDGF4a96BuLuOyLgZYn16taTSTIYP24r083+t1WqtRMTilUDitbZYmYhAPYsgAo1APRPwXF1UaATqmYDn6tgodNBud0VRdESSdFaE2C6EWIe+duDz9nMMv+dwfAznjYuiuIff8e9crK0N0zzH48FLUKCDra2emEx6SZLsAYmuE40kuS0mkzuo7yp9esqd6nK4mBwoQlwpij1Q4L5UoEPzF146hI5lk9fXH9RwyYAiyKQozp2VaIoflfvyckIFtnGg+GwEkz6F5x4qMliBjl5QKLYxoINOZ33l+fkUTPtQDizBYFa/GMF+GY1OmmpMI0Cled9wAjkHcAw3ejcdjYa+wXoHCiZ+DJWeMoY5Ywiu10H6+HjrE6o3oBUTP/bZwKbrAqh9gHrm63u8AEWYycvLZeiBxwFK1h2Ndh2un13qDLSE+fz8k9wd8tH7f+sYAtTUtVonoEugzHl+zkp1AnrXbp/DaPmhnpkqBbq6VdZA5WiOM5+lKyCSI3Cprmw6ZgW0nP0Igc9NjAQtZQGoqY2fagxUDkK/lxmmVMi4eH1NTWMA5kA3N8/Kufn/Ua5g5D8y6aoR0MHGRidZXR0QqTMDp/vXe52BG/oV/t8z6ajtuaDSHROVGgEdttuX0LBD28aZXFc3gxlQWgmE/7oPDwe6bdcGKgMeOBCRFDZAobcmA5Q2UFAnwiQxM7xjnIBCc7RnUVpAwcT24bmF4TiywgyoKJJkN314yFQAdIGSj+zcgAJIrRFfCyiYO/qdHdXd8XmcIdAxuFCfVX1UApWzInSVSAtDoELHhVIDpXRRKreMJVCNYLQSKPXo/saUI1Bom9Lsa4GGMneGbtPMdlRmrwJ6CCfg7Ii8MFUoOvknEIW6WAREBRRXMIPEPJcTaKABibXJKwamWoVSBkPmTYirQiF9sjZYUg90a+sm1NIwW6CQ1Ve35KxSKPkMibnbhM2rdZ0iUHP/xQnoH/i+IAtxjE1egMkvFKJKoTiHd0vVNldAeQVjoDkA3bHyQ0NNO5kDrQ021yo0cGYIi0W6d5RYGxetnykFdOwtnxSNXwbAajOgVVPPYHP5xslYfoEqn1SlUPK1JMt+kl2mynuqBzrN/UTXKRZJQLWkrBNgDjZbYngXlcvJSqCBR3pWTFUDEjZWCVRm24Uwe3Zuk85bI0qgSD0uI5eGolxP0lIonhTC7NlNPTWTxrQUSp0oxnHqqWPu2gqVZk8aKGGmUO23Q7QUikCpl5Q5AdVNFDNSaKlSwiURNkA1n51v/p22QkuV0s6cWLhNJuo0Vqh8lpKlhTPw6rVSGKvtNFJoRaXxtZoFd9sYaAl1un8IWb59AKXiNkZHNu/SWwEtoQZIE6cCq8pfqmuHNdBlfZ7qBEAaAyqhkr4d0rBKh0WrteuyS5mTQiuD1DJsQJADzNQFppXb9J5CpH+Kr930GlZQU9VnkEh7ZPIK4qKGOCu0WnGIqJQrYXxmTlqtvqsyrWZKOo3/QBsT4N5N/bpsZJ3+zp/jVaFvlX+ADQqs/UwV5EaAVgYrTCc/VDWC8PgYEmazJjcXbAzonFq/MwCbSYfd+/ZsVUE0DnQOLAZWqLP5MogY9XVefPVhKWRAZ2CnU1bc0Ra3v2wq93Rq2pPJtfj0KfM1gusAJwdabRTGA1CxAPgb/OzoNLjmnOmutkJci1Yrp4QYxORVsMr9mHFTa/xAAcjbEjL+jR/ctHr6gY2sIdqVA7x7+b+hzZZAqjbZHA+qUJsGc78mAvV8hyLQCNQzAc/VRYVGoJ4JeK4uKtQz0L8uIwaCqyb6hQAAAABJRU5ErkJggg=="
          className={styles.icon_alarm}
        />
      ) : (
        <img src={icono} alt="Icono" className={styles.icon} />
      )}

      <p>{name}</p>
      <button onClick={() => getInfo(edit)}>Ver Area</button>
    </article>
  );
}

export default SquareArea;
