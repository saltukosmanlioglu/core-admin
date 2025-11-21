import { Box, CircularProgress } from "@mui/material";

interface ChartLoaderProps {
  height?: number | string;
}

const ChartLoader: React.FunctionComponent<ChartLoaderProps> = ({ height = 320 }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height }}>
      <CircularProgress color="secondary" />
    </Box>
  );
}

ChartLoader.displayName = "ChartLoader";

export default ChartLoader;
