import { Fragment, Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ErrorBoundary from "./page/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./Error";
import AllRepositoryList from "./AllRepositoryList";
import SingleRepository from "./SingleRepository";

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllRepositoryList />}></Route>
            <Route path="/repos/:repoId" element={<SingleRepository />}></Route>
            <Route path="*" element={<Error />} ></Route>
          </Routes>
          </BrowserRouter>
    
  );
}

export default App;
