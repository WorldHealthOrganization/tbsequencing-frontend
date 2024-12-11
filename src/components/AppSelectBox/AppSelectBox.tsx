/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Popover } from '@mui/material';
import { SerializedStyles } from '@emotion/react';
import { AppButton, IButtonProps } from '../AppButton/AppButton';

export interface IDropDownContent {
  closeDropDown: () => void;
}

interface Props extends Pick<IButtonProps, 'children' | 'endIconName' | 'size' | 'variant' | 'style'> {
  dropdownContentRender: (e: IDropDownContent) => React.ReactNode
  popoverStyle?: SerializedStyles;
}

export const AppSelectBox = ({
  dropdownContentRender, children, endIconName, size, variant, style, popoverStyle,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeDropDown = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppButton
        onClick={openDropDown}
        style={style}
        variant={variant}
        size={size}
        endIconName={endIconName}
      >
        {children}
      </AppButton>
      <Popover
        css={popoverStyle}
        open={!!anchorEl}
        onClose={closeDropDown}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {dropdownContentRender({
          closeDropDown,
        })}
      </Popover>
    </>
  );
};

export default AppSelectBox;
