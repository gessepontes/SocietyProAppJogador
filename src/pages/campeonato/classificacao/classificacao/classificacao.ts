import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController, ToastController, NavController, Platform } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ClassificacaoCampeonatoListPage } from '../classificacao-list-campeonato/classificacao-list-campeonato';

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
    devicePlatform = "";

    constructor(public plt: Platform, public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public alertCtrl: AlertController,
        public loadingCtrl: LoadingController, public toastCtrl: ToastController, private screenOrientation: ScreenOrientation, public navCtrl: NavController) {
        this.carregando();
        this.imagemSimbolo = societyService.imagemSimbolo();
        this.TITULO = "Classificação";

        this.model.IDCAMPEONATO = this.params.get('IDCampeonato');
        this.model.IDGRUPO = this.params.get('IDGrupo');
        this.carregaClassificacao();

        if (this.plt.is('ios')) {
            this.devicePlatform = "";
        } else {
            this.devicePlatform = "Android";
        }

        this.screenOrientation.unlock();
    }

    changeOrientation() {
        this.navCtrl.setRoot(ClassificacaoPage, { IDCampeonato: this.model.IDCAMPEONATO, IDGrupo: this.model.IDGRUPO });
    }

    voltar() {
        this.navCtrl.setRoot(ClassificacaoCampeonatoListPage);
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

    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }


    carregaClassificacao() {
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
