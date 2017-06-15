import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { NativeStorage } from 'ionic-native';


@Component({
    selector: 'page-frequencia',
    templateUrl: 'frequencia.html',
    providers: [SocietyService]
})
export class FrequenciaPage {

    loading: any;
    TITULO: string;
    jogadores: Array<any>;
    texto: string;
    imagemJogador: string;
    IANOTEMPORADA = 0;
    IDPESSOA = 0;
    listAno = [2016, 2017, 2018];

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.IANOTEMPORADA = new Date().getFullYear();
        this.imagemJogador = societyService.imagemJogador();
        this.TITULO = "Frequência";
    }

    ionViewWillEnter() {
        //this.IDPESSOA = 1;
        //this.listFrequencia(this.IANOTEMPORADA);

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listFrequencia(this.IANOTEMPORADA);

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
            title: 'Frequencia',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    listFrequencia(IANOTEMPORADA) {

        this.carregando();

        this.societyService.listFrequencia(this.IDPESSOA, IANOTEMPORADA).subscribe(
            data => {
                this.jogadores = data;
                this.limpaCarregando();
            },
            err => {
                console.log(err);
                this.limpaCarregando();
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar frequencia')
            );
    }

}
