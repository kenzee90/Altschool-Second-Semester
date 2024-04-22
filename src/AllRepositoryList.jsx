import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Text, Square, Grid, GridItem } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import pexelsbg from "./assets/pexelsbg.jpg";

// shorthand using the `Flex` component
{
  /* <Flex align="center" justify="center">
  Flex Container
</Flex> */
}

function AllRepositoryList() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // Current page number
  const [perPage, setPerPage] = useState(10); // Repositories per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const ref = useRef(null);
  
  let filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const PER_PAGE = 4;
  const total = filteredRepositories?.length;
  const pages = Math.ceil(total / PER_PAGE);
  const skip = page * PER_PAGE - PER_PAGE;
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  function handleSearch(e) {
    setSearchTerm(e.target.value);
    filteredRepositories = repositories.filter(repo =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) );
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/kenzee90/repos?page=${page}&per_page=${perPage}`,
          {
            headers: {
              Authorization: "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",
            },
          }
        );

        setRepositories(response.data);
        const linkHeader = response.headers.link;
        if (linkHeader) {
          const totalPagesRegex = /&page=(\d+)>; rel="last"/;
          const match = linkHeader.match(totalPagesRegex);
          if (match) {
            setTotalPages(parseInt(match[1]));
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError("Error fetching repositories. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleRefresh = () => {
    setError(null);
    setLoading(true);
    fetchData();
  };

  
  
  const renderContent = () => {
    if (loading) {
      return (
        <Flex>
          <Heading>Loading...</Heading>
        </Flex>
      );
    }
    if(filteredRepositories.length === 0) {
     return setTimeout(() => {
       window.location.replace("/notfound");
      }, 10);
      
    }

    if (error) {
      return (
        <Flex align="center" justify="center" flexDir={"column"} gap="1rem" bg="red.100" height={"100vh"}>
          
          <Card>
            <CardHeader>
              <Heading>Error</Heading>
            </CardHeader>
            <CardBody>
          <button onClick={handleRefresh}>Refresh</button>
            </CardBody>
          </Card>
         
        </Flex>
      );
    }
  
    return (
      <Flex align="center" pt={"1rem"} justify="center" flexDir={"column"} gap="1rem" bg="gray.100" height={"100%"} width={"100vw"} >
        <Flex align="center" justify="center" flexDir={"column"} gap="1rem" 
        backgroundImage={pexelsbg} height={"50vh"} width={"80%"} backgroundSize={"cover"} backgroundPosition={"center"} borderRadius="10px" shadow={"lg"}>
        <Heading mb="3rem" color="white" background={"black"} padding="1rem" borderRadius="10px">My GitHub Repositories</Heading>
        <Card width={"60%"} mt="2rem" overflow={"hidden"} >
          <CardBody>
            <Flex bottom={"0"}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  id="search"
                  placeholder="Search by repository name"
                  value={searchTerm}
                  onChange={
                    handleSearch}
               />
              </InputGroup>
              {/* <Button
                onClick={e => handleRefresh(e)}
                color={"white"}
                colorScheme="blue"
                borderLeftRadius='0'
              >
                Search
              </Button> */}
            </Flex>
          </CardBody>
        </Card>
        </Flex>
        <Grid templateColumns='repeat(2, 1fr)' gap={2}  justifyItems={"center"} alignContent={"center"}>
          
          {filteredRepositories?.slice(skip, skip + PER_PAGE).map((repo) => (
            <GridItem key={repo.id} width={"100%"} mx={"2rem"} >
              <Card width={"500px"} height="300px" overflow={"hidden"} borderRadius="10px" justify={"center"} align={"center"}>
                <CardHeader align={"center"} justify={"center"} height={"50%"}>
                  <Link to={`/repos/${repo.name}`}>
                  <Heading>{repo.name}</Heading>
                  </Link>
                </CardHeader>
                <CardBody align={"center"} justify={"center"} mt={"2rem"}>
                  <Link to={`/repos/${repo.name}`} >
                    <Button colorScheme="teal" variant="solid" width={"100%"}  bottom={"2px"}>
                    Explore Repository
                    </Button>
                    
                  </Link>
                  
                  
                </CardBody>
              </Card>
              
              
            </GridItem>
          ))}
        </Grid>

        <Flex align="center" justify="center" gap="1rem" bg="gray.100" height={"100%"} >
        <Square>
        Pages: {page} of {pages}
        </Square>
        <Button 
        disabled={page <= 1}
        onClick={() => {
          setPage((prev) => prev - 1);
          ref.current?.scrollIntoView({ behavior: "smooth" });
        }}>Prev</Button>
        <span style={{ display: "flex", gap: "1rem" }}>
            {Array.from({ length: pages }, (value, index) => index + 1).map(
              (repo) => (
                <Box
                  key={repo}
                  onClick={() => {
                    setPage(repo);
                    ref.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {repo}
                </Box>
              )
            )}
          </span>
          <Button 
       disabled={page >= pages}
       aria-disabled={page >= pages}
       onClick={() => {
         setPage((prev) => prev + 1);
         ref.current?.scrollIntoView({ behavior: "smooth" });
       }}>Next</Button>
        </Flex>
      </Flex>
    );
  };

  return <div>{renderContent()}</div>;
}

export default AllRepositoryList;
