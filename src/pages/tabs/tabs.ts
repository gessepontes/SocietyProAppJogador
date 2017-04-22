import { Component } from '@angular/core';
import { SocietyService } from '../../providers/SocietyService';

import { HomePage } from '../home/home';
import { TimeListPage } from '../time/time-list/time-list';
import { PartidaListPage } from '../partida/partida-list/partida-list';
import { ArtilhariaPage } from '../jogador/artilharia/artilharia';


@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
    providers: [SocietyService]
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = TimeListPage;
    tab3Root = ArtilhariaPage;
    tab4Root = PartidaListPage;

    constructor() {

    }
}