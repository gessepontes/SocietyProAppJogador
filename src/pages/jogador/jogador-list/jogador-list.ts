import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { NativeStorage } from 'ionic-native';


@Component({
	selector: 'page-jogador-list',
	templateUrl: 'jogador-list.html',
	providers: [SocietyService]
})
export class JogadorListPage {

	loading: any;
	texto: string;
	imagemJogador: string;
	jogadores: Array<any>;
	IDPESSOA = 0;
	IDTIME = 0;
	TIME = '';
	TITULO = "Jogadores";

	constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController, public params: NavParams) {
		this.imagemJogador = societyService.imagemJogador();
		this.carregando();

		NativeStorage.getItem('IDPESSOA').then(data => {
			let IDPESSOA = data.IDPESSOA;

			this.IDPESSOA = IDPESSOA;
			this.timeAtivo();
			this.listJogador();

		});

			//this.IDPESSOA = 1;
			//this.timeAtivo();
			//this.listJogador();
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

	listJogador() {
		this.societyService.listJogador(this.IDPESSOA).subscribe(
			data => {
				this.jogadores = data;
				this.limpaCarregando();
			},
			err => {
				console.log(err);
				this.showAlert("Erro ao realizar a operação.");
				this.limpaCarregando();
			},
			() => console.log('Listar Jogador')
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
			title: 'Jogador',
			subTitle: this.texto,
			buttons: ['OK']
		});
		alert.present();
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
}
