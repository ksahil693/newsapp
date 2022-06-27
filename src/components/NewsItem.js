import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, source, author, date} =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex',justifyContent:'flex-end',position: 'absolute',right:'0'}}>
          <span
            className="badge rounded-pill bg-danger"
          >
            {source}
          </span>
          </div>
           
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Monochrome-Type-Simple-Background-Image.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
