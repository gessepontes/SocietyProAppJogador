﻿import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';

@Component({
    selector: 'page-bid',
    templateUrl: 'bid.html',
    providers: [SocietyService]
})
export class BidPage {

    TITULO: string;
    jogadores: Array<any>;
    texto: string;
    imagemJogador: string;
    imagemSimbolo: string;
    IDTime = 0;
    IDCampeonato = 0;

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.IDTime = this.params.get('IDTime');
        this.IDCampeonato = this.params.get('IDCampeonato');
        
        this.listBid();
        this.imagemJogador = societyService.imagemJogador();
        this.imagemSimbolo = societyService.imagemSimbolo();
    }

    ionViewDidLoad() {
        this.TITULO = "Bid Jogadores";
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
            title: 'Bid',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    listBid() {
        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.societyService.listTimeBid(this.IDTime, this.IDCampeonato).subscribe(
            data => {
                this.jogadores = data;
                loading.dismiss();
            },
            err => {
                console.log(err);
                loading.dismiss();
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Bid')
        );
    }

}