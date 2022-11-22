//Saving data to store using NGRX STORE


import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DiForm } from "src/app/models/anagrafica/di-form";
import { PFForm } from "src/app/models/anagrafica/pf-form";
import { SRLForm } from "src/app/models/anagrafica/srl-form";
import { PanelloDiControlloForm } from "src/app/models/panello-di-controllo/pannello-di-controllo-form";
import { EstrazioneTable } from "src/app/models/pratica/banche-dati/estrazioneTable";
import { DatiPraticaForm } from "src/app/models/pratica/dati-pratica/dati-pratica-form";
import { GaranzieGridData } from "src/app/models/pratica/dati-pratica/garanzie-grid-data";
import { GaranzieForm } from "src/app/models/pratica/garanzie/garanzie-form";
import { ImmobileData } from "src/app/models/pratica/immobile/immobile-data";
import { ImmobileGridData } from "src/app/models/pratica/immobile/immobile-grid-data";
import { PanelloDiControllo } from "src/app/models/pratica/panello-di-controllo/panello-di-controllo";
import { PanelsExpanded } from "src/app/models/pratica/panello-di-controllo/panels-expanded";
import { PareriStoreObject } from "src/app/models/pratica/pareri-expressi-child/pareri-expressi-child";
import { PareriExpressiData } from "src/app/models/pratica/pareri-expressi/pareri-expressi";
import { ChangedPropObj } from "src/app/models/save/changed-props";
import { SchedaAnalisiData } from "src/app/models/pratica/scheda-analisi/scheda-analisi-model";
import { NuovaPEFNdgSearch } from "src/app/models/search-ndg/nuova-pef-search-ndg";
import { SintesiDellaPropostaForm } from "src/app/models/pratica/sintesi-della-proposta/sintesi-della-proposta";
import { ApprofondimentiForm } from "src/app/models/pratica/approfondimenti/approfondimenti";
import { AnagNodeData } from "src/app/models/tree/anag-node-data";
import { AssicurazioniDataModel } from "../../models/pratica/assicurazioni/assicurazioni-data-model";
import { BilancioSinteticoDataModel } from "../../models/pratica/bilancio-sintetico/bilancio-sintetico-data-model";
import {
  NotaIscrizioneIpotecariaDataModel
} from "../../models/pratica/nota-iscrizione-ipotecaria/nota-iscrizione-ipotecaria-data-model";
import { RecapitiEContattiDataModel } from "../../models/anagrafica/recapiti-e-contatti/recapiti-e-contatti-data-model";
import { GenericDropdownModel } from "src/app/models/generic-dropdown";
import { PatrimonioDataModel } from "../../models/anagrafica/patrimonio/patrimonio-data-model";
import { AltroNominativo } from "src/app/models/anagrafica/altro-nominativo";
import { GravamiGridData } from "src/app/models/pratica/dati-pratica/gravami-grid-data";
import { DatiSociologiDataModel } from "../../models/anagrafica/dati-sociologi/dati-sociologi-data-model";
import {
  PatrimonioDatiInformativiDataModel
} from "../../models/anagrafica/patrimonio/patrimonio-dati-informativi-data-model";
import {PatrimonioPfDataModel} from "../../models/anagrafica/patrimonio/patrimonio-pf-data-model";
import { PareriFormModel } from "src/app/models/pratica/pareri/pareri-form-model";
import { AdeguataVerifica, AnagData } from "src/app/models/adeguata-verifica/adeguata-verifica-model";
import { QuestionarioHighRisk } from "src/app/models/pratica/questionario-high-risk/questionario-high-risk-model";
import { Visure } from "src/app/models/pratica/scheda-analisi/visure/visure-model";
import { MtAnagSocietaDetails } from "../../models/pratica/dati-statistici/mt-anag-societa-details";
import {
  DifficoltaFinanziariaDataModel
} from "../../models/pratica/difficolta-finanziaria/difficolta-finanziaria-data-model";
import { Gruppi } from "src/app/models/anagrafica/gruppi/gruppi-data";
import { PropertiesToStore } from "src/app/models/save/properties-to-store";
import {PatrimonioResponsibileDataModel} from "../../models/anagrafica/patrimonio/patrimonio-responsibile-data-model";
import { Perimetro } from "src/app/models/perimetro/perimetro-model";
import { Lavoposi } from "src/app/models/pratica/lavoposi/lavoposi-model";
import { DatiPraticaPCAForm } from "src/app/models/PCA/dati-pratica/dati-pratica-pca-form";
import { RischioGlobale } from "../../models/pratica/scheda-analisi/rischio-globale/rischio-globale-model";
import { PerimetroData } from "src/app/models/perimetro/perimetro-data-model";
import { SchedaSintesi } from "src/app/models/pratica/scheda-analisi/scheda-sintesi/scheda-sintesi-model";

@Injectable()
export class StoreService {

  baseUrl: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private _taskPraticaId: string = '';
  private _executive: string = '';
  private _applicative: number = 0;
  private _idProcess: number = 0;
  private _assicurazioniGridData: AssicurazioniDataModel[] = [];
  private _schemaFidi!: number;
  private _garanzieGridData!: GaranzieGridData[];
  private _immobileGridData: ImmobileGridData[] = [];
  private _notaIscrizioneIpotecariaGridData: NotaIscrizioneIpotecariaDataModel[] = [];
  private _bilancioSinteticoGridData: BilancioSinteticoDataModel[] = [];
  private _nuovaPEFSearchNdgDataObject: NuovaPEFNdgSearch = {};
  private _datiPraticaFormObject: DatiPraticaForm = {
    gridViewModel: []
  };
  private _datiPraticaPCAFormObject: DatiPraticaPCAForm = {
    schemaA: {},
    schemaB: {},
    schemaC: {},
    schemaD: {},
    schemaE: {},
    gridViewModel: []
  };
  private _recapitiFormObjects: RecapitiEContattiDataModel[] = [];
  private _patrimonioFormObjects: PatrimonioDataModel[] = [];
  private _gravamiGridData: GravamiGridData[] = [];
  private _datiSociologiciFormObjects: DatiSociologiDataModel[] = [];
  private _patrimonioDatiInformativiFormObjects: PatrimonioDatiInformativiDataModel[] = [];
  private _patrimonioPfFormObjects: PatrimonioPfDataModel[] = [];
  private _questionarioHighRiskGridData: QuestionarioHighRisk[] = [];
  private _datiStatisticiFormData!: MtAnagSocietaDetails;
  private _visureData: Visure[] = [];
  private _situazioneEsposizioneFatturatFormData!: MtAnagSocietaDetails;
  private _situazioneContabileLavoriFormData!: MtAnagSocietaDetails;
  private _difficoltaFinanziariaFormData: DifficoltaFinanziariaDataModel = {};
  private _patrimonioResponsabileFormData!: PatrimonioResponsibileDataModel;
  private _rischioGlobaleData: RischioGlobale[] = [];
  private _perimetroData: PerimetroData[] = [];
  private _lavoposiData: Lavoposi[] = [];
  
