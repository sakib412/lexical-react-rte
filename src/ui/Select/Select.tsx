/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {JSX} from 'react';

import './Select.css';

type SelectIntrinsicProps = JSX.IntrinsicElements['select'];
interface SelectProps extends SelectIntrinsicProps {
  label: string;
}

export default function Select({
  children,
  label,
  className,
  ...other
}: SelectProps): JSX.Element {
  return (
    <div className="rte-input-wrapper">
      <label style={{marginTop: '-1em'}} className="rte-input-label">
        {label}
      </label>
      <select {...other} className={className || 'rte-select'}>
        {children}
      </select>
    </div>
  );
}
