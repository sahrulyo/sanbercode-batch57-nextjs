import Layout from "@/layout ";
import { useRouter } from "next/router";

export default function UserIdByName (){
    const router = useRouter();
    const {id} = router?.query;
    return (
        <Layout metaTitle="userbyname">
            <h1> user id by name {id}</h1>
        </Layout>
    )
}