"use client";
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
const CablesPatch = forwardRef((props, ref) => {
    const { patchDir = "/patch/", width = "100%", height = "100%", className, configCallbacks, } = props;
    const [cablesInitialized, setCablesInitialized] = useState(false);
    const patchInstanceRef = useRef(null);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = patchDir + "patch.js";
        script.async = true;
        script.onload = () => {
            if (window.CABLES) {
                initPatch();
            }
            else {
                console.error("[CablesPatch] window.CABLES not defined");
            }
        };
        script.onerror = () => {
            console.error("[CablesPatch] could not load patch.js");
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
            if (patchInstanceRef.current?.destroy) {
                patchInstanceRef.current.destroy();
            }
        };
    }, [patchDir]);
    function initPatch() {
        const opts = {
            patch: window.CABLES?.exportedPatch,
            onPatchLoaded: () => console.log("[CablesPatch] Patch loaded"),
            onFinishedLoading: () => console.log("[CablesPatch] Patch finished loading"),
        };
        const patch = new window.CABLES.Patch(opts);
        patchInstanceRef.current = patch;
        // Asignar callbacks (si existen)
        if (patch.config && configCallbacks) {
            for (const [callbackName, fn] of Object.entries(configCallbacks)) {
                patch.config[callbackName] = fn;
            }
        }
        setCablesInitialized(true);
    }
    function callPatchFunction(fnName, ...args) {
        const p = patchInstanceRef.current;
        if (!p)
            return;
        if (p.config && typeof p.config[fnName] === "function") {
            p.config[fnName](...args);
        }
        else {
            console.warn(`[CablesPatch] function '${fnName}' not found in patch.config`);
        }
    }
    useImperativeHandle(ref, () => ({
        callFunction(fnName, ...args) {
            callPatchFunction(fnName, ...args);
        },
        getVar(varName) {
            return patchInstanceRef.current?.getVar(varName) ?? null;
        },
        setVarValue(varName, newValue) {
            const v = patchInstanceRef.current?.getVar(varName);
            if (v)
                v.setValue(newValue);
        },
        destroy() {
            if (patchInstanceRef.current?.destroy) {
                patchInstanceRef.current.destroy();
            }
        },
    }));
    return (React.createElement("canvas", { id: "glcanvas", className: className, style: { width, height }, tabIndex: 1 }));
});
CablesPatch.displayName = "CablesPatch";
export default CablesPatch;
