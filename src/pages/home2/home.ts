import { Component} from '@angular/core';
import { TimeListPage } from '../time/time-list/time-list';
import { JogadorListPage } from '../jogador/jogador-list/jogador-list';
import { ArtilhariaPage } from '../jogador/artilharia/artilharia';
import { CampeonatoPage } from '../campeonato/campeonato/campeonato';
import { PartidaListPage } from '../partida/partida-list/partida-list';
import { RankingPage } from '../ranking/ranking';

import { PessoaPage } from '../pessoa/pessoa/pessoa';
import { ArbitroListPage } from '../pessoa/arbitro-list/arbitro-list';
import { CampoListPage } from '../campo/campo-list/campo-list';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EstatisticaPage } from '../estatistica/estatistica';
import { AlertController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import {NativeStorage } from 'ionic-native';

import { NavController, ActionSheetController, MenuController} from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage2 {
    TITULO = "SOCIETYPRO";

    constructor(public navCtrl: NavController, private social: SocialSharing, public alertCtrl: AlertController,
        public actionsheetCtrl: ActionSheetController, public menuCtrl: MenuController) {
        this.menuCtrl.close();
        this.menuCtrl.enable(false);

    }

    times() {
        this.navCtrl.push(TimeListPage);
    }

    jogadores() {
        this.navCtrl.push(JogadorListPage);
    }

    artilharia() {
        this.navCtrl.push(ArtilhariaPage);
    }

    campeonato() {
        this.navCtrl.push(CampeonatoPage);
    }

    amistoso() {
        this.navCtrl.push(PartidaListPage);
    }

    ranking() {
        this.navCtrl.push(RankingPage);
    }

    pessoa() {
        this.navCtrl.push(PessoaPage);
    }

    campo() {
        this.navCtrl.push(CampoListPage);
    }

    arbitro() {
        this.navCtrl.push(ArbitroListPage);
    }

    estatistica() {
        this.navCtrl.push(EstatisticaPage);
    }

    public sair() {

        let confirm = this.alertCtrl.create({
            title: 'SocietyPro',
            message: 'Você deseja sair do sistema?',
            buttons: [
                {
                    text: 'Não',
                    handler: () => {
                    }
                },
                {
                    text: 'Sim',
                    handler: () => {
                        NativeStorage.remove('rememberMeUserID');
                        NativeStorage.remove('IDPESSOA');
                        this.navCtrl.setRoot(LoginPage);
                    }
                }
            ]
        });
        confirm.present();
    }

    whatsapp() {
        this.social.shareViaWhatsAppToReceiver('8596590632', "Mensagem iniciada pelo App SocietyPro", null, "www.societypro.com.br")
            .then(() => {
            },
            () => {
            })
    }

    ajuda() {
        let actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'WhatsApp',
                    handler: () => {
                        this.whatsapp();
                    }
                }
            ]
        });
        actionSheet.present();
    }

}
