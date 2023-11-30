// top left is 0,0;

const coordinate = (event) => {
  const img = document.getElementById('g-images-main-expanded');
  const rect = img.getBoundingClientRect();
  const width = event.clientX - rect.left;
  const height = event.clientY - rect.top;
  return { x: width, y: height };
};

export default { coordinate };
