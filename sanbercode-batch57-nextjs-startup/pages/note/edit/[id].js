import dynamic from "next/dynamic";
import { Heading, Grid, GridItem, Card, Text, Button, Input, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LayoutComponent = dynamic(() => import("/Layout"));

export default function EditNotes() {
  const router = useRouter();
  const { id } = router.query;  
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      async function fetchNote() {
        try {
          console.log(`Fetching note with ID: ${id}`);
          const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
          const noteData = await res.json();
          if (noteData?.data) {
            setNote(noteData.data);  // Set the note data to state
            console.log(`Note data fetched: `, noteData.data);
          } else {
            console.error("Failed to fetch the note data");
          }
        } catch (error) {
          console.error("Failed to fetch the note:", error);
        }
      }
      fetchNote();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      console.log(`Updating note with ID: ${id}`);
      const response = await fetch(
        `https://service.pace-unv.cloud/api/notes/update/${id}`,  // Correct update URL
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        }
      );
      const result = await response.json();
      console.log(`Update response: `, result);
      if (result?.success) {
        router.push("/note");
      } else {
        console.error("Failed to update the note:", result?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Failed to update the note:", error);
    }
  };

  return (
    <>
      <LayoutComponent metaTitle="Edit Note">
        <Card margin="5" padding="5">
          <Heading>Edit Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                value={note.title} 
                onChange={(event) =>
                  setNote({ ...note, title: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea
                value={note.description}  
                onChange={(event) =>
                  setNote({ ...note, description: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Button onClick={handleSubmit} colorScheme="blue">
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