  garanzieFormObject: GaranzieForm = {};
  panelloDiControlloExpandObject: PanelsExpanded = {};
  panelloDiControlloObject: PanelloDiControlloForm = {};
  panelloDiControlloDataObject: PanelloDiControllo = {};
  bancheDatiDataObject: EstrazioneTable = {};
  sintesiDellaPropostaObject: SintesiDellaPropostaForm = {};
  approfondimentiObject: ApprofondimentiForm = {};
  schedaAnalisiObject: SchedaAnalisiData = {};
  pareriExpressiChildObject: PareriStoreObject = {};
  pareriExpressiObject: PareriExpressiData = {};
  immobileFormObject: ImmobileData = {};
  immobileFormObjects: ImmobileData[] = [];
  relazioneFormObjects: PareriFormModel[] = [];
  relazioneFormObject: PareriFormModel = {};
  adeguataVerificaFormObject: AdeguataVerifica = { anagList: []};
  anagDetailsRowFormObject: AnagData = {};

  pfFormObjects: PFForm[] = [];
  diFormObjects: DiForm[] = [];
  srlFormObjects: SRLForm[] = [];
  altroFormObjects: AltroNominativo[] = [];
  pfFormObject: PFForm = {};
  diFormObject: DiForm = {};
  srlFormObject: SRLForm = {};
  altroFormObject: AltroNominativo = {};
  datiAziendaFormObject: MtAnagSocietaDetails = {};
  datiAziendaFormObjects: MtAnagSocietaDetails[] = [];

  patrimonioFormObject: PatrimonioDataModel = {};
  patrimonioDatiInformativiFormObject: PatrimonioDatiInformativiDataModel = {};
  patrimonioPfFormObject: PatrimonioPfDataModel = {};
  recapitiFormObject: RecapitiEContattiDataModel = {};
  datiSociologiciFormObject: DatiSociologiDataModel = {};
  changedPropertiesObjects: ChangedPropObj[] = [];
  lineaArray: number[] = [];
  garanzieLineaArray: number[] = [];
  anagList: AnagNodeData[] = [];
  anagraficaSearchObject: {} = {};
  natgiuData: GenericDropdownModel[] = [];
  gruppiFormObject: Gruppi = {};
  gruppiFormObjects: Gruppi[] = [];
  schedaSintesiDataObject: SchedaSintesi = {};

  constructor() { }

  findRecapitiFormObject(anagId: string): RecapitiEContattiDataModel | undefined {
    return this._recapitiFormObjects?.find(recapiti => recapiti?.anagId?.toUpperCase() === anagId?.toUpperCase());
  }

  findDatiSociologiciFormObject(anagId: string): DatiSociologiDataModel | undefined {
    return this.datiSociologiciFormObjects?.find(datiSociologiciObj => datiSociologiciObj?.anagId?.toUpperCase() === anagId?.toUpperCase());
  }


  findPatrimonioFormObject(anagId: string): PatrimonioDataModel | undefined {
    return this.patrimonioFormObjects?.find(patrimonioObj => patrimonioObj?.anagId?.toUpperCase() === anagId?.toUpperCase());
  }

  findPatrimonioDatiInformativiFormObject(anagId: string): PatrimonioDatiInformativiDataModel | undefined {
    return this.patrimonioDatiInformativiFormObjects?.find(patrimonioObj => patrimonioObj?.anagId === anagId);
  }

  findPatrimonioPfFormObject(anagId: string): PatrimonioPfDataModel | undefined {
    return this.patrimonioPfFormObjects?.find(patrimonioObj => patrimonioObj?.anagId === anagId);
  }

  findAltroNominativoFormObject(anagId: string): AltroNominativo | undefined {
    return this.altroFormObjects?.find(altroNominativoObject => altroNominativoObject?.anagId === anagId);
  }

  removeObjectFromStoreArray(formObjects: any[], anagId: string) {
    if (formObjects.some(form => form.anagId === anagId)) {
      let formIndex = formObjects.findIndex(obj => obj.anagId === anagId);
      formObjects.splice(formIndex, 1);
    }
  }

  removeExistingObjectForAnag(anagId: string, responseType: string) {
    switch (responseType) {
      case 'PF':
        this.removeObjectFromStoreArray(this.diFormObjects, anagId);
        this.removeObjectFromStoreArray(this.srlFormObjects, anagId);
        break;
      case 'DI':
        this.removeObjectFromStoreArray(this.pfFormObjects, anagId);
        this.removeObjectFromStoreArray(this.srlFormObjects, anagId);
        break
      case 'SRL':
        this.removeObjectFromStoreArray(this.pfFormObjects, anagId);
        this.removeObjectFromStoreArray(this.diFormObjects, anagId);
    }
  }

  getPerimetroData(anagId: string): Perimetro[] {
    return this._perimetroData.find((item: PerimetroData) => item.anagId === anagId)?.perimetroRowsData!;
  }
 
  setPerimetroData(data: PerimetroData) {
    let index = this._perimetroData!.findIndex(item => item.anagId === data.anagId);

    if(index > -1) {
      this._perimetroData[index] = data;
    } else {
      this._perimetroData.push(data);
    }
  }

