import React from 'react';
import Icon from '../../components/icon';

const Item = (props) => {
  const { feature } = props;
  return (
    <li>
      <Icon type={feature.icon} />
      <div>
        <h4>{feature.title}</h4>
        <p>{feature.content}</p>
      </div>
    </li>
  );
};

export default Item;
