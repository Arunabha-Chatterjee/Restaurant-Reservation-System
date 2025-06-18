import React, { useState } from 'react';

function Test(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}   // Set hover state to true when mouse enters the container
            onMouseLeave={() => setIsHovered(false)}  // Set hover state to false when mouse leaves the container
        >
            <button
                className={"bg-black w-20 h-12 text-white hover:bg-white " +
                    "hover:text-black border"}
            >
                Button
            </button>

            {isHovered && (
                <div className="options absolute">
                    <div>Option1</div>
                    <div>Option2</div>
                    <div>Option3</div>
                </div>
            )}

            <div>asasasaddscds</div>
        </div>
    );
}

export default Test;
