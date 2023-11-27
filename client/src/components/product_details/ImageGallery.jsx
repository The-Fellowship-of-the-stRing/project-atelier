import React, { useEffect, useState } from 'react';
import ExpandedView from './ExpandedView.jsx';
import '../../stylesheets/product_details/imageGallery.css';
import ImageSelect from './ImageSelect.jsx';

const ImageGallery = ({ style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [lowIndex, setLowIndex] = useState(0);
  const [highIndex, setHighIndex] = useState(7);
  const [modalState, setModalState] = useState(false);
  const handleIndex = async (value) => {
    await setCurrentIndex(value);
  };
  const handlePage = () => {
    setPageCount(pageCount + 1);
  };
  const previousImage = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const nextImage = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const handlePageIndexRaise = () => {
    console.log('Raising button worked');
    setLowIndex(lowIndex + 7);
    setHighIndex(highIndex + 7);
  };
  const handlePageIndexLower = () => {
    console.log('Lowering button worked');
    setLowIndex(lowIndex - 7);
    setHighIndex(highIndex - 7);
  };
  const handleModalTrue = () => {
    setModalState(true);
  };
  const handleModalFalse = () => {
    setModalState(false);
  };
  useEffect(() => {
    setCurrentIndex(0);
    if (style) {
      setPageCount(Math.ceil(style.photos.length / 7));
    }
  }, [style]);

  return style ? (
    <div className="g-images-container">
      <div className="g-images-main-container">
        {currentIndex > 0 && (
        <button type="button" style={{ zIndex: 2 }} onClick={previousImage}>
          Previous Image
        </button>
        )}
        <div className="g-images-select-container">
          {lowIndex > 0
          && (
          <button
            type="button"
            onClick={handlePageIndexLower}
          >
            Previous Page
          </button>
          )}
          <ImageSelect
            style={style}
            handleIndex={handleIndex}
            currentIndex={currentIndex}
            handlePage={handlePage}
            lowIndex={lowIndex}
            highIndex={highIndex}
          />
          {(highIndex / 7) < pageCount
          && (
          <button type="button" onClick={handlePageIndexRaise}>
            Next Page
          </button>
          )}
        </div>
        <img onClick={handleModalTrue} className="g-images-main" src={style.photos[`${currentIndex}`].url} />
        {currentIndex < style.photos.length - 1
        && (
        <button type="button" onClick={nextImage}>
          Next Image
        </button>
        )}
      </div>
      {modalState === true && (
      <ExpandedView
        style={style}
        handleIndex={handleIndex}
        currentIndex={currentIndex}
        handlePage={handlePage}
        lowIndex={lowIndex}
        highIndex={highIndex}
      />
      )}
    </div>
  )
    : (
      <div>
        Loading gallery images
      </div>
    );
};
export default ImageGallery;
