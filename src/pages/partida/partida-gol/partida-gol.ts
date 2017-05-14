import { Component } from '@angular/core';
import { ViewController, NavController, LoadingController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';

@Component({
    selector: 'page-partida-gol',
    templateUrl: 'partida-gol.html',
    providers: [SocietyService]
})
export class PartidaGolPage {

    TITULO: string;
    texto: string;
    jogadores: Array<any>;
    testRadioOpen: boolean;
    testRadioResult;
    imagemJogador:string;
    model = { ID: '', NOME: '', IDJOGADORPARTIDA: '',IDJOGADOR:'',QTDGOL:'' };

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) { 
        this.imagemJogador = societyService.imagemJogador();
    }

    ionViewDidLoad() {
        this.listGolJogador(this.params.get('IDTIME'), this.params.get('IDPARTIDA'));
        this.TITULO = "Gols da partida";
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    listGolJogador(IDTIME, IDPARTIDA) {
        this.societyService.listGolPartidaJogador(IDTIME, IDPARTIDA).subscribe(
            data => {
                this.jogadores = data;
            },
            err => {
                console.log(err);
            },
            () => console.log('Listar Gols Partida')
        );
    }
}
