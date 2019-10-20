export const buildTitle = (title: string, baseTitle?: string, separator?: string) => {
  const titleComponents = separator ? [title, separator, baseTitle] : [title];
  return titleComponents.join(' ');
};
