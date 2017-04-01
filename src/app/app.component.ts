import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController } from 'ionic-angular';
import {Splashscreen, NativeStorage, StatusBar, AdMob } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PessoaPage } from '../pages/pessoa/pessoa/pessoa';
import { ArbitroListPage } from '../pages/pessoa/arbitro-list/arbitro-list';
import { CampoListPage } from '../pages/campo/campo-list/campo-list';

import { TimeListPage } from '../pages/time/time-list/time-list';
import { JogadorListPage } from '../pages/jogador/jogador-list/jogador-list';
import { ArtilhariaPage } from '../pages/jogador/artilharia/artilharia';

import { PartidaListPage } from '../pages/partida/partida-list/partida-list';
import { ArtilhariaCampeonatoListPage } from '../pages/campeonato/artilharia/artilharia-list/artilharia-list';
import { ClassificacaoPage } from '../pages/campeonato/classificacao/classificacao';
import { BidListPage } from '../pages/campeonato/bid/bid-list/bid-list';
import { SuspensaoListPage } from '../pages/campeonato/suspensao/suspensao-list/suspensao-list';
import { SumulaCampeonatoListPage } from '../pages/campeonato/sumula/sumula-list-campeonato/sumula-list-campeonato';
import { RankingPage } from '../pages/ranking/ranking';
import { PartidaCampeonatoListPage } from '../pages/campeonato/partida/partida-list-campeonato/partida-list-campeonato';

@Component({
    selector: 'page-app',
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    IDPESSOA;
    NOME;
    pages: Array<{ title: string, component: any, icon: string }>;
    pages2: Array<{ title: string, component: any, icon: string }>;
    pages3: Array<{ title: string, component: any, icon: string }>;
    pages4: Array<{ title: string, component: any, icon: string }>;


    constructor(public platform: Platform, public alertCtrl: AlertController, public menu: MenuController) {
        //this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage, icon: 'home' },
            { title: 'Usuário', component: PessoaPage, icon: 'contact' },
            { title: 'Time', component: TimeListPage, icon: 'finger-print' },
            { title: 'Jogador', component: JogadorListPage, icon: 'man' },
            { title: 'Artilharia', component: ArtilhariaPage, icon: 'football' },
            { title: 'Campo', component: CampoListPage, icon: 'map' },
            { title: 'Amistoso', component: PartidaListPage, icon: 'game-controller-b' },
            { title: 'Ranking', component: RankingPage, icon: 'aperture' },
            { title: 'Árbitros', component: ArbitroListPage, icon: 'contact' },
        ];

        this.pages2 = [
            { title: 'Classificação', component: ClassificacaoPage, icon: 'podium' },
            { title: 'BID', component: BidListPage, icon: 'glasses' },
            { title: 'Partidas', component: PartidaCampeonatoListPage, icon: 'game-controller-a' },
            { title: 'Súmulas', component: SumulaCampeonatoListPage, icon: 'document' },
            { title: 'Suspensos', component: SuspensaoListPage, icon: 'card' },
            { title: 'Artilharia', component: ArtilhariaCampeonatoListPage, icon: 'football' },
        ];

        platform.ready().then(() => {

            var admobid = {};
            // select the right Ad Id according to platform
            if (/(android)/i.test(navigator.userAgent)) {
                admobid = { // for Android
                    banner: 'ca-app-pub-7516616142146754/8243844620',
                    interstitial: 'ca-app-pub-7516616142146754/8147943026'
                };
            } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
                admobid = { // for iOS
                    banner: 'ca-app-pub-7516616142146754/8243844620',
                    interstitial: 'ca-app-pub-7516616142146754/8147943026'
                };
            } else {
                admobid = { // for Windows Phone
                    banner: 'ca-app-pub-7516616142146754/8243844620',
                    interstitial: 'ca-app-pub-7516616142146754/8147943026'
                };
            }

            AdMob.createBanner({
                isTesting: false,
                autoShow: true
            });


            // Here we will check if the user is already logged in
            // because we don't want to ask users to log in each time they open the app
            let env = this;
            NativeStorage.getItem('rememberMeUserID')
                .then(function (data) {
                    // user is previously logged and we have his data
                    // we will let him access the app 
                    //this.IDPESSOA = data.IDPESSOA;

                    Splashscreen.hide();
                    env.nav.push(HomePage, { IDPESSOA: data.IDPESSOA });
                }, function (error) {
                    //we don't have the user data so we will ask him to log in
                    Splashscreen.hide();
                    env.nav.push(LoginPage);
                    //env.nav.push(HomePage,{ IDPESSOA: 1});
                });
        });
    }

    showSubmenu: boolean = false;

    menuItemHandler(): void {
        this.showSubmenu = !this.showSubmenu;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
        this.menu.close();
    }

    public logout() {

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
                        this.nav.setRoot(LoginPage);
                    }
                }
            ]
        });
        confirm.present();
    }
}

