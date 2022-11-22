import { Stato } from "./pf-form";

export interface SRLForm {
        anagId?: string;
        ndg?: string;
        ruolo?: string;
        stato?: Stato;
        affidato?: string;
        garantito?: string;
        cittadino?: number;
        nazioneResidenza?: string;
        codiceLingua?: string;
        nazioneCittadinanza?: string;
        filialeDiCompetenza?: string;
        tipoNaturaGiuridicaDescr?: string;
        denominazione?: string;
        numeroIscrizioneLegale?: string;
        provinciaLegale?: string;
        dataIscrizioneLegale?: Date;
        numeroIscrizioneAdministrativa?: string;
        provinciaAdministrativa?: string;
        dataIscrizioneAdministrativa?: Date;
        partitaIVA?: string;
        naturaGiuridica?: string;
        sae?: number;
        rae?: number;
        cae?: number;
        considerareAzienda?: boolean;
        privacyData?: Date;
        grupsocPresenza?: string,
        grupsocPresenzaData?: Date
}