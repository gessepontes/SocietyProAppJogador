import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { NativeStorage } from 'ionic-native';


@Component({
    selector: 'page-artilharia',
    templateUrl: 'artilharia.html',
    providers: [SocietyService]
})
export class ArtilhariaPage {

    loading: any;
    TITULO: string;
    jogadores: Array<any>;
    texto: string;
    imagemJogador: string;
    IANOTEMPORADA = 0;
    IDPESSOA = 0;
    listAno = [2016, 2017, 2018];
    naocadastrado: boolean;

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.IANOTEMPORADA = new Date().getFullYear();
        this.imagemJogador = societyService.imagemJogador();
        this.TITULO = "Artilharia";
    }

    ionViewWillEnter() {
        //this.IDPESSOA = 1;
        //this.listArtilharia(this.IANOTEMPORADA);

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listArtilharia(this.IANOTEMPORADA);

        },
            error => this.limpaCarregando()
            );
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

    dismiss() {
        this.viewCtrl.dismiss();
    }

    showAlert(erro) {

        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let alert = this.alertCtrl.create({
            title: 'Artilharia',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    listArtilharia(IANOTEMPORADA) {

        this.carregando();

        this.societyService.listArtilharia(this.IDPESSOA, IANOTEMPORADA).subscribe(
            data => {
                this.jogadores = data;
                this.limpaCarregando();

                if (data != null) {
                    if (data.length == 0) {
                        this.naocadastrado = true;
                    } else {
                        this.naocadastrado = false;
                    }
                } else {
                    this.naocadastrado = true;
                }

            },
            err => {
                console.log(err);
                this.limpaCarregando();
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Gols Partida')
            );
    }

}
