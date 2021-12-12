import React from "react";
import Stack from "@mui/material/Stack";
import Masonry from "@mui/lab/Masonry";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";


function PatternGrid(props) {
  const patterns = props.patterns;
  const showDetailView = () => evt => { props.toggleDetailView() }
  const patternClicked = pattern => evt => { props.patternClicked(pattern) }

  return (
    <React.Fragment>
      <Masonry columns={{ xs: 2, sm: 3, lg: 4, xl: 5 }} spacing={1}>
        {patterns.map((pattern) => (
          <Stack key={pattern.id} onClick={patternClicked(pattern)}>
            <Card sx={{ maxWidth: 345 }} raised>
              <CardActionArea onClick={showDetailView()}>
                <CardMedia
                  component="img"
                  image={'https://via.placeholder.com/300'}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {pattern.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        ))}
      </Masonry>
    </React.Fragment>
  );
}

export default PatternGrid;
