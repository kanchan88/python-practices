import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Modal,
  Icon,
  Grid,
  CardHeader
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Card, Row, Col, Form } from 'reactstrap';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getSingleTeamMember, apiUrl } from '../_mocks_/repo/data';

// prettier-ignore

export default function AddTestimonial(props) {
    
    
      const [prodImage, setProductImage] = useState();
      const [displayImage, setDisplayImage] = useState();
      const [productAdded, setProductAdded] = useState(false);
      const [mediaImages, setMediaImages] = useState([]);
    
      const [product, setProduct] = useState([]);
      const [error, setError] = useState(false);
      const [id, setId] = useState([]);

      const ids = useParams();
    
      const [productValues, setProductValues] = useState({
        name: '',
        title: '',
        content: '',
        reviewer_image: '',
        youtube_link: ''
      });

      const [open, setEditOpen] = React.useState(false);
      const handleEditOpen = () => setEditOpen(true);
      const handleEditClose = () => setEditOpen(false);

      const [errortext, setErrorText] = useState();
      const [uploadError,setUploadError]= React.useState(false);
    
      const [openMedia, setMediaOpen] = React.useState(false);
      const handleMediaOpen = () => setMediaOpen(true);
      const handleMediaClose = () => setMediaOpen(false);
    
      const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setDisplayImage(URL.createObjectURL(e.target.files[0]));
      };
    
      const formData = new FormData();
      formData.append('name', productValues.name);
      formData.append('title', productValues.title);
      formData.append('content', productValues.content);
      formData.append('youtube_link', productValues.youtube_link);
      if(prodImage!=null){formData.append('reviewer_image', prodImage)};
    
    
      const handleProductChanges = (e) => {
        setProductValues({
          ...productValues,
          [e.target.name]: e.target.value,
        });
      };

      const validateUserInput = () => {
        if(productValues.name.length === 0){
          setUploadError(true);
          setErrorText("Name is required field");
          return false;
        }
        if(productValues.title.length === 0){
          setUploadError(true);
          setErrorText("Title is required field");
          return false;
        }
        if(productValues.content.length === 0){
          setUploadError(true);
          setErrorText("Content is required field");
          return false;
        }
        if(prodImage == null){
          setUploadError(true);
          setErrorText("Image is required field");
          return false;
        }
        return true;
      };
    
      const headerFile = {
        headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${localStorage.getItem('authToken')}`,
          }
        };
    
      const addTestimonial = async () => {
        if(validateUserInput()){
          await axios
          .post(`${apiUrl}/api/testimonial`, formData, headerFile )
          .then((response) => {
            setProductAdded(true);
            handleEditOpen();
          })
          .catch((error) => {
            setUploadError(true);
            setErrorText("Something went wrong! Try in a while.")
            console.log(error);
          });
        console.log(formData);
        }
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
          {productAdded ? (
            <Modal
              open={open}
              onClose={handleEditClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  Edited Successfully
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/dashboard/testimonial"
                    icon={<Icon name="back" size={15} color="white" />}
                  >
                    Go Back
                  </Button>
                </Typography>
              </Box>
            </Modal>
          ) : (
            <Container>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={10}>
                  <CardHeader title="Add Testimonial" />
                </Grid>
              </Grid>
              <Box m={2}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={productValues.name}
                  onChange={handleProductChanges}
                  fullWidth
                  required
                />
              </Box>
              <Box m={2}>
                <TextField
                  label="Review Title"
                  variant="outlined"
                  name="title"
                  value={productValues.title}
                  onChange={handleProductChanges}
                  fullWidth
                  required
                />
              </Box>
              <Box m={2}>
                <TextField
                  label="Review Content"
                  variant="outlined"
                  name="content"
                  value={productValues.content}
                  onChange={handleProductChanges}
                  fullWidth
                  multiline
                  rows={3}
                  rowsMax={3}
                  required
                />
              </Box>
              <Box m={2}>
                <TextField
                  label="Review Link Youtube"
                  variant="outlined"
                  name="youtube_link"
                  value={productValues.youtube_link}
                  onChange={handleProductChanges}
                  fullWidth
                />
              </Box>
              <Box m={2}>
                {displayImage == null ? (
                  <img src={productValues.reviewer_image} alt="img" height="100px" />
                ) : (
                  <img src={displayImage} alt="img" height="100px" />
                )}
                <Button variant="outlined" component="label">
                  Upload Images*
                  <input type="file" name="image" onChange={handleImageChange} hidden />
                </Button>
              </Box>
              <Box m={2}>
              {
                uploadError?(<Typography variant="p" color="red">{errortext}</Typography>):(<Container/>)
              }
              </Box>
              <Box m={2}>
                <Button variant="contained" component="label" onClick={addTestimonial} fullWidth>
                  <h3>Add Testimony</h3>
                </Button>
              </Box>
            </Container>
          )}
        </div>
      );
    }

AddTestimonial.propTypes = {
  location: PropTypes.object
};
