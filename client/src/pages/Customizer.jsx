import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';

import { fadeAnimation, slideAnimation } from '../config/motion';
import { download } from '../assets';

import { AIPicker, ColorPicker, CustomButton, Tab, FilePicker } from '../components';

const Customizer = () => {
    const snap = useSnapshot(state);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState('');
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker onClose={() => setActiveEditorTab('')} />;
            case 'filepicker':
                return (
                    <FilePicker
                        onClose={() => setActiveEditorTab('')}
                        file={file}
                        setFile={setFile}
                        readFile={readFile}
                    />
                );
            case 'aipicker':
                return (
                    <AIPicker
                        onClose={() => setActiveEditorTab('')}
                        prompt={prompt}
                        setPrompt={setPrompt}
                        generatingImg={generatingImg}
                        setGeneratingImg={setGeneratingImg}
                        handleSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    const handleSubmit = async (type) => {
        if (!prompt) return alert('Please enter a prompt');

        try {
            setGeneratingImg(true);
            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            // Handle HTTP errors
            if (!response.ok) {
                let errorMsg = `AI request failed (${response.status})`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error?.message || errorMsg;
                } catch (e) {
                    // Couldn't parse JSON error
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();

            if (data?.photo) {
                handleDecals(type, `data:image/png;base64,${data.photo}`);
            } else {
                throw new Error('No image data returned from API');
            }
        } catch (error) {
            console.error('AI Image generation error:', error);
            alert(`AI Error: ${error.message}`);
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab('');
        }
    };
    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    };

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case 'stylishShirt':
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        setActiveFilterTab((prevState) => ({
            ...prevState,
            [tabName]: !prevState[tabName],
        }));
    };

    const readFile = (type) => {
        reader(file).then((result) => {
            handleDecals(type, result);
            setActiveEditorTab('');
        });
    };

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    {/* Left Panel with Editor Tabs */}
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation('left')}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => setActiveEditorTab(tab.name)}
                                    />
                                ))}
                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    {/* Top-Right Go Back Button */}
                    <motion.div className="absolute top-5 right-5 z-10" {...fadeAnimation}>
                        <CustomButton
                            type="filled"
                            title="Go Back"
                            handleClick={() => (state.intro = true)}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>

                    {/* Bottom Filter Tabs */}
                    <motion.div className="filtertabs-container" {...slideAnimation('up')}>
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
