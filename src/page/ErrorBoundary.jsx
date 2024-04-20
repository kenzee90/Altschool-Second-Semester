import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            backgroundColor: "#040b11",
            height: "100vh",
            width: "100%",
          }}
        >
          <h1
            style={{
              color: "#d0d0d0",
              marginBottom: "2rem",
            }}
          >
            !OOPS&#128543; <br /> Something went wrong.
          </h1>{" "}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
