import { useEffect, useState } from "react";
import image1 from "../logos/giants_logo.png"
function Logos({ lang }) {
  const [image1en, setimage1en] = useState('');
  const [image2en, setimage2en] = useState('');
  const [image1ar, setimage1ar] = useState('');
  const [image2ar, setimage2ar] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://snapus.pythonanywhere.com/footer/patch-photos/');
        const result = await response.json();
        if (result && result.length > 0) {
          setimage1en(result[0].image);
          setimage2en(result[1].image);
          setimage1ar(result[2].image);
          setimage2ar(result[3].image);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error fetching logo:', error);
      }
    };
    console.log(lang)
    fetchData();
  }, [lang]); // Add lang to the dependency array

  // Use a function to force a re-render
  const forceRerender = () => {};

  return (
    <div className="d-flex justify-content-between  logoooo" style={{ height: 150 }} dir={lang !== 'true' && 'rtl'}>
      <div className="col-md-5 col-sm-6 col-7 d-flex justify-content-start align-items-center  h-100" >
        <img className="w-100 h-100 image-mobil" src={lang === 'true' ? image1en : image1ar} alt="Logo 1" />
      </div>
      <div className="col-md-5 col-sm-5 col-4 d-flex justify-content-end align-items-center h-50" style={{width:"auto"}}>
        <img className="image-mobil  rounded-circle" src={lang === 'true' ? image2en : image2ar} alt="Logo 2" style={{width:"90px",height:"90px"}} />
      </div>
    </div>
  );
}

export default Logos;
