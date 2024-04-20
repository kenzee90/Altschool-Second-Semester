import { Heading } from "@chakra-ui/react";
import React from "react";

const Error = () => {
  return (
    <div
      style={{
        width: "95%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <Heading>
        404 <br /> Page Not Found
      </Heading>
    </div>
  );
};

export default Error;
