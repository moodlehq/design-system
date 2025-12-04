// This file configures global test setup for Vitest and React Testing Library.
// It ensures that custom matchers from jest-dom (like toBeInTheDocument) are available in all tests.
//
// How it works:
// - Imports jest-dom to extend expect with custom DOM matchers.
// - Imports all matchers from jest-dom/matchers.
// - Extends Vitest's expect with these matchers for type safety and usage in assertions.
// - Declares the Assertion interface to include jest-dom and TestingLibrary matchers for IDE/type support.

import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any>
    extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
}
expect.extend(matchers);
