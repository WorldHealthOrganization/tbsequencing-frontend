import { AbstractIField } from '../../features/auth/components/registration/types';
import SelectControl from './Controls/SelectControl';
import TextControl from './Controls/TextControl';
import CheckboxControl from './Controls/CheckboxControl';
import TextAreaControl from './Controls/TextAreaControl';
import PasswordControl from './Controls/PasswordControl';
import SwitchButton from '../SwitchButton';

export default class FieldsFactory {
  static create<IInput extends unknown>(fieldItem: AbstractIField<IInput>) {
    switch (fieldItem.type) {
      case 'text':
        return TextControl;
      case 'password':
        return PasswordControl;
      case 'checkbox':
        return CheckboxControl;
      case 'textarea':
        return TextAreaControl;
      case 'select':
        return SelectControl;
      case 'switch':
        return SwitchButton;
      default:
        return TextControl;
    }
  }
}
