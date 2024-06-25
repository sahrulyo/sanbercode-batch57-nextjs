import dynamic from "next/dynamic";
const LayoutComponent = dynamic (() => import("/Layout"));

export default function Notes ({notes}){
    console.log('notes data => ', notes);
    return (
        <div>
            <LayoutComponent metaTitle="notes">
  {notes.data.map((item) => (
    <div className="border border-gray-500 mb-5 p-5" key={item.id}>
      <p className="font-bold">{item.title}</p>
      <p>{item.description}</p>
    </div>
  ))}
  <h1 className="text-2xl font-bold">This is getStaticProps</h1>
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