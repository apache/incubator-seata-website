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

type CardEvent = {
  link: string;
  img: string;
  title: string;
  content: string;
  dateStr: string;
};

type Props = {
  event: CardEvent;
};

const EventCard = (props: Props) => {
  const { event } = props;
  return (
    <BrowserOnly>
      {() => (
        <div className='event-card'>
          <a href={event.link}>
            <img src={event.img} />
          </a>
          <div className='event-introduction'>
            <h4>{event.title}</h4>
            <p>{event.content}</p>
            <a href={event.link}>
              {event.dateStr}
              <img className='arrow' src={`/img/system/arrow_right.png`} />
            </a>
          </div>
        </div>
      )}
    </BrowserOnly>
  );
};
export default EventCard;
