import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth, db } from '../../config/firebase'
// import { useContext } from 'react';
// import UserContext from '../../context/UserContext';
import { styled } from '@mui/material/styles';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import UserContext from '../../context/UserContext';
// import { Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';
import {  Spin } from 'antd';


const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


const teamsCollectionRef =  collection(db , "teams");

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Submy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Team() {
    const {team,setTeam,loggedIn} = useContext(UserContext);
    const [spinning, setSpinning] = React.useState(false);
    const showLoader = () => {
      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
      }, 1000);
    };
    // const {loggedIn,setLoggedIn} = useContext(UserContext);
    const getTeamList = async () => {
      try{
        // const data  = await getDocs(teamsCollectionRef)
        // const filteredData = data.docs.map((doc)=> ({
        //   ...doc.data(),
        //   id:doc.id})
        // );
        if(!loggedIn){
          console.log("Kindly log in");
          return;
        }
        let q1;
        let data;
        try{
          q1 = query(teamsCollectionRef, where("email","==",auth.currentUser.email));
          // console.log(q1)
        }catch(err){
          console.log(err)
          return;
        }
        try{
          data = await getDocs(q1);
          console.log(data)
        }catch(err){
          console.log(err)
          return;
        }
        // data.forEach((doc)=>{
        //   console.log(doc.id,"->",doc.data())
        // })
        if(data.empty){
          setTeam([]);
        }else{
          setTeam(data.docs[0].data())
        }

        console.log(data.docs[0].data())
        // console.log(filteredData);
        // setMovieList(filteredData)
      }catch(err){
        console.log(err);
      }
    }
    useEffect(()=>{
      showLoader();
      getTeamList();
    },[])

    const createTeam = async({...team}) => {
        const email=auth.currentUser.email;
        try{
            await addDoc(teamsCollectionRef, {
              email:email,
              project:team.project,
              teamInfo:{
                [team.s1sid]:{
                  name:team.s1name
                },
                [team.s2sid]:{
                  name:team.s2name
                },
                [team.s3sid]:{
                  name:team.s3name
                },
                [team.s4sid]:{
                  name:team.s4name
                },
              },
            });
            getTeamList()
        }catch(err){
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(auth==null){
          console.log("Please login")
          return;
        }
        const data = new FormData(event.currentTarget);
        const {...teamInfo} = {
            s1sid:data.get('s1sid'),
            s1name:data.get('s1name'),
            s2sid:data.get('s2sid'),
            s2name:data.get('s2name'),
            s3sid:data.get('s3sid'),
            s3name:data.get('s3name'),
            s4sid:data.get('s4sid'),
            s4name:data.get('s4name'),
            project:data.get('project'),
        }
        createTeam(teamInfo)
    };

  if(loggedIn && team.length!==0){
    return(
      <>
      <Spin tip="Loading"  spinning={spinning} fullscreen>
    <div className="content" />
    </Spin>
      <Grid container spacing={12} className="m-3" display="flex" alignItems="center" justifyContent="center">
    <Grid item xs={9} md={5} align="center"> 
    <Box className="m-10">
      <Card variant="outlined">
      <React.Fragment>
    <CardContent>
      <Typography variant="h3" color="text.secondary" gutterBottom>
        Team Info
      </Typography>
      <Typography variant="h5" component="div">
        {bull}{bull}{bull}{bull}{bull}{bull}{bull}{bull}{bull}
      </Typography>
      {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography> */}
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Div> <Diversity3Icon/> </Div>
      <Typography variant="h6" component="div">
        Name and Scholar Number
      </Typography>
      {
        Object.entries(team.teamInfo).map(([key,value])=>{
          return(
            <ListItem key={key}>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={value.name} secondary={key} />
          </ListItem>
          )
        })
      }
    </List>
    <Typography variant="h5" component="div">
        {bull}{bull}{bull}{bull}{bull}{bull}{bull}{bull}{bull}
    </Typography>
    </CardContent>
    <CardActions>
      <Link size="small">Go to my project status</Link>
    </CardActions>
  </React.Fragment>
      </Card>
    </Box>
    </Grid>
    </Grid>
    </>
    )
  }
  return (
    <>
    <Spin tip="Loading"  spinning={spinning} fullscreen>
    <div className="content" />
    </Spin>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New User
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
            <Div>Team Registration</Div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="s1sid"
              label="Student 1 Scholar Number(Team Representative)"
              id="s1sid"
              autoComplete="s1sid"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="s1name"
              label="Student 1 Name(Team Representative)"
              id="s1name"
              autoComplete="s1name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="s2sid"
              label="Student 2 Scholar Number"
              id="s2sid"
              autoComplete="s2sid"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="s2name"
              label="Student 2 Name"
              id="s2name"
              autoComplete="s2name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="s3sid"
              label="Student 3 Scholar Number"
              id="s3sid"
              autoComplete="s3sid"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="s3name"
              label="Student 3 Name"
              id="s3name"
              autoComplete="s3name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="s4sid"
              label="Student 4 Scholar Number"
              id="s4sid"
              autoComplete="s4sid"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="s4name"
              label="Student 4 Name"
              id="s4name"
              autoComplete="s4name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="project"
              label="Project Name"
              id="project"
              autoComplete="project"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}

