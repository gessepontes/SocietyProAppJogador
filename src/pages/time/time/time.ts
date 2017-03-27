import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';

@Component({
    selector: 'page-time',
    templateUrl: 'time.html',
    providers: [SocietyService]
})
export class TimePage {

    tipotime: Array<any>;
    loading: any;
    TITULO: string;
    texto: string;

    model = { ID: '', NOME: '', IDTIME: '', SIMBOLO: '', ATIVO: false, AUTORIZACAO: false, IDPESSOA: '' };

    get diagnostic() { return JSON.stringify(this.model); }

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
        this.model.IDPESSOA = this.params.get('IDPESSOA');
        this.TITULO = "Solicitação";
    }

    ionViewDidLoad() {
        this.listTime();
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

    listTime() {
        this.societyService.listTipoCampo().subscribe(
            data => {
                this.tipotime = data;
            },
            err => {
                this.showAlert(err);
            },
            () => console.log('List Posicao')
        );
    }

    saveTime() {
        this.carregando();

        this.societyService.addTime(this.model).subscribe(
            data => {
                this.limpaCarregando();
                this.dismiss(data);
            },
            err => {
                this.limpaCarregando();
                this.dismiss(0);
            },
            () => console.log('Save Time')
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
            title: 'Time',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }
}