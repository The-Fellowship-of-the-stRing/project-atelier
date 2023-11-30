// top left is 0,0;

const coordinate = (event) => {
  const width = ((event.clientX) / event.target.clientWidth) * 100;
  const height = ((event.clientY) / event.target.clientHeight) * 100;
  return { x: width, y: height };
};

export default { coordinate };
