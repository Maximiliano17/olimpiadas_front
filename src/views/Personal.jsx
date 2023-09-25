// Styles

import styles from "../modules/Personal.module.css";

// Components

import Header from "../components/Header";
import Table from "../components/Table";

function Personal() {
  return (
    <>
      <Header />
      <div id={styles.container}>
        <Table />
      </div>
    </>
  );
}
export default Personal;
