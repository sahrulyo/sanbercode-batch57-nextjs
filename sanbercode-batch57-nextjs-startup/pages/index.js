
// import Header from "@/components/header ";
// import Footer from "@/components/footer ";
// import Content from "@/components/contents ";
//import Layout from "@/layout ";
import { useEffect } from "react";
import HomePage from "./HomePage";
import Image from 'next/image';
import dynamic from "next/dynamic";

const LayoutComponent = dynamic (() => import("/Layout"));
export default function Home({ children }) {
  // useEffect (() => {
  //   fetch("/api/hello")
  //   .then(res => res.json())
  //   .then((res) =>console.log ("respone =>" , res))
  //   .catch((err) =>console.log("error =>", err));
  //   }, [])
    
 return (
  <div>
 
<LayoutComponent metaTitle="Home">
    <p1>Home</p1>
    <HomePage/>

    {/* cara import pertama */}
    <img src="/next.svg"
      style={{width: 150, height:150}}
      alt="next img"
      />

      {/* cara import kedua */}
      <Image src="/next.svg" width={150} height= {150} alt="next img"/>

</LayoutComponent>
  </div>
 );
}

 