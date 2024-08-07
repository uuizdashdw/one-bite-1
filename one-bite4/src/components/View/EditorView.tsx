import { KeyboardEvent, ChangeEvent, useState, useRef, useEffect, useContext } from 'react';

// Css
import '../../css/EditorView.css';


// Context
import { TodoDispatchContext } from '../../Layout/ListLayout';

//Type
import { TodoDispatchContextType } from '../../TodoTypes';

const EditorView = (): JSX.Element => {
    
    const { onCreateNewTodoItem } = useContext<TodoDispatchContextType>(TodoDispatchContext);
    
    // Content State 
    const [content, setContent] = useState('');
    const contentRef = useRef<HTMLInputElement>(null);

    // Content State Change Event Handler
    const onChangeContentState = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setContent(value);
    }

    // Submit Todo Item
    const onSubmitTodoItem = (): void => {
        if(content !== '') {
            onCreateNewTodoItem(content);
            setContent('');
            alert('추가 되었습니다');
        } else {
            alert('새로운 TODO 를 입력해주세요');
        }
    }

    // Boolean to Guard the Press Enter Twice Error
    let submitInProgress = false;

    // Submit Todo Item by Enter Key
    const onSubmitByEnterKey = (event: KeyboardEvent<HTMLInputElement>): void => {
        if(event.key === 'Enter' && !submitInProgress) {
            event.preventDefault();
            submitInProgress = !submitInProgress;
            
            // Prevent the Keyboard Event Trigger
            setTimeout(() => {
                onSubmitTodoItem();
                setContent('');
                submitInProgress = !submitInProgress;
            }, 0);
        }
    }

    // Focusing on Target
    useEffect(() => {
        const target = contentRef.current as HTMLInputElement;
        if(content === '') target.focus();
    }, [content])

    return (
        <div className="Editor">
            <input type="text" 
                   ref={contentRef}
                   placeholder="새로운 TODO..."
                   value={content}
                   onKeyDown={onSubmitByEnterKey}
                   onChange={onChangeContentState} />
            <button className="addBtn" 
                    onClick={onSubmitTodoItem}>
                컨텐츠 추가
            </button>
        </div>
    )
}

export default EditorView;