import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>React Assessment</h1>
      <p className={styles.paragraph}>
        This assessment uses a dummy API for demonstration purposes.
      </p>
      <p className={styles.paragraph}>
        You can view more details in the Products section.
      </p>
    </div>
  );
};

export default HomePage;
