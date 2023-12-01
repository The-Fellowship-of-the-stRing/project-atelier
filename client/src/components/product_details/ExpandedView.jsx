import '../../stylesheets/product_details/expandedView.css';
import React, { useState } from 'react';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import ImageSelectExpand from './ImageSelectExpand.jsx';
import Pan from './Pan.jsx';

const ExpandedView = ({
  style,
  handleIndex,
  handlePage,
  currentIndex,
  lowIndex,
  highIndex,
  handleModalFalse,
  nextImage,
  previousImage,
  handlePageIndexLower,
  handlePageIndexRaise,
  pageCount,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);

  const handleZoom = (e) => {
    const dimensions = Pan.coordinate(e);
    if (isZoomed === true) {
      setIsZoomed(false);
    }
    if (isZoomed === false) {
      setMouseX(dimensions.x);
      setMouseY(dimensions.y);
      setIsZoomed(true);
    }
  };
  function panImage(event) {
    const dimension = Pan.coordinate(event);
    setMouseX(dimension.x);
    setMouseY(dimension.y);
  }
  return (
    <div className="g-expanded-overlay">
      <div className="g-expanded-modal">
        <div id="g-expanded-main-container" className="g-expanded-main-container">
          {currentIndex > 0 && !isZoomed && (
          <MdOutlineArrowBackIos
            type="button"
            onKeyDown={previousImage}
            tabIndex="0"
            className="g-images-select-container-expanded-prev-btn"
            onClick={previousImage}
          />
          )}
          <div
            role="button"
            tabIndex={0}
            onKeyDown={handleZoom}
            onClick={handleZoom}
            onMouseMove={(e) => panImage(e)}
            onFocus={(e) => panImage(e)}
            id="g-images-main-expanded"
            className="g-images-main-expanded"
            style={{
              backgroundImage: `url(${style.photos[currentIndex].url})`,
              backgroundPosition: isZoomed ? `${mouseX}% ${mouseY}%` : '',
              backgroundSize: isZoomed ? '250%' : 'contain',
            }}
            alt="current item"
          />
          {currentIndex < style.photos.length - 1
          && !isZoomed && (
            <MdOutlineArrowForwardIos
              type="button"
              onKeyDown={nextImage}
              tabIndex="0"
              className="g-images-select-container-expanded-next-btn"
              onClick={nextImage}
            />
          )}
        </div>
        <div className="g-images-select-expanded">

          {lowIndex > 0
          && !isZoomed && (
            <MdOutlineArrowBackIos
              type="button"
              onKeyDown={handlePageIndexLower}
              tabIndex="0"
              className="g-images-select-container-expanded-prev-page-btn"
              onClick={handlePageIndexLower}
            />
          )}
          {!isZoomed && (
          <ImageSelectExpand
            style={style}
            handleIndex={handleIndex}
            currentIndex={currentIndex}
            handlePage={handlePage}
            lowIndex={lowIndex}
            highIndex={highIndex}
          />
          )}
          {(highIndex / 7) < pageCount
          && !isZoomed && (
          <MdOutlineArrowForwardIos
            type="button"
            onKeyDown={handlePageIndexRaise}
            tabIndex="0"
            className="g-images-select-container-expanded-next-page-btn"
            onClick={handlePageIndexRaise}
          />
          )}
        </div>
        <AiOutlineClose
          onClick={handleModalFalse}
          onKeyDown={handleModalFalse}
          tabIndex="0"
          role="button"
          className="g-expanded-close-btn"
        />
      </div>
    </div>
  );
};
export default ExpandedView;
