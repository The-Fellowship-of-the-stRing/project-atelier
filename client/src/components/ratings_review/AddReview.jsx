import React, {useState, useEffect} from 'react';
import { AiOutlineClose } from "react-icons/ai";

import AddFormStars from './AddFormStars.jsx'

import "../../stylesheets/ratings_review/addReview.css"

const AddReview = ({handleModal, itemName, totals}) => {
  const [overall, setOverall] = useState(0);
  const [ratingDef, setRatingDef] = useState("");
  const [recommend, setRecommend] = useState("Yes");
  const [charCount, setCharCount] = useState(50);
  const [summary, setSummary] = useState('');
  const [formBody, setFormBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectOption, setSelectOption] = useState(false);
  const [factorRating, setFactorRating] = useState({
    "Size": {value: 0, text: "none selected"},
    "Width": {value: 0, text: "none selected"},
    "Comfort": {value: 0, text: "none selected"},
    "Quality": {value: 0, text: "none selected"},
    "Length": {value: 0, text: "none selected"},
    "Fit": {value: 0, text: "none selected"},
  })

  const options = ["Poor", "Fair", "Average", "Good", "Great"]

  const factorOptions = Object.keys(totals.characteristics)

  const characteristics = {
    "Size": ["A size too small", "½ a size too small", "Perfect", "½ a size too big", "A size too wide"],
    "Width": ["Too narrow", "Slightly narrow", "Perfect", "Slightly wide", "Too wide"],
    "Comfort": ["Uncomfortable", "Slightly uncomfortable", "Ok", "Comfortable", "Perfect"],
    "Quality": ["Poor", "Below average", "What I expected", "Pretty great", "Perfect"],
    "Length": ["Runs Short", "Runs slightly short", "Perfect", "Runs slightly long", "Runs long"],
    "Fit": ["Runs tight", "Runs slightly tight", "Perfect", "Runs slightly long", "Runs long"]
  }

  const updateRating = (value) => {
    setOverall(value)
    setRatingDef(options[value - 1])
  }

  const onOptionChange = (e) => {
    setRecommend(e.target.value)
  }

  const checkIfSelected = () => {
    for (let i = 0; i < factorOptions.length; i++){
      if (factorRating[factorOptions[i]].value === 0) {
        setSelectOption(true)
        break;
      } else {
        setSelectOption(false)
      }
    }
  }

  const onFactorChange = (e, factor, text) => {
    const value = e.target.value
    setFactorRating({...factorRating, [factor]: {value: value, text: text}})
  }

  const handleSummary = (e) => {
    if (summary.length <= 60 || e.target.value.length < summary.length) {
      setSummary(e.target.value)
    }
  }
  const handleBody = (e) => {
    if (formBody.length <= 1000 || e.target.value.length < formBody.length) {
      const currentLength = e.target.value.length
      const difference = 50 - currentLength
      setCharCount(difference)
      setFormBody(e.target.value)
    }
  }
  const handleNickname = (e) => {
    if (nickname.length <= 60 || e.target.value.length < nickname.length) {
      setNickname(e.target.value)
    }
  }
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}
  const handleEmail = (e) => {
    const input = e.target.value;
    setValidEmail(validateEmail(input))
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    if (overall === 0 || selectOption || formBody.length < 50 || nickname.length < 1 || !validEmail) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }

  useEffect(() => {
    checkIfSelected()
  }, [factorRating])


  return (
    <div className="l-add-review-overlay">
      <div className="l-add-review-modal" >
      <AiOutlineClose className="l-add-review-close" onClick={() => handleModal()} />
      <div className="l-add-review-header">
        <h1>Write Your Review</h1>
        <h3>About the {itemName}</h3>
      </div>
        <div className="l-add-review-form">
          <div className="l-add-review-section-title">Overall Rating
            <div className="l-add-review-stars">
              <AddFormStars rating={overall} updateRating={updateRating}/><span style={{marginLeft: "10px"}}>{ratingDef}</span>
            </div>
          </div>
          <div className="l-add-review-recommend">
            <label className="l-add-review-section-title">Do you recommend?</label>
            <input
              type="radio"
              name="yes"
              value="Yes"
              id="l-add-review-yes"
              checked={recommend === "Yes"}
              onChange={onOptionChange}
              />
            <label>Yes</label>
            <input
              type="radio"
              name="no"
              value="No"
              id="l-add-review-no"
              checked={recommend === "No"}
              onChange={onOptionChange}
              />
            <label>No</label>
          </div>

          <label className="l-add-review-section-title">Characteristics</label>
          {factorOptions.map((factor) => {
            return (
              <div key={factor} className="l-add-review-single-factor">
                <div className="l-add-review-factor-name-decription">
                <label className="l-add-review-factor-category">{factor} - </label>
                <label className="l-add-review-factor-description"> {factorRating[factor].text}</label>
                </div>
                <div className="l-add-review-factor-options">
                  {characteristics[factor].map((option, index) => {
                    const check = factor + option
                    return (
                      <div key={option + index} className="l-add-review-selections">
                        <input
                        type="radio"
                        name={factor + option}
                        value={index + 1}
                        id="l-add-review-no"
                        checked={(factor + factorRating[factor].text)  === check}
                        onChange={(e) => onFactorChange(e, factor, option)}
                        />
                      </div>
                    )
                  })
                }
                </div>
              </div>
            )
          })
          }
          <label className="l-add-review-section-title">Review Summary (optional)</label>
          <input type="text" value={summary} placeholder="Example: Best purchase ever!" onChange={(e) => handleSummary(e)} />

          <label className="l-add-review-section-title">Review Body</label>
          <textarea type="text" value={formBody} placeholder="Why did you like the product or not?" onChange={(e) => handleBody(e)} />
          <div className="l-add-review-body-count">{charCount <= 0 ? "Minimum reached" : `Minimum required characters left: ${charCount}`}</div>

          <label className="l-add-review-section-title">Upload your photos (optional)</label>
          <div className="l-add-review-upload-photo"/>

          <label className="l-add-review-section-title">What is your nickname?</label>
          <input type="text" value={nickname} placeholder="Example: jackson11!" onChange={(e) => handleNickname(e)} />
          <label>For privacy reasons, do not use your full name or email address</label>

          <label className="l-add-review-section-title">Your email</label>
          <input type="email" value={email} placeholder="Example: jackson11@email.com" onChange={(e) => handleEmail(e)} />
          <label>For authentication reasons, you will not be emailed</label>

          {showError && (
            <div className="l-add-review-errors">
              You must enter the following:
              <ul>

              {overall === 0 && (
                <li>Select an overall rating</li>
                )}
              {selectOption && (
                <li>Please rate the product's characteristics</li>
                )}
              {formBody.length < 50 && (
                <li>Review body must be at least 50 characters</li>
              )}
              {nickname.length < 1 && (
                <li>Please add your nickname. Example: jackson11!</li>
              )}
              {!validEmail && (
                <li>Please use valid email. Example: jackson11@email.com</li>
                )}
                </ul>
            </div>
          )}

          <button type="button" className="l-add-review-btn" onClick={() => handleSubmit()}>SUBMIT</button>
        </div>
      </div>
    </div>
  )
}

export default AddReview;
