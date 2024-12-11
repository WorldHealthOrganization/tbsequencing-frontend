import React from 'react';
import { render } from '../../../../../../../utils/testUtils/jestUtils';
import ResistanceDataEditableCell from '../ResistanceDataEditableCell';

describe('ResistanceDataEditableCell component test', () => {
  test('renders ResistanceDataEditableCell component without error', () => {
    const initialName = 'mockName';
    // TODO add more tests after proper implementation

    render(
      <ResistanceDataEditableCell initialName={initialName} />,
    );
  });

  // TODO add snapshot test
});