  storePropertyInObject(property: string, value: any, sourceObjectName: string, propertiesToStore: PropertiesToStore) {
        switch (sourceObjectName) {
            case 'datiPraticaFormObject':
              this._datiPraticaFormObject[property as keyof DatiPraticaForm] = value;
              break;

            case 'datiPraticaPCAFormObject':
              this._datiPraticaPCAFormObject[property as keyof DatiPraticaPCAForm] = value;
              break;

            case 'adeguataVerificaFormObject':
              this.adeguataVerificaFormObject[property as keyof AdeguataVerifica] = value;
              break;

            case 'anagDetailsRowFormObject':
              if (!this.adeguataVerificaFormObject.anagList!.some(anagDetailsRowForm => anagDetailsRowForm.anagId === propertiesToStore.anagId)) {
                if (this.anagDetailsRowFormObject.anagId !== propertiesToStore.anagId) {
                  this.anagDetailsRowFormObject = {};
                  this.anagDetailsRowFormObject.anagId = propertiesToStore.anagId;
                  this.adeguataVerificaFormObject.anagList!.push(this.anagDetailsRowFormObject);
                }
              }

              if (this.adeguataVerificaFormObject.anagList!.length > 0) {
                this.anagDetailsRowFormObject = this.adeguataVerificaFormObject.anagList!.find(anagDetailsRowForm => anagDetailsRowForm.anagId === propertiesToStore.anagId)!;
                let index = this.adeguataVerificaFormObject.anagList!.indexOf(this.anagDetailsRowFormObject);
                this.anagDetailsRowFormObject[property as keyof AnagData] = value;

                if (~index) {
                  this.adeguataVerificaFormObject.anagList![index] = this.anagDetailsRowFormObject;
                }
              }
              break;

          case 'relazioneFormObject':
            if (!this.relazioneFormObjects.some(relazioneForm => relazioneForm.praticaRelazioneId === propertiesToStore.relazioneId)) {
              if (this.relazioneFormObject.praticaRelazioneId !== propertiesToStore.relazioneId) {
                this.relazioneFormObject = this.initPareriFormObject();
                this.relazioneFormObject.praticaRelazioneId = propertiesToStore.relazioneId;
                this.relazioneFormObjects.push(this.relazioneFormObject);
              }
            }

            if (this.relazioneFormObjects.length > 0) {
              this.relazioneFormObject = this.relazioneFormObjects.find(relazioneForm => relazioneForm.praticaRelazioneId === propertiesToStore.relazioneId)!;
              let index = this.relazioneFormObjects.indexOf(this.relazioneFormObject);
              this.relazioneFormObject[property as keyof PareriFormModel] = value;

              if (~index) {
                this.relazioneFormObjects[index] = this.relazioneFormObject;
              }
            }
            break;
            case 'garanzieFormObject':
                this.garanzieFormObject[property as keyof GaranzieForm] = value;
                break;
            case 'sintesiDellaPropostaObject':
                this.sintesiDellaPropostaObject[property as keyof SintesiDellaPropostaForm] = value;
                break;
            case 'approfondimentiObject':
                  this.approfondimentiObject[property as keyof ApprofondimentiForm] = value;
                  break;
            case 'panelloDiControlloObject':
                this.panelloDiControlloObject[property as keyof PanelloDiControlloForm] = value;
                break;
            case 'pfFormObject':
                if (!this.pfFormObjects.some(pfForm => pfForm.anagId === propertiesToStore.anagId)) {
                    if (this.pfFormObject.anagId !== propertiesToStore.anagId){
                        this.pfFormObject = this.initPFFormObject();
                        this.pfFormObject.anagId = propertiesToStore.anagId;
                        this.pfFormObjects.push(this.pfFormObject);
                    }
                }

                if (this.pfFormObjects.length > 0) {
                  this.pfFormObject = this.pfFormObjects.find(pfForm => pfForm.anagId === propertiesToStore.anagId)!;
                  let index = this.pfFormObjects.indexOf(this.pfFormObject);
                  this.pfFormObject[property as keyof PFForm] = value;

                  if (~index) {
                    this.pfFormObjects[index] = this.pfFormObject;
                  }
                }
                  break;
            case 'diFormObject':
              if (!this.diFormObjects.some(diForm => diForm.anagId === propertiesToStore.anagId)) {
                if (this.diFormObject.anagId !== propertiesToStore.anagId) {
                  this.diFormObject = {};
                  this.diFormObject = this.initDIFormObject();
                  this.diFormObject.anagId = propertiesToStore.anagId;
                  this.diFormObjects.push(this.diFormObject);
                }
              }

              if (this.diFormObjects.length > 0) {
                this.diFormObject = this.diFormObjects.find(diForm => diForm.anagId === propertiesToStore.anagId)!;
                let index = this.diFormObjects.indexOf(this.diFormObject);
                this.diFormObject[property as keyof DiForm] = value;

                if (~index) {
                  this.diFormObjects[index] = this.diFormObject;
                }
              }
              break;
          case 'srlFormObject':
            if (!this.srlFormObjects.some(pfForm => pfForm.anagId === propertiesToStore.anagId)) {
              if (this.srlFormObject.anagId !== propertiesToStore.anagId) {
                this.srlFormObject = {};
                this.srlFormObject = this.initSRLFormObject();
                this.srlFormObject.anagId = propertiesToStore.anagId;
                this.srlFormObjects.push(this.srlFormObject);
              }
            }

            if (this.srlFormObjects.length > 0) {
              this.srlFormObject = this.srlFormObjects.find(srlForm => srlForm.anagId === propertiesToStore.anagId)!;
              let index = this.srlFormObjects.indexOf(this.srlFormObject);
              this.srlFormObject[property as keyof SRLForm] = value;

              if (~index) {
                this.srlFormObjects[index] = this.srlFormObject;
              }
            }
            break;
          case 'altroFormObject':
            if (!this.altroFormObjects.some(altroForm => altroForm.anagId === propertiesToStore.anagId)) {
              if (this.altroFormObject.anagId !== propertiesToStore.anagId) {
                this.altroFormObject = this.initAltroFormObject(propertiesToStore.tipoNaturaGiuridica!);
                this.altroFormObject.anagId = propertiesToStore.anagId;
                this.altroFormObjects.push(this.altroFormObject);
              }
            }

            if (this.altroFormObjects.length > 0) {
              this.altroFormObject = this.altroFormObjects.find(altroForm => altroForm.anagId === propertiesToStore.anagId)!;
              if (this.altroFormObject) {
                let index = this.altroFormObjects.indexOf(this.altroFormObject);
                this.altroFormObject[property as keyof AltroNominativo] = value;

                if (~index) {
                  this.altroFormObjects[index] = this.altroFormObject;
                }
              } else {
                this.altroFormObject = {};
                this.altroFormObject = this.initAltroFormObject(propertiesToStore.tipoNaturaGiuridica!);
                this.altroFormObject.anagId = propertiesToStore.anagId;
                this.altroFormObjects.push(this.altroFormObject);

                let index = this.altroFormObjects.indexOf(this.altroFormObject);
                this.altroFormObject[property as keyof AltroNominativo] = value;

                if (~index) {
                  this.altroFormObjects[index] = this.altroFormObject;
                }
              }
            }
            break;
        case 'immobileFormObject':
          if (!this.immobileFormObjects.some(immobiliForm => immobiliForm.immobId === propertiesToStore.immobileId)) {
            if (this.immobileFormObject.immobId !== propertiesToStore.immobileId) {
              this.immobileFormObject = this.initImmobileObject();
              this.immobileFormObject.immobId = propertiesToStore.immobileId;
              this.immobileFormObjects.push(this.immobileFormObject);
            }
          }

          if (this.immobileFormObjects.length > 0) {
            this.immobileFormObject = this.immobileFormObjects.find(immobiliForm => immobiliForm.immobId === propertiesToStore.immobileId)!;
            let index = this.immobileFormObjects.indexOf(this.immobileFormObject);
            this.immobileFormObject[property as keyof ImmobileData] = value;

            if (~index) {
              this.immobileFormObjects[index] = this.immobileFormObject;
            }
          }
          break;
        case 'panelloDiControlloExpandObject':
          this.panelloDiControlloExpandObject[property as keyof PanelsExpanded] = value;
          break;
        case 'pareriExpressiChildObject':
          this.pareriExpressiChildObject[property as keyof PareriStoreObject] = value;
          break;
        case 'patrimonioFormObject':
          if (!this.patrimonioFormObjects.some(patrimonioForm => patrimonioForm.anagId?.toUpperCase() === propertiesToStore.anagId?.toUpperCase())) {
            if (this.patrimonioFormObject.anagId !== propertiesToStore.anagId) {
              this.patrimonioFormObject = { immobiliList: [] };
              this.patrimonioFormObject.anagId = propertiesToStore.anagId;
              this.patrimonioFormObjects.push(this.patrimonioFormObject);
            }
          }

          if (this.patrimonioFormObjects.length > 0) {
            this.patrimonioFormObject = this.patrimonioFormObjects.find(patrimonioFormObj => patrimonioFormObj.anagId?.toUpperCase() === propertiesToStore.anagId?.toUpperCase())!;
            let index = this.patrimonioFormObjects.indexOf(this.patrimonioFormObject);
            this.patrimonioFormObject[property as keyof PatrimonioDataModel] = value;

            if (~index) {
              this.patrimonioFormObjects[index] = this.patrimonioFormObject;
            }
          }
          break;
        case 'recapitiFormObject':
          if (!this.recapitiFormObjects.some(recapitiForm => recapitiForm.anagId?.toUpperCase() === propertiesToStore.anagId?.toUpperCase())) {
            if (this.recapitiFormObject.anagId !== propertiesToStore.anagId) {
              this.recapitiFormObject = this.initRecapittiObject();
              this.recapitiFormObject.anagId = propertiesToStore.anagId;
              this.recapitiFormObjects.push(this.recapitiFormObject);
            }
          }

          if (this.recapitiFormObjects.length > 0) {
            this.recapitiFormObject = this.recapitiFormObjects.find(recapitiForm => recapitiForm.anagId?.toUpperCase() === propertiesToStore.anagId?.toUpperCase())!;
            let index = this.recapitiFormObjects.indexOf(this.recapitiFormObject);
            this.recapitiFormObject[property as keyof RecapitiEContattiDataModel] = value;

            if (~index) {
              this.recapitiFormObjects[index] = this.recapitiFormObject;
            }
          }
          break;
        case 'datiSociologiciFormObject':
          if (!this.datiSociologiciFormObjects.some(datiSociForm => datiSociForm.anagId?.toUpperCase() === propertiesToStore.anagId?.toUpperCase())) {
            if (this.datiSociologiciFormObject.anagId !== propertiesToStore.anagId) {
              this.datiSociologiciFormObject = this.initDatiSociologiciObject();
              this.datiSociologiciFormObject.anagId = propertiesToStore.anagId;
              this.datiSociologiciFormObjects.push(this.datiSociologiciFormObject);
            }
          }

          if (this.datiSociologiciFormObjects.length > 0) {
            this.datiSociologiciFormObject = this.datiSociologiciFormObjects.find(patrimonioFormObj => patrimonioFormObj.anagId?.toUpperCase() === propertiesToStore.anagId?.toUpperCase())!;
            let index = this.datiSociologiciFormObjects.indexOf(this.datiSociologiciFormObject);
            this.datiSociologiciFormObject[property as keyof DatiSociologiDataModel] = value;

            if (~index) {
              this.datiSociologiciFormObjects[index] = this.datiSociologiciFormObject;
            }
          }
          break;
        case 'patrimonioDatiInformativiFormObject':
          if (!this.patrimonioDatiInformativiFormObjects.some(patrimonioForm => patrimonioForm.anagId === propertiesToStore.anagId)) {
            if (this.patrimonioDatiInformativiFormObject.anagId !== propertiesToStore.anagId) {
              this.patrimonioDatiInformativiFormObject = { immobiliList: [] };
              this.patrimonioDatiInformativiFormObject.anagId = propertiesToStore.anagId;
              this.patrimonioDatiInformativiFormObjects.push(this.patrimonioDatiInformativiFormObject);
            }
          }

          if (this.patrimonioDatiInformativiFormObjects.length > 0) {
            this.patrimonioDatiInformativiFormObject = this.patrimonioDatiInformativiFormObjects.find(patrimonioFormObj => patrimonioFormObj.anagId === propertiesToStore.anagId)!;
            let index = this.patrimonioDatiInformativiFormObjects.indexOf(this.patrimonioDatiInformativiFormObject);
            this.patrimonioDatiInformativiFormObject[property as keyof PatrimonioDatiInformativiDataModel] = value;

            if (~index) {
              this.patrimonioDatiInformativiFormObjects[index] = this.patrimonioDatiInformativiFormObject;
            }
          }
          break;
        case 'patrimonioPfFormObject':
          if (!this.patrimonioPfFormObjects.some(patrimonioForm => patrimonioForm.anagId === propertiesToStore.anagId)) {
            if (this.patrimonioPfFormObject.anagId !== propertiesToStore.anagId) {
              this.patrimonioPfFormObject = { immobiliList: [], impegniInEssere: [] };
              this.patrimonioPfFormObject.anagId = propertiesToStore.anagId;
              this.patrimonioPfFormObjects.push(this.patrimonioPfFormObject);
            }
          }

          if (this.patrimonioPfFormObjects.length > 0) {
            this.patrimonioPfFormObject = this.patrimonioPfFormObjects.find(patrimonioFormObj => patrimonioFormObj.anagId === propertiesToStore.anagId)!;
            let index = this.patrimonioPfFormObjects.indexOf(this.patrimonioPfFormObject);
            this.patrimonioPfFormObject[property as keyof PatrimonioPfDataModel] = value;

            if (~index) {
              this.patrimonioPfFormObjects[index] = this.patrimonioPfFormObject;
            }
          }
          break;
          case 'datiStatisticiFormData':
            if(!this.datiStatisticiFormData){
              this.datiStatisticiFormData = {anagId: propertiesToStore.anagId, xmlGridModel: []};
            }
            this.datiStatisticiFormData[property as keyof MtAnagSocietaDetails] = value;
          break;

          case 'datiAziendaFormData':
            if (!this.datiAziendaFormObjects.some(datiAziendaForm => datiAziendaForm.anagId === propertiesToStore.anagId)) {
              if (this.datiAziendaFormObject.anagId !== propertiesToStore.anagId) {
                this.datiAziendaFormObject = {};
                this.datiAziendaFormObject = this.initDatiAziendaFormObject();
                this.datiAziendaFormObject.anagId = propertiesToStore.anagId;
                this.datiAziendaFormObjects.push(this.datiAziendaFormObject);

                this.datiAziendaFormDataArray = this.datiAziendaFormObjects;
              }
            }

            if (this.datiAziendaFormObjects.length > 0) {

              this.datiAziendaFormObject = this.datiAziendaFormObjects.find(datiAziendaForm => datiAziendaForm.anagId === propertiesToStore.anagId)!;
              let index = this.datiAziendaFormObjects.indexOf(this.datiAziendaFormObject);
              this.datiAziendaFormObject[property as keyof MtAnagSocietaDetails] = value;

              if (~index) {
                this.datiAziendaFormObjects[index] = this.datiAziendaFormObject;
                this.datiAziendaFormDataArray = this.datiAziendaFormObjects;
              }
            }
          break;
            case 'situazioneEsposizioneFatturatFormData':
              if(!this.situazioneEsposizioneFatturatFormData){
                this.situazioneEsposizioneFatturatFormData = {anagId: propertiesToStore.anagId, xmlGridModel: []};
              }
              this.situazioneEsposizioneFatturatFormData[property as keyof MtAnagSocietaDetails] = value;
          break;
          case 'situazioneContabileLavoriFormData':
            if(!this.situazioneContabileLavoriFormData){
              this.situazioneContabileLavoriFormData = {anagId: propertiesToStore.anagId, xmlGridModel: []};
            }
            this.situazioneContabileLavoriFormData[property as keyof MtAnagSocietaDetails] = value;
          break;
          case 'difficoltaFinanziariaFormData':
            this.difficoltaFinanziariaFormData[property as keyof DifficoltaFinanziariaDataModel] = value;
            break;
          case 'gruppiFormObject':
            if (!this.gruppiFormObjects.some(gruppiForm => gruppiForm.anagId === propertiesToStore.anagId)) {
              if (this.gruppiFormObject.anagId !== propertiesToStore.anagId) {
                this.gruppiFormObject = this.initGruppiObject();
                this.gruppiFormObject.anagId = propertiesToStore.anagId;
                this.gruppiFormObjects.push(this.gruppiFormObject);
              }
            }

            if (this.gruppiFormObjects.length > 0) {
              this.gruppiFormObject = this.gruppiFormObjects.find(gruppiForm => gruppiForm.anagId === propertiesToStore.anagId)!;
              let index = this.gruppiFormObjects.indexOf(this.gruppiFormObject);
              this.gruppiFormObject[property as keyof Gruppi] = value;

              if (~index) {
                this.gruppiFormObjects[index] = this.gruppiFormObject;
              }
            }
          break;
          case 'patrimonioResponsabileFormData':
            if(!this.patrimonioResponsabileFormData){
              this.patrimonioResponsabileFormData = {patrimonioRichiedenti: [], patrimonioGaranti: []};
            }
            this.patrimonioResponsabileFormData[property as keyof PatrimonioResponsibileDataModel] = value;
            break;
    }
  }

