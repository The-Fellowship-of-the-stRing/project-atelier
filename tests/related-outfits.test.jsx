import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import RelatedOutfits from '../client/src/containers/RelatedOutfits.jsx';
import Compare from '../client/src/components/related_outfits/Compare.jsx';
import Card from '../client/src/components/related_outfits/Card.jsx';
import Carousel from '../client/src/components/related_outfits/Carousel.jsx';
import Outfits from '../client/src/components/related_outfits/Outfits.jsx';
import Related from '../client/src/components/related_outfits/Related.jsx';

import data from './test-related-outfits.data.js';

const mockRelatedIds = [1, 2, 3, 4, 5];
const mockFeatures = [
  {
      "feature": "Sole",
      "value": "Rubber"
  },
  {
      "feature": "Material",
      "value": "FullControlSkin"
  },
  {
      "feature": "Mid-Sole",
      "value": "ControlSupport Arch Bridge"
  },
  {
      "feature": "Stitching",
      "value": "Double Stitch"
  }
];
const mockCardData = {id: 1, name:'prod', category:'cat', features:[
  {
      "feature": "Sole",
      "value": "Rubber"
  },
  {
      "feature": "Material",
      "value": "FullControlSkin"
  },
  {
      "feature": "Mid-Sole",
      "value": "ControlSupport Arch Bridge"
  },
  {
      "feature": "Stitching",
      "value": "Double Stitch"
  }
], photos:"", original_price: "20.00", sale_price:"10.00"};


jest.mock('../client/src/utils/fetchCardData', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(mockCardData)), // Mock return value for average rating
}));
/* WARM-UP TESTS */
describe('checks Related and Outfits', () => {

  it('should display 1 outfits carousel', async () => {
    await act(async () => {
      render(<Outfits
        itemId="1"
        updateMainProduct={() => {}}
      />);
    });
    const cards = await screen.getAllByTestId("outfits");
    expect(cards).toHaveLength(1);
  });

  it('should display text if no related items', async () => {
    await act(async () => {
      render(<Related
        itemId="1"
        itemFeatures={data.features}
        itemName={"test"}
        updateMainProduct={() => {}}
      />);
    });

    const text = await screen.findByText('No Related Items');
    expect(text).toBeTruthy();
  });

  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<RelatedOutfits
        itemId="1"
        itemFeatures={data.features}
        itemName={"test"}
        updateMainProduct={() => {}}
      />);
    });

    const title = await screen.findByText('Related Products');
    expect(title).toBeTruthy();
  });

  it('should display 1 related outfits container', async () => {
    await act(async () => {
      render(<RelatedOutfits
        itemId="2"
        itemFeatures={data.features}
        itemName={"test2"}
        updateMainProduct={() => {}}
      />);
    });
    const container = await screen.findAllByTestId("related-outfits");
    expect(container).toHaveLength(1);
  });

  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<Compare
        itemId="1"
        compareName="CompareProduct"
        itemFeatures={data}
        cardData={mockCardData}
        compareClickHandler={() => {}}
      />);
    });
    const featureTitle = await screen.findByText('Feature');
    expect(featureTitle).toBeTruthy();
  });


  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<Compare
        itemId="1"
        compareName="CompareProduct"
        itemFeatures={mockFeatures}
        cardData={mockCardData}
        compareClickHandler={() => {}}
      />);

    });
    const feature = await screen.getAllByTestId("feature");
    expect(feature.length).toBe(4);
  });

  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<Card
        itemId="1"
        itemName="test"
        className="c-card-action-compare"
        action="related"
        deleteProduct={() => {}}
        itemFeatures={mockFeatures}
        updateMainProduct={() => {}}
      />);

    });
    const relatedAction = await screen.getAllByTestId("related-action");
    expect(relatedAction.length).toBe(1);

  });

  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<Card
        itemId="1"
        itemName="test"
        className="c-card-action-delete"
        action="outfits"
        deleteProduct={() => {}}
        itemFeatures={mockFeatures}
        updateMainProduct={() => {}}
      />);

    });
    const outfitAction = await screen.getAllByTestId("outfit-action");
    expect(outfitAction.length).toBe(1);

  });

  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<Outfits
        itemId="1"
        updateMainProduct={() => {}}
      />);

    });
    const add = await screen.findAllByTestId('add-card');
    expect(add).toBeTruthy();
  });


  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<Outfits
        itemId="1"
        updateMainProduct={() => {}}
      />);

    });
    const add = await screen.findAllByTestId('outfits');
    expect(add).toBeTruthy();
  });



  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<Outfits
        itemId="1"
        updateMainProduct={() => {}}
      />);
    });
    const addText = await screen.findByText('+');
    expect(addText).toBeTruthy();
  });


  it('should display Related and Outfits Titles', async () => {
    await act(async () => {
      render(<Card
        itemId="1"
        itemName="test"
        className="c-card-action-delete"
        action="outfits"
        deleteProduct={() => {}}
        itemFeatures={mockFeatures}
        updateMainProduct={() => {}}
      />);
    });

    const cardImg = await screen.findByTestId("card-img")
    expect(cardImg).toBeTruthy();
  });

  it('should call deleteProduct function when delete button is clicked', () => {

    // const mockItem = {
    //   itemId: '123',
    //   itemName: 'Sample Item',
    //   className: 'sample-class',
    //   action: 'outfits',
    //   deleteProduct: {() => {}},
    //   itemFeatures: {},
    //   updateMainProduct: {() => {}},
    // };
    const { getByTestId } = render(<Card {itemId: '123',
    itemName: 'Sample Item',
    className: 'sample-class',
    action: 'outfits',
    deleteProduct: {() => {}},
    itemFeatures: {},
    updateMainProduct: {() => {}}
  } />);

    const deleteButton = getByTestId('outfit-action');

    fireEvent.click(deleteButton);

    expect(mockItem.deleteProduct).toHaveBeenCalledWith('123');
  });



});

