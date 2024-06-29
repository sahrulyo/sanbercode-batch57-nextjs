import dynamic from "next/dynamic";
import { Heading } from "@chakra-ui/react";
import {
 Grid,
 GridItem,
 Card,
 Text,
 Button,
 Input,
 Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation ";
  
const LayoutComponent = dynamic(() => import("/Layout")); 
  
export default function AddNotes() {
 const { mutate } = useMutation ();
 const router = useRouter();
 const [notes, setNotes] = useState({
  title:"",
  description:"",
 });
  
 const HandleSubmit = async () => {
  const response = await mutate({
   url: "https://service.pace-unv.cloud/api/notes",
   payload: notes,
  });
  if (response?.success) {
   router.push("/note");
  }
 };
   
 return (
 <>
  <LayoutComponent metaTitle="Notes">
   <Card margin="5" padding="5">
    <Heading>Add Notes</Heading>
     <Grid gap="5">
      <GridItem>
       <Text>Title</Text>
       <Input
        type="text"
        onChange={(event) =>
         setNotes({ ...notes, title: event.target.value })
        }
       />
     </GridItem>
     <GridItem>
      <Text>Description</Text>
       <Textarea
        onChange={(event) =>
         setNotes({ ...notes, description: event.target.value })
        }
      />
     </GridItem>
     <GridItem>
      <Button onClick={() => HandleSubmit()} colorScheme="blue">
       Submit
      </Button>
     </GridItem>
    </Grid>
   </Card>
  </LayoutComponent>
 </>
);
}