import ArticlesList from './ArticlesList'
import ArticlesContent from './ArticlesContent'

const ArticlesAll = (props) => {
    return (
        <>
            <ArticlesList 
                loading={props.loading}
                error={props.error}
                articles={props.articles}
                width={props.width}
            />
            <ArticlesContent
                loading={props.loading}
                error={props.error}
                articleInfo={props.articleInfo}
                width={props.width}
            />
        </>
    );
}

export default ArticlesAll;