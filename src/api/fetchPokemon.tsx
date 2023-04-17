import axios from 'axios';
const URL = "https://pokeapi.co/api/v2/pokemon"

export const fetchPokemon = async (name: string) => {
  const results = await axios.get(`${URL}/${name}`);
  return results.data;
};
