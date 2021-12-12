import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PatternDetails(props) {
  const pattern = props.pattern;

  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={12}>
          <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
            {pattern.name}
          </Typography>
          <ButtonGroup size='small'>          
            <Button color='secondary' startIcon={<EditIcon />}>Edit</Button>
            <Button color='error' startIcon={<DeleteIcon />}>Delete</Button>
          </ButtonGroup>
          
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Grid container>
          <Grid item sm={8}>
            {pattern.description}
          </Grid>
          <Grid item sm={4}>
            <img src="https://via.placeholder.com/200x300" alt="placeholder" />
          </Grid>
          <Grid item sm={12} sx={{ marginBottom: 1 }}>
            <Typography variant="body1" component="span" color="secondary">
              Publisher:{" "}
            </Typography>
            {pattern.publisher.map(({ name }) => `${name}`).join(" & ")}
          </Grid>
          <Grid item sm={12} sx={{ marginBottom: 1 }}>
            <Typography variant="body1" component="span" color="secondary">
              Category:{" "}
            </Typography>
            {pattern.pattern_categories.map((category) => {
              return (
                <Chip
                  key={category.id}
                  color="primary"
                  variant="outlined"
                  size="small"
                  label={category.name}
                />
              );
            })}
          </Grid>
          <Grid item sm={12} sx={{ marginBottom: 1 }}>
            <Typography variant="body1" component="span" color="secondary">
              Sizes:{" "}
            </Typography>
            {pattern.pattern_sizes.map((size) => {
              return (
                <Chip
                  key={size.id}
                  color="success"
                  variant="outlined"
                  size="small"
                  label={size.size_name}
                />
              );
            })}
          </Grid>
          <Grid item sm={12} sx={{ marginBottom: 1 }}>
            <Typography variant="body1" component="span" color="secondary">
              Variations:{" "}
            </Typography>
            {pattern.pattern_variations.map((variation) => {
              return (
                <Chip
                  key={variation.id}
                  color="error"
                  variant="outlined"
                  size="small"
                  label={variation.pattern_variation}
                />
              );
            })}
          </Grid>
          <Grid item sm={12} sx={{ marginBottom: 1 }}>
            <Typography variant="body1" component="span" color="secondary">
              Tutorial:{" "}
            </Typography>
            {pattern.tuturials.map((tuturial) => {
              return (
                <Button
                  key={tuturial.id}
                  component="a"
                  size="small"
                  href={tuturial.url}
                  target="_blank"
                >
                  {tuturial.name}
                </Button>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default PatternDetails;
