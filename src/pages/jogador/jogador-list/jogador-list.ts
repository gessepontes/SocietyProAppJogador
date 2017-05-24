import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { NativeStorage } from 'ionic-native';


@Component({
    selector: 'page-jogador-list',
    templateUrl: 'jogador-list.html',
    providers: [SocietyService]
})
export class JogadorListPage {

    loading: any;
    texto: string;
    imagemJogador: string;
    jogadores: Array<any>;
    IDPESSOA = 0;
    IDTIME = 0;
    TIME = '';
    TITULO = "Atletas";

    constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController, public params: NavParams, public toastCtrl: ToastController, public platform: Platform,
        public actionsheetCtrl: ActionSheetController) {
        this.imagemJogador = societyService.imagemJogador();
    }

    ionViewWillEnter() {
        this.carregando();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listJogador();

        });

        //this.IDPESSOA = 64;
        //this.listJogador();
    }

    listJogador() {
        this.societyService.listJogador(this.IDPESSOA).subscribe(
            data => {
                this.jogadores = data;
                this.limpaCarregando();
            },
            err => {
                console.log(err);
                this.showToast("Erro ao realizar a operação.");
                this.limpaCarregando();
            },
            () => console.log('Listar Jogador')
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
            title: 'Jogador',
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
}
