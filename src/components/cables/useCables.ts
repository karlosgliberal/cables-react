import { useEffect, useRef } from "react";

const useCables = (canvasId: string, patchDir: string, options: any) => {
    const cablesInstance = useRef<any>(null);

    useEffect(() => {
        if (window.CABLES) {
            window.CABLES.patchLoader.loadPatch({
                patch: patchDir,
                prefixAssetPath: "",
                onPatchLoaded: (patch: any) => {
                    cablesInstance.current = patch;
                    if (options?.onReady) {
                        options.onReady(patch);
                    }
                },
            });
        }

        return () => {
            cablesInstance.current?.destroy?.();
        };
    }, [canvasId, patchDir]);

    const setVariable = (name: string, value: any) => {
        if (cablesInstance.current) {
            cablesInstance.current.variables.setVariable(name, value);
        }
    };

    return { setVariable };
};

export default useCables;
