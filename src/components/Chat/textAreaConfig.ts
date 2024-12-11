import * as yup from 'yup';
import { validateMaxLength } from '../../utils/validators';

export interface ITextArea {
  textArea: string;
}

export const defaultValues = {
  textArea: '',
};

export const textAreaField = {
  type: 'textarea',
  name: 'textArea',
  label: '',
  placeholder: 'Start typing...',
};

export const textAreaSchema = yup.object().shape({
  textArea: validateMaxLength(2000, 'Message should contain lower than 2000 characters'),
});
