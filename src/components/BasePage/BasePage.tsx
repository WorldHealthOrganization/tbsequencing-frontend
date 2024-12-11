/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import H1 from '../typography/H1';
import { Breadcrumbs, IBreadcrumb } from '../Breadcrumbs/Breadcrumbs';

interface Props {
  children: ReactNode;
  style?: SerializedStyles;
  pageHeader?: string;
  breadcrumbsConfig?: IBreadcrumb[];
}

export const BasePage = ({
  children, style, pageHeader, breadcrumbsConfig,
}: Props) => {
  const headerStyle = breadcrumbsConfig ? styles.pageHeader : styles.pageHeaderNoBreadcrumbs;

  return (
    <div css={[styles.container, style]}>
      {breadcrumbsConfig && <Breadcrumbs breadcrumbs={breadcrumbsConfig} />}
      {pageHeader && <H1 style={headerStyle}>{pageHeader}</H1>}
      {children}
    </div>
  );
};

export default BasePage;
