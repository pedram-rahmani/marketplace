import React from "react";

export interface MenuIcon {
  default: React.ReactNode;
  active: React.ReactNode;
}

export interface MenuItem {
  label: string;
  icon: MenuIcon;
}

// all menus
export interface MenuCollection {
  mobile: MenuItem[];
  mainmenu?: MenuItem[];
  activemenu?: MenuItem[];
  [key: string]: MenuItem[] | undefined;
}
