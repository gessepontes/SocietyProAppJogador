import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { PartidaJogadorPage } from '../partida-jogador/partida-jogador';
import { PartidaGolPage } from '../partida-gol/partida-gol';
import { NativeStorage } from 'ionic-native';


@Component({
    selector: 'page-partida-list',
    templateUrl: 'partida-list.html',
    providers: [SocietyService]
})
export class PartidaListPage {

    texto: string;
    imagemSimbolo: string;
    loading: any;
    partidas: Array<any>;
    IDPESSOA = 0;
    IDTIME = 0;
    TIME = '';
    TITULO = "Amistosos";

    constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController, public params: NavParams) {
        this.imagemSimbolo = societyService.imagemSimbolo();

        //this.IDPESSOA = 64;
        //this.timeAtivo();
        //this.listPartidas();
    }

    ionViewWillEnter() {
        this.carregando();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.timeAtivo();
            this.listPartidas();
        });
    }


    timeAtivo() {
        this.societyService.timeAtivo(this.IDPESSOA).subscribe(
            data => {
                if (data.length == 0) {
                    this.IDTIME = 0;
                    this.TIME = "";
                } else {
                    this.IDTIME = data[0].ID;
                    this.TIME = data[0].NOME;
                }
            },
            err => {
                console.log(err);
                this.showAlert("Erro ao realizar a operação.");
            },
            () => console.log('Time Ativo')
        );
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

    listPartidas() {
        this.societyService.listPartida(this.IDPESSOA).subscribe(
            data => {
                this.partidas = data;
                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                this.showAlert("Erro ao realizar a operação.");
                console.log(err);
            },
            () => console.log('Listar Partidas')
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
            title: 'Partida',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    jogadorPartida(IDPARTIDA) {
        let modal = this.modalCtrl.create(PartidaJogadorPage, { IDTIME: this.IDTIME, IDPARTIDA: IDPARTIDA });
        modal.present();
    }

    golPartida(IDPARTIDA) {
        let modal = this.modalCtrl.create(PartidaGolPage, { IDTIME: this.IDTIME, IDPARTIDA: IDPARTIDA });
        modal.present();
    }
}
