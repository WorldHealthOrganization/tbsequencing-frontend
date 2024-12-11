import * as yup from 'yup';
import { validatePassword } from '../../../../utils/validators';

export const formSchema = yup.object().shape({
  newPassword1: validatePassword,
  newPassword2: validatePassword.oneOf([yup.ref('newPassword1')], 'Passwords do not match'),
});
