import { ClipLoader } from "react-spinners";
import styles from "./Spinner.module.css";

export const Spinner = () => {
  console.log("Spinner component rendered"); // добавим лог
  return (
    <div className={styles.wrapper}>
      <ClipLoader
        color={styles.spinnerColor}
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
};
