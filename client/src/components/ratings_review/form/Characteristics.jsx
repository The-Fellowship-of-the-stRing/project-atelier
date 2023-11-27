import React from 'react';

const Characteristics = ({
  factorOptions, factorRating, characteristics, onFactorChange,
}) => (
  <section className="l-add-review-section-title">
    Characteristics
    {factorOptions.map((factor) => (
      <div key={factor} className="l-add-review-single-factor">
        <div className="l-add-review-factor-name-decription">
          <div className="l-add-review-factor-category">
            {factor}
            {' '}
            -
            {' '}
          </div>
          <div className="l-add-review-factor-description">
            {' '}
            {factorRating[factor].text}
          </div>
        </div>
        <div className="l-add-review-factor-options">
          {characteristics[factor].map((option, index) => {
            const check = factor + option;
            return (
              <div key={check} className="l-add-review-selections">
                <input
                  type="radio"
                  name={factor + option}
                  value={index + 1}
                  id="l-add-review-no"
                  checked={(factor + factorRating[factor].text) === check}
                  onChange={(e) => onFactorChange(e, factor, option)}
                />
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </section>
);

export default Characteristics;
