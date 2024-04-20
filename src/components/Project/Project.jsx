import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import {Link as Rlink} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ProjectOutlined } from '@ant-design/icons';
import { Divider } from '@mui/material';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import UserContext from '../../context/UserContext';
import List from '@mui/material/List';
import CodeIcon from '@mui/icons-material/Code';
import { styled } from '@mui/material/styles';
import { Spin } from 'antd';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {/* TODOs : Add route to start */}
      <Link color="inherit">
        Submy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const projectCollectionRef =  collection(db , "project");

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Project() {
  const [open, setOpen] = React.useState(false);
  const [pinfo, setPinfo] = React.useState([]);
  const {loggedIn} = React.useContext(UserContext);
  const [spinning, setSpinning] = React.useState(false);
    const showLoader = () => {
      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
      }, 1000);
    };
  const checkProjectStatus = async () => {
    try{
      console.log("object")
      let q1;
      let data;
      if(loggedIn!=true){
        console.log("Not logged in");
        return;
      }
      try{
        q1 = query(projectCollectionRef, where("email","==",auth.currentUser.email));
      }catch(err){
        console.log(data)
        return;
      }
      try{
        data = await getDocs(q1);
      }catch(err){
        console.log(err);
        return;
      }
      if(data.empty){
        return
        // setPinfo([]);
      }else{
        setPinfo(data.docs[0].data())
        console.log(data.docs[0].data());
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    showLoader();
    checkProjectStatus();
  },[]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const createProject = async (pname,ptype,plink,plinkChecked) => {
    console.log(plinkChecked)
    if(plinkChecked!=="linkCheckDone"){
      setOpen(true);
      return;
    }
    try{
      await addDoc(projectCollectionRef,{
        email:auth.currentUser.email,
        pname:pname,
        ptype:ptype,
        plink:plink,
      })
    }catch(error){
      console.log(error)
    }
    
    console.log("Project Submitted")
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const pname=data.get('pname');
    const ptype=data.get('ptype');
    const plink=data.get('plink');
    const plinkChecked=data.get('linkCheck')
    createProject(pname,ptype,plink,plinkChecked);
  };

  if(loggedIn && pinfo.length===0){
  return (
    <>
    <Spin tip="Loading"  spinning={spinning} fullscreen>
    <div className="content" />
    </Spin>
    <ThemeProvider theme={defaultTheme}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Kindly check the link before submitting."
      />
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <ProjectOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Project
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="pname"
                  required
                  fullWidth
                  id="pname"
                  label="Project Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ptype"
                  label="Project Type"
                  name="ptype"
                  autoComplete="other"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="plink"
                  label="Project Link"
                  name="plink"
                  autoComplete="plink"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name='linkCheck' value="linkCheckDone" color="primary" />}
                  label="I have checked that the given link is working and it is my final project."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb:5 }} />
      </Container>
      <Divider />
    </ThemeProvider>
    </>
  );
  }else if(loggedIn && pinfo.length!==0){
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
        Project Info
      </Typography>
      <Typography variant="h5" component="div">
        {bull}{bull}{bull}{bull}{bull}{bull}{bull}{bull}{bull}
      </Typography>
      {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography> */}
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Div> 
        <CodeIcon />
      </Div>
      <Typography variant="h6" component="div">
        Project name : {pinfo.pname}
      </Typography>
      <Typography variant="h6" component="div">
        Project type : {pinfo.ptype}
      </Typography>
        
          
    </List>
    <Typography variant="h5" component="div">
        {bull}{bull}{bull}{bull}{bull}{bull}{bull}{bull}{bull}
    </Typography>
    </CardContent>
    <CardActions>
      <Link target="mynewtab" to={pinfo.plink} size="small">Go to source code</Link>
    </CardActions>
  </React.Fragment>
      </Card>
    </Box>
    </Grid>
    </Grid>
      </>
    );
  }else{
    return (
      <>
      <Spin tip="Loading"  spinning={spinning} fullscreen>
    <div className="content" />
    </Spin>
    <Grid container spacing={10} className="m-12" display="flex" alignItems="center" justifyContent="center" >
    <Grid item xs={9} md={9} align="center"> 
    <Box className="m-5">

      <h1>{bull} Please login to access this feature {bull} </h1>
      <br />
      <br />
      <Rlink
          to="/login"
          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          onClick={()=>setOpen(true)}
      >
          Login
      </Rlink>
      </Box>
      </Grid>
      <Grid item xs={9} md={9} align="center"> 
      <div className="grid  place-items-center sm:mt-20">
              <img className="sm:w-96 w-48" src="/magnifier_team.jpg" alt="image2" />
         </div>
      </Grid>
      </Grid>
      </>
    )
  }
}