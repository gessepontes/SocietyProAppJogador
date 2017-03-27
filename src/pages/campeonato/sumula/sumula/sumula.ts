import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';

@Component({
    selector: 'page-sumula',
    templateUrl: 'sumula.html',
    providers: [SocietyService]
})
export class SumulaPage {

    loading: any;
    texto: string;
    sumula: Array<any>;
    TITULO = "Súmulas";
    IDSumula = 0;
    imagemJogador: string;
    imagemSimbolo: string;
    imagemCartaoBola: string;


    constructor(public navCtrl: NavController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.IDSumula = this.params.get('IDSumula');
        //this.IDSumula = 32;
        this.carregando();
        this.detailsSumulas();
        this.imagemJogador = societyService.imagemJogador();
        this.imagemSimbolo = societyService.imagemSimbolo();
        this.imagemCartaoBola = societyService.imagemCartaoBola();
    }

    detailsSumulas() {
        this.societyService.detailsSumulas(this.IDSumula).subscribe(
            data => {
                this.sumula = data;
                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                console.log(err);
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Partidas')
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
            title: 'Súmulas',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
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

}