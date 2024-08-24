import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CContainer, CInputGroup, CInputGroupText, CFormInput, CPagination, CPaginationItem, CRow } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cibAddthis, cilSearch } from '@coreui/icons';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import base_url from "../../../utils/api/base_url";
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import AuthorsTable from '../../../components/table/AuthorsTable';
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const IndexMaterial = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const columns = ["#", "Name", "Pen Name", "Nationality", "Income", "First Published", "Position", "Status", "Actions"];

  useEffect(() => {
    axios.get(`${base_url}/api/authors/all`, {
      params: {
        page: currentPage,
        limit: itemsPerPage,
        search: search,
      }
    })
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setAuthors(response.data.data);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('API response is not in the expected format', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the authors!', error);
      });
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
    }
  }, [location.state]);

  const handleEdit = (id) => {
    navigate(`/authors/${id}/edit`);
  };

  const handleDelete = (id) => {
    alertify.confirm(
      'Confirm Delete',
      'Are you sure you want to delete this author?',
      () => {
        axios.post(`${base_url}/api/authors/delete/${id}`)
          .then(response => {
            setAuthors(authors.filter(author => author._id !== id));
            setAlert({
              visible: true,
              type: 'success',
              message: 'Author deleted successfully!'
            });
          })
          .catch(error => {
            console.error('There was an error deleting the author!', error);
            setAlert({
              visible: true,
              type: 'failure',
              message: 'Failed to delete the author. Please try again.'
            });
          });
      },
      () => { }
    );
  };

  const handleChangeStatus = (id) => {
    alertify.confirm(
      'Confirm Status Change',
      'Are you sure you want to change the status of this author?',
      () => {
        axios.post(`${base_url}/api/authors/change-status/${id}`)
          .then(response => {
            setAuthors(authors.map(author =>
              author._id === id ? { ...author, is_active: !author.is_active } : author
            ));
            setAlert({
              visible: true,
              type: 'success',
              message: 'Author status changed successfully!'
            });
          })
          .catch(error => {
            console.error('There was an error changing the author status!', error);
            setAlert({
              visible: true,
              type: 'failure',
              message: 'Failed to change the author status. Please try again.'
            });
          });
      },
      () => {
        alertify.message('Status change cancelled');
      }
    )
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);  // Reset to the first page when a new search is initiated
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader title="Materials" />
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
                    title="Materials"
                    subtitle="List"
                    buttonIcon={<CIcon icon={cibAddthis} />}
                    buttonText="Add Material"
                    linkTo="/materials/create"
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
                    <AuthorsTable
                      columns={columns}
                      data={authors}
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
                        &laquo;
                      </CPaginationItem>
                      {[...Array(totalPages)].map((_, index) => (
                        <CPaginationItem
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </CPaginationItem>
                      ))}
                      <CPaginationItem
                        aria-label="Next"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        &raquo;
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

export default IndexMaterial;
