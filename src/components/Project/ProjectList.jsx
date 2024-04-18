import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderOpenIcon from '@mui/icons-material/Folder';
import { collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { InputNumber, Space } from 'antd';
import UserContext from '../../context/UserContext';
import { Button } from 'antd';

const projectCollectionRef =  collection(db , "project");

// const plist = [
//   {pname:"Karakaro", ptype:"opel", plink:"http://www.toplot.com",key:1,email:"gukiol",pmarks:10},
//   {pname:"Karakaro", ptype:"opel", plink:"http://www.toplot.com",key:2,email:"gukiol",},
//   {pname:"Karakaro", ptype:"opel", plink:"http://www.toplot.com",key:3,email:"gukiol",pmarks:10},
// ]

const adminList = ['admin@manit.com']

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const onChange = (value) => {
  console.log('changed', value);
};

export default function Project() {
  const {loggedIn} = React.useContext(UserContext);
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [plist,setPlist] = React.useState([]);

  const getAllProjects = async () => {
    try{
        const data = await getDocs(projectCollectionRef);
        console.log(data.docs[0].data())
        const plistArray = []
        for(let i=0;i<data.docs.length;i++){
            let instance = data.docs[i].data();
            plistArray.push({
                pname:instance.pname,
                ptype:instance.ptype,
                plink:instance.plink,
                marks:instance.marks,
                email:instance.email,
                key:data.docs[i].id,
            })
            // console.log(data.docs[i].id)
        }
        console.log(plistArray)
        setPlist(plistArray);
    }catch(error){
        console.log(error);
    }

  }
  useEffect(()=>{
    getAllProjects();
    if(loggedIn==false) return;
    adminList.forEach((adminEmail)=>{
      if(adminEmail==auth.currentUser.email) {
        setIsAdmin(true);
        return;
      }
    })
    setIsAdmin(false)
  },[])
  const setMarks = async (id) => {
     console.log(id) 
     try{ 
        if(loggedIn==false){
          return;
        }
        const selectedProjectRef = doc(projectCollectionRef,id)
        updateDoc(selectedProjectRef,{marks:10})
        
        getAllProjects()
    }catch(err){
      console.log(err);
    }
  }
 

//   function generate(element) {
//     let i=0;
//     return plist.map((pinfo) =>
//       React.cloneElement(element, {
//         key: i,props:{pname:pinfo.pname}
//       }),
      
//     );
//   }
  
  return (
    <Box sx={{ flexGrow: 1, margin: 2 }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          }
          label="Enable dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        />
      </FormGroup>
      <Grid container spacing={12} display="flex" alignItems="center" justifyContent="center" className='mb-14'>
        <Grid item xs={10} md={8}>
          <Typography sx={{ mt: 4, mb: 2, m:4 , color:"#F95700FF" , fontSize:"3rem"}} variant="h6" component="div">
            Project List
          </Typography>
          {/* <Box
            display="flex" 
            bgcolor="lightgreen"
            alignItems="center"
            justifyContent="center"
          > */}
          <Demo >
          {/* <List dense={dense}>
            </List> */}
            <List dense={dense}>
              {/* List Rendering */}
              {plist.map((pinfo)=>(
                <ListItem
                sx={{
                  color:"#00A4CCFF",
                  border:"#F95700FF 2px solid",
                  marginBottom :"1rem",
                  borderRadius:"1rem",
                }}
                key={pinfo.key}
                  secondaryAction={
                    // <Space wrap>
                      // {(isAdmin)?<InputNumber size="small" min={1} max={10} defaultValue={0} onChange={onChange} />:"Hellp"}
                      // <InputNumber size="small" min={1} max={10} defaultValue={0} onChange={onChange} />
                    // </Space>
                    <IconButton edge="end" aria-label="delete">
                    {/* //   {(isAdmin)?<RateReviewIcon />:""} */}
                    {(isAdmin)?(<><InputNumber size="small" min={1} max={10} defaultValue={pinfo.marks} onChange={onChange} /><Button onClick={()=>setMarks(pinfo.key)} size="small">Add</Button></>):<></>}
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    {/* <Avatar> */}
                      <FolderOpenIcon color='warning'/>
                    {/* </Avatar> */}
                  </ListItemAvatar>
                  <ListItemText
                    primary= {pinfo.pname}
                    secondary={secondary ? pinfo.email : null}
                  />
                  <ListItemText
                    // primary= {pinfo.plink}
                    primary={pinfo.ptype}
                    // secondary={secondary ? pinfo.ptype : null}
                  />
                  <ListItemText
                    // primary= {pinfo.plink}
                    primary={<Link to={pinfo.plink} target="mynewtab" variant="body2" underline="hover">Open <OpenInNewIcon /> </Link>}
                    // secondary={secondary ? pinfo.ptype : null}
                  />
                  <ListItemText
                    // primary= {pinfo.plink}
                    primary={(pinfo.marks==null)?"--":pinfo.marks}
                    // secondary={secondary ? pinfo.ptype : null}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
          {/* </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
}