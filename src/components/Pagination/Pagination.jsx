import React from 'react'
import { Pagination as AntdPagination} from 'antd'
import  './Pagination.scss'
import { fetchArticles } from '../../store/articlesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { changePageNumber } from '../../store/articlesSlice'

export default function Pagination() {
    const dispatch = useDispatch()
    const page = useSelector((state) => state.pageNumber)
    const onChangePage = (pageNumber) => {
        dispatch(fetchArticles())
        dispatch(changePageNumber(pageNumber))
    }
    return (
        <div className="article-pagination"><AntdPagination defaultCurrent={page} total={50} onChange={onChangePage}/></div>
    )
}