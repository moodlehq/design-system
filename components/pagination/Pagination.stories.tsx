import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 1000, step: 1 },
      description: 'Total number of pages',
      table: {
        type: { summary: 'number' },
      },
    },
    currentPage: {
      control: { type: 'number', min: 1, max: 1000, step: 1 },
      description: 'Current page number (1-indexed)',
      table: {
        type: { summary: 'number' },
      },
    },
    onPageChange: {
      description: 'Callback fired when the page changes',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible name for the pagination landmark.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Pagination'" },
      },
    },
    previousPageLabel: {
      control: { type: 'text' },
      description: 'Accessible label used for the previous-page button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Previous page'" },
      },
    },
    nextPageLabel: {
      control: { type: 'text' },
      description: 'Accessible label used for the next-page button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Next page'" },
      },
    },
    pageLabelFormatter: {
      control: false,
      description:
        'Returns the accessible label for each numbered page button.',
      table: {
        type: { summary: '(page: number) => string' },
        defaultValue: { summary: '(page) => `Page ${page}`' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['full', 'grouped'],
      description:
        "Controls which variant to render. `'full'` shows page numbers (default). `'grouped'` shows only previous and next controls. When `'full'`, the component automatically collapses to grouped appearance on very narrow viewports.",
      table: {
        type: { summary: 'full | grouped' },
        defaultValue: { summary: "'full'" },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Disables all interactive elements, preventing focus, hover, and page-change events.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    totalPages: 10,
    currentPage: 1,
    ariaLabel: 'Pagination',
    onPageChange: () => {},
    disabled: false,
  },
  play: async ({ canvas }) => {
    // Basic accessibility checks
    const nav = canvas.getByRole('navigation');
    await expect(nav).toHaveAttribute('aria-label', 'Pagination');

    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const pseudoMatrixStates = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'pressed', label: 'Pressed' },
  { key: 'focus-visible', label: 'Focus' },
  { key: 'disabled', label: 'Disabled' },
] as const;

const pseudoMatrixRows = [
  {
    key: 'selected-page',
    label: 'Selected page button (full)',
    target: 'selected',
  },
  {
    key: 'grouped-controls',
    label: 'Previous and next buttons (grouped)',
    target: 'nav-controls',
  },
] as const;

type PseudoMatrixStateKey = (typeof pseudoMatrixStates)[number]['key'];
type PseudoMatrixRow = (typeof pseudoMatrixRows)[number];

const pseudoMatrixContainerStyle = {
  display: 'grid' as const,
  gap: 'var(--mds-spacing-md)',
  overflowX: 'auto' as const,
};

const pseudoMatrixGridStyle = {
  display: 'grid' as const,
  rowGap: 'var(--mds-spacing-sm)',
  columnGap: 'var(--mds-spacing-lg)',
  gridTemplateColumns: '20rem repeat(5, 16rem)',
  alignItems: 'center' as const,
};

const pseudoMatrixLabelCellStyle = {
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

const pseudoMatrixStateCellStyle = {
  minHeight: '4rem',
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'flex-start' as const,
};

function renderPseudoStateCell(
  row: PseudoMatrixRow,
  state: PseudoMatrixStateKey,
) {
  const isSelectedRow = row.target === 'selected';
  const isGroupedControlsRow = row.target === 'nav-controls';
  const isDisabled = state === 'disabled';

  // Keep selected-page cells compact so matrix columns do not collide visually.
  const totalPages = isSelectedRow ? 3 : 5;

  return (
    <div
      data-matrix-state={state}
      data-matrix-row={row.key}
      data-matrix-target={row.target}
      style={pseudoMatrixStateCellStyle}
    >
      <Pagination
        totalPages={totalPages}
        currentPage={2}
        disabled={isDisabled}
        variant={isGroupedControlsRow ? 'grouped' : 'full'}
        ariaLabel={`Pagination ${row.label} ${state}`}
        style={{ flexWrap: 'nowrap' }}
        onPageChange={() => {}}
      />
    </div>
  );
}

function InteractiveDefaultPagination(
  args: React.ComponentProps<typeof Pagination>,
) {
  // Local state keeps interaction tests deterministic.
  const [localCurrentPage, setLocalCurrentPage] = useState(args.currentPage);

  return (
    <Pagination
      {...args}
      currentPage={localCurrentPage}
      onPageChange={setLocalCurrentPage}
    />
  );
}

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive default story used as a testing harness to verify selected-page updates on user interaction.',
      },
      source: {
        code: `<Pagination
  currentPage={1}
  onPageChange={() => {}}
  totalPages={10}
/>
`,
      },
    },
  },
  render: (args) => (
    // Remount when controls change so the local story state re-initializes.
    <InteractiveDefaultPagination
      key={`${args.totalPages}-${args.currentPage}-${args.variant ?? 'full'}-${String(args.disabled)}`}
      {...args}
    />
  ),
  play: async ({ canvas }) => {
    const page4Btn = canvas.getByRole('button', { name: /page 4/i });
    await userEvent.click(page4Btn);
    // useArgs-driven updates are async in Storybook interaction runs.
    await new Promise((resolve) => setTimeout(resolve, 0));

    const selectedPage4Btn = canvas.getByRole('button', { name: /page 4/i });
    await expect(selectedPage4Btn).toHaveAttribute('aria-current', 'page');

    const page1Btn = canvas.getByRole('button', { name: /^page 1$/i });
    await expect(page1Btn).not.toHaveAttribute('aria-current');
  },
};