  getStoredObjects() {
    return {
        datiPraticaFormObject: this._datiPraticaFormObject,
        pfFormObject: this.pfFormObjects,
        diFormObject: this.diFormObjects,
        srlFormObject: this.srlFormObjects,
        altroFormObject: this.altroFormObjects,
        immobileFormObject: this.immobileFormObjects,
        assicurazioniGridData: this.assicurazioniGridData,
        notaIscrizioneGridData: this.notaIscrizioneIpotecariaGridData,
        garanzieGridData: this.garanzieGridData,
        bilancioSinteticoGridData: this.bilancioSinteticoGridData,
        recapitiFormObject: this.recapitiFormObjects,
        patrimonioFormObject: this.patrimonioFormObjects,
        datiSociologiciFormObject: this.datiSociologiciFormObjects,
        patrimonioDatiInformativiFormObject: this.patrimonioDatiInformativiFormObjects,
        patrimonioPFfmpegniGridData: this.patrimonioPfFormObjects,
        datiStatisticiFormData: this.datiStatisticiFormData,
        situazioneEsposizioneFatturatFormData: this.situazioneEsposizioneFatturatFormData,
        situazioneContabileLavoriFormData: this.situazioneContabileLavoriFormData,
        adeguataVerificaFormData: this.adeguataVerificaFormObject,
        anagDetailsRowFormObject: this.anagDetailsRowFormObject,
        relazioneFormObject: this.relazioneFormObjects,
        datiAziendaFormObject: this.datiAziendaFormObjects,
        difficoltaFinanziariaFormData: this.difficoltaFinanziariaFormData,
        gruppiFormObject: this.gruppiFormObjects,
        patrimonioResponsabileFormData: this.patrimonioResponsabileFormData,
        rischioGlobaleData: this.rischioGlobaleData
    }
}

