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
import BrowserOnly from '@docusaurus/BrowserOnly';

type Props = {
  contact: ContactData;
};

export type ContactData = {
  imgHover: string;
  img: string;
  link: string;
  title: string;
};

type State = {
  img: string;
};

class ContactItem extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      img: props.contact?.img,
    };
  }

  onMouseOver = () => {
    this.setState({
      img: this.props.contact?.imgHover,
    });
  };

  onMouseOut = () => {
    this.setState({
      img: this.props.contact?.img,
    });
  };

  render() {
    const { contact } = this.props;
    const { img } = this.state;
    return (
      <BrowserOnly>
        {() => (
          <a
            className='contact-item'
            href={contact.link}
            rel='noopener noreferrer'
            target='_blank'
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
          >
            <img src={img} />
            <div>{contact.title}</div>
          </a>
        )}
      </BrowserOnly>
    );
  }
}

export default ContactItem;
