import { useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import LazyLoad from 'react-lazyload';

function Loading({ data, len, setImageID, ImageID,bg ,reff}) {
  const panelRef = useRef(null);

  const zoomPanRef = useRef(null);
  const renderLargeDivs = (lens) => {
    const divs = Array(10000-len)
      .fill(null)
      .map((_, index) => (
        <LazyLoad key={index} height={200} offset={100} once>
          <div key={index} className="div-item" id={`div-${index}`} disableMapInteraction>
            {/* {data[Math.floor((Math.random()) * 900)]} */}
          </div>
        </LazyLoad>
      ));
    return divs;
  };

  // Function to execute auto zoom to a specific div
  const autoZoomToSpecificDiv = async (divId) => { 
    const targetDiv = await document.getElementById(String(ImageID));
   
    setTimeout(() => {
      const targetDiv = document.getElementById(String(ImageID));
      const targetDivAddedImage = document.getElementById(localStorage.getItem("addedImage"))
      if (targetDiv && zoomPanRef.current) {
        zoomPanRef.current.zoomToElement(targetDiv, 5, 1);
        targetDiv.style.border = "1px solid rgb(12, 182, 233)";
      }
      if( localStorage.getItem("newElementID")){
        localStorage.removeItem("newElementID")
      }

      if (targetDivAddedImage && zoomPanRef.current) {
        zoomPanRef.current.zoomToElement(targetDivAddedImage, 5, 1);
        document.getElementById(localStorage.getItem("addedImage")).style.border = "1px solid rgb(12, 182, 233)";
        setTimeout(() => {
          document.getElementById(ImageID).style.border = "1px solid transparent";
          localStorage.removeItem("addedImage")
        }, 5000);
      }
    }, 500);


    if (targetDiv && zoomPanRef.current) {
      zoomPanRef.current.zoomToElement(targetDiv, 5, 1);
      localStorage.setItem("newElementID", ImageID);
      document.getElementById(ImageID).style.border = "1px solid rgb(12, 182, 233)";
      setTimeout(() => {
        document.getElementById(ImageID).style.border = "1px solid transparent";
      }, 5000);
    }
  };

  useEffect(() => {
    debugger
    const fetchDataAndZoom = async () => {
      await autoZoomToSpecificDiv(localStorage.getItem('newElementID') || String(ImageID));
    };
    fetchDataAndZoom();
    
  }, [ ImageID]);


  return (
    <div style={{width:"100%", overflow:'hidden'}}
    
    >
      <TransformWrapper ref={zoomPanRef}
      options={{ pan: false, pinch: false }}
      alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
    >
    <TransformComponent>
      <div id="mosaic-container"  ref={reff} className="p-0 m-0" disableMapInteraction style={{backgroundImage:`url(${bg})`,}}>
        <div ref={panelRef} className="d-flex flex-wrap p-0 m-0" >
          {data}
          {renderLargeDivs(len)}
        </div>
      </div>

    </TransformComponent>
  </TransformWrapper>
    </div>
  
  );
}

export default Loading;
