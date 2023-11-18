import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Group, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { Root } from "./routes/Root";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/SignIn" element={<Root />} />
      <Route path="/SignUp" element={<Root />} />
    </Routes>
  );
};

export default App;
