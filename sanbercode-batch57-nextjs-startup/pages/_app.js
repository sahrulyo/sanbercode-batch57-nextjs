import "../styles/globals.css";
import '../styles/tailwind.css';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { UserContextProvider } from "@/context/userContext ";

export default function App({ Component, pageProps }) {
  return (
          <ChakraProvider>
            <UserContextProvider>
            <Component {...pageProps} />
            </UserContextProvider>
         </ChakraProvider>
         )
}