export const Grouped: Story = {
  name: 'Grouped variant',
  args: {
    totalPages: 10,
    currentPage: 5,
    variant: 'grouped',
  },
  parameters: {
    docs: {
      description: {
        story:
          "Explicit `variant='grouped'` shows only previous and next controls without page numbers. Use this when the caller determines the viewport is too narrow for full pagination, or as an accessible simplified navigation option.",
      },
    },
  },
  play: async ({ canvas }) => {
    // Grouped variant hides all page-number buttons.
    const pageButtons = canvas.queryAllByRole('button').filter((btn) => {
      const ariaLabel = btn.getAttribute('aria-label');
      return ariaLabel && ariaLabel.startsWith('Page');
    });
    await expect(pageButtons.length).toBe(0);
  },
};

export const CustomAccessibleLabels: Story = {
  args: {
    totalPages: 10,
    currentPage: 4,
    ariaLabel: 'Course results pagination',
    previousPageLabel: 'Go to previous results page',
    nextPageLabel: 'Go to next results page',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to override the default accessible labels for translated or context-specific pagination text. Use `pageLabelFormatter` when numbered page buttons also need custom wording.',
      },
      source: {
        code: `<Pagination
  totalPages={10}
  currentPage={4}
  onPageChange={() => {}}
  ariaLabel="Course results pagination"
  previousPageLabel="Go to previous results page"
  nextPageLabel="Go to next results page"
  pageLabelFormatter={(page) => \`Results page \${page}\`}
/>
`,
      },
    },
  },
  render: (args) => (
    <Pagination
      {...args}
      pageLabelFormatter={(page) => `Results page ${page}`}
    />
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('navigation', { name: 'Course results pagination' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Go to previous results page' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Results page 4' }),
    ).toBeInTheDocument();
  },
};

