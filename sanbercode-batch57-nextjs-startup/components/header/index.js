import styles from './styles.module.css'
import Link from 'next/link'
export default function Header() {
    return (
        <>
    <div className={styles.header}>Header = style menggunakan module css</div>
    <ul>
    <li >
    <Link href="/">Home |</Link>
      <Link href="/profile">Profile | </Link>
      <Link href="/users">User |</Link>
      <Link href="/users/detail">User detail |</Link>
      <Link href="/notes">Notes|</Link>
      <Link href="/notes2">Notes2|</Link>
      <Link href="/posts">Post|</Link>
      <Link href="/note">Note CRUD|</Link>
    </li>
  </ul>
  </>
    )
    } 