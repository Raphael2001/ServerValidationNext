import { setRequestLocale } from "next-intl/server";
import styles from "./home.module.scss";

export default function Home({ params: { locale } }) {
  setRequestLocale(locale);

  return <main className={styles.main}></main>;
}
