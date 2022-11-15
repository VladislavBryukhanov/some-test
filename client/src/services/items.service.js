import axios from 'axios';

const itemsApi = axios.create({
  baseURL: `${process.env.REACT_APP_CORE_API}/item`,
});

export const getAll = async () => {
  const result = await itemsApi.get('');
  return result.data?.items;
}

export const create = async (itemBody) => {
  const result = await itemsApi.post('', itemBody);
  return result.data?.item;
}

export const deleteOne = async (itemId) => {
  await itemsApi.delete(itemId);
}
