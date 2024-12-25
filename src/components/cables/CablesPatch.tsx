import React from "react";
import useCables from "./useCables";

interface CablesPatchProps {
    canvasId?: string;
    patchDir: string;
    onReady?: (patch: any) => void;
}

const CablesPatch: React.FC<CablesPatchProps> = ({ canvasId = "cables-canvas", patchDir, onReady }) => {
    const { setVariable } = useCables(canvasId, patchDir, { onReady });

    return <canvas id={canvasId}></canvas>;
};

export default CablesPatch;
