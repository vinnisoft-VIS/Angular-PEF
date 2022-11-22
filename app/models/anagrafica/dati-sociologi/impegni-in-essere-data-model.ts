export interface ImpegniInEssereDataModel{
  impegniId?: string;
  anagId?: string;
  tipologia?: number;
  tipologiaName?: string;
  importoRichiesto?: number;
  importoResiduo?: number;
  importoRata?: number;
  dispEstImpegno?: boolean;
  considerare?: boolean;
  favoreDi?: string;
  importo?: number;
  abiId?: string;
  abiName?: string;
  finanziari?: string;
  dipf?: boolean;
  progr?: number;
  dataUltScad?: Date;
}
