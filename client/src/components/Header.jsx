import { Grid, Button, TextField, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} paddingX={4} paddingY={2}>
      <Grid item xs={3}>
        <Typography variant="h5" component="h2">
          Library
        </Typography>
      </Grid>
      <Grid item xs={6} alignItems="center">
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search item..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={3} justifyContent="end" alignItems="center" display="flex">
        <Button
          variant="contained"
          startIcon={<LibraryAddIcon />}
          onClick={() => navigate("/create")}
        >
          Upload
        </Button>
      </Grid>
    </Grid>
  );
}
