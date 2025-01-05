import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import axios from 'axios';

const CollegeDetails = () => {
  const { id } = useParams();

  const fetchCollegeData = async () => {
    const response = await axios.get(`http://localhost:3001/college_data/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  };

  const fetchCollegeCourses = async () => {
    const response = await axios.get(`http://localhost:3001/college_courses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  };

  const { data: collegeData, isLoading: isLoadingData, error: dataError } = useQuery(
    ['collegeData', id],
    fetchCollegeData
  );

  const { data: courses, isLoading: isLoadingCourses, error: coursesError } = useQuery(
    ['collegeCourses', id],
    fetchCollegeCourses
  );

  if (isLoadingData || isLoadingCourses) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (dataError || coursesError) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {(dataError || coursesError)?.response?.data?.message || 'An error occurred while fetching college details'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Average Placement Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Placement Statistics
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Year</TableCell>
                      <TableCell align="right">Average Placement</TableCell>
                      <TableCell align="right">Highest Placement</TableCell>
                      <TableCell align="right">Median Placement</TableCell>
                      <TableCell align="right">Placement Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {collegeData?.avg_section?.map((row) => (
                      <TableRow key={row.year}>
                        <TableCell>{row.year}</TableCell>
                        <TableCell align="right">
                          ₹{row.average_placement.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          ₹{row.highest_placement.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          ₹{row.median_placement.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {row.placement_rate}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Placement Trend Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Placement Trends
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Year</TableCell>
                      <TableCell align="right">Placement Rate</TableCell>
                      <TableCell align="right">Trend</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {collegeData?.placement_section?.map((row) => (
                      <TableRow key={row.year}>
                        <TableCell>{row.year}</TableCell>
                        <TableCell align="right">{row.placement_rate}%</TableCell>
                        <TableCell align="right">
                          {row.placement_trend === 'UP' ? (
                            <TrendingUpIcon color="success" />
                          ) : (
                            <TrendingDownIcon color="error" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Courses Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Courses
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course Name</TableCell>
                      <TableCell align="right">Duration (Years)</TableCell>
                      <TableCell align="right">Fee (₹)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses?.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.course_name}</TableCell>
                        <TableCell align="right">{course.course_duration}</TableCell>
                        <TableCell align="right">
                          ₹{course.course_fee.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CollegeDetails; 