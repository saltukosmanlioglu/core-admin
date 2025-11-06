import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import NavbarBreadcrumbs, { NavbarBreadcrumbsProps } from './navbar-breadcrumbs';
import MenuButton from './menu-button';
import ColorModeIconDropdown from '../../../theme/color-model-icon-dropdown';

export interface HeaderProps {
  buttons?: Array<HeaderButtonProps>
  breadcrumbItems: NavbarBreadcrumbsProps['breadcrumbItems']
}

export interface HeaderButtonProps {
  icon?: any;
  onClick: () => void
  text?: string;
}

export default function Header({ buttons, breadcrumbItems }: HeaderProps) {
  return (
    <Stack direction="row" sx={{ display: { xs: 'none', md: 'flex' }, width: '100%', alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', maxWidth: { sm: '100%', md: '1700px' }, pt: 1.5 }} spacing={2}>
      <NavbarBreadcrumbs breadcrumbItems={breadcrumbItems} />
      <Stack direction="row" sx={{ gap: 1 }}>
        {buttons?.map((b, i) => (
          <MenuButton key={i} onClick={() => b.onClick}>
            {b.icon || b.text || <NotificationsRoundedIcon />}
          </MenuButton>
        ))}
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
