import React, { ReactElement } from 'react'

interface FAQ_question{
    title:string,
    answer: string | React.ReactElement
}

interface Question_props{
    title:string,
    answer: string | React.ReactElement,
}

const questions:FAQ_question[] = [
    {
        title:"Are there any cookies, or following robots on this website? If so why are they like this and not like that",
        answer: <>No, Piano-Blocks-App does not use any cookies or tracking devices. The only used localizing script is <a href='https://vercel.com/docs/analytics/quickstart' target='_blank'>Vercel Analitics</a>
        , which is used to collect following data: country origin of a request, subpages visited (like /Play, /Docs etc.), and number of requests. No target advertising data is collected
        </>
    },
    {
        title:"The app lags and performes poorly during playing, what can I do?",
        answer:<>Easiest way to improve performance is to use "Black-n-White" preset in configurations. If you need your own configuration of visuals, set the Effects to None, 
            Block-Shadow-Radius to 0, and switch off sound. Also, faster speed helps to improve performance. If the app still lags through playthrough, try playing it once, 
            then replaying it, without refreshing the page. The replay should be in a much better performance.
        </>
    },
    {
        title:"I have some feature requests for the app, how can I propose them?",
        answer:<>Please go to the <a href='https://github.com/tzmcion/ReactPianoPlayer' target='_blank'>Github Repository</a> of this project, and request a feature. If you believe you can implement the feature yourself, you can contact
        the app developer(s) through instagram, email, or linkedin. Contact data is displayed at the bottom of the About subpage</>
    }
];

function Question({title,answer}:Question_props):ReactElement{

    const [open,setOpen] = React.useState<boolean>(false);

    return( 
        <div className={`FAQ_question ${open ? "FAQ_open" : "" }`} onClick={()=>{setOpen(curr => !curr)}}>
                <h5>★</h5>
                <div className='FAQ_question_container'>
                    <h4 className='jersey-15'>{title}</h4>
                    <p className='jersey-20'>{answer}</p>
                </div>
        </div>
    );
}

export default function FAQ():ReactElement {

    const renderQuestions = ():ReactElement[] | ReactElement =>{
        return questions.map((question,index) =>
            <Question key={index.toString() + "_FAQ"} title={question.title} answer={question.answer} />
        )
    }

  return (
    <div className='FAQ'>
        <h3>FAQ - Frequently Asked Questions</h3>
        <div className='FAQ_container'>
            {renderQuestions()}
        </div>
    </div>
  )
}
