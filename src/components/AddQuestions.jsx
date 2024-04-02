import { useState } from "react";
import { useRecoilState } from "recoil";
import { questionAtom } from "../store/questionAtom";

const AddQuestionModal = ({ onClose }) => {
  const [questionType, setQuestionType] = useState('checkbox');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useRecoilState(questionAtom);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleAddQuestion = () => {
    setError('');
    if (!questionText.trim()) {
      setError('Question text is required.');
      return;
    }
    const filteredOptions = options.filter(option => option.trim() !== '');

    if (questionType === 'checkbox' && filteredOptions.length < 2) {
      setError('Please add at least 2 options for a checkbox question.');
      return;
    }

    let answer = questionType === 'checkbox' ? [] : '';
    const newQuestion = { questionText, questionType, options: filteredOptions, answer: answer };

    setQuestions([...questions, newQuestion]);

    onClose(); 
  };


  return (
    <div className="absolute inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full px-4">
      <div className="relative mx-auto shadow-lg rounded-md bg-white max-w-md py-4 px-6">
        <div>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="checkbox">Checkbox List</option>
            <option value="text">Text</option>
          </select>
        </div>
        <div className="my-2">
          <input type="text" value={questionText} onChange={(e) => { setQuestionText(e.target.value); setError(''); }} placeholder="Type Question here" className="w-full h-5 p-4 bg-gray-100 border-gray-300 rounded" required/>
        </div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <input type="text" value={option} onChange={(e) => { handleOptionChange(index, e); setError(''); }} placeholder="Add Answer Option" className="w-full h-5 p-4 bg-gray-100 border-gray-300 rounded"/>
          </div>
        ))}
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={addOption} className="mt-2">+ Add another answer</button>
        <div className="flex justify-between mt-4">
          <button onClick={handleAddQuestion}>Add Question</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
