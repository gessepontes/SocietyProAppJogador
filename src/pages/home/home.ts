import { Component, Compiler} from '@angular/core';
import { LoginPage } from '../login/login';
import { SocietyService } from '../../providers/SocietyService';
import { Facebook, NativeStorage, AdMob} from 'ionic-native';
import { MenuController, NavController, ModalController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import "../../../node_modules/chart.js/src/chart.js"


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [SocietyService]
})


export class HomePage {
    TIME;
    IDPESSOA = 0;
    IANOTEMPORADA = 0;
    listAno = [2016, 2017, 2018];
    loading: any;
    jogadores: Array<any>;
    partidas: Array<any>;
    texto: string;
    imagemResponsavel: string;
    imagemSimbolo: string;
    FOTO = this.societyService.imagemResponsavel() + "semimagem.png";

    public doughnutChartLabels: string[] = ['Vitorias', 'Derrotas', 'Empates'];
    public doughnutChartData: number[] = [0, 0, 0];
    public doughnutChartType: string = 'doughnut';
    public doughnutChartColors: Array<any> = [
        {
            backgroundColor: [
                "#3c8dbc",
                "#f56954",
                "#d2d6de"
            ],
            hoverBackgroundColor: [
                "#3c8dbc",
                "#f56954",
                "#d2d6de"
            ]
        }
    ];


    constructor(private _compiler: Compiler, public navCtrl: NavController, public modalCtrl: ModalController, private societyService: SocietyService, public alertCtrl: AlertController, public params: NavParams, public menuCtrl: MenuController, public loadingCtrl: LoadingController) {

        this.imagemResponsavel = societyService.imagemResponsavel();
        this.imagemSimbolo = societyService.imagemSimbolo();
        this.IANOTEMPORADA = new Date().getFullYear();
        this.carregando();

        NativeStorage.getItem('IDPESSOA').then(data => {
            this.IDPESSOA = data.IDPESSOA;
            this.carregaEstatistica(this.IDPESSOA, this.IANOTEMPORADA);
            this.carregaUltimasPartidas(this.IDPESSOA);
        });

        NativeStorage.getItem('FOTO').then(data => {
            this.FOTO = this.imagemResponsavel + data.FOTO;
        });

        //this.IDPESSOA = 4;
        //this.carregaEstatistica(this.IDPESSOA, this.IANOTEMPORADA);
        //this.carregaUltimasPartidas(4);

        this.menuCtrl.enable(true);
        this.loadAd();
    }

    loadAd() {
        let options = {
            adId: 'ca-app-pub-5732334124058455/7216350441',
            isTesting: false
        };
        AdMob.prepareRewardVideoAd(options)
            .then(() => {
                AdMob.showRewardVideoAd();
            });
    };

    carregaEstatistica(ID, IANOTEMPORADA): void {
        let _doughnutChartData: number[] = new Array(this.doughnutChartData.length);

        this.societyService.listEstatistica(ID, IANOTEMPORADA).subscribe(
            data => {
                if (data == null) {
                    this.TIME = "Não existe time ativo";
                } else {
                    this.TIME = data[3];
                    _doughnutChartData[0] = data[0];
                    _doughnutChartData[1] = data[1];
                    _doughnutChartData[2] = data[2];
                    this.doughnutChartData = _doughnutChartData;
                }

                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Estatistica')
        );
    }

    carregaUltimasPartidas(ID): void {

        this.societyService.listUltimasPartidas(ID).subscribe(
            data => {
                this.partidas = data;
            },
            err => {
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Ultimas Partidas')
        );
    }

    carregaJogadores(ID): void {

        this.societyService.listJogadorHome(ID).subscribe(
            data => {
                this.jogadores = data;
            },
            err => {
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Jogadores')
        );
    }

    carregando() {
        this.loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        this.loading.present();
    }

    limpaCarregando() {
        this.loading.dismiss();
    }

    showAlert(erro) {

        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let alert = this.alertCtrl.create({
            title: 'Home',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
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
                        this.navCtrl.setRoot(LoginPage)
                        this._compiler.clearCache();
                    }
                }
            ]
        });
        confirm.present();
    }

    public temporada(IANOTEMPORADA) {
        this.carregaEstatistica(this.IDPESSOA, IANOTEMPORADA);
    }

    doFbLogout() {
        Facebook.logout()
            .then(function (response) {
                NativeStorage.remove('rememberMeUserID');
                this.navCtrl.setRoot(LoginPage);
            }, function (error) {
                console.log(error);
            });
    }

}
