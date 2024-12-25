import React from "react";
interface CablesPatchProps {
    canvasId?: string;
    patchDir: string;
    onReady?: (patch: any) => void;
}
declare const CablesPatch: React.FC<CablesPatchProps>;
export default CablesPatch;
