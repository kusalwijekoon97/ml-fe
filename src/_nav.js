import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilPeople, cilBook, cilLayers, cibNintendoSwitch } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
import { BsFillGridFill } from 'react-icons/bs'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Libraries',
    to: '/libraries',
    icon: <CIcon icon={cibNintendoSwitch} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/categories',
    icon: <BsFillGridFill className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Books',
    to: '/books',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Material',
    to: '/material',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '#',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Librarians',
        to: '/librarians',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Authors',
        to: '/authors',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
    ],
  }
]

export default _nav;
