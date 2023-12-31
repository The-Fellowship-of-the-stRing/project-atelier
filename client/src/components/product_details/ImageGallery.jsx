import React, { useEffect, useState } from 'react';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import ExpandedView from './ExpandedView.jsx';
import '../../stylesheets/product_details/imageGallery.css';
import ImageSelect from './ImageSelect.jsx';

const ImageGallery = ({ style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [lowIndex, setLowIndex] = useState(0);
  const [highIndex, setHighIndex] = useState(7);
  const [modalState, setModalState] = useState(false);
  const handleIndex = (value) => {
    setCurrentIndex(value);
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
    setLowIndex(lowIndex + 7);
    setHighIndex(highIndex + 7);
    setCurrentIndex(lowIndex + 7);
  };
  const handlePageIndexLower = () => {
    setLowIndex(lowIndex - 7);
    setHighIndex(highIndex - 7);
    setCurrentIndex(lowIndex - 7);
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
      {modalState === true && (
        <ExpandedView
          style={style}
          handleIndex={handleIndex}
          currentIndex={currentIndex}
          handlePage={handlePage}
          lowIndex={lowIndex}
          highIndex={highIndex}
          handleModalFalse={handleModalFalse}
          nextImage={nextImage}
          previousImage={previousImage}
          handlePageIndexLower={handlePageIndexLower}
          handlePageIndexRaise={handlePageIndexRaise}
          pageCount={pageCount}
        />
      )}
      {/* removed div left spacer, not needed with corrected css styling */}
      <div className="g-images-select-container">
        {lowIndex > 0
          && (
          <IoChevronUp
            style={{ color: 'white' }}
            type="button"
            onKeyDown={handlePageIndexLower}
            tabIndex="0"
            onClick={handlePageIndexLower}
          />
          )}
        <ImageSelect
          className="g-select"
          style={style}
          handleIndex={handleIndex}
          currentIndex={currentIndex}
          handlePage={handlePage}
          lowIndex={lowIndex}
          highIndex={highIndex}
        />
        {(highIndex / 7) < pageCount
          && (
            <IoChevronDown
              style={{ color: 'white' }}
              type="button"
              onKeyDown={handlePageIndexRaise}
              tabIndex="0"
              onClick={handlePageIndexRaise}
            />
          )}
      </div>
      <div className="g-images-main-container">

        <div
          role="button"
          tabIndex="0"
          onKeyDown={handleModalTrue}
          onClick={handleModalTrue}
          aria-label="current item"
        >
          <img className="g-images-main" src={style.photos[`${currentIndex}`].url} alt="current item" />
        </div>
        {currentIndex > 0 && (
        <MdOutlineArrowBackIos
          style={{ color: 'white' }}
          type="button"
          onKeyDown={previousImage}
          tabIndex="0"
          className="g-images-select-container-prev-btn"
          onClick={previousImage}
        />
        )}
        {currentIndex < style.photos.length - 1
         && (
         <MdOutlineArrowForwardIos
           style={{ color: 'white' }}
           type="button"
           onKeyDown={nextImage}
           tabIndex="0"
           className="g-images-select-container-next-btn"
           onClick={nextImage}
         />
         )}
      </div>

    </div>
  )
    : (
      <div>
        Loading gallery images
      </div>
    );
};
export default ImageGallery;
