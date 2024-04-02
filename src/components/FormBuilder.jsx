import { useState } from "react";
import AddQuestionModal from "./AddQuestions";
import { questionAtom } from "../store/questionAtom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const FormBuilder = ({ close }) => {
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [error, setError] = useState('');
  const [questions,setQuestions] = useRecoilState(questionAtom);
  const navigate = useNavigate()

  const handleTextChange = (index, text) => {
   setError(''); 
    const updatedQuestions = questions.map((question, i) => 
      i === index ? { ...question, answer: text } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleCheckboxChange = (index, option) => {
   setError(''); 
    const updatedQuestions = questions.map((question, i) => {
      if (i === index) {
        const isOptionSelected = question.answer.includes(option);
        const updatedAnswer = isOptionSelected 
          ? question.answer.filter(opt => opt !== option)
          : [...question.answer, option]; 
        return { ...question, answer: updatedAnswer };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleAddNewQuestionClick = () => {
    setShowAddQuestionModal(true);
  };

  const previewAnswers = () => {
    setError(''); 
    
    const allAnswered = questions.every(question => {
      if (question.questionType === 'text') {
        return question.answer.trim() !== '';
      } else if (question.questionType === 'checkbox') {
        return question.answer.length > 0;
      }
      return false;
    });
    
    if (!allAnswered) {
      setError('Please fill in all questions to review your answers.');
      return; 
    }
    
  navigate('/preview')
  
 };
 
 

  return (
    <div className="absolute inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full px-4">
      <div className="relative top-20 mx-auto shadow-lg rounded-md bg-white max-w-md py-4 px-6">
         <div className="flex justify-end cursor-pointer" onClick={close} >x</div>
        {questions.map((question, index) => (
          <div key={index} className="my-2">
            <label>{question.questionText}</label>
            {question.questionType === 'text' && (
              <div>
                <textarea 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-4" 
                  value={question.answer} 
                  onChange={(e) => handleTextChange(index, e.target.value)} 
                  required 
                />
              </div>
            )}
            {question.questionType === 'checkbox' && question.options.map((option, optionIndex) => (
              <div className="flex items-center mb-1" key={optionIndex}>
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" 
                  checked={question.answer.includes(option)} 
                  onChange={() => handleCheckboxChange(index, option)} 
                />
                <label className="ml-2 text-sm font-medium text-gray-900">{option}</label>
              </div>
            ))}
          </div>
        ))}
         {error && <div className="text-red-500 text-center my-2">{error}</div>}
        <div className="flex justify-between">
          <button onClick={handleAddNewQuestionClick} className="cursor-pointer underline">Add New Question</button>
          <button onClick={previewAnswers} className="bg-green-300 p-2 rounded">Review my answers</button>
        </div>
        {showAddQuestionModal && (
          <AddQuestionModal
            onClose={() => setShowAddQuestionModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
