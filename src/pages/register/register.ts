import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { SocietyService } from '../../providers/SocietyService';
import { Facebook, NativeStorage } from 'ionic-native';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
    providers: [SocietyService]
})
export class RegisterPage {
    registerCredentials = { ID: 0, NOME: '', EMAIL: '', RG: '', TELEFONE: '', SENHA: '', CONFIRMACAO: '', FOTO: '', CODFACEBOOK: '', PERFIL: 4 };
    loading: any;

    constructor(private nav: NavController, private auth: SocietyService, private alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

    public register() {

        let teste = true;
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (this.registerCredentials.SENHA != this.registerCredentials.CONFIRMACAO) {
            this.showPopup("Registro", "A senha e a confimação da senha não são iguais.");
            teste = false;
        }

        if (!pattern.test(this.registerCredentials.EMAIL)) {
            this.showPopup("Registro", "Email inválido.");
            teste = false;
        }

        if (teste) {
            this.auth.register(this.registerCredentials).subscribe(data => {
                if (data[0] == "-1") {
                    this.showPopup("Registro", "Erro ao realizar a operação.");
                }
                else if (data[0] == "0") {
                    this.showPopup("Registro", "Já existe uma conta registrada com este e-mail.");
                }
                else {
                    this.showPopup("Registro", "Usuário criado com sucesso.");
                    NativeStorage.setItem('IDPESSOA', { IDPESSOA: data[0] })
                    NativeStorage.setItem('FOTO', { FOTO: data[1] })
                    this.nav.setRoot(HomePage);
                }
            },
                error => {
                    this.showPopup("Error", error);
                });

        }
    }


    registerFacebook() {
        let permissions = new Array();
        let nav = this.nav;
        let authService = this.auth;
        let alert = this.alertCtrl;
        //the permissions your facebook app needs from the user
        permissions = ["public_profile", "email"];

        let carregandoFace = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        carregandoFace.present();

        Facebook.login(permissions)
            .then(function (response) {
                let params = new Array();

                //Getting name and gender properties
                Facebook.api("/me?fields=first_name,middle_name,last_name,id,email,name", params)
                    .then(function (user) {
                        //user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

                        //now we have the users info, let's save it in the NativeStorage                  
                        authService.registerFacebook(user.email, user.name, user.id).subscribe(
                            data => {
                                if (data[0] > "0") {
                                    NativeStorage.setItem('IDPESSOA', { IDPESSOA: data[0] })
                                    NativeStorage.setItem('FOTO', { FOTO: data[1] })

                                    alert.create({
                                        title: 'Registro',
                                        subTitle: "Registro realizado com sucesso.",
                                        buttons: ['OK']
                                    }).present();

                                    carregandoFace.dismiss();

                                    nav.setRoot(HomePage);
                                } else if (data[0] = "0") {
                                    alert.create({
                                        title: 'Registro',
                                        subTitle: "Já existe uma conta registrada com este e-mail. Acesse o aplicativo com seu e-mail e depois associe o facebook na tela de responsável.",
                                        buttons: ['OK']
                                    }).present();

                                    carregandoFace.dismiss();

                                    nav.setRoot(LoginPage);
                                } else {
                                    carregandoFace.dismiss();

                                    alert.create({
                                        title: 'Registro',
                                        subTitle: "Erro ao realizar a operação.",
                                        buttons: ['OK']
                                    }).present();
                                }

                            },
                            err => {
                                carregandoFace.dismiss();

                                alert.create({
                                    title: 'Registro',
                                    subTitle: "Erro ao realizar a operação.",
                                    buttons: ['OK']
                                }).present();
                            },
                            () => console.log('Acesso Registro')
                        );

                    })
            }, function (error) {
                carregandoFace.dismiss();

                alert.create({
                    title: 'Login',
                    subTitle: "Erro ao realizar a operação.",
                    buttons: ['OK']
                }).present();


                console.log(error);

            });
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
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }
}