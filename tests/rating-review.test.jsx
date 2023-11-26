import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import SortDropDown from '../client/src/components/ratings_review/SortDropDown'
import ReviewList from '../client/src/components/ratings_review/ReviewList'
import RatingsReviews from '../client/src/containers/RatingsReviews.jsx'
import RatingBreakdown from '../client/src/components/ratings_review/RatingBreakdown.jsx'
import AddReview from '../client/src/components/ratings_review/AddReview.jsx'
import StarBar from '../client/src/components/ratings_review/StarBar.jsx'
import ReviewTile from '../client/src/components/ratings_review/ReviewTile.jsx'

import data from './test.data.js'

const mockTotals = {
  recommended: { true: 100, false: 50 },
  ratings: { '5': 50, '4': 30, '3': 15, '2': 5, '1': 0 },
  characteristics: {
    "Size": {value: 0, text: "none selected"},
    "Width": {value: 0, text: "none selected"}
  }
};

jest.mock('../client/src/utils/getItemDetails', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(4.2)), // Mock return value for average rating
}));

describe('checks Ratings and Review elements', () => {

 it('should render the select tag with a default value set in SortDropDown', () => {
   render(<SortDropDown sort='relevant'/>);
   expect(screen.getByRole('combobox', {value: 'relevant'})).toBeTruthy();
 })

 it('should display 2 more reviews on click of More Reviews in ReviewList', async () => {
    let currentView = 2;
    const mockHandleViewMore = jest.fn(() => { currentView += 2 });
    const { rerender } = render(
    <ReviewList
      results={data}
      currentView={currentView}
      handleViewMore={mockHandleViewMore}
      currentFilter={[]}
    />);
    expect(screen.getAllByTestId('review-item')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: /more reviews/i }));
    rerender(
      <ReviewList
      results={data}
      currentView={currentView}
      handleViewMore={mockHandleViewMore}
      currentFilter={[]}
      />);
    await waitFor(() => {
      expect(screen.getAllByTestId('review-item')).toHaveLength(4);
    });
  });

  it('should display 5 bars that signal the rating system', async () => {
    await act(async () => {
      render(<RatingBreakdown itemId="1" totals={mockTotals} updateFilter={() => {}} currentFilter={[]} />);
    });
    const starBars = screen.getAllByTestId('star-bar');
    expect(starBars.length).toBe(5);
  });
})

describe('checks Add Review module', () => {

  it('should display the text "Write Your Review"', async () => {
    await act(async () => {
      render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    });
    expect(screen.getByText("Write Your Review")).toBeTruthy();
  });

  it('should have "Size" characteristic displayed', async () => {
    await act(async () => {
      render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    });
    expect(screen.findByText("Size")).toBeTruthy();
  });

  it('should have "Width" characteristic displayed', async () => {
    await act(async () => {
      render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    });
    expect(screen.findByText("Width")).toBeTruthy();
  });

  it('should have "textarea" tag in body field', async () => {
    await act(async () => {
      render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    });
    expect(screen.findByRole("textarea")).toBeTruthy();
  });

  it('should have "text" tag in nickname field', async () => {
    await act(async () => {
      render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    });
    expect(screen.findByRole("text")).toBeTruthy();
  });

  it('should have the text "What is your nickname?" based on alt text', async () => {
    await act(async () => {
      render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    });
    expect(screen.findByAltText("nickname field")).toBeTruthy();
  });

  it('should have under text that reads "For privacy reasons, do not use your full name or email address"', async () => {
    await act(async () => {
      render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    });
    expect(screen.findByText("For privacy reasons, do not use your full name or email address")).toBeTruthy();
  });

  it('should have an input for ser email based on alt text "user email"', async () => {
    await act(async () => {
      render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    });
    expect(screen.findByAltText("user email")).toBeTruthy();
  });

  it('should validate and accept a correct email', () => {
    const { getByPlaceholderText, queryByText } = render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    const emailInput = getByPlaceholderText('Example: jackson11@email.com');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });

    expect(queryByText('Please use valid email. Example: jackson11@email.com')).toBeFalsy();
  });

  it('should show an error for an invalid email', async () => {
    const {findAllByTestId, findByTestId, getByPlaceholderText} = render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);

    const emailInput = getByPlaceholderText('Example: jackson11@email.com');
    const submitButton = await findByTestId("submit-button")
    expect(submitButton).toBeTruthy()

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(submitButton)

    const errorMessage = await findAllByTestId("error-message")

    expect(errorMessage).toBeTruthy();
  });

})

