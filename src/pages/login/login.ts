import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SocietyService } from '../../providers/SocietyService';
import { RegisterPage } from '../register/register';
import { ReenvioPage } from '../reenvio/reenvio';
import { Facebook, NativeStorage } from 'ionic-native';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [SocietyService]
})

export class LoginPage {

    //FB_APP_ID: number = 1992702400956856;

    texto: string;
    registerCredentials = { email: '', password: '' };
    modelUsuario = { ID: 0, NOME: '', EMAIL: '', IDTIME: 0, TIME: '', CODFACEBOOK: '' };
    loading: any;

    constructor(private navCtrl: NavController, private auth: SocietyService, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public menuCtrl: MenuController) {
        //Facebook.browserInit(this.FB_APP_ID, "v2.8");
        this.menuCtrl.close();
        this.menuCtrl.enable(false);
    }

    public createAccount() {
        this.navCtrl.push(RegisterPage);
    }

    public reenvioPassword() {
        this.navCtrl.push(ReenvioPage);
    }

    public login() {

        let loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        loading.present();

        this.auth.login(this.registerCredentials).subscribe(
            data => {
                this.modelUsuario = data;

                if (this.modelUsuario.ID != 0) {
                    NativeStorage.setItem('rememberMeUserID', { IDPESSOA: data.ID, NOME: data.NOME })

                    NativeStorage.setItem('IDPESSOA', { IDPESSOA: data.ID })
                    NativeStorage.setItem('FOTO', { FOTO: data.FOTO })

                    this.navCtrl.setRoot(HomePage, { IDPESSOA: data.ID });

                } else {
                    this.showAlert("Usuário ou senha incorretos.");
                }

                loading.dismiss();
            },
            err => {
                this.showAlert("Erro ao realizar a operação.");
                loading.dismiss();
            },
            () => console.log('Acesso Login')
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
            title: 'Login',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    doFbLogin() {
        let permissions = new Array();
        let nav = this.navCtrl;
        let authService = this.auth;
        let model = this.modelUsuario;
        let alert = this.alertCtrl;
        let carregandoFace = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        carregandoFace.present();

        //the permissions your facebook app needs from the user
        permissions = ["public_profile", "email"];

        Facebook.login(permissions)
            .then(function (response) {
                let userId = response.authResponse.userID;
                let params = new Array();

                //Getting name and gender properties
                Facebook.api("/me?fields=email,first_name,last_name,id,picture,name", params)
                    .then(function (user) {
                        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                        //now we have the users info, let's save it in the NativeStorage 
                        authService.loginFacebook(user.email).subscribe(
                            data => {
                                model = data;

                                if (model.ID != 0) {

                                    NativeStorage.setItem('rememberMeUserID', { IDPESSOA: data.ID, NOME: data.NOME })

                                    NativeStorage.setItem('IDPESSOA', { IDPESSOA: data.ID })
                                    NativeStorage.setItem('FOTO', { FOTO: data.FOTO })

                                    carregandoFace.dismiss();

                                    nav.setRoot(HomePage, { IDPESSOA: data.ID });
                                } else {

                                    carregandoFace.dismiss();

                                    alert.create({
                                        title: 'Login',
                                        subTitle: "Não existe usuário cadastrado com esse Facebook.",
                                        buttons: ['OK']
                                    }).present();
                                }

                            },
                            err => {

                                carregandoFace.dismiss();

                                alert.create({
                                    title: 'Login',
                                    subTitle: "Erro ao realizar a operação.",
                                    buttons: ['OK']
                                }).present();
                            },
                            () => console.log('Acesso Login')
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
}