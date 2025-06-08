import React, { useRef } from 'react';
import CustomButton from './CustomButton.jsx';
import useClickOutside from '/src/hooks/useClickOutside.js';

const AiPicker = ({ prompt, setPrompt, generatingImg, handleSubmit, onClose }) => {
    const pickerRef = useRef(null);
    useClickOutside(pickerRef, onClose);

    return (
        <div ref={pickerRef} className="aipicker-container">
      <textarea
          placeholder="Ask AI"
          className="aipicker-textarea"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (prompt.trim()) handleSubmit('logo');
              }
          }}
      />

            <div className="flex flex-wrap gap-3 mt-2">
                {generatingImg ? (
                    <CustomButton
                        type="outline"
                        title="Asking AI..."
                        customStyles="text-xs"
                        disabled
                    />
                ) : (
                    <>
                        <CustomButton
                            type="outline"
                            title="AI Logo"
                            handleClick={() => {
                                if (prompt.trim()) handleSubmit('logo');
                            }}
                            customStyles="text-xs"
                        />
                        <CustomButton
                            type="outline"
                            title="AI Full"
                            handleClick={() => {
                                if (prompt.trim()) handleSubmit('full');
                            }}
                            customStyles="text-xs"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AiPicker;
