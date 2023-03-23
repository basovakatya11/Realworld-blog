import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const apiBase = 'https://blog.kata.academy/api/'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async(_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${apiBase}articles`)
        if (!response.ok) {
            throw new Error(response.status)
        }
        return await response.json()
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const registerUser = createAsyncThunk('articles/registerUser', async(userInfo, {rejectWithValue}) => {
    try{
        const response = await fetch(`${apiBase}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: userInfo
            })
        })
        return await response.json()
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const loginUser = createAsyncThunk('articles/loginUser', async(userInfo, {rejectWithValue}) => {
    try{
        const response = await fetch(`${apiBase}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: userInfo
            })
        })
        if (!response.ok) {
            throw new Error(response.status)
        }
        return await response.json()
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const editProfile = createAsyncThunk('articles/editProfile', async(updatedUserInfo, {rejectWithValue}) => {
    try{
        const token = JSON.parse(localStorage.getItem('user')).token
        const response = await fetch(`${apiBase}user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                user: updatedUserInfo
            })
        })
        if (!response.ok) {
            throw new Error(response.status)
        }
        return await response.json()
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const createNewArticle = createAsyncThunk('articles/createNewArticle', async(newArticleInfo, {rejectWithValue}) => {
    try{
        const token = JSON.parse(localStorage.getItem('user')).token
        const response = await fetch(`${apiBase}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                article: newArticleInfo
            })
        })
        if (!response.ok) {
            throw new Error(response.status)
        }
        return await response.json()
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async(slug, {rejectWithValue}) => {
    try{
        const token = JSON.parse(localStorage.getItem('user')).token
        const response = await fetch(`${apiBase}articles/${slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
        if (!response.ok) {
            throw new Error(response.status)
        }
        await response.text()
        return slug
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const updateArticle = createAsyncThunk('articles/updateArticle', async({updatedArticleInfo, slug}, {rejectWithValue}) => {
    try{
        const token = JSON.parse(localStorage.getItem('user')).token
        const response = await fetch(`${apiBase}articles/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                article: updatedArticleInfo
            })
        })
        if (!response.ok) {
            throw new Error(response.status)
        }
        return await response.json()
    }catch(error){
        return rejectWithValue(error.message)
    }
})

const onLoading = (errorField) => (state, action) => {
    state.isLoading = true
    state.error[errorField] = null
}
const onError = (errorField) => (state, action) => {
    state.isLoading = false
    state.error[errorField] = action.payload
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: [],
        isLoading: false,
        error: {
            fetchArticlesError: null,
            loginError: null,
            registerError: null,
            editProfileError: null,
            createArticleError: null,
            deleteArticleError: null,
            updateArticleError: null,
        },
        pageNumber: 1,
        user: {},
    },
    reducers: {
        changePageNumber(state, action) {
            state.pageNumber = action.payload
        },
        logOut(state, action) {
            state.user = {}
            localStorage.removeItem('user')
        },
        setUser(state, action) {
            state.user = {...action.payload}
        }

    },
    extraReducers: {
        [fetchArticles.pending]: onLoading('fetchArticlesError'),
        [fetchArticles.fulfilled]: (state, action) => {
            state.isLoading = false
            state.articles = [...action.payload.articles]
        },
        [fetchArticles.rejected]: onError('fetchArticlesError'),
        [registerUser.pending]: onLoading('registerError'),
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            if (action.payload.errors) {
                state.error.registerError = action.payload.errors
            } else if (action.payload.user) {
                state.user = {...action.payload.user}
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            }
        },
        [registerUser.rejected]: onError('registerError'),
        [loginUser.pending]: onLoading('loginError'),
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = {...action.payload.user}
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        [loginUser.rejected]: onError('loginError'),
        [editProfile.pending]: onLoading('editProfileError'),
        [editProfile.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = {...action.payload.user}
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        [editProfile.rejected]: onError('editProfileError'),
        [createNewArticle.pending]: onLoading('createArticleError'),
        [createNewArticle.fulfilled]: (state, action) => {
            state.isLoading = false
            state.articles.unshift(action.payload.article)
        },
        [createNewArticle.rejected]: onError('createArticleError'),
        [deleteArticle.pending]: onLoading('deleteArticleError'),
        [deleteArticle.fulfilled]: (state, action) => {
            state.isLoading = false
            state.articles = state.articles.filter((article) => article.slug !== action.payload)
        },
        [deleteArticle.rejected]: onError('deleteArticleError'),
        [updateArticle.pending]: onLoading('updateArticleError'),
        [updateArticle.fulfilled]: (state, action) => {
            state.isLoading = false
            state.articles = state.articles.map((article) => article.slug === action.payload.article.slug ? action.payload.article : article)
        },
        [updateArticle.rejected]: onError('updateArticleError')
    }
})

export const {changePageNumber, logOut, setUser, deleteArticleInList} = articlesSlice.actions
export default articlesSlice.reducer