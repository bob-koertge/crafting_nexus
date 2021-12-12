import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";

import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function PatternForm(props) {
  const publishers = props.publishers;
  const categories = props.categories;
  const sizes = props.sizes;
  const [formValues, setFormValues] = useState({
    patternName: "",
    description: "",
    publishers: [],
    categories: [],
    sizes: [],
    rating: 3,
  });

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  function handleChange(event) {
    const value = event.target.value;
    setFormValues({
      ...formValues,
      [event.target.name]: value,
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <Box>
      <form onSubmit={handleFormSubmit}>
        <TextField
          required
          fullWidth
          label="Pattern Name"
          name="patternName"
          autoFocus
          margin="normal"
          value={formValues.patternName}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          multiline
          fullWidth
          margin="normal"
          value={formValues.description}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          select
          SelectProps={{ multiple: true }}
          fullWidth
          value={formValues.publishers}
          onChange={handleChange}
          label="Publishers"
          name="publishers"
        >
          {publishers.map((pub) => (
            <MenuItem key={pub.id} value={pub.id}>
              {pub.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          select
          SelectProps={{ multiple: true }}
          fullWidth
          value={formValues.categories}
          onChange={handleChange}
          label="Categories"
          name="categories"
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          select
          SelectProps={{ multiple: true }}
          fullWidth
          value={formValues.sizes}
          onChange={handleChange}
          label="Sizes"
          name="sizes"
        >
          {sizes.map((size) => (
            <MenuItem key={size.id} value={size.id}>
              {size.size_name}
            </MenuItem>
          ))}
        </TextField>
        <StyledRating
          name="rating"
          value={Number(formValues.rating)}
          onChange={handleChange}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <button type="submit">save</button>
      </form>
    </Box>
  );
}

export default PatternForm;
