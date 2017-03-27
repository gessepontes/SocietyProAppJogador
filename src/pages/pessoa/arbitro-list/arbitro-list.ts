import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';

@Component({
	selector: 'page-arbitro-list',
    templateUrl: 'arbitro-list.html',
	providers: [SocietyService]
})
export class ArbitroListPage {

	loading: any;
	texto: string;
    imagemResponsavel: string;
	arbitros: Array<any>;
	IDPESSOA = 0;
	TITULO = "Árbitros";

	constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController, public params: NavParams) {
        this.imagemResponsavel = societyService.imagemResponsavel();
        this.carregando();
        this.listArbitro();
	}

	listArbitro() {
        this.societyService.listArbitro().subscribe(
			data => {
                this.arbitros = data;
				this.limpaCarregando();
			},
			err => {
				console.log(err);
				this.showAlert("Erro ao realizar a operação.");
				this.limpaCarregando();
			},
			() => console.log('Listar Arbitro')
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
			title: 'Arbitro',
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
