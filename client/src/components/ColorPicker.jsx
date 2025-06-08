import React, {useRef} from 'react'
import {useSnapshot} from "valtio";
import state from "../store/index.js";
import {SketchPicker} from "react-color";
import useClickOutside from "/src/hooks/useClickOutside.js"

const ColorPicker = ({onClose}) => {
    const snap = useSnapshot(state);
    const pickerRef = useRef(null);

    useClickOutside(pickerRef, onClose);
    return (
        <div ref={pickerRef} className={"absolute left-full ml-3"}>
            <SketchPicker
                color={snap.color}
                disableAlpha
                onChange = {(color) => state.color = color.hex}
            />
        </div>
    )
}
export default ColorPicker
