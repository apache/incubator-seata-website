import React from 'react';
import classnames from 'classnames';
import './index.scss';

export type ButtonType = 'primary' | 'normal';
type Props = {
  type: ButtonType;
  link: string;
  target: string;
  children?: React.ReactNode;
  language?: string;
};

const defaultProps: Props = {
  type: 'primary',
  link: '',
  target: '_self',
};
const Button = (props = defaultProps) => {
  return (
    <a
      className={classnames({
        button: true,
        [`button-${props.type}`]: true,
      })}
      target={props.target || '_self'}
      href={props.link}
    >
      {props.children || null}
    </a>
  );
};
export default Button;
