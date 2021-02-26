import styles from '../styles/Home.module.scss'

const Footer = () => {
  const myDate = new Date()
  const myYear = myDate.getFullYear()

  return (
    <footer className={styles.footer}>
      <span>{ myYear }</span>
    </footer>
  )
}

export default Footer
