import * as yup from 'yup';
import { validateEmail } from '../../../../utils/validators';

export const formSchema = yup.object().shape({
  email: validateEmail('You have to pass a correct email'),
});
