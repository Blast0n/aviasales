// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSeacrhId = createAsyncThunk('aviasales/fetchSeacrhId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search');
  const data = await response.json();
  return data.searchId;
});

export const fetchTickets = createAsyncThunk('aviasales/fetchTickets', async (key, { dispatch, rejectWithValue }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${key}`);
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  const fetchRecursive = async () => {
    try {
      const response = await fetchData();
      if (response === 'Server error') {
        dispatch(fetchTickets(key));
        throw new Error('Server error');
      }
      if (!response.stop) {
        dispatch(fetchTickets(key));
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  };

  return fetchRecursive();
});

const appSlice = createSlice({
  name: 'aviasales',
  initialState: {
    searchId: '',
    data: [],
    loading: false,
    clickedBtn: '',
    checkedList: ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'],
  },
  reducers: {
    onChange(state, action) {
      state.checkedList = action.payload;
    },
    onBtnClick(state, action) {
      state.clickedBtn = action.payload;
    },
    filteredByClick(state, action) {
      if (action.payload === '1') {
        state.data = state.data.sort((a, b) => a.price - b.price);
      }
      if (action.payload === '2') {
        state.data = state.data.sort(
          (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
        );
      }
      if (action.payload === '3') {
        const avgPrice = state.data.reduce((sum, el) => sum + el.price, 0) / state.data.length;
        const avgDuration =
          state.data.reduce((sum, el) => sum + el.segments[0].duration + el.segments[1].duration, 0) /
          state.data.length;
        const totalDifference = (obj) => {
          const totalDuration = obj.segments[0].duration + obj.segments[1].duration;
          return Math.abs(obj.price - avgPrice) + Math.abs(totalDuration - avgDuration);
        };
        state.data = state.data.sort((a, b) => totalDifference(a) - totalDifference(b));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeacrhId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeacrhId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (action.payload.stop) {
          state.loading = false;
        }
        state.data = [...state.data, ...action.payload.tickets];
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { onChange, onBtnClick, filteredByClick } = appSlice.actions;

export default appSlice.reducer;
