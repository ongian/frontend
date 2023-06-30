import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setShippingInfoRx, setShippingDetails } from '../../../redux/checkoutSlice';
const ShippingInfo = () => {
    const [savedShippingInfo, setSavedShippingInfo] = useState(null);
    const [shippingInfo, setShippingInfo] = useState({
        contact: '',
        firstName: '',
        lastName: '',
        state: '',
        houseNo: '',
        street: '',
        city: '',
        zip: '',
        remarks: ''
    });
    const [formError, setFormError] = useState({
        contact: '',
        firstName: '',
        lastName: '',
        state: '',
        houseNo: '',
        street: '',
        city: '',
        zip: '',
        remarks: ''
    });
    const checkout = useSelector(state => state.checkout);
    const dispatch = useDispatch();
    useEffect(() => {
        const saveInfo = JSON.parse(localStorage.getItem('shippingInfo')) || null;
        if(saveInfo !== null){
            Object.keys(saveInfo).forEach((info) => {
                setShippingInfo((prev) => ({
                    ...prev,
                    [info]: saveInfo[info]
                }))
            })
        }
    }, []);

    useEffect(() => {
        const errors = Object.values(formError).every((error) => error === '');
        const shippingInfos = Object.values(shippingInfo).slice(0, -1).every(s => s !== '');
        console.log(shippingInfos)
        if(errors && shippingInfos){
            localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
            dispatch(setShippingDetails(shippingInfo))
        }
        dispatch(setShippingInfoRx(errors && shippingInfos));
    }, [formError])
    const eventHandler = (e) => {
        const {name, value} = e.target;
        setShippingInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const {contact, zip} = shippingInfo;   
        
        Object.keys(shippingInfo).forEach((f) => {
            if(shippingInfo[f] === ''){
                if(f !== 'remarks'){
                    setFormError((prev) => ({
                        ...prev,
                        [f]: 'This field is required'
                    }))
                }
            } else {
                setFormError((prev) => ({
                    ...prev,
                    [f]: ''
                }))
            }
        });
        if(contact !== ''){
            if(/^\d{10}$/.test(contact) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)){
                setFormError((prev) => ({
                    ...prev,
                    contact: ''
                })) 
            } else {
                setFormError((prev) => ({
                    ...prev,
                    contact: 'Invalid Email or Phone'
                }))
                dispatch(setShippingInfoRx(false));
            }
        }
        if(zip !== '' && /^\d{4,5}$/.test(zip)){
            setFormError((prev) => ({
                ...prev,
                zip: ''
            }))
        } else {
            setFormError((prev) => ({
                ...prev,
                zip: 'Please enter a valid zip code'
            }))
        }
        
    };

    console.log(formError)
    return (
        <Col md={6} sm={12}>
            <form onSubmit={(e) => submitHandler(e)}>
                <h4>Contact Info</h4>
                <div className="form-group">
                    <label>Mobile Phone Number or Email Address</label>
                    <input name="contact" onChange={(e) => eventHandler(e)} className="form-control" type="text" value={shippingInfo.contact} />
                    {formError.contact !== '' && <span className="text-danger">{formError.contact}</span>}
                </div>
                <h4>Shipping Info</h4>
                <div>
                    <Row>
                        <Col className="form-group" sm="12" md="6">
                            <label>First Name</label>
                            <input name="firstName" onChange={(e) => eventHandler(e)} className="form-control" type="text" value={shippingInfo.firstName} />
                            {formError.firstName !== '' && <span className="text-danger">{formError.firstName}</span>}
                        </Col>
                        <Col className="form-group" sm="12" md="6">
                            <label>Last Name</label>
                            <input name="lastName" onChange={(e) => eventHandler(e)} className="form-control" type="text" value={shippingInfo.lastName} />
                            {formError.lastName !== '' && <span className="text-danger">{formError.lastName}</span>}
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label>Unit / House / Apartment / Building No.</label>
                        <input name="houseNo" onChange={(e) => eventHandler(e)} className="form-control" type="text" value={shippingInfo.houseNo} />
                        {formError.houseNo !== '' && <span className="text-danger">{formError.houseNo}</span>}
                    </div>
                    <div className="form-group">
                        <label>Street Address</label>
                        <input name="street" onChange={(e) => eventHandler(e)} className="form-control" type="text" value={shippingInfo.street} />
                        {formError.street !== '' && <span className="text-danger">{formError.street}</span>}
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input name="city" onChange={(e) => eventHandler(e)} className="form-control" type="text" value={shippingInfo.city} />
                        {formError.city !== '' && <span className="text-danger">{formError.city}</span>}
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input name="state" onChange={(e) => eventHandler(e)} className="form-control" type="text" value={shippingInfo.state} />
                        {formError.state !== '' && <span className="text-danger">{formError.state}</span>}
                    </div>
                    <div className="form-group">
                        <label>Zip Code</label>
                        <input name="zip" onChange={(e) => eventHandler(e)} className="form-control" type="text" value={shippingInfo.zip} />
                        {formError.zip !== '' && <span className="text-danger">{formError.zip}</span>}
                    </div>
                    <div className="form-group">
                        <label>Remarks / Instruction</label>
                        <input name="remarks" onChange={(e) => eventHandler(e)} className="form-control" type="textbox" value={shippingInfo.remarks} />
                        {formError.remarks !== '' && <span className="text-danger">{formError.remarks}</span>}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Next</button>
            </form>
        </Col>
    )
}

export default ShippingInfo;