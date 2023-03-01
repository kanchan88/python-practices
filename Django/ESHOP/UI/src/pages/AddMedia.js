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
import { Card, Row, Col } from 'reactstrap';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getSingleMedia, apiUrl } from '../_mocks_/repo/data';

// prettier-ignore

export default function AddMedia(props) {
    
    
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
        image:''
      });
    
      const [errortext, setErrorText] = useState();
      const [uploadError,setUploadError]= React.useState(false);

      const validateUserInput = () => {
        if(productValues.name.length === 0){
          setUploadError(true);
          setErrorText("Alt Name is required field");
          return false;
        }
        if(prodImage == null){
          setUploadError(true);
          setErrorText("Image is required field");
          return false;
        }
        return true;
      };
        
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
      formData.append('name', productValues.name);
      if(prodImage!=null){formData.append('image', prodImage)};
    
    
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
    
      const addMedia = async () => {
        if(validateUserInput()){
          await axios
          .post(`${apiUrl}/api/media`, formData, headerFile )
          .then((response) => {
            setProductAdded(true);
            handleEditOpen();
          })
          .catch((error) => {
            setUploadError(true);
            setErrorText("Something went wrong! Please try again..")
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
                  Media Edited Successfully
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/dashboard/media"
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
                  <CardHeader title="Upload Media" />
                </Grid>
              </Grid>
              <Box m={2}>
                <TextField
                  label="Alt Name"
                  variant="outlined"
                  name="name"
                  value={productValues.name}
                  onChange={handleProductChanges}
                  fullWidth
                />
              </Box>
              <Box m={2}>
                {displayImage == null ? (
                  <img src={productValues.image} alt="img" height="100px" />
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
                <Button variant="contained" component="label" onClick={addMedia} fullWidth>
                  <h3>Add Media</h3>
                </Button>
              </Box>
            </Container>
          )}
        </div>
      );
    }

AddMedia.propTypes = {
  location: PropTypes.object
};
