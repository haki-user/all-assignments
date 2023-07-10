import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// mui
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/courses", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Courses Page</h1>
      <br />
      <Grid container spacing={2}>
        {courses.map((course) => {
          // return Course(course);
          return (
            <Grid key={course.id} item xs={12} sm={6} md={14}>
              <Course key={course.id} {...course} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function Course(props) {
  const { title, price, description, imageLink } = props;
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
              <CardMedia
                component="img"
                src={imageLink}
                sx={{ width: "100%", maxWidth: 200, maxHeight: 100 }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price: {price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

Course.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  published: PropTypes.bool,
  description: PropTypes.string,
  imageLink: PropTypes.string,
};
export default Courses;