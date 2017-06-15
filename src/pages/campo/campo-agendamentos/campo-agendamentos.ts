import { Component} from '@angular/core';
import { NavController, LoadingController, ModalController, ToastController, ActionSheetController, NavParams, AlertController} from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { CampoReciboPage } from '../campo-recibo/campo-recibo';

@Component({
    selector: 'page-campo-agendamentos',
    templateUrl: 'campo-agendamentos.html',
    providers: [SocietyService]
})


export class CampoAgendamentoPage {
    TITULO = "Agendamentos";
    loading: any;
    texto: string;
    horarios: Array<any>;
    IDCAMPO;
    IDPESSOA;
    imagemCampo: string;

    constructor(public navCtrl: NavController, public params: NavParams, public actionsheetCtrl: ActionSheetController, public alertCtrl: AlertController, private societyService: SocietyService, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public toastCtrl: ToastController) {
        this.carregando();
        this.IDPESSOA = this.params.get('IDPESSOA');
        this.IDCAMPO = this.params.get('IDCAMPO');

        //this.IDPESSOA = 1;
        //this.IDCAMPO = 1;
        this.imagemCampo = societyService.imagemCampo();

        //this.listHorarioAgendados(1, 1);  

        this.listHorarioAgendados(this.IDPESSOA, this.IDCAMPO);
    }

    listHorarioAgendados(IDPESSOA, IDCAMPO) {
        this.societyService.listHorarioAgendados(IDPESSOA, IDCAMPO).subscribe(
            data => {
                this.horarios = data;
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

    openMenu(ID) {
        let actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Recibo do agendamento',
                    icon: 'barcode',
                    handler: () => {
                        this.navCtrl.push(CampoReciboPage, { ID: ID });
                    }
                },
                {
                    text: 'Cancelar horário',
                    icon: 'close-circle',
                    handler: () => {
                        this.cancelar(ID);
                    }
                }
            ]
        });
        actionSheet.present();
    }

    cancelar(ID) {
        let confirm = this.alertCtrl.create({
            title: 'Horário',
            message: 'Você deseja cancelar este horário?',
            buttons: [
                {
                    text: 'Não',
                    handler: () => {
                    }
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.carregando();
                        this.cancelarTotal(ID);
                    }
                }
            ]
        });
        confirm.present();
    }


    cancelarTotal(ID) {
        this.societyService.cancelaHorario(ID, this.IDPESSOA).subscribe(
            data => {
                if (data == 1) {
                    this.listHorarioAgendados(this.IDPESSOA, this.IDCAMPO);
                    this.showToast("Horário cancelado com sucesso.");
                } else if (data == 2) {
                    this.showToast("Horário excedido para cancelamento.");
                    this.limpaCarregando();
                } else {
                    this.showToast("Erro ao realizar a operação.");
                    this.limpaCarregando();
                }
            },
            err => {
                console.log(err);
                this.showToast("Erro ao realizar a operação.");
                this.limpaCarregando();
            },
            () => console.log('Cancelar horario')
            );
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
            duration: 5000,
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
