import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Trems(){
    const [terms,settrems]=useState([])
    const params=useParams()
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://snapus.pythonanywhere.com/footer/terms/');
        const result = await response.json();
        if (result && result.length > 0) {
            settrems(result)
            console.log(result);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error fetching logo:', error);
      }
    };

    fetchData();
  }, []);
    return(
        <div className="m-5" style={{color:'white',fontWeight:300}} dir={params.lan=='false'&&'rtl'}> 
            <h3 style={{fontWeight:300}}>{params.lan=='true'?'TERMS & CONDITIONS':'الشروط و الاحكام'}</h3>
            <ul style={{listStyle:"decimal"}}>
            {params.lan=='true'?
            terms.map((item, index) => (
                <li key={index}>
                  {item.EnTerms}
                </li>
              ))
              :
              terms.map((item, index) => (
                <li key={index}>
                  {item.ArTerms}
                </li>
              ))
            }
            </ul>
        </div>

    );
}
export default Trems;