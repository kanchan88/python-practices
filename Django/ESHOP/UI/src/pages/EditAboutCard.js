import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Modal,
  Icon,
  Grid,
  CardHeader,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Card, Row, Col } from 'reactstrap';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getSinglePartner, apiUrl, getSingleCard } from '../_mocks_/repo/data';

// prettier-ignore

export default function EditAboutCard(props) {
    
    
      const [prodImage, setProductImage] = useState();
      const [displayImage, setDisplayImage] = useState();
      const [productAdded, setProductAdded] = useState(false);
      const [mediaImages, setMediaImages] = useState([]);
    
      const [product, setProduct] = useState([]);
      const [error, setError] = useState(false);
      const [id, setId] = useState([]);
    
      const ids = useParams();
    
      const [productValues, setProductValues] = useState({
        id: '',
        title: '',
        sub_title: '',
        description: ''
      });
  
      const [loader, setLoader] = useState(false);
    
      const getSingleProduct = (id) => {
          setLoader(true);
          getSingleCard(id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setProductValues(data.data);
            setLoader(false);
          }
        });
    };
      useEffect(() => {
        getSingleProduct(ids.id);
      }, []);
    
      const [open, setEditOpen] = React.useState(false);
      const handleEditOpen = () => setEditOpen(true);
      const handleEditClose = () => setEditOpen(false);
    
      const [openMedia, setMediaOpen] = React.useState(false);
      const handleMediaOpen = () => setMediaOpen(true);
      const handleMediaClose = () => setMediaOpen(false);
    
      const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setDisplayImage(URL.createObjectURL(e.target.files[0]));
      };
    
      const formData = new FormData();
      formData.append('title', productValues.title);
      formData.append('sub_title', productValues.sub_title);
      formData.append('description', productValues.description);
    
    
      const handleProductChanges = (e) => {
        setProductValues({
          ...productValues,
          [e.target.name]: e.target.value
        });
      };
    
      const headerFile = {
        headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${localStorage.getItem('authToken')}`,
          }
        };
    
      const editProduct = async () => {
        await axios
          .patch(`${apiUrl}/api/about-card/${ids.id}`, formData, headerFile )
          .then((response) => {
            setProductAdded(true);
            handleEditOpen();
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(formData);
      };

    
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 200,
        overflow:'scroll',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 12,
        p: 4,
      };
    
      return (
        <div>
          {
          productAdded?
          <Modal 
            open={open}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Card Edited Successfully
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/dashboard/about-card"
                  icon={<Icon name="back" size={15} color="white" />}
                >
                  Go Back 
                </Button>
              </Typography>
            </Box>
          </Modal>:
              <Container>
                {loader===true?(
                  <Container m={10}>
                  <CircularProgress color="secondary" />
                </Container>
                ):(<Container>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={10}>
                  <CardHeader title="Update Card Info" />
                </Grid>
              </Grid>
              <Box m={2}>
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={productValues.title}
                  onChange={handleProductChanges}
                  fullWidth
                />
              </Box>
              <Box m={2}>
                <TextField
                  label="Subtitle"
                  variant="outlined"
                  name="sub_title"
                  value={productValues.sub_title}
                  onChange={handleProductChanges}
                  fullWidth
                />
              </Box>
              <Box m={2}>
            <TextField
              label="Description"
              multiline
              rows={2}
              rowsMax={2}
              name="description"
              value={productValues.description}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
              <Box m={2}>
                <Button variant="contained" component="label" onClick={editProduct} fullWidth>
                  <h3>Update Card Info</h3>
                </Button>
              </Box>
            </Container>
            )}
  
              </Container>
              }
        </div>
      );
    }

EditAboutCard.propTypes = {
  location: PropTypes.object
};
