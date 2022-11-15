import { Grid, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ItemsContext } from '../App';
import { Header } from '../components/Header';
import { Item } from '../components/Item';

export const ItemsOverviewPage = () => {
  const { items, fetchItems, deleteItem } = useContext(ItemsContext);

  useEffect(() => {
    if (!items.length) {
      fetchItems();
    }
  }, [items]);

  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={8} justifySelf="centers">
        <Paper elevation={4}>
          <Header />
          <Stack
            minHeight="60vh"
            flexWrap="wrap"
            direction="row"
            padding={4}
            gap={3}
          >
            {items.map(item => (
              <Box key={item._id}>
                <Item
                  key={item._id}
                  onDelete={() => deleteItem(item._id)}
                  {...item}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
