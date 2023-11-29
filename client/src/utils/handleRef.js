const handleRef = (ref) => {
  ref.current?.scrollIntoView({ behavior: 'smooth' });
};

export default handleRef;
