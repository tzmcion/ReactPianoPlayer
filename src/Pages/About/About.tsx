import React from 'react';
import './About.scss';
import "./About_res_1480.scss";
import "./About_res_1100.scss";
import "./About_res_760.scss";
import "./About_res_560.scss";

import Description from './Description/Description';
import FAQ from './FAQ/FAQ';
import Support from './Support/Support';
import FAQ_Questions from "../../Utils/FAQ_questions";

/**
 * Page of the react app, About subpage
 * @returns React Element
 */
export default function About():React.ReactElement {

    return (
        <div className='About_Container jersey-10'>
            <Description />
            <FAQ questions={FAQ_Questions}/>
            <Support />
            <div className='Join'>
                <h2>Want to contribute to the project, or You have any questions? Contact: <span className='Link_color'>tymsonekjelonek@gmail.com</span>, IG: <a href='https://www.instagram.com/tymsonekjelonek/'>@tymsonekjelonek</a>, LinkedIn: <a href='https://www.linkedin.com/in/tymoteusz-apriasz-2ba8501a6/'>Tymoteusz Apriasz</a>  .  </h2>
            </div>
        </div>
    )
}
