import React from 'react'
import { useSelector } from 'react-redux'

import Article from '../Article'

import classes from './ArticlesList.module.scss'

export default function ArticlesList() {
  const articles = useSelector((state) => state.articles)
  return (
    <div className={classes['articles-list']}>
      {articles.map((article) => (
        <Article key={article.slug} info={article} />
      ))}
    </div>
  )
}
