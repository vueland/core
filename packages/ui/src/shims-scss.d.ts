declare module '*.scss' {
    // Для CSS Modules с :export
    const classes: any
    export default classes
}

// Для прямого импорта значений из :export
declare module '*.scss?inline' {
    const content: string
    export default content
}

// Для CSS Modules (если используете .module.scss)
declare module '*.module.scss' {
    const classes: { readonly [key: string]: string }
    export default classes
}
