import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCloseButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav';
// sidebar nav config
import navigation from '../_nav';
import LibraryToggle from './butttons/libraryToggle/LibraryToggle';
import LogoFull from './logo/LogoFull';
import LogoPartialTransparent from './logo/LogoPartialTransparent';
import LibraryDropdownToggle from './butttons/libraryToggle/LibraryDropdownToggle';

const AppSidebar = ({ onLibraryChange }) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)


  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand
          to="/"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            borderRadius: '4px',
            width: '100%',
            margin: '2px'
          }}
        >
          {unfoldable ? (
            <LogoPartialTransparent width="30px" />
          ) : (
            <LogoFull width="150px" />
          )}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })} />
      </CSidebarHeader>
      <LibraryDropdownToggle onLibraryChange={onLibraryChange} />
      {/* <LibraryToggle/> */}
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
