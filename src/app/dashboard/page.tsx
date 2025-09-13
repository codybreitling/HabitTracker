"use client";
import { Grid2, Box, Typography } from "@mui/material";
import { generalStyles } from "../generalStyles";
import { strings } from "../strings";
import Utils from "../Utils";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const utils = new Utils();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(utils.checkIfMobile());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      className="flex flex-col items-center justify-center mr-3 ml-3 mt-3 mb-3"
      sx={{ minHeight: "90vh" }}
    >
      <Grid2 container spacing={4} className="flex justify-center items-start">
        {/* Reminders */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 4 }}
          className="flex justify-center items-center"
        >
          <Box
            sx={generalStyles.Dashboard.Box}
            className="flex items-center justify-center"
          >
            <Typography variant="h6">{strings.reminders}</Typography>
          </Box>
        </Grid2>
        {/* Day Overview */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 4 }}
          className="flex justify-center items-center"
        >
          <Box
            sx={{
              ...generalStyles.Dashboard.Box,
              height: "500px",
            }}
            className="flex items-center justify-center"
          >
            <Typography variant="h6">{strings.dayOverview}</Typography>
          </Box>
        </Grid2>
        {/* Progress */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 4 }}
          className="flex justify-center items-center"
        >
          <Box
            sx={generalStyles.Dashboard.Box}
            className="flex items-center justify-center"
          >
            <Typography variant="h6">{strings.progress}</Typography>
          </Box>
        </Grid2>
        {/* Chat */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 4 }}
          className="flex justify-center items-center"
        >
          <Box
            sx={{
              ...generalStyles.Dashboard.Box,
              marginTop: isMobile ? "0" : "-100px",
            }}
            className="flex items-center justify-center"
          >
            <Typography variant="h6">{strings.chat}</Typography>
          </Box>
        </Grid2>
        {/* Calendar */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 4 }}
          className="flex justify-center items-center"
        >
          <Box
            sx={{
              ...generalStyles.Dashboard.Box,
              height: "250px",
            }}
            className="flex items-center justify-center"
          >
            <Typography variant="h6">{strings.calendar}</Typography>
          </Box>
        </Grid2>
        {/* Habit Tips */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 4 }}
          className="flex justify-center items-center"
        >
          <Box
            sx={{
              ...generalStyles.Dashboard.Box,
              marginTop: isMobile ? "0px" : "-100px",
            }}
            className="flex items-center justify-center"
          >
            <Typography variant="h6">{strings.habitTip}</Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default DashboardPage;
