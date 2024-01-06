
// import './footer.css';
// import image1 from '../logo.svg'
// import image2 from "../pexels-dids-7867332 - Copy (3).jpg"
// import image3 from "../logos/Picture 2_20231217234005.png"
// import xlogo from "../logos/Elon Musk.jpeg"
// import insta from "../logos/인스 타 그램 로고 아이콘 인스타그램 일러스트, 로고 클립 아트, Instagram 아이콘, 표지 그림 PNG, 일러스트 및 벡터 에 대한 무료 다운로드 - Pngtree.jpeg"
// import tik from "../logos/tiktok.jpeg"
// import tel from "../logos/tel.jpeg"
// import snap from "../logos/download logo snapchat vector svg eps png psd ai.jpeg"
// import dicord from "../logos/Discord Logo _ 02 - PNG Logo Vector Downloads (SVG, EPS).jpeg"
// import twich from "../logos/Download Twitch logo on transparent isolated background_.jpeg"
// import { useEffect, useRef } from 'react';
// import { useState } from 'react';
// function Footer(){
//   const [logo,setlogo]=useState('');
//   const [social,setsocial]=useState([]);
//   const [spons,setspons]=useState([]);
//   const [counter, setCounter] = useState(1);
//   const sliderRef = useRef(null);


//   useEffect(() => {
//     const handleScroll = () => {
//       if (sliderRef.current) {
//         const totalWidth = sliderRef.current.scrollWidth;
//         const itemWidth = sliderRef.current.clientWidth;
//         const maxScrollLeft = totalWidth - itemWidth;

//         if (sliderRef.current.scrollLeft === maxScrollLeft) {
//           // If at the end, reset to the beginning
//           setCounter(1);
//           sliderRef.current.scrollLeft = 0;
//         }
//       }
//     };

//     const interval = setInterval(() => {
//       setCounter((prevCounter) => (prevCounter % 5) + 1); // Assuming there are 5 images
//     }, 3000);

//     // Attach scroll event listener
//     if (sliderRef.current) {
//       sliderRef.current.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       clearInterval(interval);
//       // Remove scroll event listener on component cleanup
//       if (sliderRef.current) {
//         sliderRef.current.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, []);
//   // 
//   useEffect( async() => {
//     const res = await fetch("api");
//     const footerdata = await res.json();
//     setlogo(footerdata.logo)
//     setspons(footerdata.images)
//     setsocial(footerdata.social)
//   },[]);

//   useEffect(() => {
//     const nextPosition = (counter - 1) * sliderRef.current.clientWidth;
//     sliderRef.current.scrollTo({
//       left: nextPosition,
//       behavior: 'smooth',
//     });
//   }, [counter]);
//     return(
//      <>
//   <footer className="nb-footer">
//     <div className="container mb-4">
//       <div className="row">
//         <div className="col-md-4 col-sm-4 ">
//           <div className="footer-info-single">
//             <h2 className="title mb-2">POWERED BY</h2>
//             <div className='col-12 d-flex justify-content-center  rounded'>
//               <img src={logo} className=' w-25 rounded-circle'/>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4 col-sm-4 pt-5">
//           <div className="footer-info-single">
//             <h2 className="title mb-2">SPONSORS</h2>
//             <div className="social-media w-100 d-flex justify-content-center" style={{overflowX:'scroll',height:'100px'}}ref={sliderRef}>
//             <div className='d-flex h-100'  >
//                   <div className='col-12'>
//                     <img src={spons[0]} className='w-50 h-100' />
//                   </div>
//                   <div className='   col-12'>
//                     <img src={spons[1]} className='w-50 h-100' />
//                   </div>
//                   <div className='  col-12'>
//                     <img src={spons[2]} className='w-50 h-100' />
//                   </div>
//                   <div className='   col-12'>
//                     <img src={spons[3]} className='w-50 h-100' />
//                   </div>
//                   <div className='  col-12'>
//                     <img src={spons[4]} className='w-50 h-100' />
//                   </div>
//                   <div className='  col-12'>
//                     <img src={spons[5]} className='w-50 h-100' />
//                   </div>
//             </div>
//           </div>
//           </div>
//         </div>
//         <div className="col-md-4 col-sm-4 pt-5">
//           <div className="footer-info-single">
//             <h2 className="title mb-2">CONTACT US</h2>
//             <div className='col-12'>
//              <ul className='row'>
//                   <a className='col-lg-2 col-md-3 col-sm-4 col-2 mb-1'><img src={social[0]} className='w-100'  style={{borderRadius:"50%",border:'2px solid white'}}/></a>
//                   <a className='col-lg-2 col-md-3 col-sm-4 col-2 mb-1'><img src={social[1]} className='w-100'  style={{borderRadius:"50%"}}/></a>
//                   <a className='col-lg-2 col-md-3 col-sm-4 col-2 mb-1'><img src={social[2]} className='w-100'  style={{borderRadius:"50%"}}/></a>
//                   <a className='col-lg-2 col-md-3 col-sm-4 col-2 mb-1'><img src={social[3]} className='w-100'  style={{borderRadius:"50%"}}/></a>
//                   <a className='col-lg-2 col-md-3 col-sm-4 col-2 mb-1'><img src={social[4]} className='w-100'  style={{borderRadius:"50%"}}/></a>
//                   <a className='col-lg-2 col-md-3 col-sm-4 col-2 mb-1'><img src={social[5]} className='w-100'  style={{borderRadius:"50%"}}/></a>
//                   <a className='col-lg-2 col-md-3 col-sm-4 col-2 mb-1'><img src={social[6]} className='w-100'  style={{borderRadius:"50%"}}/></a>
//              </ul>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <section className="copyright">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//           <a href='#' className='terms'>TREMS&CONDITIONS</a>
//           </div>
//           <div className="col-sm-6" />
//         </div>
//       </div>
//     </section>
//   </footer>
// </>   
//     )
// }
// export default Footer ;




