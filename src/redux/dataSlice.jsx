import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connection: null,
  cacheItems: [],
  isLoading: true,
};

const cacheSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    connect: (state, action) => {
      state.connection = action.payload;
    },
    disconnect: (state) => {
      state.connection = null;
    },
    updateCache: (state, action) => {
      const { deleteIds, updateData } = action.payload;
      let currentCache = JSON.parse(JSON.stringify(state.cacheItems));

      currentCache = currentCache.filter(
        (item) => !deleteIds.includes(item.id)
      );

      updateData.forEach((item) => {
        const existingItemIndex = currentCache.findIndex(
          (e) => e.id === item.id
        );

        if (existingItemIndex !== -1) {
          // Update existing item
          currentCache[existingItemIndex] = item;
        } else {
          // Add item to new items list if not found in existing items
          currentCache.push(item);
        }
      });

      state.cacheItems = currentCache;
    },
  },
});

export const {
  connect,
  disconnect,
  addItem,
  updateItems,
  updateCache,
  removeItems,
} = cacheSlice.actions;

export default cacheSlice.reducer;
