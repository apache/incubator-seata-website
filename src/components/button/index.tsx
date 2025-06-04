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
