import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController} from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { CampoDetailsPage } from '../campo-details/campo-details';
import { NativeStorage } from 'ionic-native';


@Component({
    selector: 'page-campo-list',
    templateUrl: 'campo-list.html',
    providers: [SocietyService]
})
export class CampoListPage {

    loading: any;
    texto: string;
    campos: Array<any>;
    TITULO = "Campos";
    imagemCampo: string;
    IDPESSOA;

    constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.carregando();
        this.imagemCampo = societyService.imagemCampo();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listCampo(this.IDPESSOA);
        });

        //this.IDPESSOA = 4;
        //this.listCampo(this.IDPESSOA);
    }

    listCampo(IDPESSOA) {
        this.societyService.listCampo(IDPESSOA).subscribe(
            data => {
                this.campos = data;
                this.limpaCarregando();
            },
            err => {
                console.log(err);
                this.showAlert("Erro ao realizar a operação.");
                this.limpaCarregando();
            },
            () => console.log('Listar Campo')
        );
    }

    detailsCampo(item) {
        this.navCtrl.push(CampoDetailsPage, { ID: item });
    }

    showAlert(erro) {

        if (erro == 'Ok') {
            this.texto = 'Operação realizada com sucesso!';
        }
        else {
            this.texto = erro;
        }


        let alert = this.alertCtrl.create({
            title: 'Campo',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
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
