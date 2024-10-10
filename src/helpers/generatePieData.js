// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"; // local import
import * as d3 from 'd3'; // import for build

export const generatePieData = (
  radius,
  sectionsCount,
  getSectionFill,
  svg,
  iconUris,
  tilesData,
  sectionColors,
  isImageMiddlePart,
  isWheelWithoutBorder
) => {
  const pie = d3.pie()
    .sort(null)
    .value(1);
  const borderWidth = radius / 10;

  const wheelRadius = isWheelWithoutBorder
  ? radius + borderWidth + 10
  : (isImageMiddlePart ? radius - borderWidth + 10 : radius);

  return pie(d3.range(sectionsCount)).map((d, i) => {
    return {
      id: i + 1,
      arc: d3.arc()
        .innerRadius(0)
        .outerRadius(wheelRadius)
        .startAngle((d, i) => (i * 2 * Math.PI) / sectionsCount)
        .endAngle((d, i) => ((i + 1) * 2 * Math.PI) / sectionsCount)(d.value, d.index),
      endAngle: d.endAngle,
      startAngle: d.startAngle,
      fill: getSectionFill(i, svg, iconUris, tilesData, sectionColors),
      stroke: 'none',
      strokeWidth: 1
    };
  });
};
