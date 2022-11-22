import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PraticaService } from '../utils/services/pratica.service';
import { StoreService } from '../utils/services/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  executive: any;
  applicative: any;
  inputtedTaskId: string = '';
  isProduction: boolean = false;

  constructor(
    private storeService: StoreService,
    private praticaService: PraticaService,
    private router: Router
  ) { 
    this.isProduction = environment.production;
  }

  ngOnInit(): void {
    this.executive = this.storeService.executive;
    this.applicative = this.storeService.applicative;
  }

  loadTask() {
    this.storeService.taskPraticaId = this.inputtedTaskId;
    this.praticaService.loadTask();
    this.praticaService.rebuildTreeEvent();
  }

  returnToPratica() {
    let praticaUrl: string = `https://localhost:4200/pratiche/202/0/0/${this.executive}/${this.applicative}/DatiMutuoNode`;

    this.router.navigate(['external', 'outside', { url: praticaUrl }]);
  }

  refresh() {
    this.router.navigateByUrl('/');
  }
  
  returnToMainMenu() {
    this.router.navigate(['external', 'hostApp']);
  }
}
