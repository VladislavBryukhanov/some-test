import { useState } from 'react'
import * as itemsService from '../services/items.service';

export const useItemsState = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const actionWrapper = (action) => async (...args) => {
    setIsLoading(true);

    try {
      await action(...args);
    } catch (err) {
      setError(
        typeof err.response?.data == 'object'
          ? JSON.stringify(err.response?.data)
          : err.response?.data,
      );
    } finally {
      setIsLoading(false);
    }
  }

  const fetchItems = actionWrapper(async () => {
    const items = await itemsService.getAll();
    items.length && setItems(items);
  });
  
  const addItem = actionWrapper(async (type, name, url) => {
    const newItem = await itemsService.create({ name, url, type });
    setItems([...items, newItem]);
  });

  const deleteItem = actionWrapper(async (id) => {
    await itemsService.deleteOne(id);

    const existingItems = items.filter(item => item._id !== id);
    setItems(existingItems);
  });



  return {
    error,
    isLoading,
    items,
    fetchItems,
    addItem,
    deleteItem,
    hideError: () => setError(false),
  };
}