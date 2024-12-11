import { DrugStatus } from '../../features/drugsView/models';

const singleRow = () => {
  const position = 10000;
  const consequence = DrugStatus.Resistant;
  const alleleFreq = 0.12;
  const variantID = 2;
  return {
    pos: position,
    consequence,
    allele_freq: alleleFreq,
    variant_id: variantID,
  };
};

export const makeGnomadVariants = (length = 100) => Array.from({ length }, () => singleRow());
