// tests/utils/resolveColourToken.ts
// Resolves a CSS colour token (e.g. `--mds-text-subtle`) to the computed
// rgb() string the browser reports for it, so a style assertion can compare
// like with like — a raw `var(--token)` string never matches what
// getComputedStyle returns, and tokens may be defined as hex, rgb, or a
// further alias.

export const resolveColourToken = (token: string) => {
  const probe = document.createElement('span');
  probe.style.color = `var(${token})`;
  document.body.append(probe);
  const colour = getComputedStyle(probe).color;
  probe.remove();
  return colour;
};
