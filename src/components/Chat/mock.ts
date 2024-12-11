import { IMessage } from '../../services/submissionApi/models';

export const mockMessages: IMessage[] = [
  {
    pk: 1,
    sender: {
      email: 'admin@email.com',
      username: 'Admin',
      firstName: '',
      lastName: '',
    },
    timestamp: '2022-09-07T13:42:16.027Z',
    content: 'please review your submission',
  },
  {
    pk: 2,
    sender: {
      email: 'delegate@email.com',
      username: 'Delegate',
      firstName: '',
      lastName: '',
    },
    timestamp: '2022-09-07T13:42:16.027Z',
    content: 'done, check one more time pls pls pls pls pls',
  },
  {
    pk: 3,
    sender: {
      email: 'admin@email.com',
      username: 'Admin',
      firstName: '',
      lastName: '',
    },
    content: 'looks good, I`m submitting',
    timestamp: '2022-09-07T13:42:16.027Z',
  },
  {
    pk: 4,
    sender: {
      email: 'delegate@email.com',
      username: 'Delegate',
      firstName: '',
      lastName: '',
    },
    content: 'Thank`s, have a nice day',
    timestamp: '2022-09-07T13:42:16.027Z',
  },
];
