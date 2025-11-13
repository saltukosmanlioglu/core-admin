import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [],
  buttons: [
    {
      type: 'dropdown',
      text: 'Time Range',
      dropdownList: [
        {
          text: 'Last 7 Days',
          onClick: () => console.log('Filtering by Last 7 Days'),
        },
        {
          text: 'Last 30 Days',
          onClick: () => console.log('Filtering by Last 30 Days'),
        },
        {
          text: 'Last Quarter',
          onClick: () => console.log('Filtering by Last Quarter'),
        },
        {
          text: 'Custom Range...',
          onClick: () => console.log('Open date picker for custom range'),
        },
      ],
    },
    {
      type: 'dropdown',
      text: 'Investigator',
      dropdownList: [
        {
          text: 'Dr. Eleanor Matthews',
          onClick: () => console.log('Showing data for all investigators'),
        },
        {
          text: 'Dr. Sarah Connor',
          onClick: () => console.log('Filtering by Sarah Connor'),
        },
        {
          text: 'James Wilson',
          onClick: () => console.log('Filtering by James Wilson'),
        },
      ],
    },
    {
      type: 'dropdown',
      text: 'Department',
      dropdownList: [
        {
          text: 'Data Science',
          onClick: () => console.log('Filtering by Data Science'),
        },
        {
          text: 'Forensics',
          onClick: () => console.log('Filtering by Forensics'),
        },
        {
          text: 'AI Analysis',
          onClick: () => console.log('Filtering by AI Analysis'),
        },
      ],
    },
  ],
  title: 'AI Performance & Investigation Efficiency',
};
