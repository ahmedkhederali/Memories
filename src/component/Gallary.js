import React, { useEffect, useState } from 'react';


function Gallery({ selectedImages=[], onImageClick,maxImages,numimage }) {
const [datagallary,setdatagallary]=useState([])



useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://snapus.pythonanywhere.com/api/superimages/");
        const data = await res.json();
        // Update state with the image array
        setdatagallary(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []); 
  return (
    <div>
      {/* The rest of your Gallery component remains the same */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className='justify-content-start'>
        {datagallary.map((image, index) => (
        <div key={index} className='col-3  mb-2 ' style={{overflow: "hidden"}}>
          <img
            src={image.image}
            alt={`Image${index + 1}`}
            style={{
              width: '80%',
              minWidth:"80%",
              height: '80%',
              cursor: 'pointer',
              border: selectedImages.includes(image) ? '1px solid #f29122f1' : '1px solid #ebe1e1',
              borderRadius: 10,
              margin:"5px"
            }}
            onClick={() => {
              onImageClick(image)
            }}
          />
        </div>
        ))}
      </div>
      
    </div>
  );
}

export default Gallery;