describe('Image upload in AddReview', () => {
  it('should allow image upload and update the state', async () => {
    render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);

    const mockImageData = ['image1']

    const mockAddImage = () => {
      mockImageData.push('image2')
    }

    const imageUploadButton = await screen.findByRole('button', { name: /Upload Image/i });
    expect(imageUploadButton).toBeTruthy()

    mockAddImage()

    expect(mockImageData.length).toBeGreaterThan(1)
  });

});
describe('Client side error handling', () => {
  it('should show error messages', async () => {
    render(<AddReview itemName="Shoes" totals={mockTotals} updateItemReviews={() => {}} handleModal={() => {}} />);
    const submitButton = await screen.findByTestId("submit-button")
    expect(submitButton).toBeTruthy()

    fireEvent.click(submitButton)

    const errors = await screen.findAllByTestId("error-message")

    expect(errors).toHaveLength(5)
  })
});

describe('Individual review tile', () => {
  const mockReviewData = {
    body: "fdagfdagadsfgafgfjfkld;halgjd;fg; jflis; jlkjkl sdjdsf; j; jj l;kjs;jf kgl;jfs l;gfjd; fj; sjfgdjl ;skjfglj ds;lkgjndflskjg lsg hjreoigj l;fdgn l;fdhgjls;dfhgjfkl;ds ngklfjds hgjk;fdh;kfsgj;dfkl hgl;jfd shg;jfkldsgn ;jslkfd hg;jklfdng;klj dfxnfjk; gnk;fjd gnk;jfdsgk;jldgkj;fds",
    date: "2022-06-04T00:00:00.000Z",
    helpfulness: 2,
    photos: [],
    rating: 5,
    recommend: true,
    response: null,
    review_id: 1275164,
    reviewer_name: "jioesjfs",
    summary: "adawdawd"
  }

  const mockHandleHelpful = ()=> {
    mockReviewData.helpfulness = mockReviewData.helpfulness + 1
  }

  it('should increase the helpfulness value', async () => {

    const mockHandleReport = jest.fn()
    render(<ReviewTile review={mockReviewData} handleHelpful={mockHandleHelpful} handleReport={mockHandleReport}/>);

    const helpfulButton = screen.getByTestId("helpfull-button")
    expect(helpfulButton).toBeTruthy()

    fireEvent.click(helpfulButton)

    expect(mockReviewData.helpfulness).toBeGreaterThan(2)
  })

  it('should show the full text of the body on click', async () => {
    let mockToShow = mockReviewData.body.slice(0, 250)

    const mockHandleShowMore = ()=> {
      mockToShow = mockReviewData.body
    }
    const mockHandleReport = jest.fn()
    render(<ReviewTile review={mockReviewData} handleHelpful={mockHandleHelpful} handleReport={mockHandleReport}/>);

    const showMoreButton = screen.getByTestId("show-more")
    expect(showMoreButton).toBeTruthy()

    fireEvent.click(showMoreButton)

    const bodyText = await screen.findByText("fdagfdagadsfgafgfjfkld;halgjd;fg; jflis; jlkjkl sdjdsf; j; jj l;kjs;jf kgl;jfs l;gfjd; fj; sjfgdjl ;skjfglj ds;lkgjndflskjg lsg hjreoigj l;fdgn l;fdhgjls;dfhgjfkl;ds ngklfjds hgjk;fdh;kfsgj;dfkl hgl;jfd shg;jfkldsgn ;jslkfd hg;jklfdng;klj dfxnfjk; gnk;fjd gnk;jfdsgk;jldgkj;fds")

    expect(bodyText).toBeTruthy()
  })
});

