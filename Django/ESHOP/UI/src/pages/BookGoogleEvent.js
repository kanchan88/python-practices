import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { Container, Grid, Typography, Button, Stack, Icon } from '@mui/material';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link, useNavigate } from 'react-router-dom';

/* global gapi */
// prettier-ignore

export default function BookGoogleEvent() {
  let month = '01';
  let auth2;

  const [value, setValue] = React.useState('');
  const [showTime, setShowTime] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [view, setView] = React.useState('');
  const [time, setTime] = React.useState(0);

  const [bookingStatus, setBookingStatus] = React.useState('');

  const handleChange = (event, nextView) => {
    setView(nextView);
    setTime(parseInt(nextView, 10));
  };

  const navigate = useNavigate();

  const [finalDate, setFinalDate] = React.useState('');
  const [endDate, setEndFinalDate] = React.useState('');

  const dateConverter = () => {
    const cDate = value.toString();
    const myDate = cDate.split(' ');
    if (myDate[1] === 'Jan') {
      month = '01';
    }
    if (myDate[1] === 'Feb') {
      month = '02';
    }
    if (myDate[1] === 'Mar') {
      month = '03';
    }
    if (myDate[1] === 'April') {
      month = '04';
    }
    if (myDate[1] === 'May') {
      month = '05';
    }
    if (myDate[1] === 'Jun') {
      month = '06';
    }
    if (myDate[1] === 'Jul') {
      month = '07';
    }
    if (myDate[1] === 'Aug') {
      month = '08';
    }
    if (myDate[1] === 'Sep') {
      month = '09';
    }
    if (myDate[1] === 'Oct') {
      month = '10';
    }
    if (myDate[1] === 'Nov') {
      month = '11';
    }
    if (myDate[1] === 'Dec') {
      month = '12';
    }

    const theDate = `${myDate[3]}-${month}-${myDate[2]}T${time}:00:00+05:45`;
    const endingDate = `${myDate[3]}-${month}-${myDate[2]}T${time+1}:00:00+05:45`;
    setFinalDate(theDate);
    setEndFinalDate(endingDate);
    return {'start':theDate, 'final':endingDate};
  };

  const CLIENT_ID = '927832324416-9t64nstt3omba55i2rh1ds5lc2r3ba9m.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAyrE8iaEIFNlVsqsLvwRKFeiPf1Yh7tFU';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  const bookevent = () => {
    const dates = dateConverter();

    gapi.load('client:auth2', () => {
      auth2 = gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      });

      gapi.client.load('calendar', 'v3', () => console.log('DONE'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {

         const signinUser = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
         console.log(signinUser);
          
          const event = {
            "summary": "Brainstorm Consulation",
            "description": "A chance to hear more about our services",
            "start": {
              "dateTime": dates.start,
            },
            "end": {
              "dateTime":dates.final,
            },
            "attendees": [
              { "email":  `${signinUser}`},
              { "email": "mailtokanchanbhatta@gmail.com" }
            ]
          };

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            sendNotifications: true,
            resource: event
          });

          clearEvent();

          request.execute((event) => {
            if(event.status !== undefined){
              setBookingStatus("Success");
              navigate('/dashboard/book/success', { replace: true });
              window.open(event.htmlLink);
            }
            else{
              setBookingStatus("Fail");
            }
          });
        });
    });
  };

  const clearEvent = () => {
    setTime(0);
    setValue(0);
  };

  return (
    <div>
      {
        bookingStatus === "Fail"?
        <Container>
        <Typography mt={15} mb={2} variant="h2">
          Unable to make booking! Please try again!
        </Typography>
        </Container>
        :
        <Container>
    {time !== 0?(
      <Container>
        <Typography mt={15} mb={2} variant="h6">
          You choose to Book your meet on
        </Typography>
        <Typography variant="h4" mb={2}>
        {value.toString().slice(4,15)} <i> from </i> {time}:00  <i> to </i> {time+1}:00
        </Typography>
        <Typography mb={2}>
        Make sure you allow or tick [See, edit, share, and permanently delete all the calendars you can access using Google Calendar.]
        </Typography>
        <Stack direction="row" mb={5} spacing={4}>
          <Button
            variant="contained"
            onClick={bookevent}
            icon={<Icon name="add" size={15} color="white" />}
          >
            Yes, I Confirm!
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={clearEvent}
            icon={<Icon name="add" size={15} color="white" />}
          >
            Cancel, I will retry!
          </Button>
        </Stack>
      </Container>
    ):(
      <Grid container spacing={2} mb={3}>
        <Grid item xs={8} md={12} lg={8} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              disablePast
              orientation="landscape"
              openTo="day"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                setShowTime(true);
              }}
            />
          </LocalizationProvider>
        </Grid>
        {showTime ? (
          <Grid item xs={4} md={12} lg={4} sm={12} mt={2}>
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              color="primary"
              size="large"
              exclusive
              fullWidth
              onChange={handleChange}
            >
              <ToggleButton value="10">10 AM</ToggleButton>
              <ToggleButton value="11">11 AM</ToggleButton>
              <ToggleButton value="12">12 PM</ToggleButton>
              <ToggleButton value="13">1 PM</ToggleButton>
              <ToggleButton value="14">2 PM</ToggleButton>
              <ToggleButton value="15">3 PM</ToggleButton>
              <ToggleButton value="16">4 PM</ToggleButton>
              <ToggleButton value="17">5 PM</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        ) : (
          <Container />
        )}
      </Grid>
    
    )}
    </Container>
      }
    </div>
  );
}
