import React from 'react';
import cl from './LoaderMini.module.css';

const LoaderMini = () => {
    return (
        <div className={cl.loaderMini}>
            <svg className={cl.svgLoader} viewBox="0 0 100 100" width="5em" height="5em">
                <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#3392FF" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
            </svg>
        </div>
    );
};

export default LoaderMini;