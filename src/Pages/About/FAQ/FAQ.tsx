import React, { ReactElement } from 'react'
import { FAQ_Question_type } from '../../../Utils/FAQ_questions'

interface Question_props{
    title:string,
    answer: string | React.ReactElement,
}

interface FAQ_props{
    questions:Array<FAQ_Question_type>
}

/**
 * Question component, uses state to open & close on click
 * @param props for question 
 * @returns React Element
 */
function Question({title,answer}:Question_props):ReactElement{

    const [open,setOpen] = React.useState<boolean>(false);

    return( 
        <div className={`FAQ_question ${open ? "FAQ_open" : "" }`} onClick={()=>{setOpen(curr => !curr)}}>
                <h5>★</h5>
                <div className='FAQ_question_container' >
                    <h4 className='jersey-15'>{title}</h4>
                    <p className='jersey-20'>{answer}</p>
                </div>
        </div>
    );
}

/**
 * FAQ element renders a set of questions, defined by given prop "questions"
 * @param questions Array of questions
 * @returns React Element
 */
export default function FAQ({questions}:FAQ_props):ReactElement {

    const renderQuestions = ():ReactElement[] | ReactElement =>{
        return questions.map((question,index) =>
            <Question key={index.toString() + "_FAQ"} title={question.title} answer={question.answer} />
        )
    }

  return (
    <div className='FAQ'>
        <h3>FAQ - Frequently Asked Questions</h3>
        <div className='FAQ_container' data-testid="FAQ_container_for_questions">
            {renderQuestions()}
        </div>
    </div>
  )
}
