// Styles

import styles from "../modules/Personal.module.css";

// Assets

// Components

import Header from "../components/Header";
// import CardInfo from "./CardInfo";
import Table from "../components/Table";

function Personal() {
  return (
    <>
      <Header />
      <div id={styles.container}>
        <Table />
        {/* <CardInfo /> */}
      </div>
    </>
  );
}
export default Personal;
