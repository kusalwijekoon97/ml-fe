import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardFooter, CCol, CContainer, CFormInput, CInputGroup, CInputGroupText, CPagination, CPaginationItem, CRow } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cibAddthis, cilSearch } from '@coreui/icons';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import base_url from "../../../utils/api/base_url";
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import LibrariansTable from '../../../components/table/LibrariansTable';
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const IndexLibrarian = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [librarians, setLibrarians] = useState([]);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [currentActiveLibrary, setCurrentActiveLibrary] = useState('');

  const columns = ["#", "Name", "Email", "Libraries", "Menu Access", "Status", "Actions"];

  useEffect(() => {
    const savedLibrary = sessionStorage.getItem('currentActiveLibrary') || '';
  setCurrentActiveLibrary(savedLibrary);

    // Fetch librarians with pagination and search
    axios.get(`${base_url}/api/librarians/all`, {
      params: {
        page: currentPage,
        limit: itemsPerPage,
        search: search,
        library: savedLibrary
      }
    })
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          // Exclude the restrictions field from the data
          const filteredLibrarians = response.data.data.map(({ restrictions, ...rest }) => rest);
          setLibrarians(filteredLibrarians);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('API response is not in the expected format', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the librarians!', error);
      });
  }, [currentPage, itemsPerPage, search, currentActiveLibrary]);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
    }
  }, [location.state]);

  const handleEdit = (id) => {
    navigate(`/librarians/${id}/edit`);
  };

  const handleDelete = (id) => {
    alertify.confirm(
      'Confirm Delete',
      'Are you sure you want to delete this librarian?',
      () => {
        axios.post(`${base_url}/api/librarians/delete/${id}`)
          .then(response => {
            setLibrarians(librarians.filter(librarian => librarian._id !== id));
            setAlert({
              visible: true,
              type: 'success',
              message: 'Librarian deleted successfully!'
            });
          })
          .catch(error => {
            console.error('There was an error deleting the librarian!', error);
            setAlert({
              visible: true,
              type: 'failure',
              message: 'Failed to delete the librarian. Please try again.'
            });
          });
      },
      () => { }
    );
  };

  const handleChangeStatus = (id) => {
    alertify.confirm(
      'Confirm Status Change',
      'Are you sure you want to change the status of this librarian?',
      () => {
        axios.post(`${base_url}/api/librarians/change-status/${id}`)
          .then(response => {
            setLibrarians(librarians.map(librarian =>
              librarian._id === id ? { ...librarian, status: !librarian.status } : librarian
            ));
            setAlert({
              visible: true,
              type: 'success',
              message: 'Librarian status changed successfully!'
            });
          })
          .catch(error => {
            console.error('There was an error changing the librarian status!', error);
            setAlert({
              visible: true,
              type: 'failure',
              message: 'Failed to change the librarian status. Please try again.'
            });
          });
      },
      () => {
        alertify.message('Status change cancelled');
      }
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleActiveLibraryChange = (library) => {
    setCurrentActiveLibrary(library);
  };

  return (
    <>
   <AppSidebar onActiveLibraryChange={handleActiveLibraryChange} />
   <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader title="Librarians" />
        <div className="body flex-grow-1">
          <ResponseAlert
            visible={alert.visible}
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ ...alert, visible: false })}
          />
          <CContainer className="px-1" lg>
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4 border-top-primary border-top-3">
                  <CardHeaderWithTitleBtn
                    title="Librarians"
                    subtitle="List"
                    buttonIcon={<CIcon icon={cibAddthis} />}
                    buttonText="Add Librarian"
                    linkTo="/librarians/create"
                  />
                  <CCardBody>
                    <CRow className='mb-2'>
                      <CCol xs={4}>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilSearch} />
                          </CInputGroupText>
                          <CFormInput
                            type="text"
                            id="_search"
                            name="_search"
                            placeholder="Search here..."
                            value={search}
                            onChange={handleSearchChange}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <LibrariansTable
                      columns={columns}
                      data={librarians}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleChangeStatus={handleChangeStatus}
                    />
                    <CPagination className='d-flex justify-content-end mt-2'>
                      <CPaginationItem
                        aria-label="Previous"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </CPaginationItem>
                      {[...Array(totalPages)].map((_, index) => (
                        <CPaginationItem
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          active={currentPage === index + 1}
                        >
                          {index + 1}
                        </CPaginationItem>
                      ))}
                      <CPaginationItem
                        aria-label="Next"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </CPaginationItem>
                    </CPagination>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default IndexLibrarian;
