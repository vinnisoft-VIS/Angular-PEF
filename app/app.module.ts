import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { PraticheViewComponent } from './pratiche-view/pratiche-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from './custom-components/custom-checkbox/custom-checkbox.component';
import { TreeService } from './utils/services/tree.service';
import { DatiPraticaComponent } from './PEF nodes/dati-pratica/dati-pratica.component';
import { NumericTextBoxModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AutoCompleteModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { StoreService } from './utils/services/store.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GaranzieComponent } from './PEF nodes/garanzie/garanzie.component';
import localeIt from '@angular/common/locales/it';
import { FormsWrapperComponent } from './PEF nodes/anagrafica-nodes/forms-wrapper/forms-wrapper.component';
import { PfFormComponent } from './PEF nodes/anagrafica-nodes/pf-form/pf-form.component';
import { AlertService } from './utils/services/alert.service';
import { DatePipe, registerLocaleData} from '@angular/common';
import { PraticaService } from './utils/services/pratica.service';
import { AssicurazioniComponent } from "./PEF nodes/assicurazioni/assicurazioni.component";
import { AssicurazioniService } from "./utils/services/assicurazioni.service";
import { DiFormComponent } from './PEF nodes/anagrafica-nodes/di-form/di-form.component';
import { SrlFormComponent } from './PEF nodes/anagrafica-nodes/srl-form/srl-form.component';
import { BilancioSinteticoComponent } from './PEF nodes/bilancio-sintetico/bilancio-sintetico.component';
import { TabModule } from "@syncfusion/ej2-angular-navigations";
import { BilancioSinteticoService } from './utils/services/bilancio-sintetico.service';
import { NumberParser } from "./utils/helpers/number-parser";
import { NotaIscrizioneIpotecariaComponent } from './PEF nodes/nota-iscrizione-ipotecaria/nota-iscrizione-ipotecaria.component';
import { NotaIscrizioneIpotecariaService } from "./utils/services/nota-iscrizione-ipotecaria.service";
import { RedirectComponent } from './redirect/redirect.component';
import { ExternalRouteGuard } from './utils/guards/external-route.guard';
import { AggregateService, CommandColumnService, EditService, GridModule, GroupService, PageService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { PanelloDiControlloComponent } from './PEF nodes/panello-di-controllo/panello-di-controllo.component';
import { SchedaAnalisiComponent } from './PEF nodes/scheda-analisi/scheda-analisi.component';
import { SintesiDellaPropostaComponent } from './PEF nodes/sintesi-della-proposta/sintesi-della-proposta.component';
import { ApprofondimentiComponent } from './PEF nodes/approfondimenti/approfondimenti.component';
import { PareriExpressiComponent } from './PEF nodes/pareri-expressi/pareri-expressi.component';
import { PareriExpressiChildComponent } from './PEF nodes/pareri-expressi-child/pareri-expressi-child.component';
import { NoSanitizePipe } from './utils/pipes/no-sanitize-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeModule } from '@circlon/angular-tree-component';
import { ToastrModule } from 'ngx-toastr';
import { BancheDatiComponent } from './PEF nodes/banche-dati/banche-dati.component';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BancheDatiService } from './utils/services/banche-dati.service';
import { ErrorService } from './utils/services/error.service';
import { RecapitiEContattiComponent } from "./PEF nodes/anagrafica-nodes/recapiti-e-contatti/recapiti-e-contatti.component";
import { RecapitiEContattiService } from "./utils/services/recapiti-e-contatti.service";
import { NewChildAltroNominativoComponent } from './PEF nodes/altro-nominativo/altro-nominativo.component';
import { ImmobileComponent } from './PEF nodes/immobile/immobile.component';
import { GravamiComponent } from './PEF nodes/gravami/gravami.component';
import { ImmobileService } from './utils/services/immobile.service';
import { DatiSociologiciComponent } from './PEF nodes/anagrafica-nodes/dati-sociologici/dati-sociologici.component';
import { ImpegniInEssereComponent } from './shared/components/impegni-in-essere/impegni-in-essere.component';
import { AltroNominativoService } from './utils/services/altro-nominativo.service';
import { PatrimonioComponent } from './PEF nodes/anagrafica-nodes/patrimonio/patrimonio.component';
import { PatrimonioService } from "./utils/services/patrimonio.service";
import { ImmobiliGridComponent } from './PEF nodes/anagrafica-nodes/immobili-grid/immobili-grid.component';
import { BancheDatiEsterneStoricheComponent } from './PEF nodes/banche-dati-esterne-storiche/banche-dati-esterne-storiche.component';
import { BancheDatiEsterneStoricheService } from './utils/services/banche-dati-esterne-storiche.service';
import { DatiSociologiService } from "./utils/services/dati-sociologi.service";
import { SumPipe } from './utils/pipes/sum.pipe';
import { PareriComponent } from './PEF nodes/pareri/pareri.component';
import { PareriService } from './utils/services/pareri.service';
import { PatrimonioDatiInformativiComponent } from './PEF nodes/anagrafica-nodes/patrimonio-dati-informativi/patrimonio-dati-informativi.component';
import { GravamiService } from './utils/services/gravami.service';
import { PatrimonioPfComponent } from './PEF nodes/anagrafica-nodes/patrimonio-pf/patrimonio-pf.component';
import { UtilsService } from "./utils/services/utils.service";
import { AdeguataVerificaComponent } from './PEF nodes/adeguata-verifica/adeguata-verifica.component';
import { AdeguataVerificaService } from './utils/services/adeguata-verifica.service';
import { AnagDetailsRowComponent } from './PEF nodes/anag-details-row/anag-details-row.component';
import { QuestionarioHighRiskComponent } from './PEF nodes/questionario-high-risk/questionario-high-risk.component';
import { QuestionarioHighRiskService } from './utils/services/questionario-high-risk.service';
import { DatiStatisticiComponent } from './PEF nodes/dati-statistici/dati-statistici.component';
import { DatiStatisticiService } from "./utils/services/dati-statistici.service";
import { DatiAziendaComponent } from './PEF nodes/dati-azienda/dati-azienda.component';
import { VisureComponent } from './PEF nodes/visure/visure.component';
import { VisureService } from './utils/services/visure.service';
import { SituazioneEsposizioneFatturatoComponent } from './PEF nodes/situazione-esposizione-fatturato/situazione-esposizione-fatturato.component';
import { SituazioneContabileLavoriComponent } from './PEF nodes/situazione-contabile-lavori/situazione-contabile-lavori.component';
import { CollegamentiComponent } from './PEF nodes/collegamenti/collegamenti.component';
import { CollegamentiService } from './utils/services/collegamenti.service';
import { DifficoltaFinanziariaComponent } from './PEF nodes/difficolta-finanziaria/difficolta-finanziaria.component';
import { DifficoltaFinanziariaService } from "./utils/services/difficolta-finanziaria.service";
import { GruppiComponent } from './PEF nodes/gruppi/gruppi.component';
import { GruppiService } from './utils/services/gruppi.service';
import { PatrimonioResponsabileComponent } from './PEF nodes/patrimonio-responsabile/patrimonio-responsabile.component';
import { PerimetroComponent } from './PEF nodes/perimetro/perimetro.component';
import { PerimetroService } from './utils/services/perimetro.service';
import { LavoposiComponent } from './PEF nodes/lavoposi/lavoposi.component';
import { LavoposiService } from './utils/services/lavoposi.service';
import { DatiPraticaPcaComponent } from './PCA nodes/dati-pratica-pca/dati-pratica-pca.component';
import { RischioGlobaleComponent } from './PEF nodes/rischio-globale/rischio-globale.component';
import { RischioGlobaleService } from './utils/services/rischio-globale.service';
import { SchedaSintesiComponent } from './PEF nodes/scheda-sintesi/scheda-sintesi.component';
import { SchedaSintesiService } from './utils/services/scheda-sintesi.service';

registerLocaleData(localeIt);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TreeViewComponent,
    PraticheViewComponent,
    CustomCheckboxComponent,
    DatiPraticaComponent,
    GaranzieComponent,
    BilancioSinteticoComponent,
    FormsWrapperComponent,
    PfFormComponent,
    AssicurazioniComponent,
    DiFormComponent,
    SrlFormComponent,
    NotaIscrizioneIpotecariaComponent,
    RedirectComponent,
    PanelloDiControlloComponent,
    SchedaAnalisiComponent,
    SintesiDellaPropostaComponent,
    ApprofondimentiComponent,
    PareriExpressiComponent,
    PareriExpressiChildComponent,
    NoSanitizePipe,
    BancheDatiComponent,
    NewChildAltroNominativoComponent,
    ImmobileComponent,
    GravamiComponent,
    DatiSociologiciComponent,
    ImpegniInEssereComponent,
    RecapitiEContattiComponent,
    BancheDatiEsterneStoricheComponent,
    SumPipe,
    PareriComponent,
    ImpegniInEssereComponent,
    BancheDatiComponent,
    PatrimonioComponent,
    ImmobiliGridComponent,
    PatrimonioDatiInformativiComponent,
    PatrimonioPfComponent,
    AdeguataVerificaComponent,
    AnagDetailsRowComponent,
    QuestionarioHighRiskComponent,
    DatiStatisticiComponent,
    DatiAziendaComponent,
    VisureComponent,
    SituazioneEsposizioneFatturatoComponent,
    SituazioneContabileLavoriComponent,
    CollegamentiComponent,
    DifficoltaFinanziariaComponent,
    GruppiComponent,
    SituazioneContabileLavoriComponent,
    PatrimonioResponsabileComponent,
    DatiPraticaPcaComponent,
    RischioGlobaleComponent,
    PerimetroComponent,
    LavoposiComponent,
    SchedaSintesiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TreeModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    NumericTextBoxModule,
    DatePickerModule,
    DropDownListModule,
    CheckBoxModule,
    NgxSpinnerModule,
    GridModule,
    NumericTextBoxModule,
    TabModule,
    RadioButtonModule,
    AutoCompleteModule,
    NgbModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    TooltipModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT'},
    TreeService,
    StoreService,
    PraticaService,
    ToolbarService,
    CommandColumnService,
    GroupService,
    EditService,
    PageService,
    AlertService,
    AssicurazioniService,
    DatePipe,
    AggregateService,
    NotaIscrizioneIpotecariaService,
    BilancioSinteticoService,
    NumberParser,
    ExternalRouteGuard,
    BancheDatiService,
    ErrorService,
    RecapitiEContattiService,
    ImmobileService,
    AltroNominativoService,
    BancheDatiEsterneStoricheService,
    PareriService,
    GravamiService,
    PatrimonioService,
    DatiSociologiService,
    UtilsService,
    AdeguataVerificaService,
    QuestionarioHighRiskService,
    DatiStatisticiService,
    ConfirmationService,
    VisureService,
    CollegamentiService,
    DifficoltaFinanziariaService,
    GruppiService,
    RischioGlobaleService,
    PerimetroService,
    LavoposiService,
    SchedaSintesiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
