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
  const [zoomPoint, setZoomPoint] = useState([]);

  const handleZoom = (e) => {
    console.log('zoom occurred');
    const dimensions = Pan.coordinate(e);
    let xTranslate = dimensions.x;
    let yTranslate = dimensions.y;
    const Image = document.getElementById('g-images-main-expanded');
    if (isZoomed === true) {
      console.log('dimensions x: ', xTranslate, ' dimensions y: ', yTranslate);
      Image.style.scale = 1;
      Image.style.transform = `translate(${0}px, ${0}px)`;
      setIsZoomed(false);
    }
    if (isZoomed === false) {
      xTranslate = Image.clientWidth / 2 - dimensions.x;
      yTranslate = Image.clientHeight / 2 - dimensions.y;
      Image.style.transform = `translate(${xTranslate}px, ${yTranslate}px)`;
      Image.style.scale = 2.5;
      setZoomPoint([dimensions.x,dimensions.y]);
      setIsZoomed(true);
    }
  };
  function panImage(event) {
    // Adjust this value to control the buffer area around the frame
    // const buffer = 10;

    if (isZoomed === true) {
      console.log(zoomPoint);
      const container = document.getElementById('g-images-main-expanded-container');
      const img = document.getElementById('g-images-main-expanded');
      const containerRect = container.getBoundingClientRect();
      const imageRect = img.getBoundingClientRect();
      const quadrantHandleX = 10/(event.clientX - containerRect.left - container.clientWidth / 2);
      const quadrantHandleY = 10/(event.clientY - containerRect.top - container.clientHeight / 2);
      const mouseX = event.clientX - imageRect.left;
      const mouseY = event.clientY - imageRect.top;
<<<<<<< Updated upstream
      console.log('quadrantx is at: ', quadrantHandleX);
      const move_X = mouseX - quadrantHandleX;
      const move_Y = mouseY - quadrantHandleY;
=======
      console.log("quadrantx is at: ", quadrantHandleX);
      const move_X = zoomPoint[0] - quadrantHandleX;
      const move_Y = zoomPoint[1] - quadrantHandleY;
>>>>>>> Stashed changes
      console.log('Image is at: ', mouseX, mouseY);
      console.log('Zoompoint is at: ' ,zoomPoint[0],zoomPoint[1]);
      console.log("You're going to translate to: ", move_X, move_Y);
      img.style.transform = `translate(${move_X}px, -${move_Y}px)`;
      setZoomPoint([move_X,move_Y])
    }
    // const maxX = img.clientWidth - container.clientWidth;
    // const maxY = img.clientHeight - container.clientHeight;

    // console.log('image dimensions: ', img.clientWidth, img.clientHeight);
    // const xPercentage = (mouseX - buffer) / (container.clientWidth - buffer * 2);
    // const yPercentage = (mouseY - buffer) / (container.clientHeight - buffer * 2);

    // const offsetX = Math.min(Math.max(0, xPercentage * maxX), maxX);
    // const offsetY = Math.min(Math.max(0, yPercentage * maxY), maxY);
    // console.log("x: ", offsetX);
    // console.log("y: ", offsetY);
  }
  return (
    <div className="g-expanded-overlay">
      <div className="g-expanded-modal">
        <div className="g-expanded-main-container">
          {currentIndex > 0 && (
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
            style={{ backgroundImage: `url(${style.photos[currentIndex].url})` }}
            alt="current item"
          />
          {currentIndex < style.photos.length - 1
          && (
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
          && (
            <MdOutlineArrowBackIos
              type="button"
              onKeyDown={handlePageIndexLower}
              tabIndex="0"
              className="g-images-select-container-expanded-prev-page-btn"
              onClick={handlePageIndexLower}
            />
          )}
          <ImageSelectExpand
            style={style}
            handleIndex={handleIndex}
            currentIndex={currentIndex}
            handlePage={handlePage}
            lowIndex={lowIndex}
            highIndex={highIndex}
          />
          {(highIndex / 7) < pageCount
          && (
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
