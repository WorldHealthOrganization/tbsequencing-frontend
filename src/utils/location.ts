export const getPathFromLocation = (
  location: string,
):string => location.substring(location.lastIndexOf('/') + 1);

export const getPrevPathFromLocation = (location: string, offset = 2) => {
  const segments = location.split('/');

  return segments[segments.length - offset];
};
