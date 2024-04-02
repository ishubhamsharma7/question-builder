import React from 'react'
import { useRecoilValue } from 'recoil';
import { questionAtom } from '../store/questionAtom';

const Preview = () => {
   const questions = useRecoilValue(questionAtom)

   return (
      <div className="p-4">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <div className="font-bold mb-2"><span className='mr-1'>Q.</span>{question.questionText}</div>
            {
               question.questionType === 'text' && (
               <p className="text-gray-700">{question.answer}</p>
               )
            }
            {
               question.questionType === 'checkbox' && (
               <ul className="list-disc ml-5 text-gray-700">
                  {
                     question.answer.map((option, optionIndex) => (
                        <li key={optionIndex}>{option}</li>
                     ))
                  }
               </ul>
               )
            }
          </div>
        ))}
      </div>
    );
}

export default Preview