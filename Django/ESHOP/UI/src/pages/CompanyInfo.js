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
  Paper,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
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
import { getCompanyInfo, token, apiUrl, getAllTimeLine } from '../_mocks_/repo/data';

// prettier-ignore

export default function CompanyInfo(props) {

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

  const [loader, setLoader] = useState(false);

  const [productValues, setProductValues] = useState({
    name: '',
    description: '',
    location: '',
    primary_phone: '',
    secondary_phone: '',
    email:'',
    logo:'',
  });

  const [timeline, setTimeLines] = useState([]);

  const [timehistory, setTimeLineHistory] = useState({
    name: '',
    description: '',
    date: '',
    color: 'red',
  });

  const getSingleProduct = (id) => {
    setLoader(true);
    getAllTimeLine().then((data)=>{
      if (data === undefined) {
        setLoader(true);
      }  else {
        setTimeLines(data.data);
        setLoader(false);
      }
    });

    getCompanyInfo(id).then((data) => {
      if (data === undefined) {
        setLoader(true);
      }  else {
        setProductValues(data.data);
        setLoader(false);
      }
    });
};
  useEffect(() => {
    getSingleProduct(ids.id);
  }, []);

  const compaytimeline = timeline.map((_, index) => ({
    id: timeline[index].id,
    name: timeline[index].name,
    description: timeline[index].description,
    date: timeline[index].date,
    color: timeline[index].color
  }));

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
  formData.append('description', productValues.description);
  formData.append('email', productValues.email);
  formData.append('location', productValues.location);
  formData.append('primary_phone', productValues.primary_phone);
  formData.append('secondary_phone', productValues.secondary_phone);
  if(prodImage!=null){formData.append('logo', prodImage)};

  const handleProductChanges = (e) => {
    setProductValues({
      ...productValues,
      [e.target.name]: e.target.value
    });
  };


  const handleTimeLineChanges = (e) => {
    setTimeLineHistory({
      ...timehistory,
      [e.target.name]: e.target.value
    });
  };

  const [errortext, setErrorText] = useState();
  const [uploadError,setUploadError]= React.useState(false);

  const headerFile = {
    headers:{
      'Content-Type': 'multipart/form-data',
      'Authorization': `Token ${token}`,
      }
    };

    const myheaderFile = {
      headers:{
        'Authorization': `Token ${token}`,
        }
      };

  const editCompanyInfo = async () => {
    await axios
      .patch(`${apiUrl}/api/company-info/1`, formData, headerFile )
      .then((response) => {
        setProductAdded(true);
        handleEditOpen();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
  };


  const deleteTimeLine = async (id) => {
    if (window.confirm("Delete the item?")) {
      await axios
      .delete(`${apiUrl}/api/timeline/${id}`, myheaderFile )
      .then((response) => {
        setProductAdded(true);
        handleEditOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  };

  

  const addTimeLineData = async () => {
    if(validateUserInput()){
      await axios
      .post(`${apiUrl}/api/timeline`, timehistory, myheaderFile )
      .then((response) => {
        setProductAdded(true);
        handleEditOpen();
      })
      .catch((error) => {
        console.log(error);
        setUploadError(true);
        setErrorText("Something went wrong! Please try again..")
      });
    }
  };

  const validateUserInput = () => {
    if(timehistory.name.length === 0){
      setUploadError(true);
      setErrorText("Name is required field");
      return false;
    }
    if(timehistory.description.length === 0){
      setUploadError(true);
      setErrorText("Description is required field");
      return false;
    }
    if(timehistory.date.length !== 10){
      setUploadError(true);
      setErrorText("Date in format YYYY/MM/DD");
      return false;
    }
    return true;
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
            Service Edited Successfully
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/app"
              icon={<Icon name="back" size={15} color="white" />}
            >
              Go Back 
            </Button>
          </Typography>
        </Box>
      </Modal>:
      <Container>
        {loader?(
        <Container m={10}>
          <CircularProgress color="secondary" />
        </Container>):          
        <Container>
          <Typography m={2} variant="h3" gutterBottom> 
            Company Information
          </Typography>
          <Box m={2}>
          <hr/><hr/>
          </Box>
          <Typography m={2} variant="h4" gutterBottom> 
            Edit Basic Info
          </Typography>
          <Box m={2}>
            <TextField
              label="Company Name"
              variant="outlined"
              name="name"
              value={productValues.name}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Company Description"
              multiline
              rows={3}
              rowsMax={5}
              name="description"
              value={productValues.description}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Company Email"
              variant="outlined"
              name="email"
              value={productValues.email}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Company Location"
              variant="outlined"
              name="location"
              value={productValues.location}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Primary Phone"
              variant="outlined"
              name="primary_phone"
              value={productValues.primary_phone}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Secondary Phone"
              variant="outlined"
              name="secondary_phone"
              value={productValues.secondary_phone}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Typography m={2} variant="h5" gutterBottom>
            Company Logo
          </Typography>
          <Box m={2}>
            {displayImage==null?<img src={ productValues.logo } alt="img" height="100px"/>:<img src={ displayImage } alt="img" height="100px"/>}
            <Button variant="outlined" component="label">
              Upload Images*
              <input type="file" name="image" onChange={handleImageChange} hidden />
            </Button>
          </Box>
          <Box m={2}>
            <Button variant="contained" component="label" onClick={editCompanyInfo} fullWidth>
              <h3>Update Basic Info</h3>
            </Button>
          </Box>
          <Box m={2}>
          <hr/> <hr/>
          </Box>
          <Typography m={2} variant="h4" gutterBottom> 
            Timeline Info
          </Typography>
          <Table m={2}>
          <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Date of Acheivement</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {compaytimeline.map((row) => {
                      const { id, name, description, date, color } = row;
                      return (
                        <TableRow>
                          <TableCell>{name}</TableCell>
                          <TableCell align="right">{description}</TableCell>
                          <TableCell align="right">{date}</TableCell>
                          <TableCell align="right"><DeleteIcon style={{ color: 'red' }} onClick={()=>deleteTimeLine(id)}/></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
          <Typography m={2} mt={10} variant="h6" gutterBottom> 
            Add Info
          </Typography>
          <Stack direction="row" spacing={2}>
          <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={timehistory.name}
              onChange={handleTimeLineChanges}
              fullWidth
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={timehistory.description}
              onChange={handleTimeLineChanges}
              fullWidth
            />
            <TextField
              label="Date"
              variant="outlined"
              name="date"
              value={timehistory.date}
              onChange={handleTimeLineChanges}
              fullWidth
            />
            <Button onClick={addTimeLineData}>Add</Button>
          </Stack>
          <Box m={2}>
              {
                uploadError?(<Typography variant="p" color="red">{errortext}</Typography>):(<Container/>)
              }
          </Box>
        </Container>
}
        </Container>
        }
    </div>
  );
}

CompanyInfo.propTypes = {
  location: PropTypes.object
};
