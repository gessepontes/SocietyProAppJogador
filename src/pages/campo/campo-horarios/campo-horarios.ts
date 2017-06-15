import { Component} from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, NavParams} from 'ionic-angular';
import {CalendarController} from "ion2-calendar/dist";
import { SocietyService } from '../../../providers/SocietyService';
import { CampoReciboPage } from '../campo-recibo/campo-recibo';


@Component({
    selector: 'page-campo-horarios',
    templateUrl: 'campo-horarios.html',
    providers: [SocietyService]
})


export class CampoHorarioAgendadoPage {
    TITULO = "Campo horário";
    date: string;
    json: string;
    loading: any;
    texto: string;
    campos: Array<any>;
    horarios: Array<any>;
    modelHorario = { ID: '', HORARIO: '', IDCAMPO: '', IDITEMCAMPO: '', AGENDADO: false, TIPOHORARIO: '' };
    model = { ID: '', DATA: '', IDCAMPOTIME: '', IDHORARIO: '', CHECKOUT: false, MARCADOAPP: true, TIPOHORARIO: '', IDPESSOA: '' };

    constructor(public navCtrl: NavController, public params: NavParams, private societyService: SocietyService, public alertCtrl: AlertController, public calendarCtrl: CalendarController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

        this.model.DATA = new Date().toDateString();
        this.openCalendar();
        this.listCampoItem(this.params.get('IDCAMPO'));
        this.model.IDPESSOA = this.params.get('IDPESSOA');
    }

    openCalendar() {

        var data = new Date();

        this.societyService.listaMes().subscribe(
            retorno => {
                this.calendarCtrl.openCalendar({
                    to: new Date(data.getFullYear(), (data.getMonth() + retorno)),
                    title: 'Dia do horário',
                    monthTitle: ' MMMM-yyyy ',
                    cssClass: 'my-class',
                    weekdaysTitle: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                    closeLabel: 'Fechar'
                })
                    .then((res: any) => {
                        this.model.DATA = new Date(res.date.time).toDateString();
                        this.model.CHECKOUT = false;
                        this.horarios = null;
                        this.json = JSON.stringify(res, null, 4);
                    })
                    .catch(() => { })            },
            err => {
                this.calendarCtrl.openCalendar({
                    to: new Date(data.getFullYear(), (data.getMonth() + 2)),
                    title: 'Dia do horário',
                    monthTitle: ' MMMM-yyyy ',
                    cssClass: 'my-class',
                    weekdaysTitle: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                    closeLabel: 'Fechar'
                })
                    .then((res: any) => {
                        this.model.DATA = new Date(res.date.time).toDateString();
                        this.model.CHECKOUT = false;
                        this.horarios = null;
                        this.json = JSON.stringify(res, null, 4);
                    })
                    .catch(() => { })                       },
            () => console.log('Listar Qnt Mes')
            );

    }

    onCampoChange(campoId: string) {
        try {
            if (campoId != '') {
                this.listHorario(campoId, this.model.DATA);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    onHorarioChange(horario) {
        this.model.IDHORARIO = horario.ID;
        this.model.TIPOHORARIO = horario.TIPOHORARIO;
        this.model.CHECKOUT = true;
    }

    listCampoItem(idCampo) {
        this.carregando();

        this.societyService.listCampoItem(idCampo).subscribe(
            data => {
                this.campos = data;
                this.model.CHECKOUT = false;
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

    listHorario(idCampoItem, data) {
        this.carregando();

        this.societyService.listHorario(idCampoItem, data).subscribe(
            data => {
                this.horarios = data;
                this.model.CHECKOUT = false;
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

    checkoutConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Horário',
            message: 'Você deseja agendar este horário?',
            buttons: [
                {
                    text: 'Não',
                    handler: () => {
                    }
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.checkout();
                    }
                }
            ]
        });
        confirm.present();
    }


    checkout() {
        this.carregando();

        this.societyService.addHorario(this.model).subscribe(
            data => {
                this.limpaCarregando();
                this.showToast("Ok");
                this.navCtrl.push(CampoReciboPage, { ID: data });
            },
            err => {
                this.limpaCarregando();
            },
            () => console.log('Agendar Horario')
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
