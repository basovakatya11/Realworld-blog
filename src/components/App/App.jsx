import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MainPage from '../pages/MainPage'
import ArticlePage from '../pages/ArticlePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import EditProfilePage from '../pages/EditProfilePage'
import CreateArticlePage from '../pages/CreateArticlePage'
import './App.scss'
import { fetchArticles, setUser } from '../../store/articlesSlice'
import EditArticlePage from '../pages/EditArticlePage'

export default function App () {
    const dispatch = useDispatch()

    useEffect(() => {
        if (dispatch) {
            dispatch(fetchArticles())
            if (localStorage.getItem('user')) {
                dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
            }
        }
    }, [dispatch])

    return (
        <Router>
            <div className="app">
                <Route path={["/", "/articles/"]} exact component={MainPage}/>
                <Route path="/articles/:id" exact component={ArticlePage} />
                <Route path="/sign-in" component={SignInPage} />
                <Route path="/sign-up" component={SignUpPage} />
                <Route path="/profile" component={EditProfilePage} />
                <Route path="/new-article" component={CreateArticlePage} />
                <Route path="/articles/:id/edit" exact component={EditArticlePage}/>
            </div>
        </Router>
    )
}