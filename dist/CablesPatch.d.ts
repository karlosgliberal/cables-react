import React from "react";
declare global {
    interface Window {
        CABLES: any;
    }
}
export interface CablesPatchRef {
    callFunction(fnName: string, ...args: unknown[]): void;
    getVar(varName: string): any;
    setVarValue(varName: string, newValue: any): void;
    destroy(): void;
}
export interface CablesPatchProps {
    patchDir?: string;
    width?: string;
    height?: string;
    className?: string;
    configCallbacks?: Record<string, (data: any) => void>;
}
declare const CablesPatch: React.ForwardRefExoticComponent<CablesPatchProps & React.RefAttributes<CablesPatchRef>>;
export default CablesPatch;
