import React from 'react';
import ImageUploading from 'react-images-uploading';
import { FaPlus } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

const UploadImage = ({
  images, handleImageChange, maxNumber, showAddImage,
}) => (
  <>
    <div className="l-add-review-section-title">Upload your photos (optional)</div>
    <ImageUploading
      multiple
      value={images}
      onChange={handleImageChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          {images.length > 0 && (
            <button type="button" onClick={onImageRemoveAll} className="l-add-review-image-btn-all">Remove all images</button>
          )}
          <div className="l-add-review-thumbnails">
            {showAddImage && (
              <button
                type="button"
                aria-label="Upload Image"
                data-testid="image-uploader"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
              // eslint-disable-next-line react/jsx-props-no-spreading
                {...dragProps}
                className="l-add-review-add-image"
              >
                <FaPlus />
              </button>
            )}
            {imageList.map((image, index) => (
              <div key={image.data_url} className="image-item">
                <img src={image.data_url} alt="product-thumbnail" width="100" className="l-add-review-single-thumbnail" />
                <div className="image-item__btn-wrapper">
                  <button type="button" onClick={() => onImageUpdate(index)} className="l-add-review-image-btn"><FiEdit /></button>
                  <button type="button" onClick={() => onImageRemove(index)} className="l-add-review-image-btn"><FaRegTrashAlt /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  </>
);

export default UploadImage;
