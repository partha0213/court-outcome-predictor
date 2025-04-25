import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingAnimation = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      p={3}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="body1" mt={2} color="text.secondary">
        Analyzing case details...
      </Typography>
    </Box>
  );
};

export default LoadingAnimation;