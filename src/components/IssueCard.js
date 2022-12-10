import styles from "../styles/projectDetails.module.css";

function IssueCard({ issue }) {
  return (
    <div className={styles.issueCard} key={issue._id}>
      {/* Display issue details */}
      <h3>{issue.title}</h3>
      <p style={{ color: "#2CBF2E", fontSize: "1.2rem" }}>
        {issue.description}
      </p>
      <p className={styles.author}>author : {issue.author}</p>
      <div className={styles.labelContainer}>
        {/* Display the labels on each issue */}
        {issue.labels.map((label, index) => {
          return (
            <p className={styles.label} key={index}>
              {label}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default IssueCard;
