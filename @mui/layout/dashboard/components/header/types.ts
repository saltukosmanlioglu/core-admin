import { NavbarBreadcrumbsProps } from "../navbar-breadcrumbs";

export interface HeaderProps {
  buttons?: HeaderButtonProps[];
  breadcrumbItems: NavbarBreadcrumbsProps["breadcrumbItems"];
}

export type HeaderButtonProps =
  | {
    type?: "normal";
    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }
  | {
    type: "dropdown";
    text?: string;
    icon?: React.ReactNode;
    dropdownList: Array<DropdownItemProps>;
  };

export interface DropdownItemProps {
  icon?: React.ReactNode
  onClick: () => void;
  text: string;
}