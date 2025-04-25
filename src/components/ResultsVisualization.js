import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ResultsVisualization = ({ prediction }) => {
  // Function to determine outcome color
  const getOutcomeColor = (outcome) => {
    switch(outcome) {
      case 'Guilty': return '#d32f2f';
      case 'Not Guilty': return '#388e3c';
      case 'Dismissed': return '#1976d2';
      case 'Settled': return '#f57c00';
      default: return '#757575';
    }
  };

  // Function to get outcome icon
  const getOutcomeIcon = (outcome) => {
    switch(outcome) {
      case 'Guilty': return '⚖️';
      case 'Not Guilty': return '✅';
      case 'Dismissed': return '🚫';
      case 'Settled': return '🤝';
      default: return '❓';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Predicted Outcome
      </Typography>
      
      <Box 
        sx={{ 
          backgroundColor: getOutcomeColor(prediction),
          color: 'white',
          p: 3,
          borderRadius: 2,
          mt: 2,
          textAlign: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        <Typography variant="h1" component="p" sx={{ fontSize: '3rem', mb: 1 }}>
          {getOutcomeIcon(prediction)}
        </Typography>
        <Typography variant="h4" component="p">
          {prediction}
        </Typography>
      </Box>
      
      <Box mt={3}>
        <Typography variant="body1" color="text.secondary">
          This prediction is based on the case details provided and our neural network model.
        </Typography>
      </Box>
    </Paper>
  );
};

export default ResultsVisualization;