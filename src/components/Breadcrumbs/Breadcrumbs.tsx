/** @jsxImportSource @emotion/react */
import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link } from '@mui/material';
import * as styles from './styles';
import PrimaryText from '../typography/PrimaryText';

export interface IBreadcrumb {
  label: string;
  href: string;
  isActive: boolean;
}

interface Props {
  breadcrumbs: IBreadcrumb[];
}

export const Breadcrumbs = ({ breadcrumbs }: Props) => (
  <MUIBreadcrumbs css={styles.breadcrumbs}>
    {breadcrumbs.map(({ href, label, isActive }) => {
      const linkStyle = isActive ? styles.active : styles.inactive;

      return (
        <Link
          key={label}
          href={href}
          underline="none"
        >
          <PrimaryText style={linkStyle}>{label}</PrimaryText>
        </Link>
      );
    })}
  </MUIBreadcrumbs>
);

export default Breadcrumbs;
