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
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';


const projectCollectionRef =  collection(db , "project");

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Project() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
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
                key:i,
            })
        }
        console.log(plistArray)
        setPlist(plistArray);
    }catch(error){
        console.log(error);
    }

  }
  useEffect(()=>{
    getAllProjects();
  },[])

//   function generate(element) {
//     let i=0;
//     return plist.map((pinfo) =>
//       React.cloneElement(element, {
//         key: i,props:{pname:pinfo.pname}
//       }),
      
//     );
//   }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
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
      <Grid container spacing={6} className='mb-14'>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2, m:4 }} variant="h6" component="div">
            Project List
          </Typography>
          <Demo>
          <List dense={dense}>
            </List>
            <List dense={dense}>
              {plist.map((pinfo)=>(
                <>
                <ListItem
                key={pinfo.key}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary= {pinfo.pname}
                    secondary={secondary ? pinfo.ptype : null}
                  />
                  <ListItemText
                    primary= {pinfo.plink}
                    // secondary={secondary ? pinfo.ptype : null}
                  />
                </ListItem>,
                </>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}