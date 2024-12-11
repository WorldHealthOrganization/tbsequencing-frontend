/** @jsxImportSource @emotion/react */

import React from 'react';
import * as styles from '../styles';
import { ITextAreaProps } from '../models';

const TextAreaControl = <IInput extends unknown>(props: ITextAreaProps<IInput>) => {
  const {
    name, onChange, value, onBlur, placeholder,
  } = props;
  return (
    <textarea
      css={styles.textAreaStyles}
      rows={2}
      name={name}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

export default TextAreaControl;
