import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Article {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
  category: string;
}

export interface ArticlesState {
  articles: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  status: 'idle',
  error: null,
};

type AsyncThunkConfig = {}; // If you don't have a custom config, keep it as an empty object

export const fetchArticles: AsyncThunk<Article[], void, AsyncThunkConfig> = createAsyncThunk<Article[], void, AsyncThunkConfig>(
  'articles/fetchArticles',
  async () => {
    const response = await axios.get('https://dummy-rest-api.specbee.site/api/v1/news');
    console.log("🚀 ~ response.data:", response.data)
    return response.data;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default articlesSlice.reducer;
