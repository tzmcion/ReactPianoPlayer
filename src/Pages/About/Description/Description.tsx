import React from 'react'

import Avant_Logo from "../../../Assets/avnt_big.png"

interface Article{
    title:string,
    content:string,
    img?:string
}

const articles:Article[] = [
    {
        title:"The origins of Piano-Blocks-App",
        content:"The idea of the app started in between years 2019/2020. The idea was to have a free alternative for creation of paino tutorial videos, which were at that time \
        much popular. The popular apps used in that time - Synthesia and Adobe After Effects - were expensive and took some time to deliver a good results, that's what \
        started this project. At first, in 2019 the app worked in SDL2 library on Windows, as a C++ software, with no UI, and command line usage. Then, the author decided to \
        make from it a multifunctional web appliacation, converting it to a user friendly web midi player. In years 2021/2022 the first version of a web app was released \
        with functions allowing user to alter the visuals, to record it's own playing, and to playback/forward the track. Next updates through 2022/2023 focues mainly on\
        improving the performance. In the year 2025 the decision was made to renew and refactor the application. The engine was updated to vite, the unit testing was implemented,\
         the design was renewed all along, new recorder was aded and new functionality as live-play. All the list of changes is very long. And now we are here, somewhere in between\
          new changes and old version",
    },{
        title: "Future of the app",
        content:"Currently the app is in transition of becoming a project of a start up company 'AVANT'. That may include a donation system to support the app, or, if\
         the donation system will not cover the costs to host the app, microtransactions may be implemented\
         in some detailed elements, like special premium presets, or premium effects. All the essential functionalities of the app will always remain free of charge.",
        img:Avant_Logo
    },
    {
        title: "Author of the App",
        content:"Author of the app is Tymoteusz Apriasz. A web developer since 2018, currently working as a Data Automatization and Management specialist. Tymoteusz \
         is a student of BioInformatics at the Jagiellonian University in Kraków, currently pursuing his master's degree. A hobbyst piano player - explains why this app\
         exists - who knows many programming languages to write web aps as a desktop apps - mainly C++, Typescript, Python. You can always contact him using any of the\
         information or the links on this website - he answers all of them"
    },
];


/**
 * Component has a fields for description of the app,
 * created to lesser the mess in the text editor
 * @returns React Element
 */
export default function Description(): React.ReactElement {

    const render_articles = ():React.ReactElement[] | React.ReactElement =>{
        return articles.map((article, index) => <div className='Description_Article' key={index.toString() + "_About"}>
            <h4>{article.title}</h4>
            <p className='jersey-20'>{article.content}</p>
            {article.img && <img src={article.img} alt={article.title + "_photo"} />}
        </div>)
    }

  return (
    <div className='Description'>
        <h3>About The App</h3>
        <div className='Description_Context jersey-20'>
            {render_articles()}
        </div>
    </div>
  )
}
