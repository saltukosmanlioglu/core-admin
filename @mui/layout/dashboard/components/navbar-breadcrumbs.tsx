"use client"

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@mui/material/Link';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export interface NavbarBreadcrumbsProps {
  breadcrumbItems: Array<BreadcrumbItemProps>
}

export interface BreadcrumbItemProps {
  text: string;
  href?: string;
}


export default function NavbarBreadcrumbs({ breadcrumbItems }: NavbarBreadcrumbsProps) {
  return (
    <StyledBreadcrumbs aria-label="breadcrumb" separator={<NavigateNextRoundedIcon fontSize="small" />}>
      <Link underline="hover" color="inherit" href="/dashboard">
        Home
      </Link>
      {breadcrumbItems?.map((b, i) => (
        i === (breadcrumbItems.length - 1) ? <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          {b.text}
        </Typography> : <Link
          color="text.primary"
          href={b.href}
        >
          {b.text}
        </Link>
      ))}
    </StyledBreadcrumbs>
  );
}
