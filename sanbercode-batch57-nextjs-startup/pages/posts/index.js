import dynamic from "next/dynamic";
//import Link from "next/link";
const LayoutComponent = dynamic (() => import("/Layout"));

export default function Posts ({posts}){
    console.log('data post => ', posts);
    return (
            <div>
    <LayoutComponent metaTitle="Posts">
      {posts.map((item) => (
        <div>
         <p>{item.id}</p>
         <p><b>{item.title}</b></p>
         <p>{item.body}</p>
         
        </div>
      ))}
      <h1 className="text-2xl font-bold ">getServerSideProps</h1>
    </LayoutComponent>
    
            </div>
    );
}

export async function getServerSideProps  ()  {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}