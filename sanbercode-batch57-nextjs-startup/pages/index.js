import Head from "next/head";
import Header from "@/components/header ";
import Footer from "@/components/footer ";
import Content from "@/components/contents ";




export default function Home({ children, metaTitle, metaDescription }) {
 return (
  <div>
   <Head>
    <title>{`Create Next App - ${metaTitle}`}</title>
    <meta
     name="description"
     content={metaDescription || "Generated by create next app"}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Header />
   <h1 class="text-4xl font-bold text-blue-600 bg-white p-4 rounded shadow-lg">
        Selamat Datang di Tailwind CSS = style menggunakan tailwind
    </h1>
    <h2 className="global-background">Hello ini mengguakan css global</h2>
   <Content/>
   {children}

   <Footer />
  </div>
 );
}

 