import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

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
import { getSingleVisaSevice, apiUrl } from '../_mocks_/repo/data';

// prettier-ignore

export default function EditVisaService(props) {

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [prodImage, setProductImage] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [productAdded, setProductAdded] = useState(false);
  const [mediaImages, setMediaImages] = useState([]);

  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [id, setId] = useState([]);

  const ids = useParams();

  const [errortext, setErrorText] = useState();
  const [uploadError,setUploadError]= React.useState(false);

  const [productValues, setProductValues] = useState({
    name: '',
    description: '',
    slug: '',
    seo_meta_title: '',
    seo_meta_description: '',
    featured_image:''
  });

  const validateUserInput = () => {
    if(productValues.name.length === 0){
      setUploadError(true);
      setErrorText("Name is required field");
      return false;
    }
    if(editorState.getCurrentContent().getPlainText('').length === 0){
      setUploadError(true);
      setErrorText("Description is required field");
      return false;
    }
    if(productValues.slug.length === 0 || productValues.slug.length > 20 ){
      setUploadError(true);
      setErrorText("Slug is required field and must be less than 20 chars");
      return false;
    }
    return true;
  };

  const [loader, setLoader] = useState(false);

  const getSingleProduct = (id) => {
    setLoader(true);
    getSingleVisaSevice(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductValues(data.data);
        setLoader(false);
        const html = data.data.description;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState)
        }
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

  const [prodIcon, setProIcon] = useState();
  const [displayIcon, setDisplayIcon] = useState();

  const handleIconChange = (e) => {
    setProIcon(e.target.files[0]);
    setDisplayIcon(URL.createObjectURL(e.target.files[0]));
  };

  const formData = new FormData();
  formData.append('name', productValues.name);
  formData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())));
  formData.append('slug', productValues.slug);
  formData.append('excerpt', productValues.excerpt);
  formData.append('seo_meta_title', productValues.seo_meta_title);
  formData.append('seo_meta_description', productValues.seo_meta_description);
  if(prodIcon!=null){formData.append('service_icon', prodIcon)};
  if(prodImage!=null){formData.append('featured_image', prodImage)};


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
    if(validateUserInput()){
      await axios
      .patch(`${apiUrl}/api/service/${ids.id}`, formData, headerFile )
      .then((response) => {
        setProductAdded(true);
        handleEditOpen();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
    }
  };

  const deleteProduct = async () => {
    await axios
      .delete(`${apiUrl}/api/service/${ids.id}`,headerFile )
      .then((response) => {
        setProductAdded(true);
        handleEditOpen();
      })
      .catch((error) => {
        console.log(error);
      });
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


  const uploadInlineImageForArticle = async (file) => {
    const formda = new FormData();
    formda.append('name', 'brainstrom-image');
    formda.append('image', file);
    try {
      const data = await axios.post(
        `${apiUrl}/api/media`, 
        formda,
        headerFile
      )
      return data;
    } catch (e) {
      console.log('caught error');
      console.error(e);
      return null;
    }
  };


  
  const uploadImageCallBack = async (file) => {
    const imgData = await uploadInlineImageForArticle(file);
    console.log(imgData);
    return Promise.resolve({ data: { 
      link: imgData.data.image
    }});
  }

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
            Service Edited Successfully
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/visa-service"
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
          <CardHeader title="Update Visa" />
        </Grid>
        <Grid item xs={2} mt={2}>
        <Button variant="outlined" component="label" onClick={deleteProduct} color="error" startIcon={<DeleteIcon />}>
              <h3>Delete</h3>
            </Button>
        </Grid>
      </Grid>
          <Box m={2}>
            <TextField
              label="Product Name"
              name="name"
              variant="outlined"
              value={productValues.name}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Typography m={2} variant="h5"> 
              Description
          </Typography>
          <Box m={2}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
              }}
            />
          </Box>
          <Typography m={2} variant="h5" gutterBottom>
            SEO Section
          </Typography>
          <Box m={2}>
            <TextField
              label="Meta Title"
              variant="outlined"
              name="seo_meta_title"
              value={productValues.seo_meta_title}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Product Slug"
              variant="outlined"
              name="slug"
              value={productValues.slug}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Meta Description"
              multiline
              rows={2}
              rowsMax={2}
              name="seo_meta_description"
              value={productValues.seo_meta_description}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Typography m={2} variant="h5" gutterBottom>
            Other Info
          </Typography>
          <Box m={2}>
            <TextField
              label="Excerpt"
              multiline
              rows={2}
              rowsMax={2}
              name="excerpt"
              value={productValues.excerpt}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            {displayIcon==null?<img src={ productValues.service_icon } alt="img" height="100px"/>:<img src={ displayIcon } alt="img" height="100px"/>}
            <Button variant="outlined" component="label">
              Upload Icon*
              <input type="file" name="icon" onChange={handleIconChange} hidden />
            </Button>
          </Box>
          <Typography m={2} variant="h5" gutterBottom>
            Featured Image
          </Typography>
          <Box m={2}>
            {displayImage==null?<img src={ productValues.featured_image } alt="img" height="100px"/>:<img src={ displayImage } alt="img" height="100px"/>}
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
            <Button variant="contained" component="label" onClick={editProduct} fullWidth>
              <h3>Update Info</h3>
            </Button>
          </Box>
        </Container>
        )}
          </Container>
          }
    </div>
  );
}

EditVisaService.propTypes = {
  location: PropTypes.object
};
