import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ImageZoom from './component/tool';
import { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';

import Trems from './component/trems';
import styled from 'styled-components';

const StyledApp = styled.div`
  position: relative;
  min-height: 100vh;
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
`;

function App() {
  const [addedImagee, setAddedImages] = useState(false);
  const [bg,setbg]=useState('')
  useEffect(() => {
    let jj = 0
    const fetchinfo = async () => {
      try {
        const response = await fetch('https://snapus.pythonanywhere.com/api/info/4/');
        const result = await response.json();
        setbg(result.webbg)
        // Assuming the response is in JSON format
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchinfo();
  }, []);
  return (
<StyledApp bg={bg}>     
 <Router>
      <Routes>
        <Route path="/" element={<ImageZoom addedImagee={addedImagee} setAddedImages={setAddedImages}  />} />
        <Route path="/trems/:lan" element={<Trems />} />
      </Routes>
    </Router>
</StyledApp>

  );
}

export default App;
