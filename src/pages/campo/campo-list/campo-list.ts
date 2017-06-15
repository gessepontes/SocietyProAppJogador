import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, ToastController, ActionSheetController, Platform, PopoverController} from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { CampoAgendamentoPage } from '../campo-agendamentos/campo-agendamentos';
import { CampoHorarioAgendadoPage } from '../campo-horarios/campo-horarios';
import { CampoDetailsPage } from  '../campo-details/campo-details';
import { HomePage2 } from '../../home2/home';
import { CidadesPopover } from './cidades-popover/cidades-popover';
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
    devicePlatform = "";

    constructor(public plt: Platform, public navCtrl: NavController, public popoverCtrl: PopoverController,
        public actionsheetCtrl: ActionSheetController, private societyService: SocietyService,
        public loadingCtrl: LoadingController, public modalCtrl: ModalController,
        public toastCtrl: ToastController) {

        this.carregando();
        this.imagemCampo = societyService.imagemCampo();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.IDPESSOA = IDPESSOA;
            this.listCampo(this.IDPESSOA);
        },
            error => this.limpaCarregando()
            );

        if (this.plt.is('ios')) {
            this.devicePlatform = "";
        } else {
            this.devicePlatform = "Android";
        }

        //this.IDPESSOA = 1;
        //this.listCampo(this.IDPESSOA);
    }

    localizacao(myEvent) {
        let popover = this.popoverCtrl.create(CidadesPopover);
        popover.present({
            ev: myEvent
        });

        popover.onDidDismiss((popoverData) => {
            if (popoverData != null) {
                this.listCampoCidade(this.IDPESSOA, popoverData);
            }            
        })
    }

    voltar() {
        this.navCtrl.setRoot(HomePage2);
    }

    listCampo(IDPESSOA) {
        this.societyService.listCampo(IDPESSOA).subscribe(
            data => {
                this.campos = data;
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

    listCampoCidade(IDPESSOA,IDCIDADE) {

        this.carregando();

        this.societyService.listCampoCidade(IDPESSOA, IDCIDADE).subscribe(
            data => {
                this.campos = data;
                this.limpaCarregando();
            },
            err => {
                console.log(err);
                this.showToast("Erro ao realizar a operação.");

                this.limpaCarregando();
            },
            () => console.log('Listar Campo Cidade')
            );
    }

    openMenu(ID) {
        let actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Localização',
                    icon: 'pin',
                    handler: () => {
                        this.navCtrl.push(CampoDetailsPage, { ID: ID });
                    }
                },
                {
                    text: 'Agendar horário',
                    icon: 'time',
                    handler: () => {

                        this.societyService.verificaCampoAgendamento(ID).subscribe(
                            data => {
                                if (data) {
                                    this.navCtrl.push(CampoHorarioAgendadoPage, { IDCAMPO: ID, IDPESSOA: this.IDPESSOA });
                                } else {
                                    this.showToast("Este campo não está disponível para agendamento. Entre em contato com o administrador do campo e sugira a adesão ao aplicativo.");
                                }
                            },
                            err => {
                                console.log(err);
                                this.showToast("Erro ao realizar a operação.");

                                this.limpaCarregando();
                            },
                            () => console.log('Listar Campo disponivel para agendamento')
                            );

                    }
                },
                {
                    text: 'Agendamentos',
                    icon: 'barcode',
                    handler: () => {
                        this.navCtrl.push(CampoAgendamentoPage, { IDCAMPO: ID, IDPESSOA: this.IDPESSOA });
                    }
                }
            ]
        });
        actionSheet.present();
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
            duration: 8000,
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
