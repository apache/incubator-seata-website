import React from 'react';
import ReactDOM from 'react-dom';
import Language from '../../components/language';
import Header from '../../components/header';
import Bar from '../../components/bar';
import PageSlider from '../../components/pageSlider';
import BlogItem from './blogItem';
import Footer from '../../components/footer';
import blogConfig from '../../../site_config/blog';
import { getLink } from '../../../utils';
import mdJson from '../../../md_json/blog.json';
import './index.scss';

// 博客列表数据，按时间排序
const blogs = {};
blogs['en-us'] = mdJson['en-us'].filter(md => (
  (!md.meta.hidden || md.meta.hidden === 'false') && md.link.indexOf('download.html') === -1 && md.link.indexOf('client.html') === -1
)).sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
blogs['zh-cn'] = mdJson['zh-cn'].filter(md => (
  (!md.meta.hidden || md.meta.hidden === 'false') && md.link.indexOf('download.html') === -1 && md.link.indexOf('client.html') === -1
)).sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));

class Blog extends Language {

  render() {
    const language = this.getLanguage();
    const dataSource = blogConfig[language];
    const blogList = blogs[language];
    return (
      <div className="blog-list-page">
        <Header
          type="normal"
          currentKey="blog"
          logo="/img/seata_logo.png"
          language={language}
          onLanguageChange={this.onLanguageChange}
        />
        <Bar img="https://img.alicdn.com/tfs/TB1gQ8uJyrpK1RjSZFhXXXSdXXa-160-160.png" text={dataSource.barText} />
        <section className="blog-container">
          <div className="col col-18 left-part">
            <PageSlider pageSize={5}>
            {
              blogList.map((blog, i) => (
                <BlogItem key={i} dataSource={blog} />
              ))
            }
            </PageSlider>
          </div>
          <div className="col col-6 right-part">
            <h4>{dataSource.postsTitle}</h4>
            <ul>
            {
              blogList.map((blog, i) => (
                <li key={i}><a href={getLink(blog.link)} target={blog.target || '_self'}><span>{blog.meta.date}&nbsp;&nbsp;</span><span>{blog.meta.title}</span></a></li>
              ))
            }
            </ul>
          </div>
        </section>
        <Footer logo="/img/seata_logo_gray.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Blog />, document.getElementById('root'));

export default Blog;
