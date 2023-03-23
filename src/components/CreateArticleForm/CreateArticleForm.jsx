import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewArticle } from '../../store/articlesSlice'
import ArticleFormTemplate from '../ArticleFormTemplate/ArticleFormTemplate'
import { withRouter } from 'react-router-dom'

function CreateArticleForm({match, location, history}) {
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        const tagsArray = []
        for (let key in data) {
          if (key.startsWith('tag')) {
            tagsArray.push(data[key])
          }
        }
        dispatch(createNewArticle({
            title: data.title,
            description: data.description,
            body: data.text,
            tagList: tagsArray
        }))
        history.goBack()
    }
    return (
        <ArticleFormTemplate onSubmit={onSubmit} title='Create new article'/>
    )
}

export default withRouter(CreateArticleForm)