import React from 'react'
import classes from './ArticleCard.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ArticleContent from '../ArticleContent'

function ArticleCard({match, location, history}) {
    let articles = useSelector((state) => state.articles)
    const article = articles.find((item) => item.slug === match.params.id)

    return (
        <div className={classes['article-card']}>
            <ArticleContent info={article}/>
            <ReactMarkdown children={article.body} remarkPlugins={[remarkGfm]} />
        </div>
    )
}

export default withRouter(ArticleCard)