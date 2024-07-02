export function addTextElements(
  wheel,
  pieData,
  tilesData,
  circleRadius,
  getHeightFromHeader,
  getFontFamilyFromClass,
  getSvgTextAnchor
) {

  const sectionsCount = tilesData.length;
  const angleBetweenSections = 360 / sectionsCount;

  wheel
    .selectAll('.section-text')
    .data(pieData)
    .enter()
    .append('foreignObject')
    .attr('text-anchor', 'middle')
    .attr('class', 'section-number')
    .attr('id', (d, i) => `section-${ i + 1 }`)
    .attr('width', (d, i) => {
      const isVerticallyText = tilesData[i].contraints && tilesData[i].contraints.includes('isVerticallyText');
      if (tilesData[i] && tilesData[i].text && isVerticallyText) {
        return circleRadius;
      } else {
        const angleInRadians = (angleBetweenSections * Math.PI) / 180;
        return 2 * circleRadius * Math.sin(angleInRadians / 2);
      }
    })
    .attr('height', (d, i) => {
      const tileText = tilesData[i].text;

      return getHeightFromHeader(tileText);
    })
    .style('white-space', 'nowrap')
    .style('overflow', 'visible')
    .attr('transform', (d, i) => {
      const isVerticallyText = tilesData[i].contraints && tilesData[i].contraints.includes('isVerticallyText');

      if (tilesData[i].text && isVerticallyText) {
        d.innerRadius = 0;
        d.outerRadius = circleRadius;
        d.angle = (d.startAngle + d.endAngle) / 2;
        const rotate = (d.angle * 180 / Math.PI - 90);
        return `rotate(${ rotate })translate(0, -14)`;
      } else {
        const angle = i * angleBetweenSections;
        const radians = (angle - 90) * (Math.PI / 180);
        const correction = (360 / sectionsCount / 2);

        const x = circleRadius * Math.cos(radians);
        const y = circleRadius * Math.sin(radians);

        return `translate(${ x },${ y }) rotate(${ angle + correction }, 0, 0)`;
      }
    })
    .append('xhtml:div')
    .attr('class', 'text-block')
    .style('width', circleRadius)
    .style('height', '100%')
    .style('padding-left', (d, i) => {
      const isVerticallyText = tilesData[i].contraints && tilesData[i].contraints.includes('isVerticallyText');

      return tilesData[i].text && isVerticallyText ? '25px' : '15px';
    })
    .style('padding-right', '15px')
    .style('margin', '0')
    .style('color', 'white')
    .style('text-align', (d, i) => {
      const tileText = tilesData[i].text;
      const alignClass = tileText.match(/ql-align-(\w+)/);

      return !tileText ? 'center' : alignClass ? alignClass[1] : 'left';
    })
    .style('font-family', (d, i) => {
      const tileText = tilesData[i].text;
      const fontMatch = tileText.match(/class="ql-font-(\w+)"/);

      if (fontMatch) getFontFamilyFromClass(fontMatch);
    })
    .html((d, i) => {
      let content = tilesData[i].text;

      // Add style="margin-bottom: 0;" to <p> tags
      if (typeof content === 'string' && content.includes('<p')) {
        content = content.replace(/<p/g, '<p style="margin: 0;"');
      }

      // Add style="margin-bottom: 0;" to tags <h1>, <h2>, <h3>, <h4>, <h5>, <h6>
      if (typeof content === 'string' && content.includes('<h')) {
        content = content.replace(/<h1/g, '<h1 style="margin: 0;"');
        content = content.replace(/<h2/g, '<h2 style="margin: 0;"');
        content = content.replace(/<h3/g, '<h3 style="margin: 0;"');
        content = content.replace(/<h4/g, '<h4 style="margin: 0;"');
        content = content.replace(/<h5/g, '<h5 style="margin: 0;"');
        content = content.replace(/<h6/g, '<h6 style="margin: 0;"');
      }

      return content;
    })
    .attr('text-anchor', (d, i) => {
      const tileText = tilesData[i].text;
      const alignClass = tileText.match(/ql-align-(\w+)/);

      return alignClass ? getSvgTextAnchor(alignClass[1]) : 'start';
    });
}
