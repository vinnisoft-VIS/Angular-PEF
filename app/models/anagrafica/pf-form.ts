export interface PFForm {
    anagId?: string;
    ruolo?: string;
    ndg?: number;
    codiceFiscale?: string;
    tipoNaturaGiuridicaDescr?: string;
    nome?: string;
    cognome?: string;
    dataDiNascita?: Date;
    sesso?: string;
    comuneDiNascita?: string;
    provincia?: string;
    codiceConvenzione?: string;
    codiceCampagna?: string;
    codiceTarget?: string;
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
    anzianitaResidenza?: number;
    nazioneCittadinanza?: string;
    codiceLingua?: string;
    numero?: string;
    filialeDiCompetenza?: string;
    autocertificazione?: boolean;
    annoArivoItalia?: number;
    privacyData?: Date;
    grupsocPresenza?: string,
    grupsocPresenzaData?: Date
}

export interface PfFormDropdowns {
    codiceConvenzioneData: CodiceConvenzione[];
    codiceCampagnaData: CodiceCampagna[];
    codiceTargetData: CodiceTarget[];
}
export interface TipoNaturaGiuridica {
    id: string;
    name: string;
}

export interface Stato {
    bloccante: boolean;
    descr: string;
}

export interface CodiceConvenzione {
    id: string;
    name: string;
}

export interface CodiceCampagna {
    id: string;
    name: string;
}

export interface CodiceTarget {
    id: string;
    name: string;
}

export interface DocIdentita {
    id: string;
    name: string;
}

export interface NazioneResidenza {
    id: string;
    name: string;
}

export interface NazioneCittadinanza {
    id: string;
    name: string;
}
