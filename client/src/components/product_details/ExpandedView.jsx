import '../../stylesheets/product_details/expandedView.css';
import React, { useEffect, useState } from 'react';
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
      setZoomPoint([dimensions.x * 2.5, dimensions.y * 2.5]);
      setIsZoomed(true);
    }
  };
  function panImage(event) {
    // Adjust this value to control the buffer area around the frame
    // const buffer = 10;

    if (isZoomed === true) {
      const container = document.getElementById('g-images-main-expanded-container');
      const img = document.getElementById('g-images-main-expanded');
      const containerRect = container.getBoundingClientRect();
      const imageRect = img.getBoundingClientRect();
      const quadrantHandleX = event.clientX - containerRect.left - container.clientWidth / 2;
      const quadrantHandleY = event.clientY - containerRect.top - container.clientHeight / 2;
      const mouseX = event.clientX - imageRect.left;
      const mouseY = event.clientY - imageRect.top;
      console.log("quadrantx is at: ", quadrantHandleX);
      const move_X = mouseX - quadrantHandleX;
      const  move_Y = mouseY - quadrantHandleY;
      console.log('Image is at: ', mouseX, mouseY);
      console.log("You're going to translate to: ", move_X, move_Y);
      // img.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
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
          <button type="button" className="g-images-select-container-expanded-prev-btn" onClick={previousImage}>
            {'<'}
          </button>
          )}
          <div id="g-images-main-expanded-container" className="g-images-main-expanded-container" role="button" tabIndex={0} onKeyDown={handleZoom} onClick={handleZoom}>
            <img onMouseMove={(e) => panImage(e)} onFocus={(e) => panImage(e)} id="g-images-main-expanded" className="g-images-main-expanded" src={style.photos[`${currentIndex}`].url} alt="current item" />
          </div>
          {currentIndex < style.photos.length - 1 && <button type="button" className="g-images-select-container-expanded-next-btn" onClick={nextImage}>{'>'}</button>}
        </div>
        <div className="g-images-select-expanded">

          {lowIndex > 0
          && (
          <button
            type="button"
            onClick={handlePageIndexLower}
          >
            Previous Page
          </button>
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
          <button type="button" onClick={handlePageIndexRaise}>
            Next Page
          </button>
          )}
        </div>
        <button onClick={handleModalFalse} type="button"> Exit Expanded View </button>
      </div>
    </div>
  );
};
export default ExpandedView;
