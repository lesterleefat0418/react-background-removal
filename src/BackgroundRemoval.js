import React, { useRef, useState } from 'react';
import imglyRemoveBackground from "@imgly/background-removal";

const BackgroundRemoval = () => {
  const imageRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [backgroundRemovedImage, setBackgroundRemovedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = () => {
    if (imageRef.current) {
      const file = imageRef.current.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imageSrc = event.target.result;
          setPreviewImage(imageSrc);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleBackgroundRemoval = () => {
    if (previewImage && !isLoading) {
      setIsLoading(true);
      imglyRemoveBackground(previewImage).then((blob) => {
        const url = URL.createObjectURL(blob);
        setBackgroundRemovedImage(url);
        setIsLoading(false);
      });
    }
  };

  const handleClick = () => {
    if (!isLoading && previewImage) {
      handleBackgroundRemoval();
    }
  };

  return (
    <div>
      <div className="image-preview">
        {previewImage && <img src={previewImage} alt="Preview" />}
      </div>
      <div className="image-preview">
        {backgroundRemovedImage && <img src={backgroundRemovedImage} alt="Background Removed" />}
      </div>
      <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange} />
      <button
        onClick={handleClick}
        disabled={isLoading || !previewImage}
      >
        {isLoading ? 'Removing Background...' : 'Remove Background'}
      </button>
      {isLoading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
};

export default BackgroundRemoval;