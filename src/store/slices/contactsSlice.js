import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  updateList: false,
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    resetStore: (state, action) => {
      state.contacts = [];
      state.updateList = false;
    },
    setUpdateList: (state, action) => {
      state.updateList = true;
    },
  },
});

export const {setContacts, resetStore, setUpdateList} = contactsSlice.actions;

export default contactsSlice.reducer;
