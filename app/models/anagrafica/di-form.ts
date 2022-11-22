import { Stato } from "./pf-form";
export interface DiForm {
    anagId?: string;
    ndg?: number;
    ruolo?: string;
    codiceFiscale?: string;
    tipoNaturaGiuridicaDescr?: string;
    denominazione?: string;
    dataDiNascita?: Date;
    sesso?: string;
    comuneDiNascita?: string;
    provincia?: string;
    stato?: Stato;
    affidato?: string;
    garantito?: string;
    
    docIdentita?: string;
    dataEmissione?: Date;
    dataScadenza?: Date;
    rilasciatoA?: string;
    provincia2?: string;
    nazioneResidenza?: string;
    cittadino?: number;
    nazioneCittadinanza?: string;
    codiceLingua?: string;
    numero?: string;
    partitaIVA?: string;
    numIscrREA?: string;
    provRea?: string;
    dataIscrizione?: Date;
    considerareAzienda?: boolean;
    filialeDiCompetenza?: string;
    privacyData?: Date;
    grupsocPresenza?: string,
    grupsocPresenzaData?: Date
}