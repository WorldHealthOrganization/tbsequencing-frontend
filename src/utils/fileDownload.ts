export const downloadFileViaAnchor = (
  url: string,
  downloadName: string,
) => {
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = downloadName;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
