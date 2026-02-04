const hexToRgb = (hex: string) => {
  const withoutHashtag = hex.replace("#", "");
  const hexToNumber = parseInt(withoutHashtag, 16);

  const r = (hexToNumber >> 16) & 255;
  const g = (hexToNumber >> 8) & 255;
  const b = hexToNumber & 255;

  return `${r}, ${g}, ${b}`;
};

const withOpacity = (hex: string, alpha: number) => {
  if (alpha < 0 || alpha > 1) {
    throw new Error("alpha must be between 0 and 1");
  }

  return `rgba(${hexToRgb(hex)}, ${alpha})`;
};

export default withOpacity;
