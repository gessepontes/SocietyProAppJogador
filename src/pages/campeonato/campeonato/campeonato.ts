import { Component} from '@angular/core';
import { ArtilhariaCampeonatoListPage } from '../artilharia/artilharia-list/artilharia-list';
import { ClassificacaoCampeonatoListPage } from '../classificacao/classificacao-list-campeonato/classificacao-list-campeonato';
import { BidListPage } from '../bid/bid-list/bid-list';
import { SuspensaoListPage } from '../suspensao/suspensao-list/suspensao-list';
import { SumulaCampeonatoListPage } from '../sumula/sumula-list-campeonato/sumula-list-campeonato';
import { PartidaCampeonatoListPage } from '../partida/partida-list-campeonato/partida-list-campeonato';
import { HomePage2 } from '../../home2/home';

import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
    selector: 'page-campeonato',
    templateUrl: 'campeonato.html'
})


export class CampeonatoPage {
    TITULO = "Campeonatos";
    devicePlatform = "";

    constructor(public navCtrl: NavController, public plt: Platform, private screenOrientation: ScreenOrientation) {
        if (this.plt.is('ios')) {
            this.devicePlatform = "";
        } else {
            this.devicePlatform = "Android";
        }

        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

    voltar() {
        this.navCtrl.setRoot(HomePage2);
    }

    classificacao() {
        this.navCtrl.push(ClassificacaoCampeonatoListPage);
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
