export type NavColor = 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple' | 'pink' | 'default';

export interface NavItem {
    label: string;
    href: string;
    color: NavColor;
    icon?: any;
}