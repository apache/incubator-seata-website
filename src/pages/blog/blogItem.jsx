import React from 'react';
import { getLink } from '../../../utils';

import './blogItem.scss';

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  onMouseOver = () => {
    this.setState({
      isHovered: true,
    });
  }

  onMouseOut = () => {
    this.setState({
      isHovered: false,
    });
  }

  render() {
    const { dataSource } = this.props;
    const { link } = dataSource;
    const { target, title, author, companyIcon, companyIconHover, date, description } = dataSource.meta;
    const { isHovered } = this.state;
    return (
      <a
        href={getLink(link)}
        target={target || '_self'}
        className="blog-item"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className="title">
          <img src={isHovered ? getLink('https://img.alicdn.com/tfs/TB1qqVZJAvoK1RjSZFDXXXY3pXa-32-40.png') : getLink('https://img.alicdn.com/tfs/TB1OkBRukzoK1RjSZFlXXai4VXa-32-40.png')} />
          <span>{title}</span>
        </div>
        <div className="brief-info">
          <span className="author">{author}</span>
          {
            companyIcon ? <img src={isHovered ? getLink(companyIconHover) : getLink(companyIcon)} /> : null
          }
          <span className="date">{date}</span>
        </div>
        <p>{description}</p>
      </a>
    );
  }
}

export default BlogItem;
