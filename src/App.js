import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';
import IndexCategory from './views/pages/category/IndexCategory';
import CreateCategory from './views/pages/category/createCategory';
import EditCategory from './views/pages/category/editCategory';
import IndexAuthor from './views/pages/author/IndexAuthor';
import CreateAuthor from './views/pages/author/createAuthor';
import EditAuthor from './views/pages/author/editAuthor';
import IndexLibrarian from './views/pages/librarian/IndexLibrarian';
import CreateLibrarian from './views/pages/librarian/createLibrarian';
import EditLibrarian from './views/pages/librarian/editLibrarian';
import IndexLibrary from './views/pages/library/IndexLibrary';
import CreateLibrary from './views/pages/library/createLibrary';
import EditLibrary from './views/pages/library/editLibrary';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }>
        <Routes>
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" name="Login Page" element={<Login />} />
          <Route path="/register" name="Register Page" element={<Register />} />
          <Route path="/404" name="Page 404" element={<Page404 />} />
          <Route path="/500" name="Page 500" element={<Page500 />} />

          {/* library */}
          <Route path="/libraries" name="libraries-all" element={<IndexLibrary/>} />
          <Route path="/libraries/create" name="libraries-create" element={<CreateLibrary />} />
          <Route path="/libraries/:libraryId/edit" name="libraries-edit" element={<EditLibrary />} />
          {/* category */}
          <Route path="/categories" name="categories-all" element={<IndexCategory />} />
          <Route path="/categories/create" name="categories-create" element={<CreateCategory />} />
          <Route path="/categories/:catid/edit" name="categories-edit" element={<EditCategory />} />
          {/* author */}
          <Route path="/authors" name="authors-all" element={<IndexAuthor />} />
          <Route path="/authors/create" name="authors-create" element={<CreateAuthor />} />
          <Route path="/authors/:authorId/edit" name="authors-edit" element={<EditAuthor />} />
          {/* librarian */}
          <Route path="/librarians" name="librarians-all" element={<IndexLibrarian />} />
          <Route path="/librarians/create" name="librarians-create" element={<CreateLibrarian />} />
          <Route path="/librarians/:librarianId/edit" name="librarians-edit" element={<EditLibrarian />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
