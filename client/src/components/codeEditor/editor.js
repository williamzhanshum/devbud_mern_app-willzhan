import '../mainStyles/mainRoom.css'
import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';

var placeholderForCodeEditor;

const MainEditor = ({ language, codeChannel, code, setCodeToServer }) => {

    const onChangeHandler = (e) => {
        codeChannel.sendMessage({ text: e.target.value });
        setCodeToServer(e.target.value)
    }

    if (language === "python") placeholderForCodeEditor = "Please enter Python code."
    else if (language === "java") placeholderForCodeEditor = "Please enter Java code."
    else if (language === "js") placeholderForCodeEditor = "Please enter Js code."

    return (
        <>
            <div style={{ overflow: 'auto', height: '500px', width:"100%" }}>
                <CodeEditor
                    value={code.text}
                    language={language}
                    placeholder={placeholderForCodeEditor}
                    onChange={onChangeHandler}
                    padding={20}
                    // className='code-editor'
                    style={{
                        fontSize: '0.8rem',
                        width: '100%',
                        borderRadius: '20px',
                        backgroundColor: '#f5f5f5',
                        height: 'auto',
                        color: 'grey',
                        minHeight: '500px'
                    }}
                />
            </div>
        </>
    )
}

export default MainEditor;