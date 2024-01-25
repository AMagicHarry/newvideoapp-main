import React, { useState } from 'react';
import { CardElement, useStripe, useElements, PaymentElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';


import { Modal } from "react-bootstrap"



const StripeModal = ({ show, handleClose, userId }: { show: any, handleClose: any, userId: any }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<any>(false);
    const handleSubscribe = async (event: any) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const cardNumber: any = elements.getElement(CardNumberElement);
        const cardExp: any = elements.getElement(CardExpiryElement);
        const cardCvc: any = elements.getElement(CardCvcElement);
        console.log("card", elements)
        setLoading(true);
        // Collect payment method details
        // const { token, error } = await stripe.createToken(cardElement);
        // if (error) {
        //     console.error(error);
        //     setError(error?.message);
        //     setLoading(false);
        //     return;
        // }
        // const userId = "cus_PJ4jxQVzo9qkVp";

        const planId = process.env.STRIPE_PLAN_ID;
        // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stripe/subscribe`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user_id: userId,
        //         paymentMethod: token.id,
        //         priceId: planId,
        //     }),
        // });
        // const responseData = await response.json();
        // setLoading(false);
        // if (response.ok) {
        //     console.log('Subscription successful:', responseData);
        // } else {
        //     console.error('Subscription failed:', responseData);
        // }
    };



    return (


        <Modal className='modal-primary payment-modal' show={show} onHide={handleClose} centered role="dialog" >
            <Modal.Header className="flex-column-reverse">
                <h1>Payment Settings</h1>
                <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="align-self-end">
                    <path fill-rule="evenodd" clipRule="evenodd" d="M2.66958 1.11595C2.24121 0.687583 1.58365 0.650726 1.20083 1.03354C0.818022 1.41635 0.85502 2.07377 1.28339 2.50214L4.85156 6.07031L1.11946 9.80242C0.690564 10.2313 0.655277 10.8897 1.04079 11.2752C1.4263 11.6607 2.08465 11.6254 2.51355 11.1965L6.24565 7.4644L9.9663 11.185C10.3947 11.6134 11.0521 11.6504 11.4349 11.2676C11.8177 10.8848 11.7809 10.2272 11.3525 9.79886L7.63184 6.07821L11.1964 2.51368C11.6251 2.08495 11.6604 1.42661 11.2749 1.0411C10.8893 0.655582 10.231 0.690858 9.80228 1.1196L6.23775 4.68412L2.66958 1.11595Z" fill="white" />
                </svg>
            </Modal.Header>
            <Modal.Body className='m-5'>
                <form onSubmit={handleSubscribe} >
                    <div style={{ width: "300px", height: "100px", }}>
                        {/* <PaymentElement /> */}
                        <div className='stripe-div'>
                            <label>
                                Card Number:
                            </label>
                            <CardNumberElement className='stripe-element' />
                        </div>
                        <div className='stripe-div'>
                            <label>
                                Card Exp:
                            </label>
                            <CardExpiryElement className='stripe-element' />
                        </div>
                        <div className='stripe-div'>
                            <label>
                                Card Cvc:
                            </label>
                            <CardCvcElement className='stripe-element' />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mt-5'>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Subscribe'}
                        </button>
                    </div>
                </form>

            </Modal.Body>
        </Modal>

    )
}
export default StripeModal