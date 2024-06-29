import useSWR from "swr";
import fetcher from "@/utils/fetcher ";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueries } from "@/hooks/useQueries ";
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
import dynamic from "next/dynamic";


const LayoutComponent = dynamic(() => import ("/Layout"));

export default function Notes() {
    const { data: listNotes, error, isValidating } = useSWR(
      "https://service.pace-unv.cloud/api/notes",
      fetcher, {revalidateOnFocus : true}
    );
  
    const router = useRouter();
    const [newNote, setNewNote] = useState("");
  
    const handleDelete = async (id) => {
      try {
        const response = await fetch(
          `https://service.pace-unv.cloud/api/notes/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Reload the page after successful delete
          router.reload();
        } else {
          console.error("Failed to delete note");
        }
      } catch (error) {
        console.error("An error occurred while deleting the note:", error);
      }
    };
  
    if (error) return <Text>Error loading notes</Text>;
    if (!listNotes && isValidating) return <Text>Loading...</Text>;
  
    return (
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button colorScheme="blue" onClick={() => router.push("/note/add")}>
              Add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {listNotes?.data?.map((item) => (
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
                        variant="ghost"
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
    );
  }