import './footer.css';
import image1 from '../logo.svg'
import image2 from "../pexels-dids-7867332 - Copy (3).jpg"
import image3 from "../logos/Picture 2_20231217234005.png"
import xlogo from "../logos/Elon Musk.jpeg"
import insta from "../logos/insta.jpeg"
import tik from "../logos/tiktok.jpeg"
import tel from "../logos/tel.jpeg"
import snap from "../logos/download logo snapchat vector svg eps png psd ai.jpeg"
import dicord from "../logos/Discord Logo _ 02 - PNG Logo Vector Downloads (SVG, EPS).jpeg"
import twich from "../logos/Download Twitch logo on transparent isolated background_.jpeg"
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Footer() {
  const [logo, setlogo] = useState('');
  const [social, setsocial] = useState([]);
  const [spons, setspons] = useState([]);
  const [counter, setCounter] = useState(1);
  const sliderRef = useRef(null);
  const [link1, setlink1] = useState('')
  const [link2, setlink2] = useState('')
  const [link3, setlink3] = useState('')
  const [link4, setlink4] = useState('')
  const [link5, setlink5] = useState('')
  const [link6, setlink6] = useState('')
  const [link7, setlink7] = useState('')


  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const totalWidth = sliderRef.current.scrollWidth;
        const itemWidth = sliderRef.current.clientWidth;
        const maxScrollLeft = totalWidth - itemWidth;

        if (sliderRef.current.scrollLeft === maxScrollLeft) {
          // If at the end, reset to the beginning
          setCounter(1);
          sliderRef.current.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter % 5) + 1); // Assuming there are 5 images
    }, 3000);

    // Attach scroll event listener
    if (sliderRef.current) {
      sliderRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      clearInterval(interval);
      // Remove scroll event listener on component cleanup
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  useEffect(() => {
    const nextPosition = (counter - 1) * sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({
      left: nextPosition,
      behavior: 'smooth',
    });
  }, [counter]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://snapus.pythonanywhere.com/footer/logo-photos/');
        const result = await response.json();
        if (result && result.length > 0) {
          setlogo(result[0].image);
          console.log(result[0].image);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error fetching logo:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://snapus.pythonanywhere.com/footer/footer-photos/');
        const result = await response.json();
        if (result && result.length > 0) {
          setspons(result)
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error fetching logo:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://snapus.pythonanywhere.com/footer/footer-links/');
        const result = await response.json();
        if (result && result.length > 0) {
          setlink1(result[0])
          setlink2(result[1])
          setlink3(result[2])
          setlink4(result[3])
          setlink5(result[4])
          setlink6(result[5])
          setlink7(result[6])
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error fetching logo:', error);
      }
    };

    fetchData();
  }, []);





  return (
    <>
      <footer className="nb-footer">
        <div className="mx-3 h-100">
          <div className="row">
            <div className="col-md-2 col-sm-3 ">
            <div className="footer-info-single">
                <h2 className="title mb-2 text-center">POWERED BY</h2>
                <div className='col-12 d-flex justify-content-center  '>
                  <img src={logo} className='w-50'  />
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 ">
              <div className="footer-info-single">
                <h2 className="title mb-2 text-center">SPONSORS</h2>
                <div className="social-media w-100 d-flex justify-content-center m-2" style={{ overflowX: 'scroll' }} ref={sliderRef}>
                  <div className='d-flex  justify-content-between'>
                  {spons.map((item, index) => (
                      <div className='col-3  d-flex justify-content-start' key={index}>
                        <div className='col-11 '>
                          <img src={item.image} className='w-100 h-100 border-4 rounded-circle' alt={`Sponsor ${index + 1}`} />
                        </div>
                      </div>
                    ))}

                   
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-3">
              <div className="footer-info-single">
                <h2 className="title mb-2 text-center">CONTACT US</h2>
                <div className='col-12'>
                  <ul className='row ps-1 p-0'>
                    <a className='col-lg-3 col-md-2 col-sm-4 col-2 mb-1'  href={link1.url}><img src={xlogo} className='w-50' style={{ borderRadius: "50%", border: '2px solid white' }} /></a>
                    <a className='col-lg-3 col-md-3 col-sm-4 col-2 mb-1'  href={link3.url}><img src={insta} className='w-50' style={{ borderRadius: "50%" }} /></a>
                    <a className='col-lg-3 col-md-3 col-sm-4 col-2 mb-1'  href={link7.url}><img src={tel} className='w-50' style={{ borderRadius: "50%" }} /></a>
                    <a className='col-lg-3 col-md-3 col-sm-4 col-2 mb-1'  href={link4.url}><img src={tik} className='w-50' style={{ borderRadius: "50%" }} /></a>
                    <a className='col-lg-3 col-md-3 col-sm-4 col-2 mb-1'  href={link5.url}><img src={dicord} className='w-50' style={{ borderRadius: "50%" }} /></a>
                    <a className='col-lg-3 col-md-3 col-sm-4 col-2 mb-1'  href={link2.url}><img src={snap} className='w-50' style={{ borderRadius: "50%" }} /></a>
                    <a className='col-lg-3 col-md-2 col-sm-4 col-2 mb-1'  href={link6.url}><img src={twich} className='w-50' style={{ borderRadius: "50%" }} /></a>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="copyright m-0">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <Link to={'trems/true'} className='terms'>TREMS&CONDITIONS</Link>
              </div>
              <div className="col-sm-6" />
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}
export default Footer;