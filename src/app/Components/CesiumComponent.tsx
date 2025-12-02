'use client'

import { Cesium3DTileset, type Entity, type Viewer } from 'cesium';
import React from 'react';
import type { CesiumType } from '../types/cesium';
import type { Position } from '../types/position';
//NOTE: It is important to assign types using "import type", not "import"
import { dateToJulianDate } from '../example_utils/date';
//NOTE: This is required to get the stylings for default Cesium UI and controls
import 'cesium/Build/Cesium/Widgets/widgets.css';

export const CesiumComponent: React.FunctionComponent<{
    CesiumJs: CesiumType,
    positions: Position[]
}> = ({
    CesiumJs,
    positions
}) => {
    const cesiumViewer = React.useRef<Viewer | null>(null);
    const cesiumContainerRef = React.useRef<HTMLDivElement>(null);
    const addedScenePrimitives = React.useRef<Cesium3DTileset[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    // const resetCamera = React.useCallback(async () => {
    //     // Set the initial camera to look at Seattle
    //     // No need for dependancies since all data is static for this example.
    //     if (cesiumViewer.current !== null) {
    //         cesiumViewer.current.scene.camera.setView({
    //             destination: CesiumJs.Cartesian3.fromDegrees(-122.3472, 47.598, 370),
    //             orientation: {
    //               heading: CesiumJs.Math.toRadians(10),
    //               pitch: CesiumJs.Math.toRadians(-10),
    //             },
    //           });
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const cleanUpPrimitives = React.useCallback(() => {
        //On NextJS 13.4+, React Strict Mode is on by default.
        //The block below will remove all added primitives from the scene.
        addedScenePrimitives.current.forEach(scenePrimitive => {
            if (cesiumViewer.current !== null) {
                cesiumViewer.current.scene.primitives.remove(scenePrimitive);
            }
        });
        addedScenePrimitives.current = [];
    }, []);
    
    const initializeCesiumJs = React.useCallback(async () => {
        if (cesiumViewer.current !== null) {
            //Using the Sandcastle example below
            //https://sandcastle.cesium.com/?src=3D%20Tiles%20Feature%20Styling.html
            const osmBuildingsTileset = await CesiumJs.createOsmBuildingsAsync();
            
            //Clean up potentially already-existing primitives and entities.
            cleanUpPrimitives();
            cesiumViewer.current.entities.removeAll();

            //Adding tile and adding to addedScenePrimitives to keep track and delete in-case of a re-render.
            const osmBuildingsTilesetPrimitive = cesiumViewer.current.scene.primitives.add(osmBuildingsTileset);
            addedScenePrimitives.current.push(osmBuildingsTilesetPrimitive);
            
            //Position camera per Sandcastle demo
            // resetCamera();

            //We'll also add our own data here (In Philadelphia) passed down from props as an example
            positions.forEach(p => {
                cesiumViewer.current?.entities.add({
                    position: CesiumJs.Cartesian3.fromDegrees(p.lng, p.lat, (p.alt || 0) * 1000),
                    point: {
                        pixelSize: 12,
                        color: CesiumJs.Color.CYAN,
                        outlineColor: CesiumJs.Color.WHITE,
                        outlineWidth: 2,
                        heightReference: CesiumJs.HeightReference.NONE
                    },
                    // label: {
                    //     text: 'Satellite',
                    //     font: '14px Helvetica',
                    //     fillColor: CesiumJs.Color.WHITE,
                    //     outlineColor: CesiumJs.Color.BLACK,
                    //     outlineWidth: 2,
                    //     style: CesiumJs.LabelStyle.FILL_AND_OUTLINE,
                    //     pixelOffset: new CesiumJs.Cartesian2(0, -40)
                    // },
                });

                            // Add orbit path if available
            if (p.orbitPath && p.orbitPath.length > 0) {
                const orbitPositions = p.orbitPath.map(pathPoint => 
                    CesiumJs.Cartesian3.fromDegrees(pathPoint.lng, pathPoint.lat, pathPoint.alt * 1000)
                );

                cesiumViewer.current?.entities.add({
                    polyline: {
                        positions: orbitPositions,
                        width: 2,
                        material: CesiumJs.Color.YELLOW.withAlpha(0.8),
                        clampToGround: false,
                        // followSurface: false
                    }
                });
            }
            });

            // Fly to satellite position if available
            if (positions.length > 0) {
                const p = positions[0];
                cesiumViewer.current.camera.flyTo({
                    destination: CesiumJs.Cartesian3.fromDegrees(p.lng, p.lat, ((p.alt || 0) * 1000) + 10000000)
                });
            }

            //Set loaded flag
            setIsLoaded(true);

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [positions]);

    React.useEffect(() => {
        if (cesiumViewer.current === null && cesiumContainerRef.current) {
            //OPTIONAL: Assign access Token here
            //Guide: https://cesium.com/learn/ion/cesium-ion-access-tokens/
            CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

            //NOTE: Always utilize CesiumJs; do not import them from "cesium"
            cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current, {
                //Using the Sandcastle example below
                //https://sandcastle.cesium.com/?src=3D%20Tiles%20Feature%20Styling.html
                terrain: CesiumJs.Terrain.fromWorldTerrain()
            });

            //NOTE: Example of configuring a Cesium viewer
            cesiumViewer.current.clock.clockStep = CesiumJs.ClockStep.SYSTEM_CLOCK_MULTIPLIER;

            // Set zoom limits
            cesiumViewer.current.scene.screenSpaceCameraController.minimumZoomDistance = 10000000; // 1 km
            cesiumViewer.current.scene.screenSpaceCameraController.maximumZoomDistance = 500000000; // 200,000 km

        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        // Reset loaded flag when positions change to trigger re-initialization
        if (positions.length > 0) {
            setIsLoaded(false);
        }
    }, [positions]);

    React.useEffect(() => {
        if (isLoaded) return;
        initializeCesiumJs();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positions, isLoaded]);

    //NOTE: Examples of typing... See above on "import type"
    const entities: Entity[] = [];
    //NOTE: Example of a function that utilizes CesiumJs features
    const julianDate = dateToJulianDate(CesiumJs, new Date());

    return (
        <div
            ref={cesiumContainerRef}
            id='cesium-container'
            style={{height: '50%', width: '50%'}}
        />
    )
}

export default CesiumComponent