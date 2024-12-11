/** @jsxImportSource @emotion/react */
import React from 'react';
import BasePage from '../BasePage';
import { AppButton } from '../AppButton/AppButton';

export const ThrowTestError = () => {
  const onErrorButtonClick = () => {
    throw new Error('This is a test error thrown by test error page');
  };

  return (
    <BasePage pageHeader="This is a test error page to test Sentry.io">
      <AppButton
        onClick={onErrorButtonClick}
        variant="contained"
        size="large"
      >
        Press this button to throw JS error
      </AppButton>
    </BasePage>
  );
};

export default ThrowTestError;
