import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import calendarOutline from '@iconify/icons-eva/calendar-outline';
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
  Container,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 40,
  justifyContent: 'space-between',
  paddingLeft: 0
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 250,
  height: 40,
  borderRadius: 5,
  backgroundColor: 'white',
  fontSize: 14,
  fontWeight: 'normal',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  // '&.Mui-focused': { borderColor: theme.palette.primary },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[700]} !important`
  }
}));

const DateStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 180,
  height: 40,
  borderRadius: 5,
  backgroundColor: 'white',
  fontSize: 14,
  fontWeight: 'normal',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  // '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[700]} !important`
  }
}));

// ----------------------------------------------------------------------

TransactionToolBar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onImportClick: PropTypes.func,
  onExportClick: PropTypes.func,
  onAddClick: PropTypes.func,
  status: PropTypes.string
};

export default function TransactionToolBar({
  numSelected,
  status,
  filterName,
  onFilterName,
  onImportClick
}) {
  return (
    <RootStyle sx={{ mt: 1 }}>
      <Container sx={{ ml: -6 }} backgroundColor="whitesmoke">
        <Box display="flex" justifyContent="start">
          <Box display="block">
            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: '#637381' }}>
              Name
            </Typography>
            <SearchStyle
              placeholder="Search by Name"
              value={filterName}
              onChange={onFilterName}
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={searchFill} />
                </InputAdornment>
              }
            />
          </Box>
          <Box p={2} />
          <Box display="block">
            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: '#637381' }}>
              Bill Date
            </Typography>
            <DateStyle
              placeholder="From"
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={calendarOutline} />
                </InputAdornment>
              }
            />
          </Box>
          <Box p={1} />
          <Box display="block">
            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}> .</Typography>
            <DateStyle
              placeholder="To"
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={calendarOutline} />
                </InputAdornment>
              }
            />
          </Box>
          <Box p={3} mb={3} />
          <Box p={0}>
            <Box display="block">
              <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: '#637381' }}>
                Filter By
              </Typography>
              <FormControl size="small" sx={{ minWidth: 100 }} autoWidth>
                {status === 'order' ? (
                  <Select
                    labelId="select"
                    id="select"
                    value="on-hold"
                    placeholder="Status"
                    style={{ color: '#919EAB', fontWeight: 500, height: 40 }}
                  >
                    <MenuItem value="on-hold" style={{ color: '#919EAB', fontWeight: 800 }}>
                      On-hold
                    </MenuItem>
                    <MenuItem value="rejected" style={{ color: '#919EAB', fontWeight: 800 }}>
                      Rejected
                    </MenuItem>
                    <MenuItem value="completed" style={{ color: '#919EAB', fontWeight: 800 }}>
                      Completed
                    </MenuItem>
                  </Select>
                ) : (
                  <Select labelId="select" id="select" value="unpaid" placeholder="Status">
                    <MenuItem value="unpaid" style={{ color: '#919EAB', fontWeight: 500 }}>
                      Unpaid
                    </MenuItem>
                    <MenuItem value="paid" style={{ color: '#919EAB', fontWeight: 500 }}>
                      Paid
                    </MenuItem>
                    <MenuItem value="due">Due</MenuItem>
                  </Select>
                )}
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
