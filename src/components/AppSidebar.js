import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCloseButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav';
import logoFullBGWhite from '../assets/images/logo/logoFullBGWhite.png';
// Import the _nav function and LibraryToggle component
import _nav from '../_nav';
import LibraryToggle from './butttons/libraryToggle/LibraryToggle';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const selectedLibrary = useSelector((state) => state.selectedLibrary || 'all');

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" src={logoFullBGWhite} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" src={logoFullBGWhite} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })} />
      </CSidebarHeader>
      <LibraryToggle />
      <AppSidebarNav items={_nav(selectedLibrary)} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })} />
      </CSidebarFooter>
    </CSidebar>
  );
}

export default React.memo(AppSidebar);
