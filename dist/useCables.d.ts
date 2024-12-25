declare const useCables: (canvasId: string, patchDir: string, options: any) => {
    setVariable: (name: string, value: any) => void;
};
export default useCables;
