import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Geddy Dukes. All rights reserved.</p>
          <p className={styles.links}>
            <a href="mailto:geddydukes@gmail.com" className={styles.link}>
              geddydukes@gmail.com
            </a>
            {" | "}
            <a href="tel:707-799-1271" className={styles.link}>
              707-799-1271
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

