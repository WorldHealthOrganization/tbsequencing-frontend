export type Consequence = 'missense_variant' | 'synonymous_variant' | 'upstream_gene_variant' | 'ins-del' | 'start_lost' | 'frameshift_variant' | 'stop_gained' | 'OTHER';

export interface IGene {
  id: number;
  endPos: number;
  geneDbCrossrefId: number;
  geneName: string | null;
  locusTag: string | null
  startPos: number
  strand: 1 | -1
}

export interface IVariant {
  consequence: Consequence
  endPos: number
  globalFrequency: string
  startPos: number
  variantName: string
}