  resetData() {
      this._datiPraticaFormObject = {};
      this.pfFormObjects = [];
      this.diFormObjects = [];
      this.srlFormObjects = [];
      this.altroFormObjects = [];
      this.immobileFormObjects = [];
      this.recapitiFormObjects = [];
      this.patrimonioFormObjects = [];
      this.patrimonioDatiInformativiFormObjects = [];
      this.datiSociologiciFormObjects = [];
      this.patrimonioPfFormObjects = [];
      this.relazioneFormObjects = [];
      this.datiStatisticiFormData = {};
      this.situazioneEsposizioneFatturatFormData = {};
      this.datiAziendaFormObjects = [];
      this.situazioneContabileLavoriFormData = {};
      this._difficoltaFinanziariaFormData = {};
      this.gruppiFormObjects = [];
      this.patrimonioResponsabileFormData = {};
      this.rischioGlobaleData = [];
  }

    //#region  getters and setters
  get taskPraticaId(): string {
    return this._taskPraticaId;
  }

  set taskPraticaId(taskPraticaId: string) {
    this._taskPraticaId = taskPraticaId;
  }

  get recapitiFormObjects(): RecapitiEContattiDataModel[] {
    return this._recapitiFormObjects;
  }

  set recapitiFormObjects(recapitiFormObjects: RecapitiEContattiDataModel[]) {
    this._recapitiFormObjects = recapitiFormObjects;
  }

  get nuovaPEFSearchNdgDataObject(): NuovaPEFNdgSearch {
    return this._nuovaPEFSearchNdgDataObject;
  }

  set nuovaPEFSearchNdgDataObject(nuovaPEFData: NuovaPEFNdgSearch) {
    this._nuovaPEFSearchNdgDataObject = nuovaPEFData;
  }

  get assicurazioniGridData(): AssicurazioniDataModel[] {
    return this._assicurazioniGridData;
  }

  set assicurazioniGridData(assicurazioniGridData: AssicurazioniDataModel[]) {
    this._assicurazioniGridData = assicurazioniGridData;
  }

  get bilancioSinteticoGridData(): BilancioSinteticoDataModel[] {
    return this._bilancioSinteticoGridData;
  }

