import React from 'react';

export type ContributorData = {
  img: string;
  title: string;
  content: string | React.ReactElement;
};

type Props = {
  contributor: ContributorData;
};

const ContributorItem = (props: Props) => {
  const { contributor } = props;
  const { img, title, content } = contributor || {};
  return (
    <div className='contributor-item'>
      <img src={img} />
      <div>{title}</div>
      <p>{content}</p>
    </div>
  );
};

export default ContributorItem;
