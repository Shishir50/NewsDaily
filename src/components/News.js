import React, {useEffect , useState } from "react";
import Newsitems from "./Newsitems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props) => {

  const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const update = async () =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8a4da04ea05d4e789bfecb9357270262&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
  }

  useEffect(() =>{
    update();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8a4da04ea05d4e789bfecb9357270262&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

    return (
      <>
      
        <h1 className="text-center" style={{ margin: '30px 0px' }}>
          NewsDaily - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading ? <h3>Loading...</h3> : ""}
        >

         <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url} >
                  <Newsitems
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={element.description? element.description.slice(0, 90): ""}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    );

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;


