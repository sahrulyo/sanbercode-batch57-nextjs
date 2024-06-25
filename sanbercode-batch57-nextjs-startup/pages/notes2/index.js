import dynamic from "next/dynamic";
import Link from "next/link";
const LayoutComponent = dynamic (() => import("/Layout"));

export default function Notes2 ({notes}){
    console.log('notes data => ', notes);
    return (
        <div>
            <LayoutComponent metaTitle="notes2">
  {notes.data.map((item) => (
    <div>
    <Link href={`/notes2/${item.id}`}>{item.title}</Link>
    </div>
  ))}
  <h1 className="text-2xl font-bold ">This is getStaticPaths</h1>
</LayoutComponent>

        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch ("https://service.pace-unv.cloud/api/notes/");
    const notes = await res.json();
    return {
        props:{notes}, 
        revalidate: 10
    };
} 