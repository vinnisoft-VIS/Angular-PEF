import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NuovaPEFNdgSearch } from '../models/search-ndg/nuova-pef-search-ndg';
import { applicative, executive, mockUserLogged, FieldsValidations, AltroNominativoValidations } from '../utils/constants';
import { PraticaService } from '../utils/services/pratica.service';
import { StoreService } from '../utils/services/store.service';
import { TreeService } from '../utils/services/tree.service';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { PraticheViewNodeType } from '../utils/constants';
import { AlertService } from '../utils/services/alert.service';

@Component({
  selector: 'app-pratiche-view',
  templateUrl: './pratiche-view.component.html',
  styleUrls: ['./pratiche-view.component.scss']
})
export class PraticheViewComponent implements OnInit {
  nodeType: string = '';
  praticaTipoCode: number = 0;
  statoId: string = '';
  praticaId: string = '';
  executive: string = '';
  applicative!: number;
  anagraficaDettTypes = ['AnagraficaDetG', 'AnagraficaDetT', 'AnagraficaDetC', 'AnagraficaDetR'];
  nodeVisibility: string = '';
  immobileId!: string;
  praticaRelazioneId!: string;
  atlPeriziaId!: string;
  atlRelazioneId!: string;
  schemaFidi!: number;
  praticheViewNodeType = PraticheViewNodeType;
  anagId!: string;
  ndg!: string;

  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private treeService: TreeService,
    private storeService: StoreService,
    private praticaService: PraticaService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.praticaTipoCode = +params['praticaTipoCode'];
      this.statoId = params['statoId'];
      this.praticaId = params['entityId'];
      this.executive = executive;
      this.applicative = applicative;
    });

    this.route.params.subscribe(
      (params: Params) => {
          this.nodeType = params['codice'];
        },
        error => {
          console.log(error);
    });

    this.treeService.nodeVisibilityValue
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((visibility) => {
        this.nodeVisibility = visibility;
      });

    this.treeService.selectedNodeData
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((details) => {
        this.anagId = details.anagId;
        this.immobileId = details.immobileId;
        this.praticaRelazioneId = details.praticaRelazioneId;
        this.atlPeriziaId = details.atlPeriziaId;
        this.atlRelazioneId = details.atlRelazioneId;
        this.ndg = details.ndg;
      });
  }

  toggleTree() {
    this.treeService.openTreeView();
  }

  handleValidationError(nodeObject: string, ruolo: string, nodeData: any) {
    let formDetails = {
      formName: nodeObject,
      ruolo: ruolo,
      anagId: nodeData.anagId,
      immobileId: nodeData.immobId
    };
    this.praticaService.redirectToErrorNode(formDetails);
  }

  async savePratica(isEseguito: boolean) {
    this.spinner.show;
    this.schemaFidi = this.storeService.schemaFidiValue;
    let storedObjects = this.storeService.getStoredObjects();
    let requiredErrorsCount: number = 0;
    let ruolo = '';
    let tipoNaturaGiuridica: string = '';

    loop1:
    for (var nodeObject of Object.keys(storedObjects)) {
      var nodeObjectData = storedObjects[nodeObject as keyof {}] as any;

      if (Array.isArray(nodeObjectData)) {
        for (let nodeData of nodeObjectData) {
          ruolo = nodeData['ruolo'];
          tipoNaturaGiuridica = nodeData['tipoNaturaGiuridicaCode'];
          for (let property of Object.keys(nodeData)) {
            let propertyValue = nodeData[property];
            if (this.nodeVisibility !== 'V') {
              if (AltroNominativoValidations.some(item => item.nodeObjectName === nodeObject)) {
                let altroItem = AltroNominativoValidations.find(item => item.nodeObjectName === nodeObject
                  && item.fieldName === property
                  && item.tipoNaturaGiuridica === tipoNaturaGiuridica);

                if (altroItem && this.isEmptyOrNull(propertyValue)) {
                  console.log('required error for ' + nodeObject + '/' + property + '/' + nodeData['anagId']);
                  requiredErrorsCount++;
                  this.handleValidationError(nodeObject, ruolo, nodeData);
                  break loop1;
                }
              } else if ((FieldsValidations.find(item => item.nodeObjectName === nodeObject && item.fieldName === property) && this.isEmptyOrNull(propertyValue)) ||
                (FieldsValidations.find(item => item.nodeObjectName === nodeObject && item.fieldName === property && item.isValid === false))) {
                  console.log('required error for ' + nodeObject + '/' + property + '/' + nodeData['anagId']);

                requiredErrorsCount++;
                this.handleValidationError(nodeObject, ruolo, nodeData);
                break loop1;
              }
            }
          }
        }
      } else {
        if (nodeObjectData) {
          for (let property of Object.keys(nodeObjectData)) {
            let propertyValue = nodeObjectData[property];
            if (FieldsValidations.find(item => item.nodeObjectName === nodeObject && item.fieldName === property) && this.isEmptyOrNull(propertyValue)) {
              console.log('required error for ' + nodeObject + '/' + property);
              requiredErrorsCount ++;
              let formDetails = {
                formName: nodeObject
              };
              this.praticaService.redirectToErrorNode(formDetails);
              break loop1;
            }
          }
        }
      }
    }

    let nuovaPEFData: NuovaPEFNdgSearch = {
      praticaId: this.storeService.nuovaPEFSearchNdgDataObject?.praticaId,
      ndg: storedObjects.datiPraticaFormObject.ndg,
      praticaTipoCode: this.praticaTipoCode,
      userLoggedId: mockUserLogged.userId,
      userLoggedName: mockUserLogged.name,
      datiPraticaNdgFormData: storedObjects.datiPraticaFormObject,
      changedPropertiesObjects: this.storeService.changedPropertiesObjects,
      assicurazioniGridData: storedObjects.assicurazioniGridData,
      immobileData: storedObjects.immobileFormObject.map(formObject => {
        return  {
          immobId: formObject.immobId,
          immobileDettaglioList: formObject.immobileDettaglioList
        }
      }),
      notaiscrizioneGridData: storedObjects.notaIscrizioneGridData,
      garanzieNdgGridData: storedObjects.garanzieGridData,
      recapitiEContattiData: storedObjects.recapitiFormObject,
      bilancioSinteticoGridData: storedObjects.bilancioSinteticoGridData,
      patrimonioFormObject: storedObjects.patrimonioFormObject,
      patrimonioDatiInformativiFormObject: storedObjects.patrimonioDatiInformativiFormObject,
      datiStatisticiFormData: storedObjects.datiStatisticiFormData,
      situazioneEsposizioneFatturatFormData: storedObjects.situazioneEsposizioneFatturatFormData,
      situazioneContabileLavoriFormData:storedObjects.situazioneContabileLavoriFormData,
      difficoltaFinanziariaFormData: storedObjects.difficoltaFinanziariaFormData,
      patrimonioResponsabileFormData: storedObjects.patrimonioResponsabileFormData,
      datiSociologiciData: storedObjects.datiSociologiciFormObject.map(formObject => {
        return  {
          anagId: formObject.anagId,
          impegniInEssere: formObject.impegniInEssere
        }
      }),
      rischioGlobaleData: storedObjects.rischioGlobaleData,
    }

    if (requiredErrorsCount == 0) {
        this.praticaService.savePEF(nuovaPEFData, this.praticaId, isEseguito, this.schemaFidi).subscribe({
          next: (response) => {
            this.spinner.hide();
            this.storeService.changedPropertiesObjects = [];
            if (response) {
              this.alertService.showSucess("Pratica was saved successfully");
              if (isEseguito === true) {
                this.chiudi();
              }
            } else {
              this.alertService.showError("Pratica not saved");
            }
          },
          error: (error) => {
            console.log(error);
            this.alertService.showError('Error on save');
            this.spinner.hide();
          }
        });
      } else {
        this.spinner.hide();
      }
  }

  isEmptyOrNull(propertyValue: any) {
    return propertyValue === null || propertyValue === '' || propertyValue === undefined;
  }

  chiudi() {
    this.router.navigateByUrl('/home');
    this.storeService.resetData();
  }
}
