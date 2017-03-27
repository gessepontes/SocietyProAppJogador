import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';

@Component({
    selector: 'page-artilharia',
    templateUrl: 'artilharia.html',
    providers: [SocietyService]
})
export class ArtilhariaCampeonatoPage {

    TITULO: string;
    jogadores: Array<any>;
    texto: string;
    imagemJogador: string;
    imagemSimbolo: string;
    IDCampeonato = 0;

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.IDCampeonato =  this.params.get('IDCampeonato');
        this.listArtilharia();
        this.imagemJogador = societyService.imagemJogador();
        this.imagemSimbolo = societyService.imagemSimbolo();
    }

    ionViewDidLoad() {
        this.TITULO = "Artilharia";
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
            title: 'Artilharia',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    listArtilharia() {
        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.societyService.listArtilhariaCampeonato(this.IDCampeonato).subscribe(
            data => {
                this.jogadores = data;
                loading.dismiss();
            },
            err => {
                console.log(err);
                loading.dismiss();
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Listar Gols Partida')
        );
    }

}
