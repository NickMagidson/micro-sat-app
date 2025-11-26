'use client'

import dynamic from 'next/dynamic';
import React from 'react';
import type { CesiumType } from '../types/cesium';
import type { Position } from '../types/position';

const CesiumDynamicComponent = dynamic(() => import('./CesiumComponent'), {
    ssr: false
});

export const CesiumWrapper:React.FunctionComponent<{
    positions: Position[]
}> = ({
    positions
}) => {
    const [CesiumJs, setCesiumJs] = React.useState<CesiumType | null>(null);
    
    React.useEffect(() => {
        if (CesiumJs !== null) return
        const CesiumImportPromise = import('cesium');
        Promise.all([CesiumImportPromise]).then((promiseResults) => {
            const { ...Cesium } = promiseResults[0];
            setCesiumJs(Cesium);
        });
    }, [CesiumJs]);

    return (
        CesiumJs ? (
            <CesiumDynamicComponent CesiumJs={CesiumJs} positions={positions} />
        ) : (
            <div className="h-full w-full bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Loading Cesium...</p>
                </div>
            </div>
        )
    );
}

export default CesiumWrapper;