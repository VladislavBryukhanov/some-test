import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { useMemo } from 'react';
import ReactPlayer from 'react-player'
import { ReactComponent as LinkImg } from '../../assets/link-icon.svg';
import { ReactComponent as TrashImg } from '../../assets/trash-icon.svg';
import { ITEM_TYPES } from '../../constants/item-type';
import './styles.css';

export const Item = ({ name, owner_id, type, url, onDelete }) => {
  const mediaSizeProps = {
    width: 260,
    height: 140,
  };

  const mediaElement = useMemo(() => {
    switch (type) {
      case ITEM_TYPES.YOUTUBE:
        return <ReactPlayer url={url} {...mediaSizeProps} />
      case ITEM_TYPES.LINK:
        return (
          <a href={url} target="blank">
            <LinkImg {...mediaSizeProps}/>
          </a>
        );
    }
  }, [type]);

  return (
    <Card width={mediaSizeProps.width} className="item-container">
      {mediaElement}

      <div className='item-actions'>
        <IconButton onClick={onDelete}>
          <TrashImg />
        </IconButton>
      </div>
      
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          whiteSpace="nowrap"
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {owner_id}
        </Typography>
      </CardContent>
    </Card>
  );
}
