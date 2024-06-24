import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export const generatePieData = (
  radius,
  sectionsCount,
  getSectionFill,
  svg,
  iconUris,
  tilesData,
  sectionColors
) => {
  const pie = d3.pie()
    .sort(null)
    .value(1);

  return pie(d3.range(sectionsCount)).map((d, i) => {
    return {
      id: i + 1,
      arc: d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
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