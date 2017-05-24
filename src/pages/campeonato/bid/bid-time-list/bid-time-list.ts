import { Component } from '@angular/core';
import { NavController , LoadingController, ModalController,AlertController,NavParams} from 'ionic-angular';
import { SocietyService } from '../../../../providers/SocietyService';
import { BidPage } from '../bid/bid';

@Component({
	selector: 'page-bid-time-list',
	templateUrl: 'bid-time-list.html',
	providers: [SocietyService]  
})
export class BidTimeListPage {

	loading: any;
	texto: string;
	times: Array<any>;
	IDPESSOA = 0;
	TITULO = "Bid Time"; 
    imagemSimbolo: string;
    IDCampeonato = 0;


	constructor(public navCtrl: NavController, private societyService: SocietyService,public loadingCtrl: LoadingController,public modalCtrl: ModalController,public alertCtrl: AlertController,public params: NavParams) {
		this.carregando();
		
        this.IDCampeonato = this.params.get('IDCampeonato');
        this.listTimeBid();
		
		this.imagemSimbolo = societyService.imagemSimbolo();
	}

	listTimeBid(){
        this.societyService.listBid(this.IDCampeonato).subscribe(
			data => {
				this.times = data; 
				this.limpaCarregando();	
			},
			err => {
				this.limpaCarregando();					
				this.showAlert("Erro ao realizar a operação."); 
			},
			() => console.log('Listar Time')
			);	
	}

	showAlert(erro) {

		if(erro =='Ok'){
			this.texto = 'Operação realizada com sucesso!';
		}
		else{
			this.texto = erro;
		}


		let alert = this.alertCtrl.create({
			title: 'Time',
			subTitle: this.texto,
			buttons: ['OK']
		});
		alert.present();
    }

    detailsBid(item) {
        this.navCtrl.push(BidPage, { IDCampeonato: this.IDCampeonato, IDTime : item });
    }

	carregando(){
        this.loading = this.loadingCtrl.create({
            content: 'Carregando...',
            spinner: 'circles',

        });

		this.loading.present();
	}

	limpaCarregando(){
		this.loading.dismiss();  
	}		

}
