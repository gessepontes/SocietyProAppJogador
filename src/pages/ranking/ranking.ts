import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SocietyService } from '../../providers/SocietyService';
import { NativeStorage } from 'ionic-native';

@Component({
    selector: 'page-ranking',
    templateUrl: 'ranking.html',
    providers: [SocietyService]
})
export class RankingPage {

    ranking: Array<any>;
    loading: any;
    TITULO: string;
    texto: string;
    imagemSimbolo: string;
    IANOTEMPORADA = 0;
    IDPESSOA = 0;
    IDTIME = 0;
    listAno = [2016, 2017, 2018];

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
        this.imagemSimbolo = societyService.imagemSimbolo();
        this.TITULO = "Ranking";
        this.IANOTEMPORADA = new Date().getFullYear();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listRanking(this.IANOTEMPORADA, IDPESSOA);

        });

            //this.IDPESSOA = 4;
            //this.listRanking(this.IANOTEMPORADA, 1);
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


    listRanking(IANOTEMPORADA, IDPESSOA) {

        this.carregando();

        this.societyService.listRanking(IANOTEMPORADA, IDPESSOA).subscribe(
            data => {
                this.ranking = data;
                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                this.showAlert(err);
            },
            () => console.log('List Ranking')
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
            title: 'Classificação',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }


}
