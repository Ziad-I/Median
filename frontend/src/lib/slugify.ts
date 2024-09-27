export const generateSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, "-");
};
