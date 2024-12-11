/// <reference types="react-scripts" />

declare module '*.xlsx' {
    const src: string;
    export default src;
}

declare module '*.vcf.gz' {
    const src: string;
    export default src;
}


declare module '*.csv' {
    const src: string;
    export default src;
}
