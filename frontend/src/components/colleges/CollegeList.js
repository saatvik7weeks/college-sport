import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const CollegeList = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    city: '',
    state: '',
  });

  const fetchColleges = async () => {
    const params = new URLSearchParams();
    if (filters.city) params.append('city', filters.city);
    if (filters.state) params.append('state', filters.state);
    
    const response = await axios.get(`http://localhost:3001/colleges?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  };

  const { data: colleges, isLoading, error } = useQuery(
    ['colleges', filters],
    fetchColleges
  );

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.response?.data?.message || 'An error occurred while fetching colleges'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <TextField
              select
              label="City"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              fullWidth
            >
              <MenuItem value="">All Cities</MenuItem>
              {/* Add city options dynamically */}
            </TextField>
            <TextField
              select
              label="State"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              fullWidth
            >
              <MenuItem value="">All States</MenuItem>
              {/* Add state options dynamically */}
            </TextField>
          </Box>
        </Grid>
        {colleges?.map((college) => (
          <Grid item xs={12} md={6} lg={4} key={college.id}>
            <Card
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/colleges/${college.id}`)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {college.name}
                </Typography>
                <Typography color="textSecondary">
                  Score: {college.score}
                </Typography>
                <Typography color="textSecondary">
                  City: {college.city_name}
                </Typography>
                <Typography color="textSecondary">
                  State: {college.state_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CollegeList; 