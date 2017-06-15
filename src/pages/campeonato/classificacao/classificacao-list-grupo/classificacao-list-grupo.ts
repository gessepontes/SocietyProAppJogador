import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';
import { ClassificacaoPage } from '../classificacao/classificacao';

@Component({
    selector: 'page-classificacao-list-grupo',
    templateUrl: 'classificacao-list-grupo.html',
    providers: [SocietyService]
})
export class ClassificacaoGrupoListPage {

    loading: any;
    texto: string;
    campeonatos: Array<any>;
    TITULO = "Grupos";
    IDPESSOA = 0;
    imagemCampeonato: string;
    IDCampeonato = 0;


    constructor(public navCtrl: NavController, private societyService: SocietyService, public params: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
        this.imagemCampeonato = societyService.imagemCampeonato();
        this.IDCampeonato = this.params.get('IDCampeonato');

        this.carregando();
        this.listCampeonatoGrupos(this.IDCampeonato);

    }

    listCampeonatoGrupos(IDCampeonato) {
        this.societyService.listCampeonatoGrupos(IDCampeonato).subscribe(
            data => {
                this.campeonatos = data;
                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                console.log(err);
                this.showToast("Erro ao realizar a operação.");
            },
            () => console.log('Listar Campeonato')
        );
    }


    listClassificacao(IDGrupo) {
        this.navCtrl.push(ClassificacaoPage, { IDCampeonato: this.IDCampeonato, IDGrupo: IDGrupo });
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
