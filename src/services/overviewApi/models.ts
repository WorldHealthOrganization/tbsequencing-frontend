import { ResistantType } from '../../features/drugsView/models';

export interface IGetGlobalSamplesRequest {
  countryId?: string;
  year?: string;
  resistanceType?: ResistantType;
}

export interface ISample {
  countryId: string;
  extDrugRes: number
  monoRes: number
  multiDrugRes: number
  polyRes: number
  ratioExtDrugRes: string;
  ratioMonoRes: string;
  ratioMultiDrugRes: string;
  ratioPolyRes: string;
  ratioRifRes: string;
  rifRes:number;
  total: number;
}

export interface IGetGlobalSamplesResponse {
  countries: ISample[];
  total: {
    extDrugResSum: number;
    monoResSum: number;
    multiDrugResSum: number;
    polyResSum: number;
    rifResSum: number;
    totalSum: number;
    ratioExtDrugRes: string;
    ratioMonoRes: string;
    ratioMultiDrugRes: string;
    ratioPolyRes: string;
    ratioRifRes: string;
  }
}
