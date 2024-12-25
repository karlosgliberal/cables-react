import React, { useState } from "react";
import useCables from "./useCables";
const CablesSync = ({ patchDir }) => {
    const { setVariable } = useCables("cables-canvas", patchDir, {});
    const [color, setColor] = useState("#FFFFFF");
    const [text, setText] = useState("");
    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        setVariable("color", newColor);
    };
    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        setVariable("text", newText);
    };
    return (React.createElement("div", null,
        React.createElement("canvas", { id: "cables-canvas" }),
        React.createElement("input", { type: "color", value: color, onChange: handleColorChange }),
        React.createElement("input", { type: "text", value: text, onChange: handleTextChange })));
};
export default CablesSync;
