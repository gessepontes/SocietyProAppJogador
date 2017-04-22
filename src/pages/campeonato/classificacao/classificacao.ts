import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { NativeStorage } from 'ionic-native';


@Component({
    selector: 'page-classificacao',
    templateUrl: 'classificacao.html',
    providers: [SocietyService]
})
export class ClassificacaoPage {

    loading: any;
    TITULO: string;
    texto: string;
    IDPESSOA;
    imagemSimbolo: string;
    TIPOCAMPEONATO: boolean;

    campeonatos: Array<any>;
    grupos: Array<any>;
    classificacao: Array<any>;
    model = { IDCAMPEONATO: 0, IDGRUPO: 0, visible: false };

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
        this.carregando();
        this.imagemSimbolo = societyService.imagemSimbolo();
        this.TITULO = "Classificação";

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listCampeonatos();
            this.listGrupos();
        });

        //this.IDPESSOA = 64;
        //this.listCampeonatos();
        //this.listGrupos();

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

    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }


    tipoCampeonato(ID) {
        this.societyService.tipoCampeonato(ID).subscribe(
            data => {
                this.TIPOCAMPEONATO = data;
            },
            err => {
                this.TIPOCAMPEONATO = false;
                this.showToast(err);
            },
            () => console.log('List Campeonato')
        );
    }

    listCampeonatos() {
        this.societyService.listCampeonatoInscricao(this.IDPESSOA).subscribe(
            data => {
                this.campeonatos = data;
            },
            err => {
                this.limpaCarregando();
                this.showToast("Erro ao realizar a operação.");
            },
            () => console.log('List Campeonato')
        );
    }


    listGrupos() {
        this.societyService.listGrupo().subscribe(
            data => {
                this.grupos = data;
                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
               // this.showToast(err);
            },
            () => console.log('List Grupos')
        );
    }

    carregaClassificacao() {
        this.carregando();
        this.model.visible = true;

        if (this.model.IDCAMPEONATO != 0) {

            if (!this.TIPOCAMPEONATO) {
                this.model.IDGRUPO = 0;
            }

            this.societyService.listCampeonatoClassificacao(this.model.IDCAMPEONATO, this.model.IDGRUPO).subscribe(
                data => {
                    this.classificacao = data;
                    this.limpaCarregando();
                },
                err => {
                    this.limpaCarregando();
                    this.showToast(err);
                },
                () => console.log('List Classificacao')
            );
        } else {
            this.showToast("Campeonato é um campo obrigatório.");
            this.limpaCarregando();
        }
    }


    showAlert(erro) {

        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let alert = this.alertCtrl.create({
            title: 'Classificação',
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
}
