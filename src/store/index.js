import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './articlesSlice'

export default configureStore({
  reducer: rootReducer,
})
