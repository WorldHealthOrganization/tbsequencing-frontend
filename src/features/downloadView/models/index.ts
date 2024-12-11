import { IDrug } from '../../../services/drugsApi/models';

export interface IExtendedDrug extends IDrug {
  isChecked: boolean;
}
