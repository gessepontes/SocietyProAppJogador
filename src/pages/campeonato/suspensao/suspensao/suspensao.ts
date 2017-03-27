import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';

@Component({
    selector: 'page-suspensao',
    templateUrl: 'suspensao.html',
    providers: [SocietyService]
})
export class SuspensaoPage {

    TITULO: string;
    suspensos: Array<any>;
    texto: string;
    imagemJogador: string;
    imagemSimbolo: string;
    IDCampeonato = 0;

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.IDCampeonato = this.params.get('IDCampeonato');
        this.listSuspenso();
        this.imagemJogador = societyService.imagemJogador();
        this.imagemSimbolo = societyService.imagemSimbolo();
    }

    ionViewDidLoad() {
        this.TITULO = "Suspensos";
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    showAlert(erro) {

        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let alert = this.alertCtrl.create({
            title: 'Suspensos',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }    

    listSuspenso() {
        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.societyService.listSuspenso(this.IDCampeonato).subscribe(
            data => {
                this.suspensos = data;
                loading.dismiss();
            },
            err => {
                console.log(err);
                loading.dismiss();
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Suspenso')
        );
    }

}
