import {PatrimonioImmobiliModel} from "./patrimonio-immobili-model";

export interface PatrimonioDataModel{
  patrimonioId?: string;
  anagId?: string;
  titoli?: number;
  immobili?: number;
  disponibilitaLiquide?: number;
  partecipazioni?: number;
  mobiliAttrezzature?: number;
  altroValue?: number;
  altro1?: string;
  altro1Value?: number;
  altro2?: string;
  altro2Value?: number;
  altriDebiti1?: string;
  altriDebiti1Value?: number;
  altriDebiti2?: string;
  altriDebiti2Value?: number;
  altriDebiti3?: string;
  altriDebiti3Value?: number;
  note?: string;
  dipf?: number;
  totale1?: number;
  totale2?: number;
  patrimonio?: number;
  mutuiIP?: number;
  prestiti?: number;
  altriDebiti?: number;
  debitiBancari?: number;
  immobiliList?: PatrimonioImmobiliModel[];
}
