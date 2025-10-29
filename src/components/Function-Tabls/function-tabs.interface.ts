export interface TabType {
  label: string;
  tabChildren: TabChildType[];
}

export interface TabChildType {
  toolName: string;
  description: string;
  href: string;
}
