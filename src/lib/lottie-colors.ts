type LottieColor = [number, number, number];

interface LottieColorMap {
  fill: string;
  stroke: string;
}

type LottieValue =
  | null
  | boolean
  | number
  | string
  | LottieValue[]
  | { [key: string]: LottieValue };

function isRecord(value: LottieValue): value is { [key: string]: LottieValue } {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isColorArray(value: LottieValue): value is number[] {
  return (
    Array.isArray(value) &&
    (value.length === 3 || value.length === 4) &&
    value.every((item) => typeof item === "number")
  );
}

function toChannelValue(value: number) {
  return Number((value / 255).toFixed(6));
}

export function hexToLottieColor(hex: string): LottieColor {
  const normalizedHex = hex.trim().replace("#", "");
  const fullHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : normalizedHex;

  if (!/^[\da-f]{6}$/i.test(fullHex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return [
    toChannelValue(Number.parseInt(fullHex.slice(0, 2), 16)),
    toChannelValue(Number.parseInt(fullHex.slice(2, 4), 16)),
    toChannelValue(Number.parseInt(fullHex.slice(4, 6), 16)),
  ];
}

function buildColor(hex: string, currentColor: number[]) {
  const color = hexToLottieColor(hex);

  if (currentColor.length === 4) {
    return [...color, currentColor[3]];
  }

  return color;
}

function replaceColorValue(value: LottieValue, hex: string): LottieValue {
  if (isColorArray(value)) {
    return buildColor(hex, value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceColorValue(item, hex));
  }

  if (!isRecord(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      key === "s" || key === "e" || key === "k"
        ? replaceColorValue(item, hex)
        : item,
    ]),
  );
}

function replaceShapeColor(
  value: { [key: string]: LottieValue },
  hex: string,
) {
  const color = value.c;

  if (!isRecord(color)) {
    return value;
  }

  return {
    ...value,
    c: {
      ...color,
      k: replaceColorValue(color.k, hex),
    },
  };
}

export function replaceLottieShapeColors(
  animationData: unknown,
  colors: LottieColorMap,
): unknown {
  function walk(value: LottieValue): LottieValue {
    if (Array.isArray(value)) {
      return value.map(walk);
    }

    if (!isRecord(value)) {
      return value;
    }

    const shapeType = value.ty;
    const nextValue =
      shapeType === "fl"
        ? replaceShapeColor(value, colors.fill)
        : shapeType === "st"
          ? replaceShapeColor(value, colors.stroke)
          : value;

    return Object.fromEntries(
      Object.entries(nextValue).map(([key, item]) => [key, walk(item)]),
    );
  }

  return walk(animationData as LottieValue);
}
