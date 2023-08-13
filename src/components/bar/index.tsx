import React from 'react';
import classnames from 'classnames';
import { getLink } from '../../utils';
import './index.scss';

type Props = {
  text: string;
  img: string;
};
const Bar = (props: Props) => {
  const { text, img } = props;
  const cls = classnames({
    bar: true,
  });
  return (
    <div className={cls}>
      <div className="bar-body">
        <img src={getLink(img)} className="front-img" />
        <span>{text}</span>
        <img src={getLink(img)} className="back-img" />
      </div>
    </div>
  );
};

export default Bar;