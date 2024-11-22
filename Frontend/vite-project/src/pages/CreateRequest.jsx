// src/pages/CreateRequest.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Updated import
import dayjs from 'dayjs'; // Import dayjs if you need to manipulate dates
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    typeOfHelp: '',
    offeredAmount: '',
    responseDeadline: null, // New Field
    workDeadline: null, // New Field
  });

  const { title, description, typeOfHelp, offeredAmount, responseDeadline, workDeadline } = formData;

  const [error, setError] = useState('');
  const [typeOfHelpOptions, setTypeOfHelpOptions] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [processing, setProcessing] = useState(false); // To handle processing state
  const [enhancing, setEnhancing] = useState(false); // To handle description enhancement
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchTypeOfHelp = async () => {
      try {
        const res = await axios.get('/api/type-of-help', { withCredentials: true });
        setTypeOfHelpOptions(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching TypeOfHelp:', err);
        setError('Failed to load Type of Help options.');
        setLoading(false);
      }
    };

    fetchTypeOfHelp();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleDateChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setError('');
  };

  const handleEnhanceDescription = async () => {
    if (!description) {
      setError('Description cannot be empty.');
      return;
    }

    setEnhancing(true);
    setError('');

    try {
      // Call the API to enhance the description
      const enhanceRes = await axios.post(
        '/api/openai/enhance-description',
        { description },
        { withCredentials: true }
      );

      const enhancedDescription = enhanceRes.data.enhancedDescription;

      // Update the description state
      setFormData({ ...formData, description: enhancedDescription });

      setSnackbar({ open: true, message: 'Description enhanced successfully!', severity: 'success' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Failed to enhance description.');
      setSnackbar({
        open: true,
        message: err.response?.data?.msg || 'Failed to enhance description.',
        severity: 'error',
      });
    } finally {
      setEnhancing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!title || !description || !typeOfHelp || !offeredAmount || !responseDeadline || !workDeadline) {
      setError('Please fill in all fields.');
      return;
    }

    if (dayjs(responseDeadline).isAfter(dayjs(workDeadline)) || dayjs(responseDeadline).isSame(dayjs(workDeadline))) {
      setError('Response Deadline must be before Work Deadline.');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Submit the help request with the enhanced description and deadlines
      await axios.post(
        '/api/requests',
        { title, description, typeOfHelp, offeredAmount, responseDeadline, workDeadline },
        { withCredentials: true }
      );

      setSnackbar({ open: true, message: 'Help request created successfully!', severity: 'success' });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Failed to create help request.');
      setSnackbar({
        open: true,
        message: err.response?.data?.msg || 'Failed to create help request.',
        severity: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Updated Adapter */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            padding: 4,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Create Help Request
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEnhanceDescription}
              disabled={enhancing}
              sx={{ mt: 1, mb: 2 }}
            >
              {enhancing ? <CircularProgress size={24} /> : 'Enhance Description'}
            </Button>
            <FormControl variant="outlined" fullWidth required margin="normal">
              <InputLabel id="type-of-help-label">Type of Help</InputLabel>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <Select
                  labelId="type-of-help-label"
                  id="type-of-help"
                  name="typeOfHelp"
                  value={typeOfHelp}
                  onChange={handleChange}
                  label="Type of Help"
                >
                  {typeOfHelpOptions.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <TextField
              label="Offered Amount ($)"
              name="offeredAmount"
              variant="outlined"
              fullWidth
              value={offeredAmount}
              onChange={handleChange}
              required
              type="number"
              margin="normal"
              inputProps={{ min: 0, step: '0.01' }}
            />

            {/* New Fields: Response Deadline and Work Deadline */}
            <DateTimePicker
              label="Response Deadline"
              value={responseDeadline}
              onChange={(newValue) => handleDateChange('responseDeadline', newValue)}
              renderInput={(params) => <TextField {...params} fullWidth required margin="normal" />}
            />
            <DateTimePicker
              label="Work Deadline"
              value={workDeadline}
              onChange={(newValue) => handleDateChange('workDeadline', newValue)}
              renderInput={(params) => <TextField {...params} fullWidth required margin="normal" />}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              disabled={loading || processing} // Disable button while loading or processing
            >
              {processing ? <CircularProgress size={24} /> : 'Create Request'}
            </Button>
          </form>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default CreateRequest;
