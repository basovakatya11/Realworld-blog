import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateArticle } from "../../store/articlesSlice";
import ArticleFormTemplate from "../ArticleFormTemplate/ArticleFormTemplate";

function EditArticleForm ({match, location, history}) {
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.articles)
    const article = articles.find((item) => item.slug === match.params.id)
    const onSubmit = (data) => {
        const tagsArray = []
        for (let key in data) {
          if (key.startsWith('tag')) {
            tagsArray.push(data[key])
          }
        }
        const newArticle = {
            title: data.title,
            description: data.description,
            body: data.text,
            tagList: tagsArray
        }
        dispatch(updateArticle({updatedArticleInfo: newArticle, slug: match.params.id}))
        history.push(`/articles/${match.params.id}`)
    }
    return (
        <ArticleFormTemplate onSubmit={onSubmit} title='Edit article' articleInfo={article}/>
    )
}

export default withRouter(EditArticleForm)