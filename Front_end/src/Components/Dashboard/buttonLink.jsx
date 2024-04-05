import styles from "./sidebar.module.css";
import { Link } from 'react-router-dom';

export default function ButtonLink({ linkTo, text}) {
  return (
    <Link to={linkTo??""} >
      <button className={styles.navButton}>{text}</button>
    </Link>
  );
}
