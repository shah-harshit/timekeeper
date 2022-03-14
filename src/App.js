import { Stack } from "@mui/material";
import React from "react";
import { CommonHeader } from "./components/common-header/common-header.component";
import { AppRouter } from "./routers/router";

export const App = () => {
  return (
    <Stack alignItems="center">
      <AppRouter />
      <CommonHeader />
    </Stack>
  );
};
