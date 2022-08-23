const linksContainerEl = document.querySelector('.links-container');
const CSS_DAYS = [3, 8, 23, 98];

CSS_DAYS.forEach(cssDay => {
  const linkEl = document.createElement('a');
  linkEl.setAttribute('href', `day${cssDay}/index.html`);
  linkEl.classList.add('button')
  linkEl.innerHTML = `Day ${cssDay}`;
  linksContainerEl.appendChild(linkEl);
})