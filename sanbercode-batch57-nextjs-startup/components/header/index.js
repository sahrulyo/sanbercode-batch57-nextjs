import styles from './styles.module.css';
import Link from 'next/link';
import { useQueries } from '@/hooks/useQueries ';
import Cookies from 'js-cookie';
import { useMutation } from '@/hooks/useMutation ';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@/context/userContext ';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button, 
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';


export default function Header() {
  const userData = useContext (UserContext);
  const router = useRouter ();
  const { mutate} = useMutation();
  // const {data} = useQueries ({
  //   prefixUrl: 'https://service.pace-unv.cloud/api/user/me',
  //   headers: {
  //     Authorization: `Bearer ${Cookies.get("token")}`
  //   }
  // });

  const HandleLogout = async () => {
    const response = await mutate ({
      url: "https://service.pace-unv.cloud/api/logout",
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    });
      if (!response?.success){
        console.log ('gagal logout');
      } else {
        Cookies.remove('token');
        router.push("/login")
      }

  };
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
      <Link href="/notes3">SWR |</Link>
      <Link href="/login">Login</Link>
    </li>
    <li>
    <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    {userData?.email}
  </MenuButton>
  <MenuList>
    <MenuItem onClick={HandleLogout}>Logout</MenuItem>
  </MenuList>
</Menu>
    </li>
  </ul>
  </>
    );
    } ;