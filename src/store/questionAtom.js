import { atom, selector } from "recoil";

export const questionAtom = atom({
    key:'questionAtom',
    default: [
      {
        questionText: 'Please tell us about yourself',
        questionType: 'text',
        options: [],
        answer : ''
      },
      {
        questionText: 'Please select the languages you know',
        questionType: 'checkbox',
        options: ['Angular', 'React', 'C#', 'Other'],
        answer: []
      }
    ]

})