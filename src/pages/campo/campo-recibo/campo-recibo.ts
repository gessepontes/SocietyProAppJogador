import { Component} from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController} from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { CampoListPage } from  '../campo-list/campo-list';

@Component({
    selector: 'page-campo-recibo',
    templateUrl: 'campo-recibo.html',
    providers: [SocietyService]
})


export class CampoReciboPage {
    TITULO = "Recibo do agendamento";
    loading: any;
    texto: string;
    ID;
    recibo: Array<any>;
    imagemCampo: string;

    constructor(public navCtrl: NavController, public params: NavParams, private societyService: SocietyService, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
        this.carregando();
        this.imagemCampo = societyService.imagemCampo();
        this.ID = this.params.get('ID');
        this.listRecibo(this.ID);
    }


    sair() {
        this.navCtrl.push(CampoListPage);
    }

    listRecibo(ID) {
        this.societyService.listRecibo(ID).subscribe(
            data => {
                this.recibo = data;
                this.limpaCarregando();
            },
            err => {
                console.log(err);
                this.showToast("Erro ao realizar a operação.");

                this.limpaCarregando();
            },
            () => console.log('Listar Campo')
        );
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
}
