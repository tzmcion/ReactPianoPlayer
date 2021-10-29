import React, {useState} from 'react'
import './ToDo.styles.css';
// @ts-ignore
import PaypalExpressBtn from 'react-paypal-express-checkout';

import Footer from '../Footer/Footer';

export default function ToDo() {

    const [amount,setAmount] = useState<number>(1);
    const [click,setClick] = useState<boolean>(false);

    const onAmountChange = (e:any) =>{
        console.log(e.target.value);
        setAmount(e.target.value.toString());
    }


    return (
        <div className='Donate'>
            <h1>Fuu your money $$$$</h1>
            <h2>I want to donate: </h2>
            <input type='number' value={amount} onChange={onAmountChange} />
            <h2> PLN and make someone's day much better</h2>
            <button onClick={()=>{setClick(true)}}>DONATE</button>
            {/* {click && <PayPalScriptProvider options={{ "client-id": "AeLMPfH9JtaiN1ohPSYGBv5MzcDhYPORstj0l1fki8-woB0Bg5bjMydZ3LsbeAm7UhssE_QW2RVmDtuT", currency:'PLN',intent: "capture"}}>
                <PayPalButtons className='Buttons_PP' createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {   
                                description:'for money',
                                amount: {
                                    currency_code: 'PLN',
                                    value: amount.toString(),
                                }
                            }]
                })}}
                onApprove={async (data,action) =>{
                    const order = await action.order.capture;
                    console.log(order.arguments); 
                }}
                onError={(error)=>{
                    console.log(error)
                }}
                />
            </PayPalScriptProvider>} */}
            {click && <PaypalExpressBtn env='production' paymentOptions={{"payer": {
        "payment_method": "paypal"
      },}} client={{sandbox: 'Ab27Gl7GlRY0swi_lmI7j-i4UGmbSrFmapjYUlbI5UQtJ71b0_YJ8_2GULzQDG7MKdJ-pc7Kr4YW_cOE',production:'AeLMPfH9JtaiN1ohPSYGBv5MzcDhYPORstj0l1fki8-woB0Bg5bjMydZ3LsbeAm7UhssE_QW2RVmDtuT'}} currency={'PLN'} total={amount} />}
      {/* <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="J6GQGKHC7H7SG" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt=""  src="https://www.paypal.com/en_PL/i/scr/pixel.gif" width="1" height="1" />
</form> */}
    {/* {click && <h2>Fajnie mordko ze to klikasz ale tu nic nie ma xd</h2>} */}
            <Footer />
        </div>
    )
}