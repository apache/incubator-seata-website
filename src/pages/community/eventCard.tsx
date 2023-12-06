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
              <img className='arrow' src={`/img/arrow_right.png`} />
            </a>
          </div>
        </div>
      )}
    </BrowserOnly>
  );
};
export default EventCard;
