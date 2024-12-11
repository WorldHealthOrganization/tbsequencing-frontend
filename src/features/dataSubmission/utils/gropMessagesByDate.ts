import { group, InternMap } from 'd3-array';
import { format } from 'date-fns';
import type { IMessage } from '../../../services/submissionApi/models';

export const groupMessagesByDate = (messages?: IMessage[]) => {
  if (!messages) {
    return new InternMap<string, IMessage[]>([]);
  }
  return group(messages, (value) => format(new Date(value.timestamp), 'PPP'));
};
