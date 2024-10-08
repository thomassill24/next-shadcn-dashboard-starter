import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Campaign = {
  id: number;
  RoAS: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  job: string;
};

export type AdSets = {
  id: number;
  RoAS: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  job: string;
};

export type Ads = {
  id: number;
  RoAS: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  job: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },

  {
    title: 'Campaigns',
    href: '/dashboard/campaigns',
    icon: 'list',
    label: 'campaigns'
  },

  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'settings'
  },

  {
    title: 'Test',
    href: '/dashboard/newTest',
    icon: 'settings',
    label: 'settings'
  },

  {
    title: 'Home',
    href: '/dashboard/home',
    icon: 'dashboard',
    label: 'dashboard'
  },

  {
    title: 'Log out',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
