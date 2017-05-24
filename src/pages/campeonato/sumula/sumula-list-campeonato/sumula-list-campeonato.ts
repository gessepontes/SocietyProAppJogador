import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';
import { SumulaListPage } from '../sumula-list/sumula-list';
import { NativeStorage } from 'ionic-native';

@Component({
    selector: 'page-sumula-list-campeonato',
    templateUrl: 'sumula-list-campeonato.html',
    providers: [SocietyService]
})
export class SumulaCampeonatoListPage {

    loading: any;
    texto: string;
    campeonatos: Array<any>;
    TITULO = "Súmulas";
    IDPESSOA = 0;
    imagemCampeonato: string;

    constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.imagemCampeonato = societyService.imagemCampeonato();        

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;
            this.IDPESSOA = IDPESSOA;
            this.carregando();
            this.listCampeonato();
        });

        //this.IDPESSOA = 64;
        //this.carregando();
        //this.listCampeonato();

    }

    listCampeonato() {
        this.societyService.listCampeonato(this.IDPESSOA).subscribe(
            data => {
                this.campeonatos = data;
                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                console.log(err);
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Campeonato')
        );
    }


    listPartidas(item) {
        this.navCtrl.push(SumulaListPage, { IDCampeonato: item });
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
            content: 'Carregando...',
            spinner: 'circles',

        });

        this.loading.present();
    }

    limpaCarregando() {
        this.loading.dismiss();
    }

}
