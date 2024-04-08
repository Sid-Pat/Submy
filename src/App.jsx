import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { db,auth, storage } from './config/firebase'
import {collection, getDocs, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import {ref,uploadBytes} from "firebase/storage";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import ScaleLoader from "react-spinners/ScaleLoader";
const moviesCollectionRef = collection(db, "movies");

function App() {
  const [movieList, setMovieList]=useState([]);
  //New Movie State
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieDate, setNewMovieDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  //Update title state
  const [updateTitle, setUpdateTitle] = useState("");
  //get movies
  const getMovieList = async () => {
    //Read
    try{
      const data  = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc)=> ({
        ...doc.data(),
        id:doc.id})
      );
      // console.log(filteredData);
      setMovieList(filteredData)
    }catch(err){
      console.log(err);
    }
    //Set Movie List
  };
  useEffect(() => {
    getMovieList();
  },[]);

  const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieDate,
        receivedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    }catch(err){
      console.log(err);
    }
  }

  const deleteMovie = async (id) => {
    try{
      const movieDoc = doc(moviesCollectionRef, id);
      await deleteDoc(movieDoc);
      getMovieList();
    }catch(err){
      console.log(err);
    }
  }
  const updateMovieTitle = async (id) => {
    try{
      const movieDoc = doc(moviesCollectionRef, id);
      await updateDoc(movieDoc, {title:updateTitle})
      getMovieList();
    }catch(err){
      console.log(err);
    }
  }

  const uploadFile = async () => {
    if(fileUpload==null)return;
    try{
      const filesFolderRef = ref(storage, `moviesFolder/${fileUpload.name}`);
      await uploadBytes(filesFolderRef, fileUpload);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className='App'>
        {/* <ScaleLoader color="#36d7b7" /> */}
        <Auth/>
        <br />
        <div id="movieform">
          <h3>Add Movie to List</h3>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          >
          <TextField id="outlined-basic movienamefield" label="Movie name" variant="outlined" onChange={(e)=>setNewMovieTitle(e.target.value)}/>
          <TextField id="outlined-basic moviedatefield" label="Release date" variant="outlined" onChange={(e)=>setNewMovieDate(Number(e.target.value))}/>
          <div>
            <label htmlFor="movieoscarfield">Received Oscar</label>
            <input type="checkbox" name="movieoscarfield" id="movieoscarfield" onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/>
          </div>
          <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={onSubmitMovie}>Add my choice</Button>
          </Stack>
        </Box>

        </div>
        <div>
          {movieList.map((movie)=>(
            <div id="moviecard" key={movie.id}>
              <h2 style={{color: movie.receivedOscar==true?"green":"black"}}>{movie.title}</h2>
              <p>Date : {movie.releaseDate}</p>
              <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={()=>deleteMovie(movie.id)}>Not my type</Button>
              </Stack>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField id="outlined-basic" key={"movietitle"+movie.id} label="Update title ..." variant="outlined" onChange={(e)=>setUpdateTitle(e.target.value)}/>
                <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={()=>updateMovieTitle(movie.id)}>My mind got changed</Button>
                </Stack>
              </Box>
            </div>
          ))}
        </div>
        <br/>
        {/* <input type="file" /> */}
        <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
          <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={uploadFile}> Upload File </Button>
          </Stack>
      </div>
    </>
  )
}

export default App
