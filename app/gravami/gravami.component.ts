import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditSettingsModel, GridComponent, PageSettingsModel, ResizeSettingsModel, TextWrapSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Browser } from '@syncfusion/ej2-base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { GenericDropdownModel } from 'src/app/models/generic-dropdown';
import { GravamiGridData } from 'src/app/models/pratica/dati-pratica/gravami-grid-data';
import { GravamiService } from 'src/app/utils/services/gravami.service';
import { StoreService } from 'src/app/utils/services/store.service';

@Component({
  selector: 'app-gravami',
  templateUrl: './gravami.component.html',
  styleUrls: ['./gravami.component.scss']
})
export class GravamiComponent implements OnInit, AfterViewInit, OnDestroy {

  private componentDestroyed$: Subject<void> = new Subject<void>();

  @ViewChild('grid') public grid!: GridComponent;
  @Input() praticaId: string = '';
  @Input() immobileId: string = '';

  gravamiData!: GravamiGridData[];
  statoData!: GenericDropdownModel[];
  creditoreFormat: string = '#';

  columnMetaData = [
    { header: 'Id', field: 'immobGravameId', width: 10, isPrimaryKey: true, visible: false },
    { header: 'Gr', field: 'gradoIpoteca', width: 10, type: 'number' },
    { header: 'Creditore', field: 'creditore', width: 15, type: 'string'},
    { header: 'Natura Gravame', field: 'tipoAggravioName', width: 15, type: 'string' },
    { header: 'Iscrizione', field: 'dataIscrizione', width: 15, type: 'date', format: 'dd/MM/yyyy' },
    { header: 'Scadenza', field: 'dataScadenza', width: 15, type: 'date', format: 'dd/MM/yyyy' },
    { header: 'Importo Gravame', field: 'importoIpoteca', width: 18, type: 'number', format: 'N2' },
    { header: 'Importo Mutuo', field: 'importoMutuo', width: 18, format: 'N2', type: 'number' },
    { header: 'Debito Residuo', field: 'debitoResiduo', width: 15, format: 'N2', type: 'number' },
    { header: 'Alla data', field: 'dataDebito', width: 15, type: 'date', format: 'dd/MM/yyyy' },
    { header: 'Stato', field: 'trattIpotecaName', width: 15, format: 'N2', type: 'string' }
  ];

  gridModalForm: FormGroup;
  pageSettings: PageSettingsModel = {};
  wrapSettings!: TextWrapSettingsModel;
  toolbarOptions: any = ['Add', 'Edit', 'Delete'];
  editSettings: EditSettingsModel = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Dialog' };
  resizeSettings: ResizeSettingsModel = { mode: "Normal" };
  isSaveAfterEdit: boolean = false;
  submitClicked: boolean = false;
  isNuovaPEF: boolean = false;

