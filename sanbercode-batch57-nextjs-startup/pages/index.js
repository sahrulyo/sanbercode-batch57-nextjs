
// import Header from "@/components/header ";
// import Footer from "@/components/footer ";
// import Content from "@/components/contents ";
import Layout from "@/layout ";
import { useEffect } from "react";


export default function Home({ children }) {
  useEffect (() => {
    fetch("/api/hello")
    .then(res => res.json())
    .then((res) =>console.log ("respone =>" , res))
    .catch((err) =>console.log("error =>", err));
    }, [])
    
 return (
  <div>
 
<Layout metaTitle="Home">
    <p1>Home</p1>

</Layout>
  </div>
 );
}

 