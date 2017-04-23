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

    TITULO: string;
    jogadores: Array<any>;
    texto: string;
    imagemJogador: string;
    IANOTEMPORADA = 0;
    IDPESSOA = 0;
    listAno = [2016, 2017, 2018];

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.IANOTEMPORADA = new Date().getFullYear();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listArtilharia(this.IANOTEMPORADA);

        });

        //this.IDPESSOA = 64;
        //this.listArtilharia(this.IANOTEMPORADA);
        this.imagemJogador = societyService.imagemJogador();
    }

    ionViewDidLoad() {
        this.TITULO = "SOCIETYPRO";
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
        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.societyService.listArtilharia(this.IDPESSOA, IANOTEMPORADA).subscribe(
            data => {
                this.jogadores = data;
                loading.dismiss();
            },
            err => {
                console.log(err);
                loading.dismiss();
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Gols Partida')
        );
    }

}
