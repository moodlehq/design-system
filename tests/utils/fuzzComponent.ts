// tests/utils/fuzzComponent.ts
// Generic utility for property-based fuzzing of React components using fast-check and React Testing Library.
// Usage: fuzzComponent(Component, propArbitrary, getText, options)
// - Component: React component to test
// - propArbitrary: fast-check Arbitrary for generating random props
// - getText: function to extract the key text from props for assertion
// - options: fast-check options (e.g., numRuns)

import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import React, { ComponentType } from 'react';

/**
 * Runs property-based fuzzing on a React component.
 * For each random set of props, renders the component and asserts that the key text is present.
 *
 * @param Component - The React component to fuzz
 * @param arb - fast-check Arbitrary for generating random props
 * @param getText - Function to extract the key text from props for assertion
 * @param options - fast-check options (e.g., numRuns)
 */
export function fuzzComponent<T>(
  Component: ComponentType<T>,
  arb: fc.Arbitrary<T>,
  getText: (props: T) => string,
  options?: { numRuns?: number },
) {
  fc.assert(
    fc.property(arb, (props) => {
      // Render the component with random props
      render(React.createElement(Component, props));
      // Assert that the key text is present in the rendered output
      const matches = screen.getAllByText(getText(props));
      expect(matches.length).toBeGreaterThan(0);
    }),
    options,
  );
}
