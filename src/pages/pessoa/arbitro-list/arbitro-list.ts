import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams, ToastController, ActionSheetController} from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { SocialSharing } from '@ionic-native/social-sharing';


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

    constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController,
        public alertCtrl: AlertController, public params: NavParams, public toastCtrl: ToastController, private social: SocialSharing,
        public actionsheetCtrl: ActionSheetController) {
        this.imagemResponsavel = societyService.imagemResponsavel();
        this.carregando();
        this.listArbitro();
    }

    whatsapp(numero) {
        this.social.shareViaWhatsAppToReceiver(numero, "Mensagem iniciada pelo App SocietyPro", null, "www.societypro.com.br")
            .then(() => {
            },
            () => {
            })
    }

    listArbitro() {
        this.societyService.listArbitro().subscribe(
            data => {
                this.arbitros = data;
                this.limpaCarregando();
            },
            err => {
                console.log(err);
                //this.showAlert("Erro ao realizar a operação.");
                this.showToast("Erro ao realizar a operação.");

                this.limpaCarregando();
            },
            () => console.log('Listar Arbitro')
        );
    }

    openMenu(numero) {
        let actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'WhatsApp',
                    handler: () => {
                        this.whatsapp(numero);
                    }
                }
            ]
        });
        actionSheet.present();
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

    showToast(erro: string) {
        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let toast = this.toastCtrl.create({
            message: this.texto,
            duration: 3000,
            position: 'bottom'
        });

        toast.present(toast);
    }

    carregando() {
        this.loading = this.loadingCtrl.create({
            content: 'Carregando...',
            spinner: 'circles',

        });

        this.loading.present();
    }

    limpaCarregando() {
        this.loading.dismiss();
    }
}
