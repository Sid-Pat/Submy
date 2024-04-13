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
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { styled } from '@mui/material/styles';
import { addDoc, collection } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

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

export default function SignIn() {
    const {loggedIn,setLoggedIn} = useContext(UserContext);
    const createUser = async (email,password) => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            console.log(auth.currentUser);
            setLoggedIn(auth.currentUser);
        }catch(err){
            console.log(err)
        }
    };

    const createTeam = async({...team}) => {
        const s1=team.s1sid+'('+team.s1name+')';
        const s2=team.s2sid+'('+team.s2name+')';
        const s3=team.s3sid+'('+team.s3name+')';
        const s4=team.s4sid+'('+team.s4name+')';
        const studentArray = [s1,s2,s3,s4];
        console.log("Team Registering  ...")
        try{
            await addDoc(teamsCollectionRef, {
              email:team.email,
              project:team.project,
              teamInfo:studentArray,
            });
        }catch(err){
            console.log(err);
        }
        console.log("Team Registering  ...")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const {email,password} = {email:data.get('email'),
        password:data.get('password')}
        createUser(email,password);
        console.log("Create Team")
        const {...teamInfo} = {
            email:data.get('email'),
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
  if(loggedIn){
    return <Navigate to="/team" />
  }
  return (
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
            <Div>Team Representative</Div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              sx={{mb:4}}
              autoComplete="current-password"
            />
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
  );
}