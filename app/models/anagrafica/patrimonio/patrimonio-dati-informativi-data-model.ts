import {PatrimonioImmobiliModel} from "./patrimonio-immobili-model";

export interface PatrimonioDatiInformativiDataModel{
  anagId?: string;
  clienteApulia?: boolean;
  dalAnno?: string;
  tipoContabilita?: string;
  tipoInformazioni?: string;
  ateco2007?: string;
  annoInizioAttivita?: string,
  altro2?: string;
  altro2Value?: number,
  immobiliList?: PatrimonioImmobiliModel[];
}
