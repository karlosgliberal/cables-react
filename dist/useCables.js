import { useEffect, useRef } from "react";
const useCables = (canvasId, patchDir, options) => {
    const cablesInstance = useRef(null);
    useEffect(() => {
        if (window.CABLES) {
            window.CABLES.patchLoader.loadPatch({
                patch: patchDir,
                prefixAssetPath: "",
                onPatchLoaded: (patch) => {
                    cablesInstance.current = patch;
                    if (options === null || options === void 0 ? void 0 : options.onReady) {
                        options.onReady(patch);
                    }
                },
            });
        }
        return () => {
            var _a, _b;
            (_b = (_a = cablesInstance.current) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
    }, [canvasId, patchDir]);
    const setVariable = (name, value) => {
        if (cablesInstance.current) {
            cablesInstance.current.variables.setVariable(name, value);
        }
    };
    return { setVariable };
};
export default useCables;
