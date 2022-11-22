import {ImpegniInEssereDataModel} from "./impegni-in-essere-data-model";

export interface DatiSociologiDataModel{
  anagId?: string;
  cognome?: string;
  nome?: string;
  denominazione?: string;
  sesso?: string;
  cabnascitaId?: string;
  provnasc?: string;
  codFisc?: string;
  tipodocumId?: string;
  documNum?: string;
  documCabcomId?: string;
  documEmessoProv?: string;
  documEnterilascio?: string;
  tipolegameId?: string;
  convive?: boolean;
  clienteApulia?: boolean;
  clienteCcDal?: string;
  creditcardId?: string;
  abitativaId?: string;
  abitativaDal?: string;
  abitativaCosto?: number;
  abitativaContratto?: boolean;
  propImmobili?: boolean;
  propImmobiliTipo?: string;
  propImmobiliValore?: number;
  settattivId?: string;
  professioneId?: string;
  tipoProfessioneId?: string;
  professioneDal?: string;
  professionePresso?: string;
  professioneIndeterminato?: string;
  statocivileId?: string;
  famComponenti?: number;
  famPercReddito?: number;
  impegniMnOneri?: number;
  impegniMnAggiuntivi?: number;
  impegniMnDebiti?: number;
  redditoAlPers?: number;
  redditoMnPers?: number;
  redditoAlFam?: number;
  redditoMnFam?: number;
  redditiAltri?: number;
  accredStipApulia?: boolean;
  partitaiva?: string;
  reaLegNumero?: string;
  reaLegProv?: string;
  userIdLast?: string;
  impegniMnDebitiResidui?: number;
  percentualePonderazione?: number;
  impegniMnOneriPonderato?: number;
  mensilita?: number;
  annoArrivoItalia?: number;
  annoResidenzaItalia?: number;
  autocertifParent?: boolean;
  tipoDipendente?: number;
  fondoPatrimCostituito?: boolean;
  cittadinoExtraUE?: boolean;
  famCarico?: number;
  redditoLavDipendPens?: number;
  redditoLavDipendStag?: number;
  annoAnzianita?: number;
  redditoLavAutDI?: number;
  redditoTransfReg?: number;
  redditoLocazImmobili?: number;
  redditoAgea?: number;
  impostaNetta?: number;
  addizionaliAcconti?: number;
  cedolare?: number;
  oneriImposta?: number;
  altreImposte?: number;
  impegniInEssere?: ImpegniInEssereDataModel[]
}
