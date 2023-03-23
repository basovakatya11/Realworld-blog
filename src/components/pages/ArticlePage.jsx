import React from "react";
import ArticleCard from "../ArticleCard";
import Header from "../Header";

export default function ArticlePage({match, location, history}) {
    return (
        <>
            <Header />
            <ArticleCard />
        </>
    )
}

