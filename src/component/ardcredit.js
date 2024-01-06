import { useState } from "react";

import image1 from "../assest/Visa_Inc._logo.svg.png"
import image2 from "../assest/Mastercard-logo.svg.png"
import image3 from "../assest/Stc_pay.png"
import image4 from "../assest/768px-Apple_Pay_logo.svg.png"

import "./upload.css"
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
function ARCCredit({ setCardData, cardData, isChecked, onCheckboxChange }) {

    const [focus, setfocus] = useState('')

    const calendarIconStyle = {
        filter: 'invert(1)', // Inverts the color of the icon (white)
    };



    // Generalized handleChange function
    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update the state based on the input field name
        setCardData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <div >
            <form>
                <div className="d-flex justify-content-between mt-4">
                    <div class="form-floating mb-3 col-5">
                        <input type="text" className="form-control"
                            name='number'
                            id="floatingInput" value={cardData.number} onChange={handleChange}
                            onFocus={e => setfocus(e.target.name)}
                            dir="rtl" autoComplete="off" />
                        <label for="floatingInput" className="vis_label">رقم البطاقة</label>
                    </div>
                    <div class="form-floating mb-3 col-5">
                        <input type="text" className="form-control"
                            name='name'
                            id="floatingInput" value={cardData.name} onChange={handleChange}
                            onFocus={e => setfocus(e.target.name)} 
                            dir="rtl" autoComplete="off"/>
                        <label for="floatingInput" className="vis_label">الاسم</label>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div class="form-floating  m-0 col-5">
                        <input type="date" className="form-control" style={{}}
                            name='expiry'
                            id="floatingInput" value={cardData.expiry} onChange={handleChange}
                            onFocus={e => setfocus(e.target.name)}
                            dir="rtl"
                        />
                        <label for="floatingInput" className="vis_label">تاريخ الانتهاء</label>
                    </div>
                    <div class="form-floating  mb-1 col-5">
                        <input className="form-control"
                            name='cvc'
                            type="text"
                            id="floatingInput" value={cardData.cvc} onChange={handleChange}
                            onFocus={e => setfocus(e.target.name)}
                            style={{width:'100%'}}
                            dir="rtl"
                            />
                        <label for="floatingInput" className="vis_label">CVC</label>
                    </div>
                </div>

            </form>
            <section className="d-flex align-items-center justify-content-between">
                <div class="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={isChecked}
                        onChange={onCheckboxChange}
                    />
                    <Link to={'trems/false'} className="form-check-label checklabels p-0 m-0" for="flexCheckDefault" style={{ fontSize: 12, textDecoration: 'underline' }} >
                        agree with all terms&conditions
                    </Link>
                </div>
                <div className="d-flex imagec_credit col-5 ">
                    <div  className="rounded  mx-2 d-flex justify-content-center align-items-center">
                        <img src={image1} style={{ width: '100%' }} className="p-1"/>
                    </div>
                    <div  className="rounded  mx-2 d-flex justify-content-center align-items-center">
                        <img src={image2} style={{ width: '100%'}}className="p-1" />
                    </div>
                    <div  className="rounded  mx-2 d-flex justify-content-center align-items-center">
                        <img src={image3} style={{ width: '100%' }} className="p-1"/>
                    </div>
                    <div  className="rounded  ms-2 d-flex justify-content-center align-items-center">
                        <img src={image4} style={{ width: '100%' }}className="p-1" />
                    </div>
                </div>

            </section>

        </div>

    )
}
export default ARCCredit;