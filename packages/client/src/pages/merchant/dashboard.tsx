import React from 'react';
import { Route, Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useOwnRestaurtantQuery } from '../../generated/graphql';
export * from 'react-router-dom';
export * from './add-product';
export * from './add-restaurant';
export * from './update-product';
export * from './remove-product';

export * from './add-restaurant';

export default function MerchantDashboard(): JSX.Element {
  return (
    <main className="merchant">
      <nav className="box">
        <NavLink to="add-product">Add product</NavLink>
        {/* <NavLink to="update-product">Update product</NavLink>
        <NavLink to="remove-product">Remove product</NavLink> */}
      </nav>
      <Outlet />
    </main>
  );
}
