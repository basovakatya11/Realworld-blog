/* eslint-disable react/no-children-prop */
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSelector } from 'react-redux'

import ArticleContent from '../ArticleContent'

import classes from './ArticleCard.module.scss'

export default function ArticleCard() {
  const article = useSelector((state) => state.article)

  return (
    <div className={classes['article-card']}>
      <ArticleContent info={article} />
      <ReactMarkdown children={article.body} remarkPlugins={[remarkGfm]} />
    </div>
  )
}
