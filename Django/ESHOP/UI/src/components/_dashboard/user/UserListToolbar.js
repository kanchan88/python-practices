import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import downloadOutline from '@iconify/icons-eva/download-outline';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddIcon from '@mui/icons-material/Add';

// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Container
} from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 40,
  justifyContent: 'space-between',
  paddingLeft: 20
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 40,
  backgroundColor: 'white',
  fontSize: 14,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  // '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onImportClick: PropTypes.func,
  onExportClick: PropTypes.func,
  onAddClick: PropTypes.func
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  onImportClick,
  onAddClick
}) {
  return (
    <RootStyle>
      <Box sx={{ width: '70%' }}>
        {numSelected > 0 ? null : (
          <Button
            variant="contained"
            color="info"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={onImportClick}
          >
            Import
          </Button>
        )}
        {numSelected > 0 ? (
          <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
            Delete {numSelected} items
          </Button>
        ) : null}
      </Box>
      {numSelected > 0 ? null : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search here..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} />
            </InputAdornment>
          }
        />
      )}
      &nbsp;&nbsp;&nbsp;
      {numSelected > 0 ? null : (
        <Button variant="contained" color="primary" onClick={onAddClick} startIcon={<AddIcon />}>
          Add
        </Button>
      )}
    </RootStyle>
  );
}
