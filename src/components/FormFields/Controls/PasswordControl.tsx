/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import {
  InputAdornment, IconButton, Popover, Typography,
} from '@mui/material';
import {
  VisibilityOutlined, VisibilityOffOutlined, InfoOutlined,
} from '@mui/icons-material';
import { FieldError } from 'react-hook-form';
import TextControl from './TextControl';
import { IBaseControlProps } from '../models';
import {
  hidePassIcon,
  passwordHelper,
  infoSpecialSymbolsButton,
  infoSpecialSymbolsIcon,
  hidePassIconError,
} from '../styles';
import SecondaryText from '../../typography/SecondaryText';

interface IPassAdornment {
  error: FieldError,
  showPassword: boolean,
  onClick: () => void;
}

const renderAdornment = ({ error, showPassword, onClick }: IPassAdornment) => {
  if (showPassword) {
    return (
      <IconButton
        aria-label="toggle password visibility"
        onClick={onClick}
        edge="end"
      >
        <VisibilityOffOutlined sx={error ? hidePassIconError : hidePassIcon} />
      </IconButton>
    );
  }
  return (
    <IconButton
      aria-label="toggle password visibility"
      onClick={onClick}
      edge="end"
    >
      <VisibilityOutlined sx={error ? hidePassIconError : hidePassIcon} />
    </IconButton>
  );
};

const PasswordControl = <T extends unknown> (props: IBaseControlProps<T>) => {
  const { error, showPasswordHint } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickHint = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseHint = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const specialSymbols = '!"#$%&'
  + "'"
  + '()*+,-./:;<=>?@[]^_`{|}~';

  return (
    <>
      <TextControl
        {...props}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {renderAdornment({ error, showPassword, onClick: handleClickShowPassword })}
            </InputAdornment>
          ),
        }}
      />
      {showPasswordHint && (
      <SecondaryText style={passwordHelper}>
        Password must contain minimum eight characters.
        There have to be at least one uppercase letter,
        one lowercase letter, one number, and one special character
        <IconButton
          aria-label="toggle password info"
          onClick={handleClickHint}
          edge="end"
          aria-describedby={id}
          size="small"
          css={infoSpecialSymbolsButton}
        >
          <InfoOutlined css={infoSpecialSymbolsIcon} sx={hidePassIcon} />
        </IconButton>
        <Popover
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseHint}
        >
          <Typography sx={{ p: 2 }}>{specialSymbols}</Typography>
        </Popover>
      </SecondaryText>
      )}

    </>
  );
};

export default PasswordControl;
