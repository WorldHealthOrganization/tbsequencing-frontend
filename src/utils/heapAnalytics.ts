export const heapIdentify = (userId: number) => {
  window.heap.identify(userId);
};

export const heapAddUserProps = () => {
  window.heap.addUserProperties({
    userName: 'hidden',
    email: 'hidden',
    firstName: 'hidden',
    lastName: 'hidden',
  });
};

export const heapRemoveUserProps = () => {
  window.heap.removeEventProperty('userName');
  window.heap.removeEventProperty('email');
  window.heap.removeEventProperty('firstName');
  window.heap.removeEventProperty('lastName');
};

export const heapLoad = (appId?: string) => {
  if (window.heap.loaded) {
    return;
  }

  window.heap.load(appId);
};
