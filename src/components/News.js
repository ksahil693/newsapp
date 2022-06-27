import NewsItem from './NewsItem'
import React, {useEffect,useState} from 'react'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,setTotalResults]=useState(0)
    

    const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
     
    
   
    const updateNews=async()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        setPage(page+1)
       
    props.setProgress(100);
    }

    useEffect(()=>{
        updateNews();
        document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        // eslint-disable-next-line
    },[])

    const fetchMoreData = async() =>{
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setPage(page+1)
        

    }

   

  
    return (
        <>
        <h1 className='text-center' style={{margin:"30px 0px ", marginTop:"90px"}}>NewsMonkey - Top  
{capitalizeFirstLetter(props.category)} Headlines </h1>
        {loading&&<Spinner/>}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
          
        >
        
        
        <div className="container">
        <div className="row">

            {articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} date={element.publishedAt} author={element.author}/>
                
            </div>
            
            })}
            </div>
            
            
        </div>
        </InfiniteScroll>
        
    </>
    )
  
}

export default  News;