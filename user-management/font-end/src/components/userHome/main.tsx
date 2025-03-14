import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import styles from "./Hero.module.css"

export default function Hero() {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroCard}>
        <div className={styles.avatarContainer}>
          {user.profileImage ? (
            <img
              src={user.profileImage || "/placeholder.svg"}
              alt={`${user.name}'s profile`}
              className={styles.avatarImage}
            />
          ) : (
            <span className={styles.avatarFallback}>{user.name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <h1 className={styles.welcomeText}>Welcome, {user.name}! 👋</h1>

        <p className={styles.emailText}>
          Your email: <span className={styles.emailHighlight}>{user.email}</span>
        </p>

        <p className={styles.greetingText}>Glad to have you here!</p>
      </div>
    </section>
  )
}

