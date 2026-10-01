import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
 
const stripePromise = loadStripe('pk_test_51SY6c4RlWMagoEBNKBJu6UWEMNA5kaz3nfpnYsC45BI2XRtIkpbaKJLq6Pqs1EGubeJSw9bFfPQrmiBjp8mLVeBN000Ku6JcIP');

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;