  set bilancioSinteticoGridData(bilancioSinteticoGridData: BilancioSinteticoDataModel[]) {
    this._bilancioSinteticoGridData = bilancioSinteticoGridData;
  }

  get notaIscrizioneIpotecariaGridData(): NotaIscrizioneIpotecariaDataModel[] {
    return this._notaIscrizioneIpotecariaGridData;
  }

  set notaIscrizioneIpotecariaGridData(notaIscrizioneIpotecariaGridData: NotaIscrizioneIpotecariaDataModel[]) {
    this._notaIscrizioneIpotecariaGridData = notaIscrizioneIpotecariaGridData;
  }

  get datiPraticaData(): DatiPraticaForm {
    return this._datiPraticaFormObject;
  }

  set datiPraticaData(datiPraticaData: DatiPraticaForm) {
    this._datiPraticaFormObject = datiPraticaData;
  }

  get datiPraticaPCAData(): DatiPraticaPCAForm {
    return this._datiPraticaPCAFormObject;
  }

  set datiPraticaPCAData(datiPraticaPCAData: DatiPraticaPCAForm) {
    this._datiPraticaPCAFormObject = datiPraticaPCAData;
  }

  get adeguataVerificaFormValue(): AdeguataVerifica {
    return this.adeguataVerificaFormObject;
  }


  get garanzieGridData(): GaranzieGridData[] {
    return this._garanzieGridData;
  }

  set garanzieGridData(garanzieGridData: GaranzieGridData[]) {
    this._garanzieGridData = garanzieGridData;
  }

  get gravamiGridData(): GravamiGridData[] {
    return this._gravamiGridData;
  }

  set gravamiGridData(gravamiGridData: GravamiGridData[]) {
    this._gravamiGridData = gravamiGridData;
  }

  get immobileGridData(): ImmobileGridData[] {
    return this._immobileGridData;
  }

  set immobileGridData(immobileGridData: ImmobileGridData[]) {
    this._immobileGridData = immobileGridData;
  }

  get schemaFidiValue(): number {
    return this._schemaFidi;
  }

  set schemaFidiValue(schemaFidi: number) {
    this._schemaFidi = schemaFidi;
  }

  get executive(): string {
    return this._executive;
  }

  set executive(executive: string) {
    this._executive = executive;
  }

  get applicative(): number {
    return this._applicative;
  }

  set applicative(applicative: number) {
    this._applicative = applicative;
  }

  get idProcess(): number {
    return this._idProcess;
  }

  set idProcess(idProcess: number) {
    this._idProcess = idProcess;
  }

  get patrimonioFormObjects(): PatrimonioDataModel[] {
    return this._patrimonioFormObjects;
  }

  set patrimonioFormObjects(patrimonioFormObjects: PatrimonioDataModel[]) {
    this._patrimonioFormObjects = patrimonioFormObjects;
  }

  get datiSociologiciFormObjects(): DatiSociologiDataModel[] {
    return this._datiSociologiciFormObjects;
  }

  set datiSociologiciFormObjects(datiSociologiciFormObjects: DatiSociologiDataModel[]) {
    this._datiSociologiciFormObjects = datiSociologiciFormObjects;
  }

  get patrimonioDatiInformativiFormObjects(): PatrimonioDatiInformativiDataModel[] {
    return this._patrimonioDatiInformativiFormObjects;
  }

  set patrimonioDatiInformativiFormObjects(patrimonioDatiInformativiFormObjects: PatrimonioDatiInformativiDataModel[]) {
    this._patrimonioDatiInformativiFormObjects = patrimonioDatiInformativiFormObjects;
  }

  get patrimonioPfFormObjects(): PatrimonioPfDataModel[] {
    return this._patrimonioPfFormObjects;
  }

  set patrimonioPfFormObjects(patrimonioPfFormObjects: PatrimonioPfDataModel[]) {
    this._patrimonioPfFormObjects = patrimonioPfFormObjects;
  }

  get questionarioHighRiskGridData(): QuestionarioHighRisk[] {
    return this._questionarioHighRiskGridData;
  }

  set questionarioHighRiskGridData(questionarioHighRiskGridData: QuestionarioHighRisk[]) {
    this._questionarioHighRiskGridData = questionarioHighRiskGridData;
  }

  get visureData() {
    return this._visureData;
  }

  set visureData(visureData: Visure[]) {
    this._visureData = visureData;
  }

  get datiStatisticiFormData(): MtAnagSocietaDetails{
    return this._datiStatisticiFormData;
  }

  set datiStatisticiFormData(datiStatisticiFormData: MtAnagSocietaDetails) {
    this._datiStatisticiFormData = datiStatisticiFormData;
  }

  get situazioneEsposizioneFatturatFormData(): MtAnagSocietaDetails{
    return this._situazioneEsposizioneFatturatFormData;
  }

  set situazioneEsposizioneFatturatFormData(situazioneEsposizioneFatturatFormData: MtAnagSocietaDetails){
    this._situazioneEsposizioneFatturatFormData = situazioneEsposizioneFatturatFormData;
  }

  get situazioneContabileLavoriFormData(): MtAnagSocietaDetails{
    return this._situazioneContabileLavoriFormData;
  }

  set situazioneContabileLavoriFormData(situazioneContabileLavoriFormData: MtAnagSocietaDetails){
    this._situazioneContabileLavoriFormData = situazioneContabileLavoriFormData;
  }

  get patrimonioResponsabileFormData(): PatrimonioResponsibileDataModel{
    return this._patrimonioResponsabileFormData;
  }

  set patrimonioResponsabileFormData(patrimonioResponsabileFormData: PatrimonioResponsibileDataModel){
    this._patrimonioResponsabileFormData = patrimonioResponsabileFormData;
  }

  get rischioGlobaleData(){
    return this._rischioGlobaleData;
  }

  set rischioGlobaleData(rischioGlobaleData: RischioGlobale[]){
    this._rischioGlobaleData = rischioGlobaleData;
  }

  get datiAziendaFormDataArray() {
    return this.datiAziendaFormObjects;
  }

  set datiAziendaFormDataArray(datiAziendaFormObjects: MtAnagSocietaDetails[]) {
    this.datiAziendaFormObjects = datiAziendaFormObjects;
  }

  get difficoltaFinanziariaFormData(): DifficoltaFinanziariaDataModel{
   return this._difficoltaFinanziariaFormData;
  }

  set difficoltaFinanziariaFormData(difficoltaFinanziariaFormData: DifficoltaFinanziariaDataModel){
    this._difficoltaFinanziariaFormData = difficoltaFinanziariaFormData;
  }

  get lavoposiData(): Lavoposi[]{
    return this._lavoposiData;
   }
 
  set lavoposiData(lavoposiData: Lavoposi[]){
    this._lavoposiData = lavoposiData;
  }

