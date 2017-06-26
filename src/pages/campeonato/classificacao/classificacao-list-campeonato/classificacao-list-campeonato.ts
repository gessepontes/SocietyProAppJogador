import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, ToastController, Platform } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';
import { ClassificacaoPage } from '../classificacao/classificacao';
import { CampeonatoPage } from '../../campeonato/campeonato';
import { ClassificacaoGrupoListPage } from '../classificacao-list-grupo/classificacao-list-grupo';
import { NativeStorage } from 'ionic-native';

@Component({
    selector: 'page-classificacao-list-campeonato',
    templateUrl: 'classificacao-list-campeonato.html',
    providers: [SocietyService]
})
export class ClassificacaoCampeonatoListPage {

    TIPOCAMPEONATO: boolean;
    loading: any;
    texto: string;
    campeonatos: Array<any>;
    TITULO = "Classificação";
    IDPESSOA = 0;
    imagemCampeonato: string;
    devicePlatform = "";
    naocadastrado: boolean;


    constructor(public plt: Platform, public navCtrl: NavController, private societyService: SocietyService,
        public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController,
        public toastCtrl: ToastController) {
        this.imagemCampeonato = societyService.imagemCampeonato();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;
            this.IDPESSOA = IDPESSOA;
            this.carregando();
            this.listCampeonato();
        },
            error => this.limpaCarregando()
            );

        if (this.plt.is('ios')) {
            this.devicePlatform = "";
        } else {
            this.devicePlatform = "Android";
        }

        //this.IDPESSOA = 1;
        //this.carregando();
        //this.listCampeonato();

    }

    voltar() {
        this.navCtrl.setRoot(CampeonatoPage);
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
                this.showToast("Erro ao realizar a operação.");
            },
            () => console.log('Listar Campeonato')
        );
    }




    listClassificacao(IDCampeonato) {

        this.societyService.tipoCampeonato(IDCampeonato).subscribe(
            data => {
                this.TIPOCAMPEONATO = data;

                if (this.TIPOCAMPEONATO) {
                    this.navCtrl.push(ClassificacaoGrupoListPage, { IDCampeonato: IDCampeonato });
                } else {
                    this.navCtrl.push(ClassificacaoPage, { IDCampeonato: IDCampeonato, IDGrupo : 0});
                }
            },
            err => {
                this.TIPOCAMPEONATO = false;
                this.showToast(err);
            },
            () => console.log('List Campeonato')
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
