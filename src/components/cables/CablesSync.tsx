import React, { useState } from "react";
import useCables from "./useCables";

interface CablesSyncProps {
    patchDir: string;
}

const CablesSync: React.FC<CablesSyncProps> = ({ patchDir }) => {
    const { setVariable } = useCables("cables-canvas", patchDir, {});
    const [color, setColor] = useState("#FFFFFF");
    const [text, setText] = useState("");

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setColor(newColor);
        setVariable("color", newColor);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setText(newText);
        setVariable("text", newText);
    };

    return (
        <div>
            <canvas id="cables-canvas"></canvas>
            <input type="color" value={color} onChange={handleColorChange} />
            <input type="text" value={text} onChange={handleTextChange} />
        </div>
    );
};

export default CablesSync;
