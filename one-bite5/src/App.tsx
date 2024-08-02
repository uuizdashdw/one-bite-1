import './App.css'

import { useReducer, useRef, createContext } from 'react';

// Router
import { Routes, Route } from 'react-router-dom';

// Router Elements
import HomeLayout from './Layouts/HomeLayout';
import DiaryLayout from './Layouts/DiaryLayout';
import NewLayout from './Layouts/NewLayout';
import EditLayout from './Layouts/EditLayout';
import NotFoundLayout from './Layouts/NotFoundLayout';

// Types
import { Diary, DiaryDispatchContextType } from './types';

// Reducer
import { reducer } from './reducer/Reducer';

// Mock Data
const MockData: Diary[] = [
  {
    id: 1,
    createdDate: new Date("2024-08-13").getTime(),
    emotionId: 1,
    content: '1번 일기 내용'
  },
  {
    id: 2,
    createdDate: new Date("2024-08-30").getTime(),
    emotionId: 2,
    content: '2번 일기 내용'
  },
  {
    id: 3,
    createdDate: new Date("2024-07-06").getTime(),
    emotionId: 3,
    content: '3번 일기 내용'
  }
]

const initialDispatchContextValue: DiaryDispatchContextType = {
  onCreateNewDiary: () => {},
  onUpdateDiary: () => {},
  onDeletetheDiary: () => {},
}

// Context
export const DiaryStateContext = createContext(MockData);
export const DiaryDispatchContext = createContext<DiaryDispatchContextType>(initialDispatchContextValue);

const App = (): JSX.Element => {

  const [data, disaptch] = useReducer(reducer, MockData);
  const idRef = useRef(3);

  // Create New Diary
  const onCreateNewDiary = (createdDate: number, emotionId: number, content: string): void => {
    disaptch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    });
  }

  // Update the Diary
  const onUpdateDiary = (id: number, createdDate: number, emotionId: number, content: string): void => {
    disaptch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      }
    })
  }

  // Delete the Diary
  const onDeletetheDiary = (id: number): void => {
    disaptch({
      type: "DELETE",
      id
    })
  }

  return (
    <>
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={
        { onCreateNewDiary, 
          onUpdateDiary, 
          onDeletetheDiary
        }
      }>
        <Routes>
          <Route path='/' element={<HomeLayout />} />
          <Route path='/diary/:id' element={<DiaryLayout />} />
          <Route path='/new' element={<NewLayout />} />
          <Route path='/edit/:id' element={<EditLayout />} />
          <Route path='*' element={<NotFoundLayout />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
    </>
  )
}

export default App;