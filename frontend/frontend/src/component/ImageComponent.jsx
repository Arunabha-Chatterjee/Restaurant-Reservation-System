import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageComponent = () => {
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8080/product/852", { responseType: "blob" }) // Fetch image as blob
            .then((response) => {
                const imageUrl = URL.createObjectURL(response.data); // Convert blob to URL
                setImageSrc(imageUrl);
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
            });
    }, []); // Runs only on mount

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt="Food Item" className="w-64 h-64" />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ImageComponent;
