export {}; // Marca este archivo como un módulo externo

declare global {
    interface Window {
        CABLES: any; // Cambia `any` a un tipo más específico si es necesario
    }
}