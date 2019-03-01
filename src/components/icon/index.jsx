import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

const propTypes = {
  type: PropTypes.string.isRequired,
};

const Icon = (props) => {
  const { type } = props;
  return (
    <i
      className={classnames({
        'docsite-icon': true,
        [`docsite-icon-${type}`]: true,
      })}
    />
  );
};

Icon.propTypes = propTypes;
export default Icon;
