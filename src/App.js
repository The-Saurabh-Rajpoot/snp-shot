import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logoS.png'
import { useState } from 'react';

function App() {
  const [pics, setPics] = useState("")
  const [tag, setTag] = useState("")

  const fliker = async (tag) => {
    try {
      const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKER_API_KEY}&tags=${tag}&per_page=21&format=json&nojsoncallback=1`);
      const resJson = await response.json();
      var reslutArr = resJson.photos.photo.map((photo) => {
        let picUrl = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
        return (
          <img src={picUrl} className='resPics' key={photo.id} />
        )
      })
      console.log("runnign");
      setPics(reslutArr);

    } catch (error) {
      console.error(error);
    }
    setmsg(`${tag} Pictures`);
    setTag("");
    
  }
  const [msg,setmsg]=useState("");
  // example call with the 'cat' tag

  return (
    <div className="App">
      <h1 id='titel'>SnapShot</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="search"
          aria-label="search"
          aria-describedby="basic-addon2"
          onChange={(e) => { setTag(e.target.value) }}
          value={tag}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={() => { fliker(tag) }}>
          <img src={logo} id="logo" />
        </Button>
      </InputGroup>
      <div id="button-container">
        <button className='btnS' onClick={() => { fliker("mountain") }}>Mountain</button>
        <button className='btnS' onClick={() => { fliker("Beaches") }}>Beaches</button>
        <button className='btnS' onClick={() => { fliker("Birds") }}>Birds</button>
        <button className='btnS' onClick={() => { fliker("Food") }}>Food</button>
        <h2>{msg}</h2>
        <div className='images-container'>
          {pics}
        </div>
      </div>





    </div>
  );
}

export default App;
