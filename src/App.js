  import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Grid, 
  Box, 
  CircularProgress, 
  Alert, 
  Card, 
  CardContent 
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GavelIcon from '@mui/icons-material/Gavel';
import './App.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [formData, setFormData] = useState({
    Case_Duration_Days: '',
    Case_ID: '',
    Judge: 'Judge A',
    Lawyer_Experience_Years: '',
    Legal_Representation: 'Yes',
    Number_of_Witnesses: '',
    Severity_of_Charges: 'Low'
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || 'An error occurred during prediction');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box className="app-header" py={4} mb={4}>
          <Container>
            <Box display="flex" alignItems="center" justifyContent="center">
              <GavelIcon fontSize="large" sx={{ mr: 2 }} />
              <Typography variant="h3" component="h1">
                Court Case Outcome Prediction
              </Typography>
            </Box>
            <Typography variant="subtitle1" mt={2} color="text.secondary">
              Advanced AI-powered legal outcome prediction system
            </Typography>
          </Container>
        </Box>
        
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper elevation={3} className="form-paper">
                <Typography variant="h5" component="h2" gutterBottom>
                  Case Details
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Case Duration (Days)"
                        type="number"
                        name="Case_Duration_Days"
                        value={formData.Case_Duration_Days}
                        onChange={handleChange}
                        required
                        inputProps={{ min: 1 }}
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Case ID"
                        name="Case_ID"
                        value={formData.Case_ID}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Judge</InputLabel>
                        <Select
                          name="Judge"
                          value={formData.Judge}
                          onChange={handleChange}
                          label="Judge"
                          required
                        >
                          <MenuItem value="Judge A">Judge A</MenuItem>
                          <MenuItem value="Judge B">Judge B</MenuItem>
                          <MenuItem value="Judge C">Judge C</MenuItem>
                          <MenuItem value="Judge D">Judge D</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Lawyer Experience (Years)"
                        type="number"
                        name="Lawyer_Experience_Years"
                        value={formData.Lawyer_Experience_Years}
                        onChange={handleChange}
                        required
                        inputProps={{ min: 0 }}
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Legal Representation</InputLabel>
                        <Select
                          name="Legal_Representation"
                          value={formData.Legal_Representation}
                          onChange={handleChange}
                          label="Legal Representation"
                          required
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Number of Witnesses"
                        type="number"
                        name="Number_of_Witnesses"
                        value={formData.Number_of_Witnesses}
                        onChange={handleChange}
                        required
                        inputProps={{ min: 0 }}
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Severity of Charges</InputLabel>
                        <Select
                          name="Severity_of_Charges"
                          value={formData.Severity_of_Charges}
                          onChange={handleChange}
                          label="Severity of Charges"
                          required
                        >
                          <MenuItem value="Low">Low</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="High">High</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        size="large"
                        disabled={loading}
                        className="submit-button"
                      >
                        {loading ? <CircularProgress size={24} /> : 'Predict Outcome'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box className="results-container">
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                
                {prediction && !error && (
                  <Card className="prediction-card" elevation={3}>
                    <CardContent>
                      <Typography variant="h5" component="h2" gutterBottom>
                        Predicted Outcome
                      </Typography>
                      
                      <Box 
                        className="outcome-display"
                        sx={{ 
                          backgroundColor: getOutcomeColor(prediction),
                          color: 'white',
                          p: 3,
                          borderRadius: 2,
                          mt: 2
                        }}
                      >
                        <Typography variant="h4" component="p" align="center">
                          {prediction}
                        </Typography>
                      </Box>
                      
                      <Box mt={3}>
                        <Typography variant="body1" color="text.secondary">
                          This prediction is based on the case details provided and our neural network model.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )}
                
                {!prediction && !error && (
                  <Paper elevation={3} className="info-paper">
                    <Box p={3}>
                      <Typography variant="h6" gutterBottom>
                        How It Works
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Our AI system analyzes case details to predict the most likely outcome based on historical data.
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Fill in the case details on the left and click "Predict Outcome" to see the results.
                      </Typography>
                      <Typography variant="body2">
                        Possible outcomes: Guilty, Not Guilty, Dismissed, or Settled.
                      </Typography>
                    </Box>
                  </Paper>
                )}
              </Box>
            </Grid>
          </Grid>
          
          <Box mt={5} mb={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              © 2023 Court Case Prediction System | AI-Powered Legal Analytics
            </Typography>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
