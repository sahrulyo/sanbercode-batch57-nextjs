import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LayoutComponent = dynamic(() => import("/Layout"));

export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useState();

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://service.pace-unv.cloud/api/notes");
      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchingData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://service.pace-unv.cloud/api/notes/delete/${id}`, {
        method: "DELETE",
      });
      setNotes((prevNotes) => ({
        ...prevNotes,
        data: prevNotes.data.filter((note) => note.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete the note:", error);
    }
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/note/add")}
            >
              Add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {notes?.data?.map((item) => (
                <GridItem key={item?.id}>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item?.description}</Text>
                    </CardBody>
                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button
                        onClick={() => router.push(`/note/edit/${item?.id}`)}
                        flex="1"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(item?.id)}
                        flex="1"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </LayoutComponent>
    </>
  );
}
