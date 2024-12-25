import React from "react";
import useCables from "./useCables";
const CablesPatch = ({ canvasId = "cables-canvas", patchDir, onReady }) => {
    const { setVariable } = useCables(canvasId, patchDir, { onReady });
    return React.createElement("canvas", { id: canvasId });
};
export default CablesPatch;
