import React from 'react'

import DonateImg from "../../../Assets/Donate_Img.png"

export default function Support():React.ReactElement {
  return (
    <div className='Support'>
        <div className='Support_Left'>
            <div className='BG_Dot_2'></div>
            <div className='Support_Left_Content'>
                <h2>Support Piano-Blocks-App Project</h2>
                <p className='jersey-15'>Hosting of the app, design, domain, time spent developing a project - these are expensive things. Since the project was always meant to be an alternative to paid tools, every feature it offers is completely free, but it does not mean it is free for the owner :c. If you support the project, it means a lot to me, and it also makes me not lose money :-D.</p>
                <h5>This Month donations: 0.8$/20$</h5>
                <div className='Support_Left_Donation_Bar'></div>
                <ul>
                    <li>*If you donate, the money will appear on the bar with a few days delay</li>
                    <li>**The 20$ margin is a approximate cost (with current 09/08 web flow) of operating the app every month, donated money over 20$ helps me (author) to buy a car</li>
                    <li>***Donation system takes 30% of the Donated money, so donating 5$ means recieving by PBA 3.5$</li>
                </ul>
            </div>
        </div>
        <div className='Support_Right'>
            <div className='Big_Dot_3'></div>
            <div className='Support_Right_Content'>
                <img src={DonateImg} alt='Donate_image' />
                <a href='https://www.paypal.com/donate/?hosted_button_id=J6GQGKHC7H7SG' target='_blank'>Donate</a>
            </div>
        </div>
    </div>
  )
}
