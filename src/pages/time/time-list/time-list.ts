import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams} from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { TimePage } from '../time/time';
import { NativeStorage } from 'ionic-native';


@Component({
    selector: 'page-time-list',
    templateUrl: 'time-list.html',
    providers: [SocietyService]
})
export class TimeListPage {

    loading: any;
    texto: string;
    times: Array<any>;
    IDPESSOA = 0;
    TITULO = "Times";
    imagemSimbolo: string;

    constructor(public navCtrl: NavController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController, public params: NavParams) {
        this.imagemSimbolo = societyService.imagemSimbolo();

        this.carregando();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listTime();
        });
        //this.IDPESSOA = 64;
        //this.listTime();

    }

    listTime() {
        this.societyService.listTime(this.IDPESSOA).subscribe(
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


    newTime() {
        let modal = this.modalCtrl.create(TimePage, { IDPESSOA: this.IDPESSOA });

        modal.onDidDismiss((data) => {
            if (data == 'Ok') {
                this.listTime();
                this.showAlert('Ok');
            }
            else if (data == '0') {
                this.limpaCarregando();
                this.showAlert('Erro ao realizar a operação.');
            } else if (data == '2') {
            } else {
                if (data != "") {
                    this.showAlert(data);
                    this.limpaCarregando();
                }
            }
        })
        modal.present();
    }

    deleteTime(ID) {
        let confirm = this.alertCtrl.create({
            title: 'Time',
            message: 'Você deseja excluir este registro?',
            buttons: [
                {
                    text: 'Não',
                    handler: () => {
                    }
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.delete(ID);
                    }
                }
            ]
        });
        confirm.present();
    }

    delete(ID) {
        this.carregando();

        this.societyService.deleteTime(ID).subscribe(
            data => {
                this.listTime();
                this.showAlert(data);
            },
            err => {
                this.limpaCarregando();
                this.showAlert('Erro ao realizar a operação.');
            },
            () => console.log('Delete Time')
        );
    }

    status(ID) {
        this.carregando();

        this.societyService.status(ID).subscribe(
            data => {
                this.listTime();
                //this.showAlert(data);
            },
            err => {
                this.limpaCarregando();
                this.showAlert('Erro ao realizar a operação.');
            },
            () => console.log('Update Status')
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
            title: 'Time',
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
