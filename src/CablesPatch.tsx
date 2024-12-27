"use client"; // <-- si quieres asegurar modo cliente

import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState
} from "react";

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
  selector?: string;
  className?: string;
  /**
   * key => callbackName en patch.config
   * val => function(data: any): void
   */
  configCallbacks?: Record<string, (data: any) => void>;
}

const CablesPatch = forwardRef<CablesPatchRef, CablesPatchProps>((props, ref) => {
  const {
    patchDir = "/patch/",
    width = "100%",
    height = "100%",
    selector,
    className,
    configCallbacks,
  } = props;

  const [cablesInitialized, setCablesInitialized] = useState(false);
  const patchInstanceRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = patchDir + "patch.js";
    script.async = true;

    script.onload = () => {
      if (window.CABLES) {
        initPatch();
      } else {
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

  useEffect(() => {
    if (selector && cablesInitialized) {
      callPatchFunction("patchFunctionSelectorEmociones", selector);
    }
  }, [selector, cablesInitialized]);

  function initPatch() {
    const opts = {
      patch: window.CABLES?.exportedPatch,
      onPatchLoaded: () => console.log("[CablesPatch] Patch loaded"),
      onFinishedLoading: () => console.log("[CablesPatch] Patch finished loading"),
    };

    const patch = new window.CABLES.Patch(opts);
    patchInstanceRef.current = patch;

    // Asignar callbacks
    if (patch.config && configCallbacks) {
      for (const [callbackName, fn] of Object.entries(configCallbacks)) {
        patch.config[callbackName] = fn;
      }
    }

    setCablesInitialized(true);
  }

  function callPatchFunction(fnName: string, ...args: unknown[]) {
    const p = patchInstanceRef.current;
    if (!p) return;
    if (p.config && typeof p.config[fnName] === "function") {
      p.config[fnName](...args);
    } else {
      console.warn(`[CablesPatch] function '${fnName}' not found in patch.config`);
    }
  }

  useImperativeHandle(ref, () => ({
    callFunction(fnName: string, ...args: unknown[]) {
      callPatchFunction(fnName, ...args);
    },
    getVar(varName: string) {
      return patchInstanceRef.current?.getVar(varName) ?? null;
    },
    setVarValue(varName: string, newValue: any) {
      const v = patchInstanceRef.current?.getVar(varName);
      if (v) v.setValue(newValue);
    },
    destroy() {
      if (patchInstanceRef.current?.destroy) {
        patchInstanceRef.current.destroy();
      }
    },
  }));

  return (
    <canvas
      id="glcanvas"
      className={className}
      style={{ width, height }}
      tabIndex={1}
    />
  );
});

CablesPatch.displayName = "CablesPatch";
export default CablesPatch;