import React from 'react'

const Skeleton = () => {
    const displaySkeleon = (skeletonNbr: number) => {
        const skeletons = [];
        for (let i = 0; i < skeletonNbr; i++) {
            skeletons.push(
                <div key={i} className="h-56 rounded-lg bg-gray-100 animate-pulse"></div>
            );
        }
        return skeletons;
    }

    return (
        <div className="flex flex-col bg-gray-400">
            <h1 className="text-center text-5xl font-extrabold">Nursery</h1>
            <div className="grid grid-rows-3 gap-4 p-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {displaySkeleon(14)}
            </div>
        </div>
    )
}

export default Skeleton