  gradoDropDownData: GenericDropdownModel[] = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '6', name: '6' },
    { id: '7', name: '7' },
    { id: '8', name: '8' },
    { id: '9', name: '9' }
  ];

  naturaGravameDropDownData: GenericDropdownModel[] = [
    { id: 'F', name: 'Ipoteca Volontaria' },
    { id: 'G', name: 'Ipoteca Giudiziale' },
    { id: 'I', name: 'Ipoteca' },
    { id: 'P', name: 'Pignoramento' },
    { id: 'U', name: 'Usufrutto' }
  ];

  constructor(
    private gravamiService: GravamiService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private storeService: StoreService
  ) {
    this.gridModalForm = this.formBuilder.group({
      immobId: [this.immobileId],
      gradoIpoteca: ['', Validators.required],
      tipoAggravio: ['', Validators.required],
      ndgBeneficiario: [''],
      descrizioneNdg: [{ value: '', disabled: true }, Validators.required],
      dataIscrizione: [''],
      dataScadenza: [''],
      dataDebito: [''],
      importoIpoteca: [''],
      importoMutuo: [''],
      debitoResiduo: [''],
      trattIpotecaId: ['', Validators.required],
      trattIpotecaName: [''],
      tipoAggravioName: [''],
      gtn: [''],
      note: ['']
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isNuovaPEF = this.praticaId === '0';
    if (changes['immobileId'].previousValue !== changes['immobileId'].currentValue && this.immobileId !== '') {
      this.setGridConfig();
      this.getGravamiData(this.immobileId);
      this.getStatoData();
    }
  }

  ngAfterViewInit() {
    if (!this.gravamiData) {
      this.grid.editSettings.allowAdding = false;
      this.grid.editSettings.allowEditing = false;
      this.grid.editSettings.allowDeleting = false;
    }
  }

  get ndgBeneficiario() {
    return this.gridModalForm.get('ndgBeneficiario');
  }

  get gradoIpoteca() {
    return this.gridModalForm.get('gradoIpoteca');
  }

  get tipoAggravio() {
    return this.gridModalForm.get('tipoAggravio');
  }

  get descrizioneNdg() {
    return this.gridModalForm.get('descrizioneNdg');
  }

  get trattIpotecaId() {
    return this.gridModalForm.get('trattIpotecaId');
  }

  setGridConfig() {
    this.gravamiData = this.storeService.gravamiGridData;
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: 'Header' };
  }

  getGravamiData(immobileId: string) {
    this.spinner.show();
    this.gravamiData = this.storeService.gravamiGridData.filter(item => item.immobId === immobileId);

    if ((!this.gravamiData || this.gravamiData?.length === 0) && !this.isNuovaPEF) {
      this.gravamiService.getGravamiGridData(immobileId).subscribe({
        next: (response) => {
          this.storeService.gravamiGridData = this.mapGravamiData(response);
          this.gravamiData = this.storeService.gravamiGridData.filter(item => item.immobId === immobileId);
          this.spinner.hide();
        },
        error: (error: any) => {
          console.error('Something wrong occurred: ', error);
          this.spinner.hide();
        }
      });
    }
    this.spinner.hide();
  }

  getStatoData() {
    this.gravamiService.getStatoData().subscribe({
      next: (response) => {
        this.statoData = response;
      },
      error: (error: any) => { console.error('Something wrong occurred: ', error) }
    });
  };

  onSearchCreditore() {
    this.spinner.show();
    let creditore = this.ndgBeneficiario?.value;
    this.gravamiService.getCreditore(creditore).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.gridModalForm.patchValue({ descrizioneNdg: response });
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error('Something wrong occurred: ', error)
      }
    });
  };

  mapGravamiData(gravamiData: GravamiGridData[] | any) {
    if (Array.isArray(gravamiData)) {
      return gravamiData.map((item: GravamiGridData) => {
        let ndgBeneficiario = item.ndgBeneficiario ? item.ndgBeneficiario : '';
        let descrizioneNdg = item.descrizioneNdg ? item.descrizioneNdg : '';

        return {
          ...item,
          creditore: ndgBeneficiario && descrizioneNdg ? `${ndgBeneficiario}/${descrizioneNdg}` : ndgBeneficiario
            ? ndgBeneficiario.toString() : descrizioneNdg ? descrizioneNdg : '',
          tipoAggravioName: this.naturaGravameDropDownData.find(itm => itm.id === item.tipoAggravio)?.name
        }
      })
    } else {
      let gridModalData = this.gridModalForm.getRawValue();
      let tableRow = {
        ...gridModalData,
        immobId: this.immobileId,
        creditore: gridModalData.ndgBeneficiario && gridModalData.descrizioneNdg ? `${gridModalData.ndgBeneficiario}/${gridModalData.descrizioneNdg}` : gridModalData.ndgBeneficiario
          ? gridModalData.ndgBeneficiario.toString() : gridModalData.descrizioneNdg ? gridModalData.descrizioneNdg : '',
        tipoAggravioName: this.naturaGravameDropDownData.find(itm => itm.id === gridModalData.tipoAggravio)?.name,
        trattIpotecaName: this.statoData.find(itm => itm.id === gridModalData.trattIpotecaId)?.name
      }
      return gravamiData.data = tableRow;
    }
  }

  actionBegin(args: any): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      if (args.requestType === 'beginEdit') {
        this.isSaveAfterEdit = true;
      }
      this.submitClicked = false;
      let tabelModel: any = args.rowData;
      this.gridModalForm = this.createModalForm(tabelModel);
    }

    if (args.requestType === 'save') {
      this.submitClicked = true;
      if (this.gridModalForm.valid) {
        this.mapGravamiData(args);
        this.isSaveAfterEdit = false;
      } else {
        args.cancel = true;
      }
    }
  }

  actionComplete(args: any): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      args.dialog.header = args.requestType === 'beginEdit' ? 'Modifica' : 'Inserimento';
      if (Browser.isDevice) {
        if (args.dialog) {
          args.dialog.height = window.innerHeight - 499 + 'px';
        }
      }
    }
    if (args.requestType === 'save') {
      this.storeService.gravamiGridData = this.gravamiData;
    }
    if (args.requestType === 'delete') {
      this.storeGravamiDataInStoreService();
    }
  }

  private storeGravamiDataInStoreService() {
    this.storeService.gravamiGridData = this.cloneArrayData(this.gravamiData);
  }

  private cloneArrayData(sourceData: any) {
    return [...sourceData].map(item => { return { ...item } });
  }

  dataBound() {
    this.grid.autoFitColumns();
    this.grid.hideScroll();
  }

  createModalForm(data: GravamiGridData) {
    return this.formBuilder.group({
      immobId: [data?.immobId],
      gradoIpoteca: [data?.gradoIpoteca, Validators.required],
      tipoAggravio: [data?.tipoAggravio, Validators.required],
      tipoAggravioName: [data?.tipoAggravioName],
      ndgBeneficiario: [data?.ndgBeneficiario],
      descrizioneNdg: [{ value: data?.descrizioneNdg, disabled: true }, Validators.required],
      dataIscrizione: [data?.dataIscrizione],
      dataScadenza: [data?.dataScadenza],
      dataDebito: [data?.dataDebito],
      importoIpoteca: [data?.importoIpoteca],
      importoMutuo: [data?.importoMutuo],
      debitoResiduo: [data?.debitoResiduo],
      trattIpotecaId: [data?.trattIpotecaId, Validators.required],
      trattIpotecaName: [data?.trattIpotecaName],
      gtn: [data?.gtn],
      note: [data?.note]
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
