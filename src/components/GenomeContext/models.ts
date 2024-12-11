import { IGene } from '../../services/genesApi/models';

export interface IGenomeData extends IGene {
  isSelected: boolean;
  y: number;
}
