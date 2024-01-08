import React, { useEffect, useRef, useState, useNavigate, createRef } from "react";
import Modal from "react-modal";
import './Divimage.css';
import LazyLoad from 'react-lazyload';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasolidheart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faheart } from "@fortawesome/free-regular-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faXmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Uploading from "./uploading";
import Loading from "./maintool";
import { fetchData } from "./fetch";
import html2canvas from 'html2canvas';
import Swal from "sweetalert2";
import image1 from "../assest/th (1).jpeg"
import image2 from "../assest/Instagram_logo_2016.svg.png"
import image3 from "../assest/124021.png"
import SSlider from "./slider";
import Logos from './twologos'
import { Button } from "bootstrap";
import ARCSlider from "./arcsilder";
import ARCUploading from "./arcuploading";
import Form from 'react-bootstrap/Form';
import Footer from "./footer";
import ArcFooter from "./arcfooter";
import Select from 'react-select';
import flag1 from "../assest/vector-united-states-of-america-flag-usa-flag-america-flag-background.jpg"
import flag2 from "../assest/wp3534622.jpg"
import domtoimage from 'dom-to-image';
import crvimg from "../logos/top_swoop.svg"




// mosaic-container





function ImageZoom({ addedImagee, setAddedImages }) {

  const [open, setopen] = useState(false);
  const [imagessrc, setimagesrc] = useState('');
  const [data, setdata] = useState([])
  const [likecount, setlikecount] = useState(0)
  const [initialLikeCount, setInitialLikeCount] = useState(0);
  const [like, setlike] = useState(false);
  const [imageid, setimageid] = useState(0);
  const [idid, setidid] = useState(0)
  const [comments, setcomments] = useState([])
  const [publisher, getpublisher] = useState('')
  const [arr, setarr] = useState();
  const [add, setadd] = useState(false);
  const emailRef = useRef();
  const commentRef = useRef();
  const [addcomment, setaddcommet] = useState(false)
  const [email, setemail] = useState([]);
  const [enableZoomPan, setEnableZoomPan] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [putcommentss, setputcommentss] = useState();
  const [ids, setids] = useState([])
  const [Facebook, setfacebook] = useState('https://www.google.com/');
  const [instgram, setinstgram] = useState('https://www.google.com/');
  const [Twitter, settwitter] = useState('https://www.google.com/');
  const [linked, setlinked] = useState('https://www.google.com/');
  const [date, setdate] = useState('')
  const [puttitle, setputtitle] = useState('')
  const [hasMatchingID, setHasMatchingID] = useState(false);
  const [priceapi, setpriceapi] = useState(0);
  const [offerapi, setofferapi] = useState(0);
  const [background, setbackgorund] = useState('')
  const [adminlike, setadminlike] = useState(false)
  const [offer_num, setoffnum] = useState(0);
  const [hold, sethold] = useState(0)
  const [arcwelcome, setarcwelcome] = useState('')
  const [welcome, setwelcome] = useState('')
  const [words, setwords] = useState([]);
  const [lang, setlang] = useState(false);
  const screenshotRef = useRef();

  const downloadImage = async () => {
    const node = screenshotRef.current;
    domtoimage.toJpeg(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'screenshot.jpg';
        link.click();
      })
      .catch((error) => {
        console.error('Error creating screenshot:', error);
      });
  };






  const customStyles = {
    content: {
      width: '50%',
      height: '50%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    }
  };



  function convertToArabicNumbers(englishNumbers) {
    const number = englishNumbers.toString();
    var arabicMap = {
      '0': '٠',
      '1': '١',
      '2': '٢',
      '3': '٣',
      '4': '٤',
      '5': '٥',
      '6': '٦',
      '7': '٧',
      '8': '٨',
      '9': '٩'
    };

    var arabicNumbers = '';
    for (var i = 0; i < number.length; i++) {
      var digit = number[i];
      arabicNumbers += arabicMap[digit] || digit;
    }

    return arabicNumbers;
  }
  // get Comments 
  function getcommentdata() {

    let checkcomment = false
    for (const word of words) {
      if ((commentRef.current.value).includes(word.word)) {
        Swal.fire({
          title: 'BOOKED',
          text: 'your comment contain a +18 word',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        emailRef.current.value = '';
        commentRef.current.value = '';
        checkcomment = true
        return true; // Comment contains forbidden word
      }
    }
    if (checkcomment == false) {
      setemail([...email,
      <>
        <p className="fw-bold p-0 m-0">{emailRef.current.value}</p>
        <p style={{ color: "gray", fontSize: '14px' }} className="p-0 m-0">{commentRef.current.value}</p>
      </>
      ]);

      putcomment({ author: emailRef.current.value, text: commentRef.current.value })
      setputcommentss({ author: emailRef.current.value, text: commentRef.current.value })

      emailRef.current.value = '';
      commentRef.current.value = '';
      setaddcommet(true)
      setadd(false)
    }
  }

  // Make Date formate 
  const convertDateFormat = (isoDate) => {
    const date = new Date(isoDate);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because months are zero-indexed
    const year = date.getFullYear();

    // Padding single digit day/month with a leading zero if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  // Function Handle increase Num Like 
  const increaselikes = () => {
    // Calculate updated like count
    console.log('increaselikes', idid);
    var url = `https://snapus.pythonanywhere.com/api/like/create/${idid}/`;

    fetch(url, {
      method: 'PUT', // Use 'PUT' to match the Python code's HTTP method
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response.status);
          return response.json();

        } else {
          throw new Error("Failed to increase likes");
        }
      })
      .then(data => {
        const numLikes = data.num_likes;


      })
      .catch(error => {
        console.error(error.message);
      });
  };

  // Function Handle Decrease Num Like 
  const decreaselikes = () => {
    // Calculate updated like count

    var url = `https://snapus.pythonanywhere.com/api/dislike/create/${idid}/`;

    fetch(url, {
      method: 'PUT', // Use 'PUT' to match the Python code's HTTP method
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to decrease likes");
        }
      })
      .then(data => {
        const numLikes = data.num_likes;


      })
      .catch(error => {
        console.error(error.message);
      });
  };


  // Function To handle Add comment 
  const putcomment = async (comm) => {

    try {
      const response = await fetch(`https://snapus.pythonanywhere.com/api/comments/create/${idid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comm),
      });

      if (response.status === 201) {
        console.log('Comment successfully posted.');
        // Handle successful comment post
      } else {
        console.log('Failed to post the comment.');
        // Handle failed comment post
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };



  useEffect(() => {
    let jj = 0
    fetchData()
      .then((images) => {
        const dd = images;
        setdata(dd);
        setEnableZoomPan(true);
        setimageid(localStorage.getItem("addedImage"));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });


  }, [initialLikeCount, putcommentss]);

  useEffect(() => {
    let jj = 0
    const fetchinfo = async () => {
      try {
        const response = await fetch('https://snapus.pythonanywhere.com/api/info/4/');
        const result = await response.json();

        // Assuming the response is in JSON format
        setpriceapi(result.price)
        setofferapi(result.offer)
        console.log(result.offer);
        console.log(result.offernum);
        setbackgorund(result.bg)
        setoffnum(result.offernum)
        sethold(result.holdspot)
        setwelcome(result.welmsg)
        setwords(result.bad_words)
        setarcwelcome(result.welmsgar)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchinfo();
  }, []);


console.log("data",data)
  const getproduct = data.map((product, index) => {

    const productID = product.id;
    const matchingID = (localStorage.getItem('newElementID') || imageid) === productID.toString();
    const borderStyle = matchingID ? '1px solid rgb(12, 182, 233)' : '1px solid transparent';

    return (
      <div
        className="tile p-0 m-0 card-image-contaiber"
        key={product.id}
        disableMapInteraction
        id={product.id}
        style={{
          backgroundImage: `url(${product.image})`,
          opacity: "0.2 !important",
          border: borderStyle,
          width:"10px",
          height:"10px",
          margin:"1px !important",
          opacity:"!important"
        }}
        onClick={() => {
          setimageid(product.id);
          setidid(product.id);
          setcomments(product.comments);
          setimagesrc(product.image);
          setlikecount(product.num_likes);
          setInitialLikeCount(product.num_likes);
          setopen(true);
          getpublisher(product.author);
          setEnableZoomPan(false); // now
          setdate(product.created_at);
          setfacebook(product.fk);
          setinstgram(product.inst);
          settwitter(product.tw);
          setlinked(product.ln);
          setputtitle(product.title)
          ids.includes(product.id) ? setlike(true) : setlike(false);
          setadminlike(product.isAdminLiked);
        }}
      ></div>

    );
  });

  // The `useEffect` hook to remove `newElementID` after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.removeItem('newElementID');
      setHasMatchingID(false);
    }, 5000);

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []);

  // Update the border style based on the hasMatchingID state
  useEffect(() => {
    const updatedBorderStyle = hasMatchingID ? '1px solid rgb(12, 182, 233)' : '1px solid transparent';
    // Loop through the DOM elements and update their border style
    const divElements = document.querySelectorAll('.tile');
    divElements.forEach((element) => {
      element.style.border = updatedBorderStyle;
    });
  }, [hasMatchingID, imageid]);

  // The `useEffect` hook to remove `newElementID` after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('newElementID');
      setHasMatchingID(false);
    }, 5000);
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const readers = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (fileReaderEvent) => {
        const fileData = fileReaderEvent.target.result;
        // Use the fileData here, e.g., upload it to a server or display it in the UI
      };

      reader.readAsDataURL(files[i]);
      readers.push(reader);
      setarr(Object.values(files))
    }
  }


  const searchResults = data.filter((item) =>
    item.author &&
    typeof item.author === 'string' &&
    item.author.toLowerCase().startsWith(searchQuery.toLowerCase())
  );


  const gotofacebook = () => {
    window.location.href = `${Facebook}`;
  };
  const gotoinstgram = () => {
    window.location.href = `${instgram}`;
  };
  const gotoTwitter = () => {
    window.location.href = `${Twitter}`;
  };
  const gotolinked = () => {
    window.location.href = `${linked}`;
  };


  const closeMOdal = () => {

    setopen(false);
    setimageid(0);
    setidid(0)
    // setEnableZoomPan(true)
    setcomments([])
    setemail([])
    setputcommentss([])
    setlike(false)
    setInitialLikeCount(likecount)
    setfacebook()
    setinstgram()
    settwitter()
    setlinked()
    setadminlike(false)
  }



  function screenshot() {
    const divToDownload = document.getElementById('slides'); // Replace with the actual ID of your div

    if (!divToDownload) {
      console.error("Div not found");
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = divToDownload.offsetWidth;
    canvas.height = divToDownload.offsetHeight;

    const context = canvas.getContext('2d');

    html2canvas(divToDownload, { useCORS: true }).then((canvasElement) => {
      context.drawImage(canvasElement, 0, 0);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'div_screenshot.png';
      link.click();
    });

  }






  const customsStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 0 1px #007bff' : null,
      backgroundColor: '#222',
      color:'#f29122f1 !important',
      '&:hover': {
        border: '1px solid #007bff',
      },
    }),
    indicatorsContainer: () => ({ display: 'none' }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#222' : "#222",
      color: state.isSelected ? '#f29122f1' : 'black',
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "12px", // Adjust top margin
      marginBottom: 0, // Adjust bottom margin
    }),
    menuList: (provided) => ({
      ...provided,
      paddingTop: 0, // Adjust top padding
      paddingBottom: 0, // Adjust bottom padding
    }),
  };



  const options = [
    { value: 'true', label: <><img src={flag1} alt="English Flag" className="w-50 h-50" /><span className="w-50 h-100">EN</span></> },
    { value: 'false', label: <><img src={flag2} alt="Arabic Flag" className="w-50 h-50" /><span className="w-50 h-100">AR</span></> },
  ];
  const defaultOption = options[1];
  const [langoptions, setlangoptions] = useState(defaultOption)

  const handleLangChange = (selectedOption) => {
    setlangoptions(selectedOption)
    setlang(selectedOption.value);
  };
  return (
    <>

      <div id="tooldiv" >
        <img src={crvimg} className="crvimg" />
        <div>
          <div className="col-lg-12 text-center text-dark">
            <div className={`${lang == 'true' ? ''  : "flex-row-reverse"} d-flex justify-content-between  mb-2 `}>

              <div>
                <Select
                  className="lang_select"
                  options={options}
                  value={langoptions}
                  onChange={handleLangChange}
                  isSearchable={false}
                  styles={customsStyles}
                />
              </div>

              <div className="text-tool mt-2">
                <p style={{
                  marginTop: 0,
                  marginBottom: '1rem',
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: lang == 'true' ? '4px' : '0px'
                }}
                  dir={lang != 'true' && 'rtl'}
                >{lang == 'true' ? welcome : arcwelcome}</p>
              </div>

              <div></div>

            </div>

            <div className="main" id="panelID">
              <Logos lang={lang} />

              {lang == 'true' ?
                <div className="searchdiv mb-3  mt-2 d-flex justify-content-start" style={{ display: "flex !important" }} >
                  {/* input for search */}
                  <div className="form-floating mb-3  me-3 w-90 search_ff moible-search">
                    <input type="text" className="form-control" value={searchQuery} onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setEnableZoomPan(false) //now
                    }} />
                    <label for="floatingInput" style={{ zIndex: 0 }}>search</label>
                  </div>

                  {searchQuery &&
                    <ul className="sr-output shadow">
                      {searchResults.map((result, index) => (
                        <>
                          <li key={index} style={{ display: "flex" }} onClick={() => {
                            
                            console.log("result", result)
                            setimagesrc(result.image);
                            setlikecount(result.num_likes);
                            // setopen(true);
                            setimageid(result.id);
                            setidid(result.id);
                            setcomments(result.comments)
                            setSearchQuery('')
                            setEnableZoomPan(true)
                            setdate(result.created_at)
                            { ids.includes(result.id) ? setlike(true) : setlike(false) }
                            setfacebook(result.fk)
                            setinstgram(result.inst)
                            settwitter(result.tw)
                            setlinked(result.ln)
                            setputtitle(result.title)
                          }
                          }>
                            <img src={result.image} style={{ width: '50px', margin: '2px', height: '50px', margin: 'auto' }} />
                            <p style={{ width: "60%", height: "100%", textAlign: "center", display: 'inline-grid', alignItems: 'center' }}> {result.author}</p>
                          </li>
                          {searchResults.length - 1 == index ? null : <hr style={{ margin: 4 }} />}
                        </>
                      ))}
                    </ul>
                  }
                  <Uploading length={[...getproduct].length} holdspot={hold} addedImagee={addedImagee} price={priceapi} offer_number={offer_num} offer={offerapi} setAddedImages={setAddedImages} data={data} ImageID={imageid} setImageID={setimageid} />

                  <button
                    className="btn btn-primary upload-btn ms-2 d-flex align-items-center justify-content-center DOWNLOAD_BTN"
                    style={{ letterSpacing: lang == 'true' == false && 0 }}
                    onClick={downloadImage}
                  >
                    Get Board
                  </button>
                  
                </div>

                :

                <div className="searchdiv mb-3  mt-2 d-flex justify-content-end" style={{ display: "flex !important" }} >
                  <button
                    className="btn btn-primary upload-btn ms-2 d-flex align-items-center justify-content-center DOWNLOAD_BTN"
                    style={{ letterSpacing: 0 }}
                    onClick={downloadImage}
                  >
                    تنزيل
                  </button>

                  <ARCUploading length={[...getproduct].length} holdspot={hold} addedImagee={addedImagee} price={priceapi} offer_number={offer_num} offer={offerapi} setAddedImages={setAddedImages} data={data} ImageID={imageid} setImageID={setimageid} />


                  {/* input for search */}
                  <div className="form-floating mb-3  me-3 w-90 search_ff">
                    <input type="text" className="form-control" value={searchQuery} onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setEnableZoomPan(false) //now
                    }} dir="rtl" />
                    <label for="floatingInput" style={{ zIndex: 0 }}>{lang == 'true' ? "search" : "البحث"}</label>
                  </div>
                  {searchQuery &&
                    <ul className="arsr-output shadow">
                      {searchResults.map((result, index) => (
                        <>
                          <li key={index} style={{ display: "flex" }} onClick={() => {
                            
                            console.log("result", result)
                            setimagesrc(result.image);
                            setlikecount(result.num_likes);
                            // setopen(true);
                            setimageid(result.id);
                            setidid(result.id);
                            setcomments(result.comments)
                            setSearchQuery('')
                            setEnableZoomPan(true)
                            setdate(result.created_at)
                            { ids.includes(result.id) ? setlike(true) : setlike(false) }
                            setfacebook(result.fk)
                            setinstgram(result.inst)
                            settwitter(result.tw)
                            setlinked(result.ln)
                            setputtitle(result.title)
                          }
                          }>
                            <img src={result.image} style={{ width: '50px', margin: '2px', height: '50px', margin: 'auto' }} />
                            <p style={{ width: "60%", height: "100%", textAlign: "center", display: 'inline-grid', alignItems: 'center' }}> {result.author}</p>
                          </li>
                          {searchResults.length - 1 == index ? null : <hr style={{ margin: 4 }} />}
                        </>
                      ))}
                    </ul>

                  }
                </div>
              }


              <div className="container-panel">
                <Loading reff={screenshotRef} data={getproduct} bg={background} len={[...getproduct].length} ImageID={imageid} setImageID={setimageid} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {lang == 'true' ? <SSlider setImageID={setimageid} /> : <ARCSlider setImageID={setimageid} />}

      {lang == 'true' ? <Footer /> : <ArcFooter />}

      <Modal isOpen={open} ariaHideApp={false} onRequestClose={closeMOdal} style={customStyles}>
        <div className="Modal p-2" style={{ overflowY: 'scroll' }}>
          <div className="close">
            <p className="p-2 m-0 publisher text-end" dir={lang != 'true' ? 'rtl' : 'ltr'}>{lang == 'true' ? 'Published By' : "تم النشر بواسطة"} : {publisher}</p>

            <FontAwesomeIcon className="p-2 m-0 " icon={faXmark} onClick={() => {
              setopen(false);
              setimageid(0);
              setidid(0)
              setEnableZoomPan(true)
              setcomments([])
              setemail([])
              setputcommentss([])
              setlike(false)
              setInitialLikeCount(likecount)
              setfacebook('#')
              setinstgram('#')
              settwitter("#")
              setlinked("#")
              setadminlike(false)
                ;
            }} />

          </div>

          <div className="row row_img">
            <div className="col-sm-6 col-xs-12 image_model">
              <div>
                <div style={{ width: '100%' }}>
                  <div className="image-mobile" style={{ position: 'relative', height: '80%',width:"70%"}}>
                    <img src={imagessrc} style={{ width: "100%", margin: "auto" }} />
                    {adminlike || comments.some(comment => comment.author === "Adminsecret") ? <FontAwesomeIcon icon={faStar} style={{ color: "#2dc7e6" }} className="star" /> : null}
                  </div>

                </div>

              </div>
              <div className="d-flex justify-content-between" style={{ height: '10%' }}>
                {lang != 'true' && <p className="date">التاريخ : {convertToArabicNumbers(convertDateFormat(date))} </p>}

                <p className="likes" dir="rtl">
                  {lang == 'true' ? "Likes" : "الاعجابات"}: {
                    like ? (
                      <FontAwesomeIcon
                        icon={fasolidheart}
                        onClick={() => {
                          setlike(false)
                          decreaselikes()
                          setlikecount(likecount - 1)
                          setids(ids.filter(item => item !== idid))
                          console.log(imageid);
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faheart}
                        onClick={() => {
                          setlike(true)
                          increaselikes()
                          setlikecount(likecount + 1)
                          setids([...ids, idid])
                        }}
                      />
                    )
                  }
                  <span className="ps-1">{lang == 'true' ? likecount : convertToArabicNumbers(likecount)}</span>
                </p>
                {lang == 'true' && <p className="date">Date : {convertDateFormat(date)}</p>}
              </div>
            </div>


            <div className="col-sm-6 col-xs-12">
              <div >
                <div className="justify-content-between comments_div" style={{ display: 'flex' }}>

                  <p><FontAwesomeIcon icon={faCommentDots} className="fs-5" flip="horizontal" /> {lang == 'true' ? 'Comments' : 'التعليقات'}</p>
                  <p onClick={() => setadd(true)}>
                    {lang == 'true' ? <><FontAwesomeIcon icon={faPlus} />Add commment</> : <>اضافة تعليق <FontAwesomeIcon icon={faPlus} /></>}
                  </p>
                  {add &&

                    <div className="comment_div">
                      <div className="card mb-3 " style={{ width: "18rem", opacity: '0.9' }}>
                        <div className="w-100 d-flex justify-content-end px-2 pt-1"><FontAwesomeIcon icon={faXmark} onClick={() => { setadd(false); setaddcommet(false) }

                        } /></div>
                        <div className="card-body addcommment">
                          <input type="email" required className="form-control mb-2" id="floatingInput" placeholder="Email" ref={emailRef} />
                          <input type="text" className="form-control mb-2" id="floatingInput" placeholder="comment" ref={commentRef} />
                          <button href="#" className="btn btn-primary addbtn-tool" onClick={getcommentdata} >
                            ADD
                          </button>
                        </div>
                      </div>
                    </div>}
                </div>
                <p className="Description" dir={lang != 'true' ? 'rtl' : 'ltr'}>{lang == 'true' ? 'Description' : 'الوصف'}: <span style={{ color: "gray" }}>{puttitle}</span></p>
                <div className="commentlist" dir={lang != 'true' ? 'rtl' : 'ltr'}>
                  {comments.length > 0 ? comments.map((comment) => {
                    return (
                      <>
                        <p className="fw-bold p-0 m-0">
                          {comment.author === 'Adminsecret' ? "Admin" : comment.author}{comment.author === 'Adminsecret' && <FontAwesomeIcon icon={faStar} style={{ color: "#7ddbf2" }} />}
                        </p>
                        <p style={{ color: "gray", fontSize: '14px' }} className="p-0 m-0 mb-2">{comment.text}</p>
                      </>
                    )
                  })
                  : 
                  <p>{lang != 'true' ? 'لا يوجد تعليقات' : 'No Comment'}</p>
                  
                  }
                  {email.length > 0 ? email.map((ele) => {
                    return <p>{ele}</p>
                  }) : null}
                </div>

              </div>
              <div className="social_limk d-flex justify-content-end">
                <div>
                  <img src={image1} className="rounded-circle mx-1" onClick={gotofacebook} />
                  <img src={image2} className="rounded-circle mx-1" onClick={gotoinstgram} />
                  <img src={image3} className="rounded-circle mx-1" onClick={gotoTwitter} />

                </div>
              </div>
            </div>

          </div>
        </div>
      </Modal>

    </>
  );
};

export default ImageZoom;