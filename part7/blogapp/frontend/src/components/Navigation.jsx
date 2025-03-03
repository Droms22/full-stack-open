import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const Navigation = ({ username, onLogout }) => {
  return (
    <div className="flex h-14 items-center justify-between mt-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className="text-md font-semibold">
                BlogApp
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className="text-md">Blogs</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/users">
              <NavigationMenuLink className="text-md">Users</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex justify-center items-center">
        <p className="pr-4">{username}</p>
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
