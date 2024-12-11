const K = 1024;

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;

  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  const i = Math.floor(Math.log(bytes) / Math.log(K));

  return `${parseFloat((bytes / K ** i).toFixed(dm))} ${sizes[i]}`;
};