export const PseudoStateMatrix: Story = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      canvas: { sourceState: 'none' },
      description: {
        story:
          'Simplified matrix of Figma-aligned interaction states (`Default`, `Hover`, `Pressed`, `Focus`, `Disabled`) using selected page, previous button, and next button controls. The selected-page disabled cell mirrors the page-link disabled visual values.',
      },
    },
    pseudo: {
      hover:
        "[data-matrix-state='hover'][data-matrix-target='selected'] .mds-pagination__page[data-current='true'], [data-matrix-state='hover'][data-matrix-target='nav-controls'] .mds-pagination__button--prev",
      active:
        "[data-matrix-state='pressed'][data-matrix-target='selected'] .mds-pagination__page[data-current='true'], [data-matrix-state='pressed'][data-matrix-target='nav-controls'] .mds-pagination__button--prev",
      focusVisible:
        "[data-matrix-state='focus-visible'][data-matrix-target='selected'] .mds-pagination__page[data-current='true'], [data-matrix-state='focus-visible'][data-matrix-target='nav-controls'] .mds-pagination__button--prev",
    },
  },
  render: () => (
    <div style={pseudoMatrixContainerStyle}>
      <div style={pseudoMatrixGridStyle}>
        <span style={pseudoMatrixLabelCellStyle}>Control</span>
        {pseudoMatrixStates.map((state) => (
          <span key={state.key} style={pseudoMatrixLabelCellStyle}>
            {state.label}
          </span>
        ))}
      </div>
      {pseudoMatrixRows.map((row) => (
        <div key={row.key} style={pseudoMatrixGridStyle}>
          <span style={pseudoMatrixLabelCellStyle}>{row.label}</span>
          {pseudoMatrixStates.map((state) => (
            <div key={state.key}>{renderPseudoStateCell(row, state.key)}</div>
          ))}
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const disabledControls = canvas
      .getAllByRole('button')
      .filter((button) => button.hasAttribute('disabled'));
    await expect(disabledControls.length).toBeGreaterThan(0);
  },
};

export const PageDistributionAndBoundaryValidationBundle: Story = {
  name: 'Page distribution + boundary/a11y validation (bundle)',
  parameters: {
    layout: 'padded',
    docs: {
      canvas: { sourceState: 'none' },
      description: {
        story:
          'Combined validation bundle covering page-distribution layouts, first/last boundary disabled controls, and aria-current semantics in one static reference story.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--mds-spacing-md)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24rem 1fr',
          alignItems: 'center',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 'var(--mds-font-size-paragraph-small)',
            color: 'var(--mds-text-subtle)',
          }}
        >
          First page disabled previous button
        </p>
        <div data-testid="testing-bundle-first-disabled">
          <Pagination
            totalPages={10}
            currentPage={1}
            ariaLabel="Pagination first page disabled previous"
            onPageChange={() => {}}
          />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24rem 1fr',
          alignItems: 'center',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 'var(--mds-font-size-paragraph-small)',
            color: 'var(--mds-text-subtle)',
          }}
        >
          Last page disabled next button
        </p>
        <div data-testid="testing-bundle-last-disabled">
          <Pagination
            totalPages={10}
            currentPage={10}
            ariaLabel="Pagination last page disabled next"
            onPageChange={() => {}}
          />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24rem 1fr',
          alignItems: 'center',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 'var(--mds-font-size-paragraph-small)',
            color: 'var(--mds-text-subtle)',
          }}
        >
          Aria labels and current page indicator
        </p>
        <div data-testid="testing-bundle-aria">
          <Pagination
            totalPages={5}
            currentPage={3}
            ariaLabel="Pagination aria current page example"
            onPageChange={() => {}}
          />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24rem 1fr',
          alignItems: 'center',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 'var(--mds-font-size-paragraph-small)',
            color: 'var(--mds-text-subtle)',
          }}
        >
          Current page in middle
        </p>
        <Pagination
          totalPages={10}
          currentPage={5}
          ariaLabel="Pagination middle page distribution"
          onPageChange={() => {}}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24rem 1fr',
          alignItems: 'center',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 'var(--mds-font-size-paragraph-small)',
            color: 'var(--mds-text-subtle)',
          }}
        >
          Few pages
        </p>
        <Pagination
          totalPages={3}
          currentPage={2}
          ariaLabel="Pagination few pages example"
          onPageChange={() => {}}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24rem 1fr',
          alignItems: 'center',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 'var(--mds-font-size-paragraph-small)',
            color: 'var(--mds-text-subtle)',
          }}
        >
          Grouped variant (prev/next only)
        </p>
        <Pagination
          totalPages={10}
          currentPage={5}
          variant="grouped"
          ariaLabel="Pagination grouped controls example"
          onPageChange={() => {}}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24rem 1fr',
          alignItems: 'center',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 'var(--mds-font-size-paragraph-small)',
            color: 'var(--mds-text-subtle)',
          }}
        >
          Large page count with capped 9-slot window
        </p>
        <Pagination
          totalPages={20}
          currentPage={10}
          ariaLabel="Pagination large page count example"
          onPageChange={() => {}}
        />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const firstDisabledSection = canvas.getByTestId(
      'testing-bundle-first-disabled',
    );
    const firstPrevBtn = firstDisabledSection.querySelector(
      'button[aria-label="Previous page"]',
    ) as HTMLButtonElement | null;
    if (!firstPrevBtn) {
      throw new Error('First-page previous button not found');
    }
    await expect(firstPrevBtn).toBeDisabled();

    const lastDisabledSection = canvas.getByTestId(
      'testing-bundle-last-disabled',
    );
    const lastNextBtn = lastDisabledSection.querySelector(
      'button[aria-label="Next page"]',
    ) as HTMLButtonElement | null;
    if (!lastNextBtn) {
      throw new Error('Last-page next button not found');
    }
    await expect(lastNextBtn).toBeDisabled();

    const ariaSection = canvas.getByTestId('testing-bundle-aria');
    const page3Btn = ariaSection.querySelector(
      'button[aria-label="Page 3"]',
    ) as HTMLButtonElement | null;
    if (!page3Btn) {
      throw new Error('ARIA Page 3 button not found');
    }
    await expect(page3Btn).toHaveAttribute('aria-current', 'page');
  },
};

export const RightToLeft: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  tags: ['test', 'stable'],
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation');
    await expect(nav).toHaveAttribute('aria-label', 'Pagination');
  },
};
