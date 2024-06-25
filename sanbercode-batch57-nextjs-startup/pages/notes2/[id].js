import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("/Layout"));

export default function DetailNotes2({ notes }) {
    const router = useRouter();

    // If the page is not yet generated, this will show a loading state
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <LayoutComponent metaTitle="Detail Notes2">
                <h1>Detail Notes 2</h1>
                <p>{notes?.data?.title}</p>
                <p>{notes?.data?.description}</p>
            </LayoutComponent>
        </div>
    );
}

export async function getStaticPaths() {
    const res = await fetch("https://service.pace-unv.cloud/api/notes/");
    const notes = await res.json();
    const paths = notes.data.map((item) => ({
        params: {
            id: item.id.toString() // Ensure id is a string
        }
    }));

    return {
        paths,
        fallback: true, // Enable fallback for paths not returned by getStaticPaths
    };
}

export async function getStaticProps(context) {
    const { id } = context.params;
    const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
    const notes = await res.json();

    // Check if the notes data exists
    if (!notes.data) {
        return {
            notFound: true, // Return 404 page if no data is found
        };
    }

    return { props: { notes } };
}
