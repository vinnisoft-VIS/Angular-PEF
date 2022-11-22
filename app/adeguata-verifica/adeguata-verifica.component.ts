import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdeguataVerifica, AnagData } from 'src/app/models/adeguata-verifica/adeguata-verifica-model';
import { GenericDropdownModel } from 'src/app/models/generic-dropdown';
import { ChangedPropObj } from 'src/app/models/search-ndg/nuova-pef-search-ndg';
import { AdeguataVerificaService } from 'src/app/utils/services/adeguata-verifica.service';
import { StoreService } from 'src/app/utils/services/store.service';

@Component({
  selector: 'app-adeguata-verifica',
  templateUrl: './adeguata-verifica.component.html',
  styleUrls: ['./adeguata-verifica.component.scss']
})
export class AdeguataVerificaComponent implements OnInit {
  adeguataVerificaData: AdeguataVerifica = {};
  adeguataVerificaForm: FormGroup;
  adeguataVerificaRowData: AnagData[] = [];
  isNuovaPEF: boolean = false;
  fields: Object = { text: "name", value: "id" };
  
  questionarioAdeguataDropdownData: GenericDropdownModel[] = [
    { id: 'True', name: 'Si' },
    { id: 'False', name: 'No' }
  ];
  
  @Input() praticaId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private spinner: NgxSpinnerService,
    private adeguataVerificaService: AdeguataVerificaService,
  ) { 
    this.adeguataVerificaForm = this.formBuilder.group({
      note: [''],
      isVisibleForzatura: [''],
      forzaturaRevUfficio: ['']
    })
  }

  ngOnInit(): void {
    this.isNuovaPEF = this.praticaId === '0';
    this.getAdeguataVerificaData(this.praticaId);
}

  getAdeguataVerificaData(praticid: string) {
    this.spinner.show();
    this.adeguataVerificaData = this.storeService.adeguataVerificaFormObject;

    if (this.isNuovaPEF) {
      let mctAnags = this.storeService.anagList.filter(anag => anag.ruolo === 'R' || anag.ruolo === 'C');
      this.adeguataVerificaRowData = mctAnags.map((anag: AnagData) => {
        return {
          anagId: anag.anagId,
          anagName: anag.anagName,
          questionarioAdeguata: undefined,
          questionarioAdeguataDate: undefined
        }
      });
      
      if (this.adeguataVerificaData.anagList!.length > 0) {
        for (let anag of this.adeguataVerificaRowData) {
          let edittedAnag = this.adeguataVerificaData.anagList?.find(item => item.anagId === anag.anagId);
          if (!edittedAnag) { 
            this.adeguataVerificaData.anagList?.push(anag);
          } else {
            edittedAnag.anagName = anag.anagName;
          }
        }
      } else {
        this.adeguataVerificaData.anagList = this.adeguataVerificaRowData;
      }
      this.setFormValues(this.adeguataVerificaData);
      this.spinner.hide();
    } else {
      if (Object.keys(this.adeguataVerificaData) && Object.keys(this.adeguataVerificaData).length === 1 &&
        this.adeguataVerificaData['anagList']?.length === 0) {
        this.adeguataVerificaService.getAdeguataVerificaData(praticid).subscribe({
          next: (response) => {
            this.adeguataVerificaData = response;
            this.storeService.adeguataVerificaFormObject = response;
            this.setFormValues(this.adeguataVerificaData);
            this.spinner.hide();
          },
          error: (error: any) => { 
            console.error('Something wrong occurred: ', error); 
            this.spinner.hide(); 
          }
        });
      } else {
        this.setFormValues(this.adeguataVerificaData);
        this.spinner.hide();
      }
    }

  }

  setFormValues(adeguataVerificaData: AdeguataVerifica) {
    this.adeguataVerificaRowData = adeguataVerificaData.anagList!;
    this.note?.setValue(adeguataVerificaData?.note);
    this.isVisibleForzatura?.setValue(adeguataVerificaData?.isVisibleForzatura);
    this.forzaturaRevUfficio?.setValue(adeguataVerificaData?.forzaturaRevUfficio);
  }

  inputChange(newValue: any, inputField: string, propName: string, dbEntity: string) {
    let updatedPropObj: ChangedPropObj = {
      databaseEntity: dbEntity,
      propName: propName,
      properties: JSON.stringify({
        propName: propName,
        propValue: newValue.value
      })
    };

    let index = this.storeService.changedPropertiesObjects.findIndex(item => item.propName === propName);
    if (~index) {
      this.storeService.changedPropertiesObjects.splice(index, 1);
    }
    this.storeService.changedPropertiesObjects.push(updatedPropObj);
    this.storeService.storePropertyInObject(inputField, newValue.value, 'adeguataVerificaFormObject', {});
  }

  get note() {
    return this.adeguataVerificaForm.get('note');
  }

  get isVisibleForzatura() {
    return this.adeguataVerificaForm.get('isVisibleForzatura');
  }

  get forzaturaRevUfficio() {
    return this.adeguataVerificaForm.get('forzaturaRevUfficio');
  }
}
