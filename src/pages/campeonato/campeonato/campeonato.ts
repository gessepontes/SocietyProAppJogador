import { Component} from '@angular/core';
import { ArtilhariaCampeonatoListPage } from '../artilharia/artilharia-list/artilharia-list';
import { ClassificacaoPage } from '../classificacao/classificacao';
import { BidListPage } from '../bid/bid-list/bid-list';
import { SuspensaoListPage } from '../suspensao/suspensao-list/suspensao-list';
import { SumulaCampeonatoListPage } from '../sumula/sumula-list-campeonato/sumula-list-campeonato';
import { PartidaCampeonatoListPage } from '../partida/partida-list-campeonato/partida-list-campeonato';

import { NavController} from 'ionic-angular';

@Component({
    selector: 'page-campeonato',
    templateUrl: 'campeonato.html'
})


export class CampeonatoPage {
    TITULO = "CAMPEONATOS";   

    constructor(public navCtrl: NavController) {        
    }

    classificacao() {
        this.navCtrl.push(ClassificacaoPage);
    }

    bid() {
        this.navCtrl.push(BidListPage);
    }

    partidas() {
        this.navCtrl.push(PartidaCampeonatoListPage);
    }

    sumulas() {
        this.navCtrl.push(SumulaCampeonatoListPage);
    }

    suspensos() {
        this.navCtrl.push(SuspensaoListPage);
    }

    artilharia() {
        this.navCtrl.push(ArtilhariaCampeonatoListPage);
    }
}
