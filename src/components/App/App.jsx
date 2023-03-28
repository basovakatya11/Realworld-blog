import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MainPage from '../pages/MainPage'
import ArticlePage from '../pages/ArticlePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import EditProfilePage from '../pages/EditProfilePage'
import CreateArticlePage from '../pages/CreateArticlePage'
import './App.scss'
import { fetchArticles, fetchArticlesAuthorised, setUser } from '../../store/articlesSlice'
import EditArticlePage from '../pages/EditArticlePage'

export default function App() {
  const dispatch = useDispatch()
  const pageNumber = useSelector((state) => state.pageNumber)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (dispatch && localStorage.getItem('user') && !user.token) {
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
    }
  }, [dispatch, user.token])

  useEffect(() => {
    if (dispatch) {
      if (user.token) {
        dispatch(fetchArticlesAuthorised(pageNumber))
      } else {
        dispatch(fetchArticles(pageNumber))
      }
    }
  }, [dispatch, pageNumber, user.token])

  return (
    <Router>
      <div className="app">
        <Route path={['/', '/articles/']} exact component={MainPage} />
        <Route path="/articles/:id" exact render={({ match }) => <ArticlePage id={match.params.id} />} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/profile" component={EditProfilePage} />
        <Route path="/new-article" component={CreateArticlePage} />
        <Route path="/articles/:id/edit" exact render={({ match }) => <EditArticlePage id={match.params.id} />} />
      </div>
    </Router>
  )
}
