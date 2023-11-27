import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Header from './form/Header';
import OverallRating from './form/OverallRating';
import Recommend from './form/Recommend';
import Characteristics from './form/Characteristics';
import Summary from './form/Summary';
import Body from './form/Body';
import UploadImage from './form/UploadImage';
import Nickname from './form/Nickname';
import Email from './form/Email';
import FieldErrors from './form/FieldErrors';

import characteristics from '../../lib/characteristics.js';
import factorDefaults from '../../lib/factorDefaults.js';

import '../../stylesheets/ratings_review/addReview.css';

const AddReview = ({
  handleModal, itemName, totals, updateItemReviews,
}) => {
  const [images, setImages] = useState([]);
  const [overall, setOverall] = useState(0);
  const [ratingDef, setRatingDef] = useState('');
  const [recommend, setRecommend] = useState('Yes');
  const [charCount, setCharCount] = useState(50);
  const [summary, setSummary] = useState('');
  const [formBody, setFormBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectOption, setSelectOption] = useState(false);
  const [factorRating, setFactorRating] = useState(factorDefaults);
  const [showAddImage, setShowAddImage] = useState(true);

  const maxNumber = 5;

  const options = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

  const factorOptions = Object.keys(totals.characteristics);

  const updateRating = (value) => {
    setOverall(value);
    setRatingDef(options[value - 1]);
  };

  const onOptionChange = (e) => {
    setRecommend(e.target.value);
  };

  const checkIfSelected = () => {
    for (let i = 0; i < factorOptions.length; i += 1) {
      if (factorRating[factorOptions[i]].value === 0) {
        setSelectOption(true);
        break;
      } else {
        setSelectOption(false);
      }
    }
  };

  const onFactorChange = (e, factor, text) => {
    const { value } = e.target;
    setFactorRating({ ...factorRating, [factor]: { value, text } });
  };

  const handleSummary = (e) => {
    if (summary.length <= 60 || e.target.value.length < summary.length) {
      setSummary(e.target.value);
    }
  };
  const handleBody = (e) => {
    if (formBody.length <= 1000 || e.target.value.length < formBody.length) {
      const currentLength = e.target.value.length;
      const difference = 50 - currentLength;
      setCharCount(difference);
      setFormBody(e.target.value);
    }
  };

  const handleImageChange = (imageList) => {
    setImages(imageList);
  };
  const handleNickname = (e) => {
    if (nickname.length <= 60 || e.target.value.length < nickname.length) {
      setNickname(e.target.value);
    }
  };
  const validateEmail = (currentEmail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(currentEmail);
  };
  const handleEmail = (e) => {
    const input = e.target.value;
    setValidEmail(validateEmail(input));
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (
      overall === 0
      || selectOption
      || formBody.length < 50
      || nickname.length < 1
      || !validEmail
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      const obj = {};
      for (let i = 0; i < factorOptions.length; i += 1) {
        const currentFactor = factorOptions[i];
        const factorId = totals.characteristics[currentFactor].id;
        obj[factorId] = parseInt(factorRating[currentFactor].value, 10);
      }
      const recommended = recommend === 'Yes';
      const data = {
        product_id: parseInt(totals.product_id, 10),
        rating: overall,
        summary,
        body: formBody,
        recommend: recommended,
        name: nickname,
        email,
        photos: [],
        characteristics: obj,
      };
      updateItemReviews(data);
      handleModal(false);
    }
  };

  useEffect(() => {
    checkIfSelected();
  }, [factorRating]);

  useEffect(() => {
    setShowAddImage(images.length < 5);
  }, [images]);

  return (
    <div className="l-add-review-overlay">
      <div className="l-add-review-modal">
        <AiOutlineClose className="l-add-review-close" onClick={() => handleModal()} />
        <Header itemName={itemName} />
        <div className="l-add-review-form">
          <OverallRating overall={overall} updateRating={updateRating} ratingDef={ratingDef} />
          <Recommend recommend={recommend} onOptionChange={onOptionChange} />
          <Characteristics
            factorOptions={factorOptions}
            factorRating={factorRating}
            characteristics={characteristics}
            onFactorChange={onFactorChange}
          />
          <Summary summary={summary} handleSummary={handleSummary} />
          <Body formBody={formBody} handleBody={handleBody} charCount={charCount} />
          <UploadImage
            images={images}
            handleImageChange={handleImageChange}
            maxNumber={maxNumber}
            showAddImage={showAddImage}
          />
          <Nickname nickname={nickname} handleNickname={handleNickname} />
          <Email email={email} handleEmail={handleEmail} />
          {showError && (
            <FieldErrors
              overall={overall}
              selectOption={selectOption}
              formBody={formBody}
              nickname={nickname}
              validEmail={validEmail}
            />
          )}

          <button
            type="button"
            data-testid="submit-button"
            className="l-add-review-btn"
            alt="submit button"
            onClick={() => handleSubmit()}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
