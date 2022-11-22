import {ConcattiDataModel} from "./concatti-data-model";

export interface RecapitiEContattiDataModel{
  anagId?: string;
  tipoRecapito_Residenza?: number;
  presso_Residenza?: string;
  cabcomCod_Residenza?: string;
  prov_Residenza?: string;
  cap_Residenza?: string;
  toponimoId_Residenza?: string;
  indirizzo_Residenza?: string;
  numCivico_Residenza?: string;
  anno_Residenza?: string;
  userIdLast_Residenza?: string;
  datasysLast_Residenza?: Date;
  localita_Residenza?: string;
  tipoRecapito_Domicilio?: number;
  presso_Domicilio?: string;
  cabcomCod_Domicilio?: string;
  prov_Domicilio?: string;
  cap_Domicilio?: string;
  toponimoId_Domicilio?: string;
  indirizz_Domicilio?: string;
  numCivico_Domicilio?: string;
  anno_Domicilio?: string;
  userIdLast_Domicilio?: string;
  datasysLast_Domicilio?: Date;
  localita_Domicilio?: string;
  recapitis?: ConcattiDataModel[];
}
