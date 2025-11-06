import { BreadcrumbItemProps } from "./components/navbar-breadcrumbs";
import { HeaderProps } from "./components/header";

export interface DashboardLayoutProps {
  breadcrumbItems: Array<BreadcrumbItemProps>
  buttons?: HeaderProps['buttons']
  children: React.ReactNode;
  title?: string;
}