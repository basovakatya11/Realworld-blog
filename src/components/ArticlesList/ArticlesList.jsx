import React from 'react'
import Article from '../Article'
import classes from './ArticlesList.module.scss'
import { useSelector } from 'react-redux'

export default function ArticlesList() {
    const articles = useSelector((state) => state.articles)
    return (
        <div className={classes['articles-list']}>
            {articles.map((article) => <Article key={article.slug} info={article} />)}
        </div>
    )
}