// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSeacrhId = createAsyncThunk('aviasales/fetchSeacrhId', async function () {
  const response = await fetch('https://aviasales-test-api.kata.academy/search');
  const data = await response.json();
  return data.searchId;
});

export const fetchData = createAsyncThunk('aviasales/fetchData', async function (key) {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${key}`);
  const data = await response.json();
  return data;
});

const appSlice = createSlice({
  name: 'aviasales',
  initialState: {
    searchId: '',
    data: [],
    checkedList: [],
    buttonsClicked: {
      1: true,
      2: false,
      3: false,
    },
  },
  reducers: {
    onChange(state, action) {
      state.checkedList = action.payload;
    },
    onButtonClick(state, action) {
      state.buttonsClicked[action.payload] = !state.buttonsClicked[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeacrhId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.tickets;
      });
  },
});

export const { onChange, onButtonClick } = appSlice.actions;

export default appSlice.reducer;
