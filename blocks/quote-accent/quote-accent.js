export default function decorate(block) {
  const rows = [...block.children];

  // Identify the media row (contains the portrait) and the text row.
  let mediaRow = null;
  let textRow = null;
  rows.forEach((row) => {
    if (row.querySelector('picture, img')) mediaRow = row;
    else textRow = row;
  });
  if (!mediaRow) [mediaRow] = rows;
  if (!textRow) textRow = rows[rows.length - 1];

  // Media column (portrait).
  const media = document.createElement('div');
  media.className = 'quote-accent-media';
  const picture = mediaRow.querySelector('picture');
  if (picture) {
    media.append(picture);
  } else {
    const img = mediaRow.querySelector('img');
    if (img) media.append(img);
  }

  // Content column (quote + attribution).
  const content = document.createElement('div');
  content.className = 'quote-accent-content';
  const paragraphs = textRow ? [...textRow.querySelectorAll('p')] : [];
  if (paragraphs.length) {
    const [quotation, ...rest] = paragraphs;
    quotation.className = 'quote-accent-quotation';
    content.append(quotation);
    rest.forEach((p) => {
      p.className = 'quote-accent-attribution';
      content.append(p);
    });
  }

  block.textContent = '';
  if (media.childElementCount) block.append(media);
  block.append(content);
}
