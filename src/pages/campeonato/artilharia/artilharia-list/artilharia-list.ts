import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';
import { ArtilhariaCampeonatoPage } from '../artilharia/artilharia';
import { NativeStorage } from 'ionic-native';

@Component({
    selector: 'page-artilharia-list',
    templateUrl: 'artilharia-list.html',
    providers: [SocietyService]
})
export class ArtilhariaCampeonatoListPage {

    loading: any;
    texto: string;
    campeonatos: Array<any>;
    TITULO = "Artilharia";
    IDPESSOA = 0;
    imagemCampeonato: string;

    constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.carregando();
        this.imagemCampeonato = societyService.imagemCampeonato();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;
            this.IDPESSOA = IDPESSOA;
            this.listCampeonato();
        });

        //this.IDPESSOA = 1;
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


    detailsArtilharia(item) {
        this.navCtrl.push(ArtilhariaCampeonatoPage, { IDCampeonato: item });
    }

    showAlert(erro) {

        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let alert = this.alertCtrl.create({
            title: 'Campeonato',
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
