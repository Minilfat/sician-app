import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Filter from './Filter';

describe('Filter component', () => {
  test('should correctly return array of pressed levels', () => {
    let receivedLevels;
    const expectedLevels = ['4', '12'];

    const onTestSelection = (levels: string[]): void => {
      receivedLevels = levels;
    };

    const { getByTestId, getByText } = render(<Filter onSelection={onTestSelection} />);
    const toggle = getByText('Filter by level');
    fireEvent.click(toggle);

    const level4 = getByTestId('level4');
    const level12 = getByTestId('level12');
    fireEvent.click(level4);
    fireEvent.click(level12);

    expect(receivedLevels).toEqual(expectedLevels);
  });
});
