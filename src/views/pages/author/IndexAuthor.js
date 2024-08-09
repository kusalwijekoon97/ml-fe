import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibAddthis } from '@coreui/icons';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import base_url from "../../../utils/api/base_url";
import CardHeaderWithTitleBtn from '../../../components/cards/CardHeaderWithTitleBtn';
import AuthorsTable from '../../../components/table/AuthorsTable'; // Updated import
import ResponseAlert from '../../../components/notifications/ResponseAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const IndexAuthor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  const columns = ["#", "Name", "Pen Name", "Nationality", "Income", "First Published", "Position", "Status", "Actions"];

  useEffect(() => {
    axios.get(`${base_url}/api/authors/all`)
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setAuthors(response.data.data);
        } else {
          console.error('API response is not in the expected format', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the authors!', error);
      });
  }, []);

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

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader title="Authors" />
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
                    title="Authors"
                    subtitle="List"
                    buttonIcon={<CIcon icon={cibAddthis} />}
                    buttonText="Add Author"
                    linkTo="/authors/create"
                  />
                  <CCardBody>
                    <AuthorsTable
                      columns={columns}
                      data={authors}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleChangeStatus={handleChangeStatus}
                    />
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

export default IndexAuthor;
