/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import classnames from 'classnames';
import { throttle } from '../../utils';

import './index.scss';

type Props = {
  pageSize: number; // 每页最多显示的条数
  children?: React.ReactElement[];
};
type State = {
  page: number;
  pageWidth: number;
};

class pageSlider extends React.Component<Props, State> {
  container;
  throttleAdjust;
  constructor(props) {
    super(props);
    this.container = null;
    this.state = {
      page: 0,
      pageWidth: 0,
    };
  }

  componentDidMount() {
    const pageWidth = this.container.getBoundingClientRect().width;
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      pageWidth,
    });
    this.throttleAdjust = throttle(() => {
      this.setState({
        pageWidth: this.container.getBoundingClientRect().width,
      });
    }, 200);
    window.addEventListener('resize', this.throttleAdjust);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttleAdjust);
  }

  changePage = (i) => {
    this.setState({
      page: i,
    });
  };

  renderSliderList = () => {
    const { children, pageSize } = this.props;
    const { page, pageWidth } = this.state;
    const splitGroup = [];
    const len = React.Children.count(children);
    // 分成的屏数
    const splitNum = Math.ceil(len / pageSize);
    /* eslint-disable no-plusplus*/
    for (let i = 0; i < splitNum; i++) {
      splitGroup.push(
        Array.from(children).slice(i * pageSize, (i + 1) * pageSize)
      );
    }
    return (
      <div
        className='slider-list'
        style={{
          transform: `translateX(-${page * pageWidth}px)`,
          transition: 'transform 500ms ease',
          width: splitNum * pageWidth,
        }}
      >
        {splitGroup.map((group, i) => {
          return (
            <div className='slider-page' style={{ width: pageWidth }} key={i}>
              {group.map((child, j) => (
                <div className='slider-item' key={j}>
                  {child}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  renderControl = () => {
    const { children, pageSize } = this.props;
    const { page } = this.state;
    const len = React.Children.count(children);
    // 分成的屏数
    const splitNum = Math.ceil(len / pageSize);
    return (
      <div className='slider-control'>
        <img
          className={classnames({
            'slider-control-prev': true,
            'slider-control-prev-hidden': page === 0,
          })}
          src='/img/system/prev.png'
          onClick={this.changePage.bind(this, page - 1)}
        />
        <img
          className={classnames({
            'slider-control-next': true,
            'slider-control-next-hidden': page === splitNum - 1,
          })}
          src='/img/system/next.png'
          onClick={this.changePage.bind(this, page + 1)}
        />
      </div>
    );
  };

  render() {
    return (
      <div
        className='page-slider'
        ref={(node) => {
          this.container = node;
        }}
      >
        {this.renderSliderList()}
        {this.renderControl()}
      </div>
    );
  }
}

export default pageSlider;
