import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';
import { SuspensaoPage } from '../suspensao/suspensao';
import { NativeStorage } from 'ionic-native';

@Component({
    selector: 'page-suspensao-list',
    templateUrl: 'suspensao-list.html',
    providers: [SocietyService]
})
export class SuspensaoListPage {

    loading: any;
    texto: string;
    campeonatos: Array<any>;
    TITULO = "Suspensos";
    IDPESSOA = 0;
    imagemCampeonato: string;
    naocadastrado: boolean;

    constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.imagemCampeonato = societyService.imagemCampeonato();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;
            this.IDPESSOA = IDPESSOA;
            this.carregando();
            this.listCampeonato();
        });

        //this.IDPESSOA = 1;
        //this.carregando();
        //this.listCampeonato();
    }

    listCampeonato() {
        this.societyService.listCampeonato(this.IDPESSOA).subscribe(
            data => {
                this.campeonatos = data;
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
                this.limpaCarregando();
                console.log(err);
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Campeonato')
        );
    }


    detailsSuspensao(item) {
        this.navCtrl.push(SuspensaoPage, { IDCampeonato: item });
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
