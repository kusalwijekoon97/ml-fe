import React from 'react';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import { useLocation, Link } from 'react-router-dom';

const routes = {
  '/': 'Home',
  '/libraries': 'Libraries',
  '/libraries/create': 'Create Library',
  '/libraries/:libraryId/edit': 'Edit Library',
  '/categories': 'Categories',
  '/categories/create': 'Create Category',
  '/categories/:catid/edit': 'Edit Category',
  '/books': 'Books',
  '/books/create': 'Create Book',
  '/books/:bookId/edit': 'Edit Book',
  '/materials': 'Materials',
  '/materials/create': 'Create Material',
  '/materials/:materialId/edit': 'Edit Material',
  '/authors': 'Authors',
  '/authors/create': 'Create Author',
  '/authors/:authorId/edit': 'Edit Author',
  '/librarians': 'Librarians',
  '/librarians/create': 'Create Librarian',
  '/librarians/:librarianId/edit': 'Edit Librarian',
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem>
        <Link to="/">Home</Link>
      </CBreadcrumbItem>
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isActive = index === pathnames.length - 1;

        return isActive ? (
          <CBreadcrumbItem key={index} active>
            {routes[routeTo] || value}
          </CBreadcrumbItem>
        ) : (
          <CBreadcrumbItem key={index}>
            <Link to={routeTo}>{routes[routeTo] || value}</Link>
          </CBreadcrumbItem>
        );
      })}
    </CBreadcrumb>
  );
};

export default Breadcrumb;
