import {render, screen, waitFor} from '@testing-library/react-native';
import {Navigation} from '../App';
import axios, { AxiosResponse } from 'axios';
import PokeData, { Response } from '../src/screens/PokeData';
import { fetchPokemon } from '../src/api/fetchPokemon';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

type Nav = Navigation<'PokeData'>['navigation'];
type Route = Navigation<'PokeData'>['route'];

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as Partial<Nav>;

const route = {params: {val: 'Pikachu'}} as Route;
const props = {navigation, route} as Navigation<'PokeData'>;

describe('PokeData Test', () => {

  afterAll(() => {
    jest.resetAllMocks();
  });

  const renderComponent = () => (render(<PokeData {...props} />));

  it('Mocking and returning correct data', async () => {
    const { getByTestId , getByText} = renderComponent();

    const resData:Response={
      name:"Pikachu",
      base_experience:"aaa",
      weight:90
    }

    const mockedResponse = {
      data: resData,
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    const data = await fetchPokemon('Pikachu');
    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(resData);
    const weightText = getByTestId('pokeWeight');
    const expText = getByTestId('pokeExp');
  
     expect(weightText.props.children).getByText(`Weight : ${resData.weight}`);

  });
});
