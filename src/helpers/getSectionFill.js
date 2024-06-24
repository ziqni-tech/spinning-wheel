export function getSectionFill(index, svg, iconUris, tilesData, sectionColors) {
  const defs = svg.append('defs');
  const iconUri = iconUris[index];

  if (iconUri) {
    const patternId = `section-pattern-${index}`;
    let pattern = defs.select(`#${patternId}`);
    if (pattern.empty()) {
      pattern = defs.append('pattern')
        .attr('id', patternId)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('patternContentUnits', 'objectBoundingBox');
      pattern.append('image')
        .attr('class', 'section-image')
        .attr('href', iconUri)
        .attr('width', 1.2)
        .attr('height', 1.2)
        .attr('preserveAspectRatio', 'none')
        .on('error', (err) => {
          console.error(`Error loading image for pattern ${patternId}`, err);
        });
    } else {
      pattern.select('image')
        .attr('href', iconUri)
        .on('error', (err) => {
          console.error(`Error loading image for pattern ${patternId}`, err);
        });
    }

    return `url(#${patternId})`;
  } else {
    if (tilesData[index].background) {
      return tilesData[index].background;
    } else {
      return sectionColors[index % sectionColors.length];
    }
  }
}