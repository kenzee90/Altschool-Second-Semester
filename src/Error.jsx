import { Heading, Flex, Button } from "@chakra-ui/react";
import React from "react";

const Error = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#040b11",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        color: "#def",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
    <Flex flexDirection={"column"} alignItems={"center"} gap={"1rem"}>
      <Heading>
        404 <br /> Page Not Found
      </Heading>
      <Button colorScheme="white" color="white" onClick={() => window.location.replace("/")} variant={"outline"}> Home </Button>
    </Flex>
    </div>
  );
};

export default Error;
