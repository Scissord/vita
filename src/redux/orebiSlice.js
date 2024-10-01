import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  totalAmount: 0, // Добавлено для хранения общей суммы заказа
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
   decreaseQuantity: (state, action) => { // Исправлено с drecreaseQuantity на decreaseQuantity
  const item = state.products.find(
    (item) => item._id === action.payload._id
  );
  if (item && item.quantity > 1) { // Изменено условие для уменьшения количества
    item.quantity--;
  }
},
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    updateTotalAmount: (state, action) => {
      state.totalAmount = action.payload; // Обновление общей суммы заказа
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity, // Исправлено название экспорта
  deleteItem,
  resetCart,
  updateTotalAmount, // Экспорт нового действия
} = orebiSlice.actions;

export default orebiSlice.reducer;
