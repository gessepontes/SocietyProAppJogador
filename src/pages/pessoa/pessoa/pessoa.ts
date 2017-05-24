import { Component  } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController, NavController, ToastController  } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';
import { Camera, NativeStorage, Facebook } from 'ionic-native';


@Component({
    selector: 'page-pessoa',
    templateUrl: 'pessoa.html',
    providers: [SocietyService]
})
export class PessoaPage {

    loading: any;
    TITULO: string;
    texto: string;
    imagemResponsavel: string;
    imagemCamera: boolean;
    imagem: string;

    model = { ID: '', NOME: '', RG: '', DATANASCIMENTO: '', TELEFONE: '', FOTO: '', EMAIL: '', CODFACEBOOK: '' };

    get diagnostic() { return JSON.stringify(this.model); }

    constructor(private nav: NavController, public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
        this.TITULO = "Usuário";

        this.imagemResponsavel = societyService.imagemResponsavel();
        this.imagem = societyService.fotoUsuarioPadrao();
        this.carregando();

        NativeStorage.getItem('IDPESSOA').then(data => {
            let IDPESSOA = data.IDPESSOA;

            this.pessoa(IDPESSOA);
        });

        //this.pessoa(1);
    }

    pessoa(ID) {
        this.societyService.pessoa(ID).subscribe(
            data => {
                this.model = data[0];
                this.imagem = this.imagemResponsavel + this.model.FOTO;
                NativeStorage.setItem('FOTO', { FOTO: this.model.FOTO })
                this.limpaCarregando();
            },
            err => {
                this.limpaCarregando();
                //this.showAlert("Erro ao realizar a operação.");
                this.showToast('Erro ao realizar a operação.');
            },
            () => console.log('Listar Pessoa')
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
            duration: 3000,
            position: 'bottom'
        });

        toast.present(toast);
    }

    associarFacebook() {
        let permissions = new Array();
        let authService = this.societyService;
        //let alert = this.alertCtrl;
        let toast = this.toastCtrl;
        let model = this.model;

        let carregandoFace = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        carregandoFace.present();

        //the permissions your facebook app needs from the user
        permissions = ["public_profile", "email"];


        Facebook.login(permissions)
            .then(function (response) {
                let params = new Array();

                //Getting name and gender properties
                Facebook.api("/me?fields=first_name,middle_name,last_name,id,email,name", params)
                    .then(function (user) {
                        //user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

                        if (model.EMAIL != user.email) {
                            carregandoFace.dismiss();

                            //alert.create({
                            //    title: 'Pessoa',
                            //    subTitle: "Você não pode associar esta conta por que o usuário cadastrado possui um email diferente que o informado pelo facebook!",
                            //    buttons: ['OK']
                            //}).present();


                            toast.create({
                                message: 'Você não pode associar esta conta por que o usuário cadastrado possui um email diferente que o informado pelo facebook!',
                                duration: 3000,
                                position: 'bottom'
                            }).present();


                        } else {
                            //now we have the users info, let's save it in the NativeStorage                  
                            authService.associarFacebook(user.email, user.id).subscribe(
                                data => {
                                    if (data == 'Ok') {
                                        carregandoFace.dismiss();

                                        //alert.create({
                                        //    title: 'Pessoa',
                                        //    subTitle: "Operação realizada com sucesso!",
                                        //    buttons: ['OK']
                                        //}).present();

                                        toast.create({
                                            message: 'Operação realizada com sucesso!',
                                            duration: 3000,
                                            position: 'bottom'
                                        }).present();
                                    } else {
                                        carregandoFace.dismiss();

                                        //alert.create({
                                        //    title: 'Pessoa',
                                        //    subTitle: "Erro ao realizar a operação.",
                                        //    buttons: ['OK']
                                        //}).present();

                                        toast.create({
                                            message: 'Erro ao realizar a operação.',
                                            duration: 3000,
                                            position: 'bottom'
                                        }).present();
                                    }

                                },
                                err => {
                                    carregandoFace.dismiss();

                                    //alert.create({
                                    //    title: 'Pessoa',
                                    //    subTitle: "Erro ao realizar a operação.",
                                    //    buttons: ['OK']
                                    //}).present();
                                    toast.create({
                                        message: 'Erro ao realizar a operação.',
                                        duration: 3000,
                                        position: 'bottom'
                                    }).present();
                                },
                                () => console.log('Acesso Registro')
                            );
                        }
                    })
            }, function (error) {
                carregandoFace.dismiss();

                //alert.create({
                //    title: 'Login',
                //    subTitle: "Erro ao realizar a operação.",
                //    buttons: ['OK']
                //}).present();

                toast.create({
                    message: 'Erro ao realizar a operação.',
                    duration: 3000,
                    position: 'bottom'
                }).present();

                console.log(error);

            });
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

    dismiss() {
        this.viewCtrl.dismiss();
    }

    verificaFotoCamera(foto: string) {
        var fotocamera: string[] = foto.split(",");

        if (fotocamera[0] == "data:image/jpeg;base64") {
            return true;
        } else {
            return false;
        }
    }

    savePessoa() {
        this.carregando();

        if (this.verificaFotoCamera(this.imagem)) {
            this.model.FOTO = this.imagem;
        } else {
            this.model.FOTO = "";
        }

        this.societyService.updatePessoa(this.model).subscribe(
            data => {

                if (this.model.FOTO != "") {
                    this.pessoa(this.model.ID);
                } else {
                    this.limpaCarregando();
                }

                //this.showAlert(data);
                this.showToast(data);
            },
            err => {
                this.limpaCarregando();
            },
            () => console.log('Save Pessoa')
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
            title: 'Pessoa',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    openGallery(): void {
        let cameraOptions = {
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: 0,
            quality: 75,
            targetWidth: 1000,
            targetHeight: 1000,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true,
            mediaType: 0
        }

        Camera.getPicture(cameraOptions)
            .then(file_uri => this.imagem = 'data:image/jpeg;base64,' + file_uri,
            err => console.log(err));
    }
}
