import { Component } from '@angular/core';
import { ViewController, NavController, LoadingController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';

@Component({
    selector: 'page-partida-jogador',
    templateUrl: 'partida-jogador.html',
    providers: [SocietyService]
})
export class PartidaJogadorPage {

    TITULO: string;
    texto: string;
    imagemJogador: string;
    jogadores: Array<any>;

    model = { ID: '', IDPARTIDA: '', IDJOGADOR: '' };

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.imagemJogador = societyService.imagemJogador();
    }

    ionViewDidLoad() {        
        this.listPartidaJogador(this.params.get('IDTIME'), this.params.get('IDPARTIDA'));
        this.TITULO = "Jogadores da partida";
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    listPartidaJogador(IDTIME, IDPARTIDA) {
        this.societyService.listPartidaJogador(IDTIME, IDPARTIDA).subscribe(
            data => {
                this.jogadores = data;
            },
            err => {
                console.log(err);
            },
            () => console.log('Listar Jogador Partida')
        );
    }

    addPartidaJogador(IDJOGADOR) {

        this.model.IDJOGADOR = IDJOGADOR;
        this.model.IDPARTIDA = this.params.get('IDPARTIDA');

        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.societyService.addPartidaJogador(this.model).subscribe(
            data => {
                this.listPartidaJogador(this.params.get('IDTIME'), this.params.get('IDPARTIDA'));
                loading.dismiss();
                this.showAlert(data);
            },
            err => {
                loading.dismiss();
                this.showAlert(err);
                console.log(err);
            },
            () => console.log('Adicionar Jogador Partida')
        );
    }

    deletePartidaJogador(ID) {
        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.societyService.deletePartidaJogador(ID).subscribe(
            data => {
                this.listPartidaJogador(this.params.get('IDTIME'), this.params.get('IDPARTIDA'));
                loading.dismiss();
                this.showAlert(data);
            },
            err => {
                loading.dismiss();
                this.showAlert("Erro ao realizar a operação");
                console.log(err);
            },
            () => console.log('Delete jogador Partida')
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
            title: 'Jogadores da partida',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

}
