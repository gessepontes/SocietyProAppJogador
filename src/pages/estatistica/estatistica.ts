import { Component} from '@angular/core';
import { SocietyService } from '../../providers/SocietyService';
import { NativeStorage } from 'ionic-native';
import { MenuController, NavController, ModalController, AlertController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import "../../../node_modules/chart.js/src/chart.js"

@Component({
    selector: 'page-estatistica',
    templateUrl: 'estatistica.html',
    providers: [SocietyService]
})


export class EstatisticaPage {

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
    SIMBOLO = "semimagem.png";
    TITULO = "Estatistica";


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


    constructor(public navCtrl: NavController, public modalCtrl: ModalController, private societyService: SocietyService, public alertCtrl: AlertController, public params: NavParams, public menuCtrl: MenuController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
        this.imagemSimbolo = societyService.imagemSimbolo();
        this.IANOTEMPORADA = new Date().getFullYear();
    }

    ionViewWillEnter() {
        this.carregando();

        NativeStorage.getItem('IDPESSOA').then(data => {
            this.IDPESSOA = data.IDPESSOA;
            this.carregaEstatistica(this.IDPESSOA, this.IANOTEMPORADA);
        });

        //this.IDPESSOA = 64;
        //this.carregaEstatistica(this.IDPESSOA, this.IANOTEMPORADA);


    }

    carregaEstatistica(ID, IANOTEMPORADA): void {
        let _doughnutChartData: number[] = new Array(this.doughnutChartData.length);

        this.societyService.listEstatistica(ID, IANOTEMPORADA).subscribe(
            data => {
                if (data == null) {
                    this.TIME = "Não existe time ativo";
                } else {
                    this.TIME = data[3];
                    this.SIMBOLO = data[4];

                    _doughnutChartData[0] = data[0];
                    _doughnutChartData[1] = data[1];
                    _doughnutChartData[2] = data[2];
                    this.doughnutChartData = _doughnutChartData;
                }

                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                this.showToast("Erro ao realizar a operação.");
            },
            () => console.log('Listar Estatistica')
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

    showToast(erro: string) {
        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let toast = this.toastCtrl.create({
            message: this.texto,
            duration: 3000,
            position: 'bottom'
        });

        toast.present(toast);
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public temporada(IANOTEMPORADA) {
        this.carregaEstatistica(this.IDPESSOA, IANOTEMPORADA);
    }

}
