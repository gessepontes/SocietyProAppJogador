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

    addGol(model) {
        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.societyService.addGolPartidaJogador(model).subscribe(
            data => {
                this.listGolJogador(this.params.get('IDTIME'), this.params.get('IDPARTIDA'));                
                loading.dismiss();
                this.showAlert(data);
            },
            err => {
                loading.dismiss();                
                this.showAlert(err);
                console.log(err);
            },
            () => console.log('Adicionar Gols Partida')
        );
    }

    deleteGolPartidaJogador(ID) {
        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.societyService.deleteGolPartidaJogador(ID).subscribe(
            data => {               
                this.listGolJogador(this.params.get('IDTIME'), this.params.get('IDPARTIDA'));                
                loading.dismiss();
                this.showAlert(data);
            },
            err => {
                loading.dismiss();                
                this.showAlert("Erro ao realizar a operação");
                console.log(err);
            },
            () => console.log('Delete Gols Partida')
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
            title: 'Gols da partida',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    addGolPartidaJogador(IDJOGADORPARTIDA) {
        let alert = this.alertCtrl.create();
        alert.setTitle('Gols do Jogador');

        alert.addInput({
            type: 'radio',
            label: '1',
            value: '1',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: '2',
            value: '2'
        });

        alert.addInput({
            type: 'radio',
            label: '3',
            value: '3'
        });

        alert.addInput({
            type: 'radio',
            label: '4',
            value: '4'
        });

        alert.addInput({
            type: 'radio',
            label: '5',
            value: '5'
        });

        alert.addInput({
            type: 'radio',
            label: '6',
            value: '6'
        });

        alert.addInput({
            type: 'radio',
            label: '7',
            value: '7'
        });

        alert.addInput({
            type: 'radio',
            label: '8',
            value: '8'
        });

        alert.addInput({
            type: 'radio',
            label: '9',
            value: '9'
        });

        alert.addInput({
            type: 'radio',
            label: '10',
            value: '10'
        });

        alert.addButton('Cancelar');
        alert.addButton({
            text: 'Ok',
            handler: data => {
                console.log('Radio data:', data);
                this.testRadioOpen = false;
                this.testRadioResult = data;

                this.model.IDJOGADORPARTIDA = IDJOGADORPARTIDA;
                this.model.QTDGOL = data;
                this.addGol(this.model);
            }
        });

        alert.present().then(() => {
            this.testRadioOpen = true;
        });
    }

}
