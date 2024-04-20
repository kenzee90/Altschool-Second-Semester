import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";

function SingleRepositoryPage() {
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { repoId } = useParams();
  const handleRefresh = () => {
    window.location.replace("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/kenzee90/${repoId}`,
          {
            headers: {
              Authorization: "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",
            },
          }
        );
        setRepository(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repository:", error);
        setError("Error fetching repository. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [repoId]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Flex align="center" justify="center" flexDir={"column"} gap="1rem" bg="red.100" height={"100vh"}>
          
    <Card>
      <CardHeader>
        <Heading>Error</Heading>
      </CardHeader>
      <CardBody>
    <Button onClick={handleRefresh} colorScheme="teal">Refresh</Button>
      </CardBody>
    </Card>
   
  </Flex>;
  }

  return (
    <Flex
      alignItems={"center"}
      justify={"center"}
      flexDir={"column"}
      gap="1rem"
      bg="gray.100"
      height="100vh"
    >
      <Card>
        <CardHeader>
          <Heading> Repository Details</Heading>
        </CardHeader>
        <CardBody>
          <Text>Name: {repository.name}</Text>
          <Text>Description: {repository.description}</Text>
          <Text>Language: {repository.language}</Text>
          <Text>Stars: {repository.stargazers_count}</Text>
          <Text>Forks: {repository.forks_count}</Text>
          <Text>
            Created at: {new Date(repository.created_at).toLocaleDateString()}
          </Text>
          <Text>Updated at: {new Date(repository.updated_at).toLocaleDateString()}</Text>
          <Link to={`/`}><Button colorScheme="teal" width={"100%"} mt={"2rem"} alignSelf={"center"}> Back to Home</Button></Link>
          {/* Display more details as needed */}
        </CardBody>
      </Card>
    </Flex>
  );
}

export default SingleRepositoryPage;
