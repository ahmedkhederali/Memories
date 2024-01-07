import React, { useState, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './imagecrop';
import "./upload.css";

const ARCPhotoEditor = ({ image, onImageEdited, url, name,inputRef}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
  
  const [imageWidth, setImageWidth] = useState(200); // Default width
  const [imageHeight, setImageHeight] = useState(200); // Default height
  const [title,settitle]=useState('')

  const handleCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels,rotation);
    setCroppedImage(croppedImage);
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setImageWidth(img.width);
        setImageHeight(img.height);
      };
    }
  }, [image]);

  const handleRotateLeft = () => {
    setRotation((prevRotation) => prevRotation - 90);
  };

  const handleRotateRight = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleSave = (nameff,titles) =>{
    onImageEdited({ croppedImage, name: nameff,title:titles});
    settitle('')
    console.log("donbe");

  };

  if (!image) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className='d-flex justify-content-center mobile-design' style={{height:"100%"}}>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: `100%`,
          height: `220px`,
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={imageWidth / imageHeight} // Set aspect ratio based on image width and height
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          rotation={rotation}
        />
      </div>
      <div className='btn-div '>
        <button onClick={handleRotateLeft} className='rotate-btn p-2 mb-2 ms-2'>يسار</button>
        <button onClick={handleRotateRight} className='rotate-btn p-2 mb-2 ms-2'>يمين</button>
        <button onClick={() => handleSave(name,title)} className='save-btn  p-2 ms-2'>حفظ الصورة</button>
        <div className="form-floating mt-2 ms-2 ">
                        <input type="text" autoComplete='off' className="form-control"  ref={inputRef}
                        id="floatingInput" value={title}  onChange={(e)=>settitle(e.target.value)}
                        dir='rtl'
                        />
        <label for="floatingInput" className='dis_label'>الوصف</label>
        </div>
      </div>
    </div>
  );
};

export default  ARCPhotoEditor;
