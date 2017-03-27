import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import { SocietyService } from '../../providers/SocietyService';

@Component({
    selector: 'page-reenvio',
    templateUrl: 'reenvio.html',
    providers: [SocietyService]
})
export class ReenvioPage {
    createSuccess = false;
    registerCredentials = { email: '' };
    loading: any;

    constructor(private nav: NavController, private auth: SocietyService, private alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

    public reenvio() {

        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        this.carregando();

        if (!pattern.test(this.registerCredentials.email)) {
            this.showPopup("Registro", "Email inválido.");
        } else {
            this.auth.reenvio(this.registerCredentials.email).subscribe(success => {
                debugger;
                if (success == "1") {
                    this.createSuccess = true;
                    this.showPopup("Reenvio", "Senha reenviada com sucesso.");
                } else if (success == "0") {
                    this.showPopup("Reenvio", "E - mail não encontrado.");
                } else {
                    this.showPopup("Reenvio", "Problema no reenvio.");
                }
            },
                error => {
                    this.showPopup("Error", error);
                });
        }
        this.limpaCarregando();

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

    showPopup(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        if (this.createSuccess) {
                            this.nav.popToRoot();
                        }
                    }
                }
            ]
        });
        alert.present();
    }
}