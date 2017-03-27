import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';

@Component({
    selector: 'page-partida-list',
    templateUrl: 'partida-list.html',
    providers: [SocietyService]
})
export class PartidaCampeonatoPage {

    loading: any;
    texto: string;
    partidas: Array<any>;
    TITULO = "Partidas";
    IDCampeonato = 0;
    IDPessoa = 0;
    imagemSimbolo: string;


    constructor(public navCtrl: NavController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.IDCampeonato = this.params.get('IDCampeonato');
        this.IDPessoa = this.params.get('IDPessoa');
        this.carregando();
        this.listPartidasCampeonato();
        this.imagemSimbolo = societyService.imagemSimbolo();
    }

    listPartidasCampeonato() {
        this.societyService.listPartidasCampeonatoTime(this.IDCampeonato, this.IDPessoa).subscribe(
            data => {
                this.partidas = data;
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