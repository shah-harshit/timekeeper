import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify, parse } from "qs";
import { useTimeKeeperStore } from "../../stores/timekeeper/timekeeper.store";
import { getStartTime, getTimeString } from "../../utils/utils";
import { ALL_PATH, DEFAULT_DURATION } from "../../constants";
import { Chip, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";

export const CommonHeader = () => {
  const history = useHistory();
  const location = useLocation();
  const locationSearch = parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { duration: durationFromURL } = parse(locationSearch);

  const [
    duration,
    setDuration,
    endTime,
    setEndTime,
    isDefaultDuration,
    setIsDefaultDuration,
  ] = useTimeKeeperStore((state) => [
    state.duration,
    state.setDuration,
    state.endTime,
    state.setEndTime,
    state.isDefaultDuration,
    state.setIsDefaultDuration,
  ]);

  const handleNavigationButtonClick = (index) => {
    const search = stringify({
      duration,
      startTime: getStartTime(endTime, duration),
      endTime,
    });
    setEndTime(new Date().getTime());
    history.push({ pathname: ALL_PATH[index], search });
  };

  const handleDurationChange = (e) => {
    const updatedDuration = Number(e.target.value);
    setDuration(updatedDuration);
    setIsDefaultDuration(updatedDuration === DEFAULT_DURATION);
    history.push({
      search: stringify({
        duration: updatedDuration,
        startTime: getStartTime(endTime, duration),
        endTime,
      }),
    });
  };

  React.useEffect(() => {
    if (durationFromURL) {
      setDuration(durationFromURL);
    }
  }, [duration, durationFromURL, setDuration, setIsDefaultDuration]);

  React.useEffect(() => {
    setIsDefaultDuration(Number(durationFromURL) === DEFAULT_DURATION);
    history.push({
      search: stringify({
        duration: durationFromURL || duration,
        startTime: getStartTime(endTime, duration),
        endTime,
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack alignItems="center">
      <Stack direction="row" marginBottom="15px">
        <Tabs
          value={ALL_PATH.indexOf(history.location.pathname)}
          onChange={(event, newValue) => handleNavigationButtonClick(newValue)}
        >
          <Tab label="Screen A" />
          <Tab label="Screen B" />
          <Tab label="Screen C" />
        </Tabs>
      </Stack>
      <Stack direction="row" spacing={2} marginBottom="20px">
        <Chip
          label="Default"
          color={isDefaultDuration ? "primary" : "default"}
        />
        <Chip
          label="Custom"
          color={!isDefaultDuration ? "primary" : "default"}
        />
      </Stack>
      <div>
        <TextField
          variant="outlined"
          type="number"
          size="small"
          label="Duration (in minutes)"
          value={duration}
          onChange={handleDurationChange}
        />
        <Stack marginTop="10px" direction="column">
          <Stack direction="row" spacing={1}>
            <Typography variant="button">{`Duration: ${duration} minutes`}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="button">
              {`Start time: ${getTimeString(getStartTime(endTime, duration))}`}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="button">
              {`End time: ${getTimeString(endTime)}`}
            </Typography>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
};
