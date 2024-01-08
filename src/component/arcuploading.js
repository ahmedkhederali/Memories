import { useEffect, useState } from "react";
import "./arcupload.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { faTiktok, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useRef } from "react";
import Gallery from "./Gallary";
import Swal from "sweetalert2";
import axios from "axios";
import sendEmail from "./email_mess";
import ARCPhotoEditor from "./arceditor";
import ARCCredit from "./ardcredit";
import { OverlayTrigger, Popover } from 'react-bootstrap';

// make a custome stayle 
const customStyles = {
  content: {
    width: "50%",
    height: "60%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#222222e8",
    borderRadius: "15px",
  },
};

function ARCUploading({ data, setImageID, addedImagee, setAddedImages, price, offer, offer_number, length, holdspot }) {

  const extractNumbersAfterPercent = (offer) => {
    // Define the regular expression pattern to match the '%' symbol followed by two or three numbers
    const pattern = /(\d{2,3})%/g;

    // Use regex.exec to find matches in the string
    let matches = [];
    let match;
    while ((match = pattern.exec(offer)) !== null) {
      matches.push(match[1])
    }

    // Combine the matched numbers into a single number
    const combinedNumber = parseInt(matches.join(''), 10);

    return combinedNumber
  };


  const [instagramPopoverVisible, setInstagramPopoverVisible] = useState(false);
  const [twitterPopoverVisible, setTwitterPopoverVisible] = useState(false);
  const [tiktokPopoverVisible, settiktokPopoverVisible] = useState(false);
  const handleInstagramClick = () => {
    setInstagramPopoverVisible(!instagramPopoverVisible);
    setTwitterPopoverVisible(false); // Close the Twitter popover
    settiktokPopoverVisible(false); // Close the Facebook popover
  };

  const handleTwitterClick = () => {
    setTwitterPopoverVisible(!twitterPopoverVisible);
    setInstagramPopoverVisible(false); // Close the Instagram popover
    settiktokPopoverVisible(false); // Close the Facebook popover
  };

  const handletiktokClick = () => {
    settiktokPopoverVisible(!tiktokPopoverVisible);
    setInstagramPopoverVisible(false); // Close the Instagram popover
    setTwitterPopoverVisible(false); // Close the Twitter popover
  };



  const [open, setopen] = useState(false);
  const [moving, setmoving] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [numimage, setnumimage] = useState(0);
  const fileInputRef = useRef(null);
  const [imgg, setimg] = useState();
  const [dataimage, setdataimage] = useState([]);
  const [email, setemail] = useState();
  const [title, settitle] = useState([]);
  const [upinfo, setupinfo] = useState({});
  const [Facebook, setfacebook] = useState();
  const [instgram, setinstgram] = useState();
  const [twitter, settwitter] = useState();
  const [linked, setlinked] = useState();
  const [convert, setconvert] = useState([]);
  const inputRef = useRef();
  const [vsprice, setvsprice] = useState(0);
  const [offervalue, setoffervalue] = useState(0)
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const popoverInstagram = (
    <Popover id="popover-instagram">
      <Popover.Header as="h3">الانستجرام</Popover.Header>
      <Popover.Body><input type="text" dir="rtl" value={instgram} onChange={(e) => setinstgram(e.target.value)} className="rounded" /></Popover.Body>
    </Popover>
  );

  const popoverTwitter = (
    <Popover id="popover-twitter">
      <Popover.Header as="h3">منصة اكس</Popover.Header>
      <Popover.Body><input type="text" value={twitter} dir="rtl" onChange={(e) => settwitter(e.target.value)} className="rounded" /></Popover.Body>
    </Popover>
  );

  const popovertiktok = (
    <Popover id="popover-tiktok">
      <Popover.Header as="h3">التيك توك</Popover.Header>
      <Popover.Body><input type="text" dir="rtl" value={Facebook} onChange={(e) => setfacebook(e.target.value)} className="rounded" /></Popover.Body>
    </Popover>
  );

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const handleMouseOver = (event) => {
      event.target.style.border = "0.1px solid red";
    };

    const handleMouseOut = (event) => {
      event.target.style.border = "none";
    };

    const handleClick = () => {
      Swal.fire({
        title: 'BOOKED',
        text: 'This spot is booked for Admin',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    };

    if ((+holdspot) + (+length) === 4000) {
      const divElements = document.getElementsByClassName("div-item");

      for (let i = 0; i < divElements.length; i++) {
        const divElement = divElements[i];
        divElement.addEventListener('mouseover', handleMouseOver);
        divElement.addEventListener('mouseout', handleMouseOut);
        divElement.addEventListener('click', handleClick);
      }

      return () => {
        // Cleanup: Remove event listeners when the component is unmounted
        for (let i = 0; i < divElements.length; i++) {
          const divElement = divElements[i];
          divElement.removeEventListener('mouseover', handleMouseOver);
          divElement.removeEventListener('mouseout', handleMouseOut);
          divElement.removeEventListener('click', handleClick);
        }
      };
    }
  }, [holdspot, length]);






  const handleImageEdited = (editedImage) => {
    let indexToRemove = -1;

    for (let i = 0; i < dataimage.length; i++) {
      if (dataimage[i]["name"] === editedImage.name) {
        indexToRemove = i;
        break;
      }
    }

    if (indexToRemove !== -1) {
      dataimage.splice(indexToRemove, 1);
    }

    function dataURLtoFile(dataURL, filename, title) {
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      // Creating a blob and appending the 'title' value
      const blob = new Blob([u8arr], { type: mime });
      const file = new File([blob], filename, { type: mime });
      file.title = title ? title : "none"; // Set the 'title' value for the file

      return file;
    }

    const dataURL = editedImage.croppedImage;
    const filename = editedImage.name;
    const title = editedImage.title; // Access the 'title' from the edited image

    const file = dataURLtoFile(dataURL, filename, title);
    setdataimage([...dataimage, file]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger file input click
  };

  const handleInputChange = (event) => {
    setnumimage(event.target.value);
  };

  const handleFileChange = (event) => {

    const files = event.target.files;
    console.log(files);
    const limit = parseInt(numimage); // Parse the number of images from the input field

    if (!files.length) {
      alert(`Please select ${limit} files.`);
      event.target.value = null; // Reset the input value to clear the selected files
      return;
    }
    if (!files.length || (files.length > 1 && files.length < limit)) {
      alert(`Please select ${limit} files.`);
      event.target.value = null; // Reset the input value to clear the selected files
      return;
    }

    const selectedImages = [];

    for (let i = 0; i < limit; i++) {
      // Repeat the selected image if only one image is provided
      const file = files.length === 1 ? files[0] : files[i];
      selectedImages.push(file);
    }

    setSelectedImages(selectedImages);
  };
  const handlenext_1 = async () => {

    if (selectedImages.length > 0 && email) {
      if (selectedImages.every((element) => element instanceof File)) {
        setmoving(2);
        setimg(...selectedImages);
        setdataimage([...selectedImages]);
      } else {
        const imagesToConvert = [];
        const titles = [];

        selectedImages.forEach((ele) => {
          console.log(ele.image); // Assuming 'ele' has 'image' property
          imagesToConvert.push(ele.image); // Store images to convert
          titles.push(ele.title); // Store titles
        });

        setconvert([...convert, ...imagesToConvert]); // Update convert state
        settitle([...title, ...titles]); // Update title state

        setmoving(3);
      }
    } else {
      Swal.fire({
        title: 'تاكد مرة اخرة',
        text: 'تاكد من انك اخترت  الصور وكتبت اسم المستخدم',
        icon: 'warning',
        confirmButtonText: 'تاكيد',
      });
      if (selectedImages.length > 0) {
        setimg(selectedImages[0]);
      }
    }

    console.log(selectedImages);
  };
  const handlenext_for_galary_1 = async (data) => {

    const limit = parseInt(numimage); // Parse the number of images from the input field

    if (!data.length) {
      alert(`Please select ${limit} files.`);

      return;
    }
    if (parseInt(data.length) > limit) {
      alert(`Please select ${limit} files.`);
      return;
    }
    if (!data.length || (parseInt(data.length) > 1 && parseInt(data.length) < limit)) {
      alert(`Please select ${limit} files.`);
      // event.target.value = null; // Reset the input value to clear the selected files
      return;
    }
    const newArray = []
    for (let i = 0; i < limit; i++) {
      // Repeat the selected image if only one image is provided
      const file = data.length === 1 ? data[0] : data[i];
      newArray.push(file);
    }



    if (newArray.length > 0 && email) {
      if (newArray.every((element) => element instanceof File)) {
        setmoving(2);
        setimg(...newArray);
        setdataimage([...newArray]);
        setSelectedImages([...newArray])
      } else {
        const imagesToConvert = [];
        const titles = [];

        selectedImages.forEach((ele) => {
          console.log(ele.image); // Assuming 'ele' has 'image' property
          imagesToConvert.push(ele.image); // Store images to convert
          titles.push(ele.title); // Store titles
        });

        setconvert([...convert, ...imagesToConvert]); // Update convert state
        settitle([...title, ...titles]); // Update title state

        setmoving(3);
      }
    } else {
      alert("You must add an image, author, and title.");
      if (selectedImages.length > 0) {
        setimg(selectedImages[0]);
      }
    }

    console.log(selectedImages);
  };
  const handlGallary = () => {
    setmoving(4);
    setSelectedImages(selectedImages);
  };

  const handlenext_2 = () => {
    setmoving(3);
    console.log(dataimage);
    console.log(Facebook, twitter, instgram);
  };

  let config = {
    method: 'post',
    url: 'https://api.moyasar.com/v1/payments',
    auth: {
      username: "pk_test_yryRqRU357FARfkKFQWMXruR9GDAe1g8Mz3yiBto",
      password: "sk_test_BEDnMLLViZNyXG3weKoRwCkwrg4bNuxTFkYBrgpi"
    },
    data: {
      "amount": +vsprice,
      "currency": "SAR",
      "description": "Payment for order #",
      "callback_url": "http://localhost:3001/",
      "source": {
        "type": "creditcard",
        "name": cardData.name,
        "number": cardData.number,
        "cvc": cardData.cvc,
        "month": Number(cardData.expiry.split("-")[1]),
        "year": Number(cardData.expiry.split("-")[0])
      }
    }

  };
  // function to handle Submit when select image from local device
  const handelenext_3 = async (event) => {
    
    event.preventDefault();
    let pornimage = 0;
    if (length + dataimage.length <= 1000000 - holdspot) {
      try {
        const uploadPromises = dataimage.map(async (element) => {
          const formData = new FormData();
          formData.append("image", element);
          formData.append("author", email);
          formData.append("title", element.title);
          formData.append("fk", Facebook ? Facebook : "#");
          formData.append("inst", instgram ? instgram : "#");
          formData.append("tw", twitter ? twitter : "#");
          formData.append("ln", linked ? linked : "#");

          const formDataimage = new FormData();
          formDataimage.append('image', element);

          try {
            const response = await fetch('https://snapus.pythonanywhere.com/api/detect-nudity/', {
              method: 'POST',
              body: formDataimage,
            });

            if (response.ok) {
              const responseData = await response.json();
              console.log(responseData);
              if (responseData.result === false) {
                // Handle the success scenario after posting the image to picpurify
                console.log("PicPurify API call successful:", responseData);
                try {
                  const postResponse = await fetch(
                    "https://snapus.pythonanywhere.com/api/images/",
                    {
                      method: "POST",
                      body: formData,
                    }
                  );

                  if (postResponse.ok) {
                    const postResponseData = await postResponse.json();
                    setImageID(null);
                    localStorage.setItem("addedImage", postResponseData.id);
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Failed to post the image.");
                  }
                } catch (error) {
                  console.error("An error occurred:", error);
                  return Promise.reject(error);
                }

              } else {
                pornimage++
              }
            }

          } catch (error) {
            console.error("An error occurred during the PicPurify API call:", error);
            throw error;
          }
          setvsprice((dataimage.length - pornimage) * price)
        });
        console.log(((dataimage.length - pornimage) * price) - (dataimage.length - pornimage >= offer_number && ((dataimage.length - pornimage) * price) * extractNumbersAfterPercent(offer) / 100));
        await Promise.all(uploadPromises);
        // Make the axios request after posting all images
        const axiosResponse = await axios.request({
          method: 'post',
          url: 'https://api.moyasar.com/v1/payments',
          auth: {
            username: "pk_test_yryRqRU357FARfkKFQWMXruR9GDAe1g8Mz3yiBto",
            password: "sk_test_BEDnMLLViZNyXG3weKoRwCkwrg4bNuxTFkYBrgpi"
          },
          data: {
            "amount": ((dataimage.length - pornimage) * price) - (dataimage.length - pornimage >= offer_number && ((dataimage.length - pornimage) * price) * extractNumbersAfterPercent(offer) / 100),
            "currency": "SAR",
            "description": "Payment for order #",
            "callback_url": "http://localhost:3001/",
            "source": {
              "type": "creditcard",
              "name": cardData.name,
              "number": cardData.number,
              "cvc": cardData.cvc,
              "month": Number(cardData.expiry.split("-")[1]),
              "year": Number(cardData.expiry.split("-")[0])
            }
          }
        });
        console.log(axiosResponse);

        if (axiosResponse.status === 201) {
          // Handle the axios response after posting all images
          setopen(false);

          // Refresh the page after all images are uploaded
          if (pornimage == 0) {
            Swal.fire({
              title: "يتم الرفع",
              text: `تم رفع الصور الخاصة بك ,نشكرك لانك استخدمت موقعنا `,
              icon: "success",
              confirmButtonText: "تاكيد",
              preConfirm: async () => {
                // Your logic before calling the API
                setmoving(1);
                setSelectedImages([]);
                setnumimage(0);
                setimg(null);
                setdataimage([]);
                setemail("");
                settitle("");
                setfacebook("");
                setinstgram("");
                setCardData({
                  number: '',
                  name: '',
                  expiry: '',
                  cvc: '',
                });
                setAddedImages(!addedImagee);

                // Call the sendEmail function here
                try {
                  const response = await sendEmail(((dataimage.length - pornimage) * price) - (dataimage.length - pornimage >= offer_number && ((dataimage.length - pornimage) * price) * extractNumbersAfterPercent(offer) / 100));
                  console.log('Response Content:', response);
                  // Handle the response as needed
                } catch (error) {
                  // Handle errors
                  console.error('Error in sendEmail:', error);
                  throw error;
                }
              },
            })
          } else {
            Swal.fire({
              title: "يتم رفع",
              text: `لم يتم رفعها لانها صور +18 ${pornimage} لكن ,${dataimage.length - pornimage} يتم رفع`,
              icon: "success",
              confirmButtonText: "تاكيد",
              preConfirm: async () => {
                // Your logic before calling the API
                setmoving(1);
                setSelectedImages([]);
                setnumimage(0);
                setimg(null);
                setdataimage([]);
                setemail("");
                settitle("");
                setfacebook("");
                setinstgram("");
                setCardData({
                  number: '',
                  name: '',
                  expiry: '',
                  cvc: '',
                });
                setAddedImages(!addedImagee);

                // Call the sendEmail function here
                try {
                  const response = await sendEmail(((dataimage.length - pornimage) * price) - (dataimage.length - pornimage >= offer_number && ((dataimage.length - pornimage) * price) * extractNumbersAfterPercent(offer) / 100));
                  console.log('Response Content:', response);
                  // Handle the response as needed
                } catch (error) {
                  // Handle errors
                  console.error('Error in sendEmail:', error);
                  throw error;
                }
              },
            })
          }
        } else {
          Swal.fire({
            title: 'تحقق مرة اخري',
            text: 'تحقق من معلومات البطاقة البنكية',
            icon: 'warning',
            confirmButtonText: 'تاكيد',
          });
        }
      } catch (error) {

        Swal.fire({
          title: 'تحقق مرة اخري',
          text: 'تحقق من معلومات البطاقة البنكية',
          icon: 'warning',
          confirmButtonText: 'تاكيد',
        });

      }
    } else {
      Swal.fire({
        title: "لم يتم الرفع",
        text: "ناسف لعدم مقدرتك علي رفع الصور لان باقي الاماكن تم حجزها للادمن",
        icon: "error",
        confirmButtonText: "تاكيد",
        preConfirm: () => {
          return new Promise((resolve) => {
            setmoving(1);
            setSelectedImages([]);
            setnumimage(0);
            setimg(null);
            setdataimage([]);
            setemail("");
            settitle("");
            setfacebook("");
            setinstgram("");
            setCardData({
              number: '',
              name: '',
              expiry: '',
              cvc: '',
            });
            setAddedImages(!addedImagee);
            resolve(); // Resolve the promise after reloading
          });
        },
      });
    }
  };


  // function to handle Submit when select image from local device
  const handeleGallarySubmit = async (data) => {
    
    await handlenext_for_galary_1(data)
    // const limit = parseInt(numimage); // Parse the number of images from the input field

    //   if (!data.length) {
    //     alert(`Please select ${limit} files.`);

    //     return;
    //   }
    //   if (parseInt(data.length) > limit ) {
    //     alert(`Please select ${limit} files.`);
    //     return;
    //   }
    //   if (!data.length || (parseInt(data.length) > 1 && parseInt(data.length)<limit) ) {
    //     alert(`Please select ${limit} files.`);
    //     // event.target.value = null; // Reset the input value to clear the selected files
    //     return;
    //   }
    //   const newArray=[]
    //   for (let i = 0; i < limit; i++) {
    //     // Repeat the selected image if only one image is provided
    //     const file = data.length === 1 ? data[0] : data[i];
    //     newArray.push(file);
    //   }

    // try {
    //   const uploadPromises = newArray.map(async (element) => {
    //     const formData = new FormData();
    //     formData.append("image", element);
    //     formData.append("author", email);
    //     formData.append("title", element.title);
    //     formData.append("fk", Facebook ? Facebook : "#");
    //     formData.append("inst", instgram ? instgram : "#");
    //     formData.append("tw", twitter ? twitter : "#");
    //     formData.append("ln", linked ? linked : "#");

    //     try {
    //       const response = await fetch(
    //         "https://datamanager686.pythonanywhere.com/api/images/",
    //         {
    //           method: "POST",
    //           body: formData,
    //         }
    //       );

    //       if (response.ok) {
    //         const responseData = await response.json();
    //         localStorage.setItem("newElementID", responseData.id);
    //         localStorage.setItem("ZoomAfterRefresh",responseData.id)
    //         setImageID(responseData.id);
    //         return Promise.resolve();
    //       } else {
    //         return Promise.reject("Failed to post the image.");
    //       }
    //     } catch (error) {
    //       console.error("An error occurred:", error);
    //       return Promise.reject(error);
    //     }
    //   });

    //   await Promise.all(uploadPromises);

    //   console.log("All images uploaded successfully.");
    //   setopen(false);

    //   // Refresh the page after all images are uploaded
    //   Swal.fire({
    //     title: "Uploading",
    //     text: "Your photo has been successfully submitted. Thank you for sharing your photo and being part of this project.",
    //     icon: "success",
    //     confirmButtonText: "OK",
    //     preConfirm: () => {
    //       return new Promise((resolve) => {
    //        window.location.reload();
    //         resolve(); // Resolve the promise after reloading
    //       });
    //     },
    //   });
    // } catch (error) {
    //   console.error("Error occurred during image upload:", error);
    //   // Handle errors if needed
    // }
  };

  // function to handle Submit when select image from Gallary

  const handelenext_33 = async (event) => {
    try {
      
      const resultingFiles = await Gallaryarrayhandling(convert, title);
      const uploadPromises = resultingFiles.map((element) => {
        const formData = new FormData();
        console.log("element",element)
        formData.append("image", element);
        formData.append("author", email);
        formData.append("title", element.title);
        formData.append("fk", Facebook ? Facebook : "#");
        formData.append("inst", instgram ? instgram : "#");
        formData.append("tw", twitter ? twitter : "#");
        formData.append("ln", linked ? linked : "#");

        return fetch("https://snapus.pythonanywhere.com/api/images/", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              // Access the ID from the response
              return response.json(); // Assuming the response is in JSON format
            } else {
              return Promise.reject("Failed to post the image.");
            }
          })
          .then((data) => {
            if (data && data.id) {
              ;
              // Store the ID in local storage
              localStorage.setItem("newElementID", data.id);
              

            }
            return Promise.resolve();
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            return Promise.reject(error);
          });
      });

      await Promise.all(uploadPromises);

debugger
      setopen(false);
      Swal.fire({
        title: "يتم الرفع",
        text: `تم رفع الصور الخاصة بك ,نشكرك لانك استخدمت موقعنا `,
        icon: "success",
        confirmButtonText: "تاكيد",
        preConfirm: () => {
          debugger
          return new Promise((resolve) => {
            // Fetch the stored ID from local storage
            const storedID = localStorage.getItem("newElementID");
            // Use this ID to highlight the element or perform specific actions
            window.location.reload();
            resolve(); // Resolve the promise after reloading
          });
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error occurred during image upload:", error);
      // Handle errors if needed
    }
  };

  const handleImageSelection = (image) => {

    if (selectedImages.includes(image)) {
      const updatedImages = selectedImages.filter(
        (selectedImage) => selectedImage !== image
      );
      setSelectedImages(updatedImages);
    } else if (selectedImages.length < numimage) {
      setSelectedImages([...selectedImages, image]);
      console.log(image);
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };
  async function convertUrlsToFiles(urls, title) {
    try {
      const filePromises = urls.map(async (url, index) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const urlSplit = url.split("/");
          const filenameFromUrl = urlSplit[urlSplit.length - 1];

          const file = new File([blob], filenameFromUrl, {
            type: blob.type,
            lastModified: new Date().getTime(),
            lastModifiedDate: new Date(),
            webkitRelativePath: "",
            size: blob.size,
          });
          file.title = title[index];
          return file;
        } catch (error) {
          console.error(`Error converting URL to File for ${url}:`, error);
          return null;
        }
      });

      const files = await Promise.all(filePromises);
      return files;
    } catch (error) {
      console.error("Error converting URLs to files:", error);
      return [];
    }
  }

  async function Gallaryarrayhandling(convert, title) {
    try {
      const files = await convertUrlsToFiles(convert, title);
      return files;
    } catch (error) {
      console.error("Error in Gallaryarrayhandling:", error);
      return [];
    }
  }
  const handleGallaryUpload = async () => {
    
    var getAllImageUrls = selectedImages.map(item => item.image)
    const getReturnFiles = await convertUrlsToFiles(getAllImageUrls, `zz`)
    await handeleGallarySubmit(getReturnFiles)
  }
  return (
    <div className="upload-page " >
      {/* {style={{ direction: 'rtl' }}} */}
      <a

        className="btn btn-primary upload-btn mx-2 d-flex align-items-center justify-content-center  up_btn"
        onClick={() => setopen(true)}
        style={{ letterSpacing: 0 }}
      >
        اضافة صورة
      </a>

      <Modal
        isOpen={open}
        onRequestClose={() => {
          setopen(false);
        }}
        style={customStyles}
      >
        {moving == 1 && (
          <div className="ali" style={{height:"10px !important"}}>
            <p className="text_price fading-animation mb-3 col-sm-12">
              {offer}
            </p>
            <div>
              <div className="d-flex justify-content-between flex-wrap ">
                <div className="form-floating mobile-design">
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={numimage}
                    onChange={handleInputChange}
                    dir='rtl'
                  />
                  <label for="floatingPassword">العدد :
                    السعر = {numimage >= offer_number ? numimage * price - (numimage * (price * (extractNumbersAfterPercent(offer) / 100))) : numimage * price}
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setemail(e.target.value)}
                    dir='rtl'
                  />
                  <label for="floatingInput">المستخدم</label>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between ">
              <button onClick={handleButtonClick} className="upload-btn model1_buttons" style={{ letterSpacing: 0 }}>
                أختر الصور
              </button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
                multiple
              />
              <button
                type="button"
                className="btn btn-primary d-block  upload-btn model1_buttons"
                onClick={handlGallary}
                style={{ letterSpacing: 0 }}
              >
                المعرض
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary d-block  next-btn"
                onClick={handlenext_1}
                style={{ letterSpacing: 0 }}
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* //////////////////////////////////////////////////////////// */}

        {moving == 2 && (
          <div>
            <FontAwesomeIcon
              icon={faCircleLeft}
              style={{ color: "#f29122f1", fontSize: "24px" }}
              onClick={() => {
                setmoving(1);
                setSelectedImages([]);
              }}
            />
            <>
              <div className="d-flex justify-content-center mb-2">
                {selectedImages.map((img) => {
                  return (
                    <div
                      className="pagimg mx-2"
                      style={{
                        backgroundImage: `url(${URL.createObjectURL(img)})`,
                      }}
                      onClick={() => {
                        setimg(img);
                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                      }}
                    ></div>
                  );
                })}
              </div>
              <ARCPhotoEditor
                url={imgg ? URL.createObjectURL(imgg) : ""}
                image={imgg ? URL.createObjectURL(imgg) : ""}
                onImageEdited={handleImageEdited}
                name={imgg && imgg.name}
                inputRef={inputRef}
              />
              <div className="d-flex justify-content-end">
                <div>
                  <OverlayTrigger trigger="click" placement="right" show={instagramPopoverVisible} overlay={popoverInstagram}>

                    <FontAwesomeIcon icon={faInstagram} className="  icons_social" onClick={handleInstagramClick} />

                  </OverlayTrigger>

                  <OverlayTrigger trigger="click" placement="right" show={twitterPopoverVisible} overlay={popoverTwitter}>

                    <FontAwesomeIcon icon={faXTwitter} className="   icons_social" onClick={handleTwitterClick} />

                  </OverlayTrigger>

                  <OverlayTrigger trigger="click" placement="right" show={tiktokPopoverVisible} overlay={popovertiktok} >

                    <FontAwesomeIcon icon={faTiktok} className=" icons_social" onClick={handletiktokClick} />

                  </OverlayTrigger>
                </div>

              </div>
            </>

            <button
              type="button"
              className="btn btn-primary next-btn mt-2"
              onClick={handlenext_2}
            >
              التالي
            </button>
          </div>
        )}

        {moving == 3 && (
          <div className="p-3">
            <FontAwesomeIcon
              icon={faCircleLeft}
              onClick={() => {
                if (
                  selectedImages.every((element) => element instanceof File)
                ) {
                  setmoving(2);
                } else {
                  setconvert([]);
                  setSelectedImages([]);
                  setmoving(1);
                }
              }}
              style={{ color: "#f29122f1", fontSize: "24px" }}
            />
            <ARCCredit cardData={cardData} setCardData={setCardData} isChecked={isChecked} onCheckboxChange={handleCheckboxChange} />

            <button
              type="submit" className='btn btn-primary next-btn' disabled={isChecked === false}
              onClick={
                selectedImages.every((element) => element instanceof File)
                  ? handelenext_3
                  : handelenext_33
              }
            >
             دفع 
            </button>
          </div>
        )}

        {moving == 4 && (
          <>
            <div className="d-flex align-items-center mb-3 gallary_header p-2 ps-3">
              <FontAwesomeIcon
                icon={faCircleLeft}
                onClick={() => {
                  setmoving(1);
                }}
                style={{ color: "#f29122f1", fontSize: "24px" }}
              />
              <p
                style={{ fontSize: 22, fontWeight: 300, color: "#f29122f1" }}
                className="ms-2 m-0 p-0"
              >
                Gallary
              </p>
            </div>
            <div
              style={{ height: "70vh !important", position: "relative" }}
              className="p-3"
            >
              <Gallery
                selectedImages={selectedImages}
                onImageClick={handleImageSelection}
                maxImages={numimage}
                numimage={numimage}
              />
            </div>
            <div className=" d-flex gallary_footer p-2 ps-3" >

              <div></div>
              <div style={{ margin: "auto" }}>
                <button
                  style={{ fontSize: 22, fontWeight: 300, color: "#f29122f1", width: "150px" }}
                  className="ms-2 m-0 p-0 colored-btn"
                  onClick={handleGallaryUpload}
                >
                  Next
                </button>
              </div>
            </div>

          </>
        )}
      </Modal>
    </div>
  );
}
export default ARCUploading;
