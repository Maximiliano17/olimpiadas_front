import styles from "../modules/UserSearch.module.css";

function UserSearch({ username, fullname, onClick, save, cb }) {
  const additionalClass = save ? styles.savedUser : styles.userItem;

  return (
    <li className={`${additionalClass}`} onClick={onClick}>
      {additionalClass == styles.savedUser ? (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA5UlEQVRIS2NkoDFgpLH5DKMWEAzhgQ2irklzE8rykhfgcmZ//3yBXyx/HcpzUzbgUoPTByDDGZkY5wM1XijNSTJENwBk+B/W//uB4gb//v8LxGUJTguQDUC3BF2O5TejY2Fh4gdsvsAbB9gsIcVwkIUEIxndQKgrDUC+wudymG8IWgBSiGYJSIgow4nyAS4LsEU8yXGAxfALyEFEjCUkRTIozEEWwJInriSM7BOikylyhOJLwujBRFRGw5ZaKM5oIJd0T5lbwPKbaQGuTERRUUGwmCRSAVH5gEizsCobtYBg6NE8iABEApQZX9SikwAAAABJRU5ErkJggg=="
          className={styles.closeModal}
          onClick={() => cb}
        />
      ) : null}
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACjUlEQVRYR+2YjVECMRCFuQrUDqADqcCjAqUDqECpQKxAqECsQDrwOhAr8KxAOsD3mD0nl0uyGwZnGMed2Tl+Npsvu5tNoOidmBQnxtP7G0C73e4Skb2BXkHPoX2JdI0n9R26Lopik5uBrAgBpMQEj1ACWYRwDwBbWYxpYwI6AMSfn5GaAazSwFQgwNzByb2kRvOnfU+oRcooCQSYucBoE+V8zxTSb1CiQBIZ1stvyDRWV0Eg2UWvR0pTbEGjUE3FgAhTGkPDgq2hW2g/Y1wNoIE/RwcI0WF/eTHAEIBFunJtMX6C90w1+5MmndSFgN7gxdJnonUgbYJR1mSLBV24Ri0gqR0CabKBo2HKCL6sCxvAF1O+Fx9ojs/YczRZwclUAWLa2MM0abUBH4i1wxrShOfU+EhAFXyNYhGyhrmTex8OKbMuruXLj9AHHPe18Mj3Y6xsHbLN2KkcngT6goFlu+4dQbnTWlCyw54yFtaDj5/A+BGypswNDIFq+aDE09Iy3PGtBukD5XRoY2ZVs2RRW7eqOwtTR23EWoON/QIZm8V2GeuHdZQSTs40LZkqOHNh9uOkjq7x0tKHWods6OhI7bRgIcfoDZ0/fXTI6iZ4cpf4kgXTDFauMp3LWuz6EYpSq/jUUhUDALEMWJtcqCs13gz9lMeAShiHTmvefdgQ6UwVwPQFxj+OotFOXWFjqSMIL+rLGJiA3EpUQo02etnXLvlaG6gwKaP1CT2DcnI2xlRzbG1zP8zWn0HHuOwzTSxiRjcqKhBHyk7h6c2aOERYe4QJHsauQxNQM0B+GrE2rGD7qEB5oes00NDKsoAcsBKvqfyzgXDU5gjhs4I+Q4OdPBXig4AOyZl1zD+QFqlvG8n+JUzdYYAAAAAASUVORK5CYII=" />
      <div className={styles.userInfo}>
        <p>{fullname}</p>
        <p>{username}</p>
      </div>
    </li>
  );
}

export default UserSearch;
