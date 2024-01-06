import React, { useEffect, useState } from 'react';


function Gallery({ selectedImages=[], onImageClick,maxImages,numimage }) {
const [datagallary,setdatagallary]=useState([])

console.log("numimage",numimage)


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
        <div key={index} className='col-4  mb-2 ' style={{overflow: "hidden",height:120}}>
          <img
            src={image.image}
            alt={`Image${index + 1}`}
            style={{
              width: '100%',
              minWidth:"80%",
              height: '100%',
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

// import React, { useEffect, useState } from 'react';

// function Gallery({ selectedImages = [], onImageClick, maxImages }) {
//   const [datagallary, setdatagallary] = useState([]);
//   const [titleArray, setTitleArray] = useState(Array(datagallary.length).fill(''));
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);

//   const onTitleChange = (index, value) => {
//     const newTitleArray = [...titleArray];
//     newTitleArray[index] = value;
//     setTitleArray(newTitleArray);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("https://datamanager686.pythonanywhere.com/api/images-with-comments/");
//         const data = await res.json();
//         setdatagallary(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleImageClick = (index) => {
//     setSelectedImageIndex(selectedImageIndex === index ? null : index);
//     // Use onImageClick here if needed
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }} className='justify-content-between'>
//         {datagallary.map((image, index) => (
//           <div key={index} className='col-3 m-1 mb-2 ' style={{ overflow: "hidden" }}>
//             <img
//               src={image.image}
//               alt={`Image${index + 1}`}
//               style={{
//                 width: '100%',
//                 height: '60%',
//                 cursor: 'pointer',
//                 border: selectedImages.includes(image) ? '2px solid #f29122f1' : '2px solid transparent',
//                 borderRadius: 10
//               }}
//               onClick={() => handleImageClick(index)}
//             />
//             {/* Conditionally render the input based on the selectedImageIndex */}
//             {selectedImageIndex === index && (
//               <div className="form-floating mt-2 ms-2 ">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={titleArray[index]}
//                   onChange={(e) => onTitleChange(index, e.target.value)}
//                 />
//                 <label htmlFor="floatingInput">Title</label>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Gallery;


// import React, { useEffect, useState } from 'react';

// function Gallery({ selectedImages = [], onImageClick, maxImages }) {
//   const [datagallery, setDatagallery] = useState([]);
//   const [titleArray, setTitleArray] = useState(Array(datagallery.length).fill(''));
//   const [selectedImageIndex, setSelectedImageIndex] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("https://datamanager686.pythonanywhere.com/api/images-with-comments/");
//         const data = await res.json();
//         setDatagallery(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const onTitleChange = (index, value) => {
//     const newTitleArray = [...titleArray];
//     newTitleArray[index] = value;
//     setTitleArray(newTitleArray);
//   };

//   const onImageClickHandler = (image, index) => {
//     const selectedIndex = selectedImageIndex.indexOf(index);
//     const newSelectedImageIndex = [...selectedImageIndex];
//     const newTitleArray = [...titleArray];

//     if (selectedIndex !== -1) {
//       newSelectedImageIndex.splice(selectedIndex, 1);
//       newTitleArray.splice(selectedIndex, 1);
//     } else {
//       if (selectedImageIndex.length < maxImages) {
//         newSelectedImageIndex.push(index);
//         if (newTitleArray.length > 0) {
//           newTitleArray.push(newTitleArray[newSelectedImageIndex[0]] || '');
//         } else {
//           newTitleArray.push('');
//         }
//       } else {
//         // Handle when the maximum number of images is reached
//         return;
//       }
//     }

//     setSelectedImageIndex(newSelectedImageIndex);
//     setTitleArray(newTitleArray);
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }} className='justify-content-between'>
//         {datagallery.map((image, index) => (
//           <div key={index} className='col-3 m-1 mb-2 ' style={{ overflow: "hidden" }}>
//             <img
//               src={image.image}
//               alt={`Image${index + 1}`}
//               style={{
//                 width: '100%',
//                 height: "100px",
//                 cursor: 'pointer',
//                 border: selectedImageIndex.includes(index) ? '2px solid #f29122f1' : '2px solid transparent',
//                 borderRadius: 10
//               }}
//               onClick={() => onImageClickHandler(image, index)}
//             />
//             {selectedImageIndex.includes(index) && (
//               <div className="form-floating mt-2 ms-2 " style={{ height: 60 }}>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={titleArray[index]}
//                   onChange={(e) => onTitleChange(index, e.target.value)}
//                 />
//                 <label htmlFor="floatingInput">Title</label>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <button onClick={() => {
//         console.log(selectedImageIndex);
//         console.log(titleArray);
//       }}>log</button>
//     </div>
//   );
// }

// export default Gallery;

