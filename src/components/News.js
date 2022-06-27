import NewsItem from './NewsItem'
import React, { Component } from 'react'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps={
        country:'in',
        pageSize: 6,
        category:'general'
    }

    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
     
    
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }

        document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=41948c37d357497ebcb0544ff8839b2b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading:false,
            page: this.state.page + 1
    })
    this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

    fetchMoreData = async() =>{
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=41948c37d357497ebcb0544ff8839b2b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults,
            page: this.state.page + 1
            
    })

    }

   

  render() {
    return (
        <>
        <h1 className='text-center' style={{margin:"30px 0px "}}>NewsMonkey - Top  
{this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        { this.state.loading&&<Spinner/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
          
        >
        
        
        <div className="container">
        <div className="row">

            {this.state.articles.map((element)=>{
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
}