  get schedaSintesiData(): SchedaSintesi {
    return this.schedaSintesiDataObject;
   }
 
  set schedaSintesiData(schedaSintesiData: SchedaSintesi){
     this.schedaSintesiDataObject = schedaSintesiData;
   }
  //#endregion

  initDatiSociologiciObject () {
    return {
      anagId: undefined,
      cognome: undefined,
      nome: undefined,
      denominazione: undefined,
      sesso: undefined,
      cabnascitaId: undefined,
      provnasc: undefined,
      codFisc: undefined,
      tipodocumId: undefined,
      documNum: undefined,
      documCabcomId: undefined,
      documEmessoProv: undefined,
      documEnterilascio: undefined,
      tipolegameId: undefined,
      convive: undefined,
      clienteApulia: undefined,
      clienteCcDal: undefined,
      creditcardId: undefined,
      abitativaId: undefined,
      abitativaDal: undefined,
      abitativaCosto: undefined,
      abitativaContratto: undefined,
      propImmobili: undefined,
      propImmobiliTipo: undefined,
      propImmobiliValore: undefined,
      settattivId: undefined,
      professioneId: undefined,
      tipoProfessioneId: undefined,
      professioneDal: undefined,
      professionePresso: undefined,
      professioneIndeterminato: undefined,
      statocivileId: undefined,
      famComponenti: undefined,
      famPercReddito: undefined,
      impegniMnOneri: undefined,
      impegniMnAggiuntivi: undefined,
      impegniMnDebiti: undefined,
      redditoAlPers: undefined,
      redditoMnPers: undefined,
      redditoAlFam: undefined,
      redditoMnFam: undefined,
      redditiAltri: undefined,
      accredStipApulia: undefined,
      partitaiva: undefined,
      reaLegNumero: undefined,
      reaLegProv: undefined,
      userIdLast: undefined,
      impegniMnDebitiResidui: undefined,
      percentualePonderazione: undefined,
      impegniMnOneriPonderato: undefined,
      mensilita: undefined,
      annoArrivoItalia: undefined,
      annoResidenzaItalia: undefined,
      autocertifParent: undefined,
      tipoDipendente: undefined,
      fondoPatrimCostituito: undefined,
      cittadinoExtraUE: undefined,
      famCarico: undefined,
      redditoLavDipendPens: undefined,
      redditoLavDipendStag: undefined,
      annoAnzianita: undefined,
      redditoLavAutDI: undefined,
      redditoTransfReg: undefined,
      redditoLocazImmobili: undefined,
      redditoAgea: undefined,
      impostaNetta: undefined,
      addizionaliAcconti: undefined,
      cedolare: undefined,
      oneriImposta: undefined,
      altreImposte: undefined,
      impegniInEssere: []
    }
  }

  initRecapittiObject() {
    return {
      anagId_Residenza: undefined,
      tipoRecapito_Residenza: undefined,
      presso_Residenza: undefined,
      cabcomCod_Residenza: undefined,
      prov_Residenza: undefined,
      cap_Residenza: undefined,
      toponimoId_Residenza: undefined,
      indirizzo_Residenza: undefined,
      numCivico_Residenza: undefined,
      anno_Residenza: undefined,
      userIdLast_Residenza: undefined,
      datasysLast_Residenza: undefined,
      localita_Residenza: undefined,
      anagRecapitiId_Domicilio: undefined,
      anagId_Domicilio: undefined,
      tipoRecapito_Domicilio: undefined,
      presso_Domicilio: undefined,
      cabcomCod_Domicilio: undefined,
      prov_Domicilio: undefined,
      cap_Domicilio: undefined,
      toponimoId_Domicilio: undefined,
      indirizz_Domicilio: undefined,
      numCivico_Domicilio: undefined,
      anno_Domicilio: undefined,
      userIdLast_Domicilio: undefined,
      datasysLast_Domicilio: undefined,
      localita_Domicilio: undefined,
      anagId: undefined,
      recapitis: []
    }
  }

  initImmobileObject() {
    return {
      immobId: undefined,
      praticaId: undefined,
      immobile: undefined,
      lineaDiCredito: undefined,
      oggettoMutuo: undefined,
      primaCasa: undefined,
      donazione: undefined,
      successione: undefined,
      ediliziaConvenzionata: undefined,
      usufrutto: undefined,
      tipoBene: undefined,
      descrizione: undefined,
      indirizzoToponimoId: undefined,
      indirizzoVia: undefined,
      indirizzoNumvic: undefined,
      indirizzoCabComune: undefined,
      indirizzoProv: undefined,
      indirizzoCap: undefined,
      tipoLocalitaId: undefined,
      attiguaId: undefined,
      tipozonaId: undefined,
      tipoimmobileId: undefined,
      fabbrStatoManutenzId: undefined,
      fabbrQualitaId: undefined,
      ascensore: undefined,
      doppiservizi: undefined,
      numeroPianoId: undefined,
      presenzaGarageId: undefined,
      valoreProbabile: undefined,
      valorePerizia: undefined,
      valoreControperizia: undefined,
      valoreBancadati01: undefined,
      dataBancadati01: undefined,
      valoreBancadati02: undefined,
      dataBancadati02: undefined,
      ufficioTavolare: undefined,
      proprietaCod: undefined,
      proprietaClienteId: undefined,
      noteAssicurazione: undefined,
      notePerizia: undefined,
      userIdLast: undefined,
      datasysLast: undefined,
      fonte: undefined,
      locazione: undefined,
      usoAbitazione: undefined,
      precEsecutiva: undefined,
      tipoUfficio: undefined,
      valoreCrif: undefined,
      salTipodata: undefined,
      salData: undefined,
      salPercentuale: undefined,
      tipoDiritto: undefined,
      statoInvioHost: undefined,
      praticaFinanziamentoId: undefined,
      tipoPeriziaRichId: undefined,
      periziaMotivazione: undefined,
      periziaDate: undefined,
      immobiKey: undefined,
      restrictione: undefined,
      immobileDettaglioList: []
    }
  }

  initPFFormObject(): PFForm {
    return {
      ruolo: undefined,
      ndg: undefined,
      codiceFiscale: undefined,
      tipoNaturaGiuridicaDescr: undefined,
      nome: undefined,
      cognome: undefined,
      dataDiNascita: undefined,
      sesso: undefined,
      comuneDiNascita: undefined,
      provincia: undefined,
      codiceConvenzione: undefined,
      codiceCampagna: undefined,
      codiceTarget: undefined,
      stato: undefined,
      affidato: undefined,
      garantito: undefined,
      docIdentita: undefined,
      dataEmissione: undefined,
      dataScadenza: undefined,
      rilasciatoA: undefined,
      provincia2: undefined,
      nazioneResidenza: undefined,
      cittadino: undefined,
      anzianitaResidenza: undefined,
      nazioneCittadinanza: undefined,
      codiceLingua: undefined,
      numero: undefined,
      filialeDiCompetenza: undefined,
      autocertificazione: undefined,
      annoArivoItalia: undefined
    }
  }

