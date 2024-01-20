const classNames = (classes: any): string => {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(' ');
};
export default { classNames };
