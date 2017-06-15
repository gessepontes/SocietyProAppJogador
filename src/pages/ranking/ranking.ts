import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController, ToastController, NavController, Platform} from 'ionic-angular';
import { SocietyService } from '../../providers/SocietyService';
import { NativeStorage } from 'ionic-native';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HomePage2 } from '../home2/home';


@Component({
    selector: 'page-ranking',
    templateUrl: 'ranking.html',
    providers: [SocietyService]
})
export class RankingPage {

    ranking: Array<any>;
    loading: any;
    TITULO: string;
    texto: string;
    imagemSimbolo: string;
    IANOTEMPORADA = 0;
    IDPESSOA = 0;
    IDTIME = 0;
    listAno = [2016, 2017, 2018];
    horizontal: boolean = false;
    devicePlatform = "";

    constructor(public plt: Platform,public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public alertCtrl: AlertController,
        public loadingCtrl: LoadingController, public toastCtrl: ToastController, private screenOrientation: ScreenOrientation, public navCtrl: NavController) {
        this.imagemSimbolo = societyService.imagemSimbolo();
        this.TITULO = "Ranking";
        this.IANOTEMPORADA = new Date().getFullYear();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listRanking(this.IANOTEMPORADA, IDPESSOA);

        },
            error => this.limpaCarregando()
            );

        if (this.plt.is('ios')) {
            this.devicePlatform = "";
        } else {
            this.devicePlatform = "Android";
        }

        this.screenOrientation.unlock();

        //this.IDPESSOA = 1;
        //this.listRanking(this.IANOTEMPORADA, 1);
    }

    changeOrientation() {
        this.navCtrl.setRoot(RankingPage);
    }

    voltar() {
        this.navCtrl.setRoot(HomePage2);
    }
    carregando() {
        this.loading = this.loadingCtrl.create({
            content: 'Carregando...',
            spinner: 'circles',
             
        });

        this.loading.present();
    }

    limpaCarregando() {
        this.loading.dismiss();
    }

    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }

    listRanking(IANOTEMPORADA, IDPESSOA) {

        this.carregando();

        this.societyService.listRanking(IANOTEMPORADA, IDPESSOA).subscribe(
            data => {
                this.ranking = data;
                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                //this.showAlert(err);
                this.showToast("Erro ao realizar a operação.");
            },
            () => console.log('List Ranking')
        );
    }

    showAlert(erro) {

        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let alert = this.alertCtrl.create({
            title: 'Classificação',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
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


}
