import React from 'react'
import BootsOnRock from '../assets/boots-on-rock.jpg'
import BootMountain from '../assets/boot-mountain.jpg'
import KidHiking from '../assets/kid-hiking.jpg'
import HikingStep from '../assets/hiking-zoom.jpg'
import ImageGridCell from './ImageGridCell'

export default function ImageGrid() {
    return (
        <div className="grid grid-cols-4 grid-rows-2 w-full h-96 gap-3 mt-3">
            <div className="col-span-2 row-span-2 bg-gray-500">
                <ImageGridCell image={BootsOnRock} title={"Powerful"} description={'Our boots will boost your power on uneven rocks'}/>
            </div>
            <div className="row-span-2 bg-green-300">
                <ImageGridCell image={BootMountain} title={"Stiff"} description={'Our boots will boost your power on uneven rocks'}/>
            </div>
            <div className="bg-sky-900">
                <ImageGridCell image={KidHiking} title={"Mature"} description={'Even kids can join your journey'}/>
            </div>
            <div className="bg-gray-500">
                <ImageGridCell image={HikingStep} title={"Charming"} description={'We will cover your every step'}/>
            </div>
        </div>
    )
}
