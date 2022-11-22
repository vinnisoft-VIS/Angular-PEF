import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MtAnag } from '../models/pratica/anag';
import { Node } from '../models/tree/node';
import { TreeNode } from '../models/tree/tree-node';
import { TreeService } from '../utils/services/tree.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { 
  AnagraficaDescendantsNames,
  applicative,
  executive, idProcess, mockUserLogged, newNodeParents, taskStatoId } from '../utils/constants';
import { PraticaService } from '../utils/services/pratica.service';
import { AnagNodeData } from '../models/tree/anag-node-data';
import { StoreService } from '../utils/services/store.service';
import { ConfigService } from '../utils/services/config.service';
import { UUID } from 'angular2-uuid';
import { ErrorService } from '../utils/services/error.service';
import { UtilsService } from '../utils/services/utils.service';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  status: boolean = false;
  praticaTipoCode: string = '';
  statoId: string = '';
  praticaId: string = '';
  isNuovaPEF: boolean = false;
  databaseNodes: TreeNode[] = [];
  treeNodes: Node[] = [];
  nodeCounter: number = 0;
  praticaNameResponse: any;
  praticaName: string = '';
  checkedNodes: string[] = [];
  currentUser: any = mockUserLogged;
  executive: string = '';
  applicative!: number;
  parentsForCreateNodes: string[] = ['AnagraficaG', 'AnagraficaA', 'AnagraficaT', 'ImmobileGroupNode', 'RelazioneNode', 'PerizieGroupNode'];
  hiddenNodes: string[] = ['DatiAziendaNodes'];
  deletedNodes: any[] = [];
  immobiliIndex: number = 0;
  parereNodeIndex: number = 0;
  perizieNodeIndex: number = 0;

  options = {
    nodeHeight: 23,
    actionMapping: {
      mouse: {
        click: (tree: any, node: any, $event: any) => {
          this.clickNode(node, {});
        }
      }
    },
    useVirtualScroll: true,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  }

  @ViewChild('tree') tree: any;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private treeService: TreeService,
    private spinner: NgxSpinnerService,
    private praticaService: PraticaService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private errorService: ErrorService,
    private utilsService: UtilsService
  ) {
    this.treeService.treeViewOpen.pipe(takeUntil(this.componentDestroyed$)).subscribe(() => this.collapseMenu());
  }

  ngOnInit(): void {
    if (!this.router.url.startsWith('/pratiche') && this.router.url !== '/') {
      let url = this.router.url.replace('/?', '');
      url = url.includes('=%3D') ? url.replace('=%3D', '') : url.replace('=', '');
      let idProcess = +this.configService.getParameterByName('idProcess', window.atob(url))!;
      this.storeService.executive = this.configService.getParameterByName('executive', window.atob(url))!;
      this.storeService.applicative = +this.configService.getParameterByName('applicative', window.atob(url))!;
      this.storeService.idProcess = idProcess;
      this.praticaTipoCode = idProcess < 201 ? '5' : idProcess.toString();
    } else {
      this.storeService.executive = executive;
      this.storeService.applicative = applicative;
      this.storeService.idProcess = idProcess;     
    }
    this.route.params.subscribe(params => {
      this.praticaTipoCode = params['praticaTipoCode'] ? params['praticaTipoCode'] :
        this.storeService.idProcess < 201 ? '5' : this.storeService.idProcess.toString();
      this.statoId = params['statoId'] ? params['statoId'] : '0';
      this.praticaId = params['entityId'] ? params['entityId'] : '0';
      this.executive = params['executive'] ? params['executive'] : this.storeService.executive;
      this.applicative = params['applicative'] ? params['applicative'] : this.storeService.applicative;
    });

    this.isNuovaPEF = this.praticaId === '0';

    this.storeService.anagList = [];
    this.getTreeNodes([]);

    this.praticaService.isTreeRebuildEventTriggered()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((response) => {
        if (response) {
          if (response?.anags) {
            this.praticaName = `${response.ndg} / ${response.progr} - ${response.denominazione}`;
            this.getTreeNodes(response?.anags);
          } else {
            this.praticaName = '';
            this.getTreeNodes(response);
          }
        } else {
          this.praticaId = this.storeService.taskPraticaId;
          this.statoId = taskStatoId;
          this.getTreeNodes([]);
        }
      });

    this.praticaService.getErrorNodeDetails()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((response) => {
        if (response) {
          switch (response.formName) {
            case 'datiPraticaFormObject':
              let nodeDatiPratica = this.getNodeByCodice({ codice: 'DatiMutuoNode'});
              this.clickNode(nodeDatiPratica, {});
              break;
            case 'recapitiFormObject':
              let nodeRecapitti = this.getNodeByCodice({codice: 'RecapitiEContatti', anagId: response.anagId});
              this.clickNode(nodeRecapitti, response.anagId);
              break;
            case 'datiSociologiciFormObject':
              let nodeDatiSociologici = this.getNodeByCodice({codice: 'DatiSociologici', anagId: response.anagId});
              this.clickNode(nodeDatiSociologici, response.anagId);
              break;
            case 'pfFormObject':
            case 'diFormObject':
            case 'srlFormObject':
            case 'altroFormObject':
            case 'immobileFormObject':
              this.redirectToErrorNode(response);
              break;
          }
        }
      });

    this.praticaService.isSearched()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((response) => {
        let newTreeNode = this.tree.treeModel.getNodeBy((node: any) => node?.data?.anagNodeData?.anagId === response?.anagId);

        if (response.tipoNaturaGiuridica) {
          newTreeNode.data.anagNodeData.tipoNaturaGiuridica = response.tipoNaturaGiuridica;
        }
        newTreeNode.data.name = response.description;
        newTreeNode.treeModel.update();
        this.clickNode(newTreeNode, {});

        let anag = this.storeService.anagList.find(anagItem => anagItem.anagId === response?.anagId);
        if (anag) {
          anag.anagName = response.description;
        }
      });

    this.treeService.getUpdatedNodeChildren()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((response) => {
        let anagraficaParentNode = this.tree.treeModel.getNodeBy((node: any) => node?.data?.anagNodeData?.anagId === response?.anagId);
        this.updateChildrenNodes(response.anagChildrenNodes, anagraficaParentNode);
        anagraficaParentNode.treeModel.update();

        if (response.ruolo === 'R') {
          let datiPraticaNode = this.tree.treeModel.getNodeBy((node: any) => node?.data?.codice === 'DatiMutuoNode');
          this.updateChildrenNodes(response.datiPraticaChildrenNodes, datiPraticaNode);
          datiPraticaNode.treeModel.update();
        }
        this.clickNode(anagraficaParentNode, {});
      });
  }

  updateChildrenNodes(nodeSource: TreeNode[], parentNode: any) {
    let nodesToBeAdded: TreeNode[] = this.utilsService.cloneArrayData(nodeSource);
    let childrenNodes = this.utilsService.cloneArrayData(parentNode.data.children);

    for (let node of nodeSource) {
      let existingNode = childrenNodes.find((childNode: Node) => childNode.codice === node.codice);

      if (existingNode) {
        let index = nodesToBeAdded.findIndex(nodeToBeRemoved => nodeToBeRemoved.codice === existingNode.codice);
        nodesToBeAdded.splice(index, 1);
      }
    }

    for (let childNode of childrenNodes) {
      let checkChild = nodeSource.find(item => item.codice === childNode.codice);
      if (!checkChild) {
        let childIndex = parentNode.data.children.findIndex((item: any) => item.codice === childNode.codice);
        parentNode.data.children.splice(childIndex, 1);
      }
    }

    nodesToBeAdded.map((node: TreeNode) => {
      let child: Node = {
        id: node.id,
        parentId: parentNode.data.id,
        name: node.description,
        codice: node.codice,
        tipoNaturaGiuridica: node.tipoNaturaGiuridica,
        order: node.order,
        visibility: parentNode.data.visibility,
        anagNodeData: parentNode.data.anagNodeData
      }
      parentNode?.data?.children?.push(child);
    });

    for (let node of parentNode.data.children) {
      let originalNode = nodeSource.find(item => item.codice === node.codice);
      if (originalNode) {
        node.order = originalNode.order;
      }
    }
    parentNode?.data?.children.sort((a: any, b: any) => a.order - b.order);
  }

  redirectToErrorNode(errorDetails: any) {
    if (errorDetails.ruolo) {
      switch (errorDetails.ruolo) {
        case 'R':
          let richiedenteNode = this.getNodeByCodice({ codice: 'AnagraficaDetR', anagId: errorDetails.anagId });
          this.clickNode(richiedenteNode, { anagId: errorDetails.anagId });
          break;
        case 'C':
          let cointestatoNode = this.getNodeByCodice({ codice: 'AnagraficaDetC', anagId: errorDetails.anagId });
          this.clickNode(cointestatoNode, { anagId: errorDetails.anagId });
          break;
        case 'G':
          let garanteNode = this.getNodeByCodice({ codice: 'AnagraficaDetG', anagId: errorDetails.anagId });
          this.clickNode(garanteNode, { anagId: errorDetails.anagId });
          break;
        case 'T':
          let terzoNode = this.getNodeByCodice({ codice: 'AnagraficaDetT', anagId: errorDetails.anagId });
          this.clickNode(terzoNode, { anagId: errorDetails.anagId });
          break;
        case 'A':
          let altriNode = this.getNodeByCodice({ codice: 'AnagraficaDetA', anagId: errorDetails.anagId });
          this.clickNode(altriNode, { anagId: errorDetails.anagId });
          break;
      }
    } else if (errorDetails.immobileId) {
      let immobileNode = this.getNodeByCodice({ codice: 'ImmobileNode', immobileId: errorDetails.immobileId });
      this.clickNode(immobileNode, { anagId: errorDetails.anagId, immobileId: errorDetails.immobileId} );
    } else if (errorDetails.praticaRelazioneId) {
      let parereNode = this.getNodeByCodice({ codice: 'ParereNode', praticaRelazioneId: errorDetails.praticaRelazioneId });
      this.clickNode(parereNode, { praticaRelazioneId: errorDetails.relazioneId });
    }
  }

  getNodeByCodice(params: { codice?: string, anagId?: string, immobileId?: string, praticaRelazioneId?: string }) {
    if (params.anagId) {
      return this.tree.treeModel.getNodeBy((node: any) => node.data.codice === params.codice && node.data?.anagNodeData?.anagId == params.anagId);
    } else if (params.immobileId) {
      return this.tree.treeModel.getNodeBy((node: any) => node.data.codice === params.codice && node.data?.immobileId == params.immobileId);
    } else if (params.praticaRelazioneId) {
      return this.tree.treeModel.getNodeBy((node: any) => node.data.codice === params.codice && node.data?.praticaRelazioneId == params.praticaRelazioneId);
    } else {
      return this.tree.treeModel.getNodeBy((node: any) => node.data.codice === params.codice);
    }
  }

  collapseMenu() {
    this.status = !this.status;
  }

  deleteNode(node: any) {
    let index = this.deletedNodes.findIndex(item => item.data.id === node.data.id);
    if (~index) {
      this.deletedNodes.splice(index, 1);
    }
    this.deletedNodes.push(node);

    let parentNode = this.tree.treeModel.getNodeBy((parentNode: any) => parentNode.data.id === node.data.parentId)
    var removeIndex = parentNode.data.children.findIndex((child: any) => child.id === node.data.id);
    ~removeIndex && parentNode.data.children.splice(removeIndex, 1);

    parentNode.treeModel.update();
  }

  isNodeRemovable(node: any) {
    return ['newChild', 'ImmobileNode'].some(item => node.data.codice.startsWith(item));
  }

  ripristina(node: any) {
    this.deletedNodes.forEach(deletedNode => {
      if (deletedNode.data.parentId === node.data.id) {
        let ripristinaNode = node.data.children.some((node: any) => node.id === deletedNode.id);
        if (!ripristinaNode) {
          let childrenNode: Node = {
            id: deletedNode.id,
            name: deletedNode.data.name,
            codice: deletedNode.data.codice,
            parentId: deletedNode.data.parentId,
            order: deletedNode.data.order,
            anagNodeData: deletedNode.data.anagNodeData,
            children: deletedNode.data.children
          }
          node.data.children.push(childrenNode);
        }
      }
    });
    this.deletedNodes = [];
    node.data.children.sort((a: any, b: any) => a.order - b.order);
    node.treeModel.update();
  }

  hasChildrenDeleted(node: any) {
    return this.deletedNodes.some(item => item.data.parentId === node.data.id);
  }

  createNode(node: any) {
    switch (node.data.codice) {
      case newNodeParents.AnagraficaG:
        this.createAnagraficaChildNodes(4, 'G', node);
        break;
      case newNodeParents.AnagraficaT:
        this.createAnagraficaChildNodes(2, 'T', node);
        break;
      case newNodeParents.AnagraficaA:
        this.createAnagraficaChildNodes(0, 'A', node);
        break;
      case newNodeParents.Immobili:
        this.createImmobiliNodes(node);
        break;
      case newNodeParents.Parere:
        this.createParereChildNodes(node);
        break;
      case newNodeParents.Perizie:
        this.createPerizieChildNodes(node);
        break;
    }
  }

  createNewNode(parentNode: any): Node {
    return {
      id: UUID.UUID(),
      name: 'new entry',
      codice: `newChild${parentNode.data.name.replace(/\s/g, "")}`,
      parentId: parentNode.data.id,
      order: parentNode.data.order,
      visibility: parentNode.data.visibility,
      anagNodeData: {
        anagId: UUID.UUID(),
        tipoNaturaGiuridica: 'F',
        ruolo: parentNode.data.codice === 'AnagraficaG' ? 'G' : parentNode.data.codice === 'AnagraficaT' ? 'T' : 'A'
      },
      children: []
    };
  }

  createAnagraficaChildNodes(numberOfChildren: number, anagType: string, parentNode: any) {
    let anagraficaNephewsName = new Map<string, string[]>([
      ['G', [AnagraficaDescendantsNames.Recapiti, AnagraficaDescendantsNames.DatiSociologici, AnagraficaDescendantsNames.Patrimonio,
      AnagraficaDescendantsNames.BancheDatiEsterne]],
      ['T', [AnagraficaDescendantsNames.Recapiti, AnagraficaDescendantsNames.BancheDatiEsterne]],
      ['A', []]
    ]);

    let newNode = this.createNewNode(parentNode);

    if (anagType === 'A') {
      if (!this.storeService.altroFormObjects.some(altroForm => altroForm.anagId === newNode.anagNodeData!.anagId)) {
        if (this.storeService.altroFormObject.anagId !== newNode.anagNodeData!.anagId) {
          this.storeService.altroFormObject = this.storeService.initAltroFormObject(newNode.tipoNaturaGiuridica!);
          this.storeService.altroFormObject.anagId = newNode.anagNodeData!.anagId;
          this.storeService.altroFormObjects.push(this.storeService.altroFormObject);
        }
      }
    } else if (anagType === 'G' || anagType === 'T') {
      if (!this.storeService.pfFormObjects.some(pfForm => pfForm.anagId === newNode.anagNodeData!.anagId)) {
        if (this.storeService.pfFormObject.anagId !== newNode.anagNodeData!.anagId){
            this.storeService.pfFormObject = this.storeService.initPFFormObject();
            this.storeService.pfFormObject.anagId = newNode.anagNodeData!.anagId;
            this.storeService.pfFormObjects.push(this.storeService.pfFormObject);
        }
      }
    }
    parentNode.data.children.push(newNode);
    parentNode.treeModel.update();

    let newNodeFromTree = this.tree.treeModel.getNodeBy((node: any) => node.data.id === newNode.id);
    
    for (let i = 0; i < numberOfChildren; i++) {
      let childNode: Node = {
        id: UUID.UUID(),
        name: anagraficaNephewsName.get(anagType)![i],
        codice: anagraficaNephewsName.get(anagType)![i].replace(/\s/g, ""),
        parentId: newNode.id,
        order: ++parentNode.data.order,
        anagNodeData: {
          anagId: newNode.anagNodeData?.anagId,
          tipoNaturaGiuridica: newNode.anagNodeData?.tipoNaturaGiuridica,
          ruolo: newNode.anagNodeData?.ruolo
        },
        children: []
      };
      newNodeFromTree.data.children.push(childNode);
    }
    newNodeFromTree.treeModel.update();

    setTimeout(() => {
      let newTreeNode = this.tree.treeModel.getNodeBy((node: any) => node.data.id === newNode.id);
      this.clickNode(newTreeNode, {});
    });
  }

  createImmobiliNodes(parentNode: any) {
    this.immobiliIndex++;

    let childNode: Node = {
      id: UUID.UUID(),
      name: `immobile${this.immobiliIndex}`,
      codice: `ImmobileNode`,
      parentId: parentNode.data.id,
      order: parentNode.data.order,
      immobileId: UUID.UUID(),
      children: []
    };

    if (!this.storeService.immobileFormObjects.some(immobiliForm => immobiliForm.immobId === childNode.immobileId)) {
      if (this.storeService.immobileFormObject.immobId !== childNode.immobileId) {
        this.storeService.immobileFormObject = this.storeService.initImmobileObject();
        this.storeService.immobileFormObject.immobId = childNode.immobileId;
        this.storeService.immobileFormObjects.push(this.storeService.immobileFormObject);
      }
    }
    parentNode.data.children.push(childNode);
    parentNode.treeModel.update();

    let nephewNode: Node = {
      id: UUID.UUID(),
      name: 'Gravami',
      codice: 'GravamiNode',
      parentId: childNode.id,
      order: childNode.order,
      immobileId: childNode.immobileId,
      children: []
    };

    let childNodeFromTree = this.tree.treeModel.getNodeById(childNode.id);

    childNodeFromTree.data.children.push(nephewNode);
    childNodeFromTree.treeModel.update();

    setTimeout(() => {
      let newTreeNode = this.tree.treeModel.getNodeBy((node: any) => node.data.id === childNode.id);
      this.clickNode(newTreeNode, {});
    });
  }

  createPerizieChildNodes(parentNode: any) {
    this.perizieNodeIndex++;

    let childNode: Node = {
      id: UUID.UUID(),
      name: `perizie ${this.perizieNodeIndex}`,
      codice: `PerizieATLNode`,
      parentId: parentNode.data.id,
      order: parentNode.data.order,
      atlPeriziaId: UUID.UUID(),
      children: []
    };

    // if (!this.storeService.relazioneFormObjects.some(relazioneForm => relazioneForm.praticaRelazioneId === childNode.praticaRelazioneId)) {
    //   if (this.storeService.relazioneFormObject.praticaRelazioneId !== childNode.praticaRelazioneId) {
    //     this.storeService.relazioneFormObject = this.storeService.initPareriFormObject();
    //     this.storeService.relazioneFormObject.praticaRelazioneId = childNode.praticaRelazioneId;
    //     this.storeService.relazioneFormObjects.push(this.storeService.relazioneFormObject);
    //   }
    // }

    parentNode.data.children.push(childNode);
    parentNode.treeModel.update();

    setTimeout(() => {
      let newTreeNode = this.tree.treeModel.getNodeBy((node: any) => node.data.id === childNode.id);
      this.clickNode(newTreeNode, {});
    });
  }

  createParereChildNodes(parentNode: any) {
    this.parereNodeIndex++;

    let childNode: Node = {
      id: UUID.UUID(),
      name: `Parere${this.parereNodeIndex}`,
      codice: `ParereNode`,
      parentId: parentNode.data.id,
      order: parentNode.data.order,
      praticaRelazioneId: UUID.UUID(),
      children: []
    };

    if (!this.storeService.relazioneFormObjects.some(relazioneForm => relazioneForm.praticaRelazioneId === childNode.praticaRelazioneId)) {
      if (this.storeService.relazioneFormObject.praticaRelazioneId !== childNode.praticaRelazioneId) {
        this.storeService.relazioneFormObject = this.storeService.initPareriFormObject();
        this.storeService.relazioneFormObject.praticaRelazioneId = childNode.praticaRelazioneId;
        this.storeService.relazioneFormObjects.push(this.storeService.relazioneFormObject);
      }
    }

    parentNode.data.children.push(childNode);
    parentNode.treeModel.update();

    setTimeout(() => {
      let newTreeNode = this.tree.treeModel.getNodeBy((node: any) => node.data.id === childNode.id);
      this.clickNode(newTreeNode, {});
    });
  }

  getTreeNodes(anags: MtAnag[]) {
    this.spinner.show();
    
    if (!this.isNuovaPEF) {
      this.getPraticaName();
    }
    this.treeService.getTreeNodes(this.praticaTipoCode, this.statoId, this.praticaId, this.currentUser.userId, anags)
      .subscribe({
        next: (response) => {
          this.spinner.hide();
          this.databaseNodes = response;
          this.treeNodes = this.getTreeModel(this.databaseNodes);
        },
        error: (error) => {
          this.spinner.hide();
          console.log(error);
        }
      });
  }

  getTreeModel(nodes: TreeNode[]) {
    let treeDataModel: Node[] = [];
    let anagList: AnagNodeData[] = [];
    var visibleNodes = nodes.filter(node => node.visibility !== 'H' && this.hiddenNodes.indexOf(node?.codice) === -1).sort((a, b) => a.order - b.order);

    visibleNodes.map((node: TreeNode) => {
      let treeNode: Node = new Node();
      let anagDetails: AnagNodeData | undefined = undefined;
      if (node.anagNodeData) {
        anagDetails = {
          anagId: node.anagNodeData.anagId,
          natgiuId: node.anagNodeData.natgiuId,
          tipoNaturaGiuridica: node.anagNodeData.tipoNaturaGiuridica,
          ruoloId: node.anagNodeData.ruoloId,
          ruolo: node.anagNodeData.ruolo,
          anagName: node.anagNodeData.anagName ? node.anagNodeData.anagName : node.description,
          ndg: node.anagNodeData.ndg
        };
        let index = anagList.findIndex(item => item.anagId === anagDetails?.anagId && item.ndg === anagDetails?.ndg);
        if (index == -1) {
          anagList.push(anagDetails);
        }
      }

      treeNode.id = node.id,
      treeNode.parentId = node.parentNode;
      treeNode.name = this.renameNodes(node.description)!;
      treeNode.codice = node.codice;
      treeNode.visibility = node.visibility;
      treeNode.isExpanded = true;
      treeNode.isChecked = false;
      treeNode.isNameStriked = node.isNameStriked;
      treeNode.immobileId = node.immobileId;
      treeNode.praticaRelazioneId = node.praticaRelazioneId;
      treeNode.atlPeriziaId = node.atlPeriziaId;
      treeNode.atlRelazioneId = node.atlRelazioneId;
      treeNode.anagNodeData = anagDetails;
      treeNode.order = node.order;
      this.nodeCounter++;
      treeDataModel.push(treeNode);
    });

    this.storeService.anagList = anagList;

    const nest = (items: any, id = null, link = 'parentId') =>
      items
        .filter((item: any) => item[link] === id)
        .map((item: any) => ({ ...item, children: nest(items, item.id) }));

    var treeStructureModel = [
      {
        id: '0',
        name: 'Pratiche',
        codice: 'Pratiche',
        children: [
          {
            id: '1',
            name: this.praticaName === '' ? 'Nuova Pratica' : this.praticaName,
            codice: 'NuovaPratica',
            children: nest(treeDataModel)
          }
        ]
      }
    ]

    return treeStructureModel;
  }

  renameNodes(nodeDescription: string) {
    switch (nodeDescription) {
      case 'Anag R':
        return 'Richiedente';
      case 'Anag C':
        return 'Cointestato';
      case 'Anag G':
        return 'Garante';
      case 'Anag T':
        return 'Terzo';
      case 'Anag Altri':
        return 'Altro Nominativo';
      default:
        return nodeDescription;
    }
  }

  onUpdateData(tree: any, $event: any) {
    tree.treeModel.expandAll();
    let datiPraticaNode = this.tree.treeModel.getNodeBy((node: any) => node.data.codice === 'DatiMutuoNode');
    if (datiPraticaNode) {
      this.checkNode(datiPraticaNode, {});
    }
  }

  clickNode(node: any, params: { anagId?: string, immobileId?: string, praticaRelazioneId?: string, atlPeriziaId?: string, atlRelazioneId?: string }) {
    if (node?.data?.hasOwnProperty('codice') && this.isClickableNode(node?.data)) {
      this.checkNode(node, params);

      if (node?.data?.anagNodeData?.anagId
        || node?.data?.immobileId 
        || node?.data?.praticaRelazioneId
        || node?.data?.atlPeriziaId
        || node?.data?.atlRelazioneId) {
        this.treeService.sendAnagId({
          anagId: node?.data?.anagNodeData?.anagId,
          ndg: node?.data?.anagNodeData?.ndg,
          immobileId: node?.data.immobileId,
          tipoNaturaGiuridica: node?.data?.anagNodeData?.tipoNaturaGiuridica,
          ruolo: node?.data?.anagNodeData?.ruolo,
          praticaRelazioneId: node?.data?.praticaRelazioneId,
          atlPeriziaId: node?.data?.atlPeriziaId,
          atlRelazioneId: node?.data?.atlRelazioneId,
          order: node?.data?.order
        });
      }

      if (node?.data?.visibility) {
        this.treeService.sendNodeVisibility(node?.data?.visibility);
      }
    }
  }

  checkNode(node: any, params: { anagId?: any, immobileId?: any, praticaRelazioneId?: any, atlPeriziaId?: string, atlRelazioneId?: string }) {
    if (node?.data?.codice?.startsWith('DocumentiChild')) {
      this.openFile(node.data.id, this.applicative);
    } else {
      node.setIsActive(true);
      if (params.anagId) {
        node.data.anagNodeData.anagId = params.anagId;
      }
      if (params.immobileId) {
        node.data.immobileId = params.immobileId;
      }
      if (params.praticaRelazioneId) {
        node.data.praticaRelazioneId = params.praticaRelazioneId;
      }
      if (params.atlPeriziaId) {
        node.data.atlPeriziaId = params.atlPeriziaId;
      }
      if (params.atlRelazioneId) {
        node.data.atlRelazioneId = params.atlRelazioneId;
      }

      if (this.checkedNodes.length === 0) {
        this.checkedNodes.push(node?.data?.id);
        node.data.isChecked = true;

        this.redirectToNodeView(node);
      } else {
          var checkedNode = this.tree.treeModel.getNodeById(this.checkedNodes[0]);
          if (checkedNode) {
            checkedNode.data.isChecked = false;
            this.checkedNodes.shift();
            this.checkedNodes.push(node.data?.id);
            node.data.isChecked = true;
          }
          this.redirectToNodeView(node);
      }
    }
  }

  redirectToNodeView(node: any) {
    if (!node?.data?.anagNodeData?.anagId && !node.data.immobileId && !node.data.praticaRelazioneId && !node.data.atlPeriziaId && !node.data.atlRelazioneId) {
      this.router.navigateByUrl(`/pratiche/${this.praticaTipoCode}/${this.statoId}/${this.praticaId}/${this.applicative}/${this.executive}/${node?.data?.codice}/0/0/0/0/0`);
    } else if (node?.data?.anagNodeData?.anagId && !node.data.immobileId && !node.data.praticaRelazioneId && !node.data.atlPeriziaId && !node.data.atlRelazioneId) {
      this.router.navigateByUrl(`/pratiche/${this.praticaTipoCode}/${this.statoId}/${this.praticaId}/${this.applicative}/${this.executive}/${node?.data?.codice}/${node?.data?.anagNodeData?.anagId}/0/0/0/0`);
    } else if (!node?.data?.anagNodeData?.anagId && node.data.immobileId && !node.data.praticaRelazioneId && !node.data.atlPeriziaId && !node.data.atlRelazioneId) {
      this.router.navigateByUrl(`/pratiche/${this.praticaTipoCode}/${this.statoId}/${this.praticaId}/${this.applicative}/${this.executive}/${node?.data?.codice}/0/${node?.data?.immobileId}/0/0/0`);
    } else if (!node?.data?.anagNodeData?.anagId && !node.data.immobileId && node.data.praticaRelazioneId && !node.data.atlPeriziaId && !node.data.atlRelazioneId) {
      this.router.navigateByUrl(`/pratiche/${this.praticaTipoCode}/${this.statoId}/${this.praticaId}/${this.applicative}/${this.executive}/${node?.data?.codice}/0/0/${node?.data?.praticaRelazioneId}/0/0`);
    } else if (!node?.data?.anagNodeData?.anagId && !node.data.immobileId && !node.data.praticaRelazioneId && node.data.atlPeriziaId && !node.data.atlRelazioneId) {
      this.router.navigateByUrl(`/pratiche/${this.praticaTipoCode}/${this.statoId}/${this.praticaId}/${this.applicative}/${this.executive}/${node?.data?.codice}/0/0/0/${node?.data?.atlPeriziaId}/0`);
    } else if (!node?.data?.anagNodeData?.anagId && !node.data.immobileId && !node.data.praticaRelazioneId && !node.data.atlPeriziaId && node.data.atlRelazioneId) {
      this.router.navigateByUrl(`/pratiche/${this.praticaTipoCode}/${this.statoId}/${this.praticaId}/${this.applicative}/${this.executive}/${node?.data?.codice}/0/0/0/0/${node?.data?.atlRelazioneId}`);
    }
  }

  openFile(documentId: string, applicative: number) {
    this.praticaService.openDocumentFile(documentId, applicative).subscribe(
      response => {
        var pdfSource = this.convertDataURIToBinary(response.data);
        var pdf = new Blob([pdfSource], { type: 'application/pdf' });
        const windowUrl = URL.createObjectURL(pdf);

        window.open(
          windowUrl,
          "win",
          `width=1020,height=743`
        );
      },
      error => {
        this.errorService.showErrorMessage(error?.error);
      });
  }

  convertDataURIToBinary(dataURI: string) {
    let raw = window.atob(dataURI);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }

    return array;
  }

  isClickableNode(node: TreeNode) {
    switch (node.codice) {
      case 'AnagraficaA':
        return false;
      case 'AnagraficaG':
        return false;
      case 'AnagraficaNode':
        return false;
      case 'AnagraficaR':
        return false;
      case 'AnagraficaT':
        return false;
      case 'PerimetroRootNode':
        return false;
      case 'ImmobileGroupNode':
        return false;
      case 'Pratiche':
        return false;
      case 'NuovaPratica':
        return false;
      case 'DocumentiNode':
        return false;
      case 'RelazioneNode':
        return false;
      default:
        return true;
    }
  }

  getPraticaName() {
    this.treeService.getPraticaName(this.praticaId)
    .subscribe({
      next: (response) => {
        this.praticaNameResponse = response;
        this.praticaName = this.praticaNameResponse?.praticaName;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
