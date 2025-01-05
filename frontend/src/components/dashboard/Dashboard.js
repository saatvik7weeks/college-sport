import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <SchoolIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">View Colleges</Typography>
              </Box>
              <Typography color="textSecondary" paragraph>
                Browse and search through our comprehensive list of colleges.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/colleges')}
              >
                View Colleges
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationCityIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">City-wise Analysis</Typography>
              </Box>
              <Typography color="textSecondary" paragraph>
                Explore colleges grouped by cities and their performance metrics.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/colleges?view=city')}
              >
                View Analysis
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">Placement Trends</Typography>
              </Box>
              <Typography color="textSecondary" paragraph>
                Analyze placement statistics and trends across colleges.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/colleges?view=placement')}
              >
                View Trends
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* System Information */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography color="textSecondary">
                Backend Status
              </Typography>
              <Typography variant="h6" color="success.main">
                Connected
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography color="textSecondary">
                API Version
              </Typography>
              <Typography variant="h6">
                1.0.0
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography color="textSecondary">
                Last Updated
              </Typography>
              <Typography variant="h6">
                {new Date().toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography color="textSecondary">
                Database Status
              </Typography>
              <Typography variant="h6" color="success.main">
                Online
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard; 