  initDIFormObject(): DiForm {
    return {
      anagId: undefined,
      ndg: undefined,
      ruolo: undefined,
      codiceFiscale: undefined,
      tipoNaturaGiuridicaDescr: undefined,
      denominazione: undefined,
      dataDiNascita: undefined,
      sesso: undefined,
      comuneDiNascita: undefined,
      provincia: undefined,
      stato: undefined,
      affidato: undefined,
      garantito: undefined,

      docIdentita: undefined,
      dataEmissione: undefined,
      dataScadenza: undefined,
      rilasciatoA: undefined,
      provincia2: undefined,
      nazioneResidenza: undefined,
      cittadino: undefined,
      nazioneCittadinanza: undefined,
      codiceLingua: undefined,
      numero: undefined,
      partitaIVA: undefined,
      numIscrREA: undefined,
      provRea: undefined,
      dataIscrizione: undefined,
      considerareAzienda: undefined,
      filialeDiCompetenza: undefined
    }
  }

  initSRLFormObject(): SRLForm {
    return {
      anagId: undefined,
      ndg: undefined,
      ruolo: undefined,
      stato: undefined,
      affidato: undefined,
      garantito: undefined,
      cittadino: undefined,
      nazioneResidenza: undefined,
      codiceLingua: undefined,
      nazioneCittadinanza: undefined,
      filialeDiCompetenza: undefined,
      tipoNaturaGiuridicaDescr: undefined,
      denominazione: undefined,
      numeroIscrizioneLegale: undefined,
      provinciaLegale: undefined,
      dataIscrizioneLegale: undefined,
      numeroIscrizioneAdministrativa: undefined,
      provinciaAdministrativa: undefined,
      dataIscrizioneAdministrativa: undefined,
      partitaIVA: undefined,
      naturaGiuridica: undefined,
      sae: undefined,
      rae: undefined,
      cae: undefined,
      considerareAzienda: undefined
    }
  }

  initAltroFormObject(tipoNaturaGiuridicaCode: string): AltroNominativo {
    return {
      anagId: undefined,
      ndgCedacri: undefined,
      denominazione: undefined,
      ruolo: 'A',
      tipoNaturaGiuridicaCode: tipoNaturaGiuridicaCode,
      partitaiva: undefined,
      nome: undefined,
      cognome: undefined,
      sesso: undefined,
      cabnascitaId: undefined,
      provnasc: undefined,
      datanasc: undefined,
      codFisc: undefined,
      userIdLast: undefined,
      datasysLast: undefined,
      note: undefined,
      indirizzo: undefined,
      comune: undefined,
      provincia: undefined,
      legame: undefined,
      addSource: undefined,
      reaLegProv: undefined,
      reaLegNumero: undefined,
      dataInizioAttivita: undefined,
      manual: undefined,
      tipolegameId: undefined,
      caeId: undefined,
      segmentoAppartenenza: undefined,
      tipoDipendente: undefined
    }
  }

  initDatiAziendaFormObject(): MtAnagSocietaDetails {
    return {
      anagId: undefined,
      immobiliInProprieta: undefined,
      immobiliInLocazione: undefined,
      immobiliInLeasing: undefined,
      affidamentiNote: undefined,
      fatturatoAnno1: undefined, fatturatoAnno1Totale: undefined,
      fatturatoAnno1Estero: undefined,
      fatturatoAnno2: undefined, fatturatoAnno2Totale: undefined,
      fatturatoAnno2Estero: undefined,
      fatturatoAnno3: undefined, fatturatoAnno3Totale: undefined,
      fatturatoAnno3Estero: undefined,
      fatturatoPrevisionale: undefined, fatturatoPrevisionaleTotale: undefined,
      fatturatoPrevisionaleEstero: undefined,
      fatturatoProgrSviluppo: undefined,
      fatturatoClienti: undefined,
      fatturatoFornitori: undefined,
      statisticiPartiteCollegate: undefined,
      statisticiNoteOperativita: undefined,
      dataRiferimento: undefined,
      contabileNote: undefined,
      daLegaleRappresentante: undefined,
      daAmministratore: undefined,
      daCapitaleSociale: undefined,
      daCapitaleSocialeVersate: undefined,
      daComposizioneCapitaleSociale1: undefined,
      daComposizioneCapitaleSociale2: undefined,
      daComposizioneCapitaleSociale3: undefined,
      daComposizioneCapitaleSociale4: undefined,
      daComposizioneCapitaleSociale5: undefined,
      daComposizioneCapitaleSociale6: undefined,
      daComposizioneCapitaleSocialeQ1: undefined,
      daComposizioneCapitaleSocialeQ2: undefined,
      daComposizioneCapitaleSocialeQ3: undefined,
      daComposizioneCapitaleSocialeQ4: undefined,
      daComposizioneCapitaleSocialeQ5: undefined,
      daComposizioneCapitaleSocialeQ6: undefined,
      daCollegioSindicale: undefined,
      daLuogoCostituzione: undefined,
      daLuogoCostituzioneData: undefined, daLuogoCostituzioneDurata: undefined,
      daAttEconomicoPrevalente: undefined,
      daAttEconomicoPrevalenteIcrTribunale: undefined,
      daAttEconomicoPrevalenteNCciaa: undefined,
      daAttivitaSpecifica: undefined,
      daConStabilimenti: undefined,
      daPersoneAbilitate: undefined,
      addetti1: undefined,
      addetti2: undefined,
      addetti3: undefined,
      addettiProv: undefined,
    }
  }

  initPareriFormObject() {
    return {
      praticaRelazioneId: undefined,
      praticaId: undefined,
      type: undefined,
      text: undefined,
      userIdLast: undefined,
      datasysLast: undefined,
      idOrganizationunit: undefined,
      dataInserimento: undefined,
      tipoRelazioniId: undefined,
      parere: undefined,
      statoId: undefined,
      relazioneDetails: undefined,
      praticheRelazioneDetailsId: undefined,
      type1: undefined,
      type2: undefined,
      type3: undefined,
      type4: undefined,
      type5: undefined,
      type6: undefined,
      type7: undefined,
      type8: undefined,
      type9: undefined,
      type10: undefined,
    }
  }

  initGruppiObject() {
    return {
      anagId: undefined,
      grupsoc_Data: undefined,
      grupsoc_Responsabile: undefined,
      note: undefined,
      campo1: undefined,
      campo2: undefined,
      campo3: undefined,
      campo4: undefined,
      campo5: undefined,
      campo8: undefined,
      campo9: undefined,
      campo10: undefined,
      campo11: undefined,
    }
  }
}
