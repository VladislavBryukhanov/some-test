import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ITEM_TYPES } from '../../constants/item-type';
import { ItemsContext } from '../../App';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddLinkIcon from '@mui/icons-material/AddLink';
import './styles.css';

export const CreateItemPage = () => {
  const navigate = useNavigate();
  const handleClosePage = () => navigate('/');
  const { isLoading, addItem } = useContext(ItemsContext);

  const [name, setName] = useState('');
  const [url, setUrl ] = useState('');
  const [type, setType] = useState(ITEM_TYPES.YOUTUBE);

  const handleSave = async () => {
    await addItem(type, name, url);
    handleClosePage();
  }

  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={8} justifySelf="centers" padding={4}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant='h5'>Upload</Typography>
          <IconButton onClick={handleClosePage}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box display="flex" gap={6} mb={6}>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <IconButton onClick={() => setType(ITEM_TYPES.YOUTUBE)}>
              <YouTubeIcon size="large"/>
            </IconButton>
            <Typography variant='subtitle1'>
              <Box className={type === ITEM_TYPES.YOUTUBE && 'type-selected'}>
                Youtube
              </Box>
            </Typography>
          </Box>
          
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <IconButton onClick={() => setType(ITEM_TYPES.LINK)}>
              <AddLinkIcon size="large"/>
            </IconButton>
            <Typography variant='subtitle1'>
              <Box className={type === ITEM_TYPES.LINK && 'type-selected'}>
                Link
              </Box>
            </Typography>
          </Box>
        </Box>

        <Box mb={4}>
          <TextField
            required
            fullWidth
            label="Url"
            variant="outlined"
            size='small'
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
        <Box mb={4}>
          <TextField
            required
            fullWidth
            label="Name"
            variant="outlined"
            size='small'
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleClosePage}
          >
            Back
          </Button>
          <Button
            variant="contained"
            disabled={isLoading}
            startIcon={<ArrowForwardIcon />}
            onClick={handleSave}
          >
            {isLoading ? 'Creating...' : 'Save'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}