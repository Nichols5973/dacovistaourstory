export default function decorate(block) {
  [...block.children].forEach((row) => {
    const cells = [...row.children];

    if (cells.length === 1) {
      const cell = cells[0];
      const pic = cell.querySelector('picture');

      if (pic) {
        // Media pattern: image + text stacked in one authored cell.
        // Split into a dedicated image column and a text column so the
        // row can render as a two-column media layout.
        const picWrapper = pic.closest('p');

        const imgCol = document.createElement('div');
        imgCol.className = 'columns-media-img-col';
        imgCol.append(pic);
        if (picWrapper) picWrapper.remove();

        const textCol = document.createElement('div');
        textCol.className = 'columns-media-text-col';
        [...cell.children].forEach((child) => textCol.append(child));

        row.textContent = '';
        row.append(imgCol, textCol);
        row.classList.add('columns-media-media-row');
      } else if (cell.querySelector('ul') && cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        // Anchor navigation row (heading + list of in-page links).
        row.classList.add('columns-media-nav');
      }
    } else {
      const hasImage = cells.some((c) => c.querySelector('picture'));
      if (hasImage) {
        cells.forEach((col) => {
          const pic = col.querySelector('picture');
          if (pic && col.children.length === 1) {
            col.classList.add('columns-media-img-col');
          } else {
            col.classList.add('columns-media-text-col');
          }
        });
        row.classList.add('columns-media-media-row');
      } else {
        // Narrative split: text next to a supporting list/text column.
        row.classList.add('columns-media-split');
      }
    }
  });

  const firstRow = block.firstElementChild;
  const colCount = firstRow ? firstRow.children.length : 0;
  block.classList.add(`columns-media-${colCount}-cols`);
}
