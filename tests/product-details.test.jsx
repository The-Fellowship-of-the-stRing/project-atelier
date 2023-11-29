import React from 'react';
import { render, fireEvent, screen, toBeInTheDocument, act } from '@testing-library/react';
import ProductDetails from '../client/src/containers/ProductDetails.jsx'
import StyleList from '../client/src/components/product_details/StyleList.jsx'
import Cart from '../client/src/components/product_details/Cart.jsx'
import ImageGallery from '../client/src/components/product_details/ImageGallery.jsx'
import SocialMedia from '../client/src/components/product_details/SocialMedia.jsx'
import Reviews from '../client/src/components/product_details/Reviews.jsx'

// jest.mock('../client/src/utils/getReviewMeta', () => ({
//   __esModule: true,
//   default: jest.fn(() => Promise.resolve({ratings:0})), // Mock return value for average rating
// }));
// const style_example = [
//   {skus: {"style_id":11231,[quantity:1, size: 9]}};
// ]
describe('Checks if text is being displayed on the product details', () => {
  test('Loading is displayed properly in product_details', async () => {
    render(<ProductDetails/>);
    const text = await screen.findByText('Loading...')
    expect(text).toBeTruthy();
  });
});

describe('Checks if text is being displayed on the style list', () => {
  test('Loading is displayed properly in style list', async () => {
    render(<StyleList/>);
    const text = await screen.findByText('No styles');
    expect(text).toBeTruthy();
  });
});

describe('Checks if data is being displayed on the social media section', () => {
  test('Loading is displayed properly in social media', async () => {
    render(<SocialMedia/>);
    const text = await screen.findByText('Facebook');
    expect(text).toBeTruthy();
  });
});

describe('Checks if data is being displayed on the ImageGallery section', () => {
  test('Loading is displayed properly in ImageGallery', async () => {
    render(<ImageGallery/>);
    const text = await screen.findByText('Loading gallery images');
    expect(text).toBeTruthy();
  });
});

// describe('Checks if data is being displayed on the reviews section', () => {
//   test('Loading is displayed properly in Reviews', async () => {
//    await act(()=> {render(<Reviews itemId= {40344} handleRef= {()=>{}}/>)});
//     const text = await screen.findAllByText("");
//     expect(text).toBeTruthy();
//   });
// });

// describe('Checks if data is being displayed on the Cart section', () => {
//   test('Loading is displayed properly in Cart', async () => {
//    render(<Cart style={[]}></Cart>);
//     const text = await screen.findAllByText("");
//     expect(text).toBeTruthy();
//   });
// });
// describe('Checking buttons inside of Image Gallery to test functionality', ()=> {

// })