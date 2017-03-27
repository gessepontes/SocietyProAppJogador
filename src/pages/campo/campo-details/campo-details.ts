import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SocietyService } from '../../../providers/SocietyService';

import { Geolocation } from 'ionic-native';

declare var google;

@Component({
    selector: 'page-campo-details',
    templateUrl: 'campo-details.html',
    providers: [SocietyService]
})

export class CampoDetailsPage {

    @ViewChild('map') mapElement: ElementRef;

    map: any;
    mapInitialised: boolean = false;
    apiKey: any;
    texto: string;
    TITULO: string;
    geocoder: any;
    model = { ID: '', NOME: '', TELEFONE: '', ENDERECO: '', VALOR: 0, VALORMENSAL: 0, TEMPO: "", DISTANCIA: "" };
    lat: number;
    long: number;
    marker: any;
    loading: any;

    //get diagnostic() { return JSON.stringify(this.model); }

    constructor(public viewCtrl: ViewController, public params: NavParams, private societyService: SocietyService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
        this.TITULO = "Detalhes do campo";
        this.campo(this.params.get('ID'));
        //this.campo(3);
        this.apiKey = "AIzaSyA1fqsuRfOQmU9oxnoCy1kIuCjBNVm4bOo";
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

    loadGoogleMaps() {

        this.addConnectivityListeners();

        if (typeof google == "undefined" || typeof google.maps == "undefined") {

            console.log("Google maps JavaScript needs to be loaded.");
            this.disableMap();

            if (this.societyService.isOnline()) {
                console.log("online, loading map");
                //Load the SDK
                window['mapInit'] = () => {
                    this.carregarNoMapa();
                    this.enableMap();
                }

                let script = document.createElement("script");
                script.id = "googleMaps";

                if (this.apiKey) {
                    script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
                } else {
                    script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                }

                document.body.appendChild(script);

            }
        }
        else {

            if (this.societyService.isOnline()) {
                console.log("showing map");
                this.carregarNoMapa();
                this.enableMap();
            }
            else {
                console.log("disabling map");
                this.disableMap();
            }

        }

    }

    initMap() {

        let carregandoMapa = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        carregandoMapa.present();


        this.mapInitialised = true;

        Geolocation.getCurrentPosition().then((position) => {

            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                compass: true,
                myLocationButton: true,
                indoorPicker: true,
                zoomControl: false,
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.marker = new google.maps.Marker({
                map: this.map,
                draggable: false,
            });

            this.marker.setPosition(latLng);

            carregandoMapa.dismiss();

        });
    }


    directions() {

        console.log("direcao");
        var modelo = this.model;
        Geolocation.getCurrentPosition().then((position) => {
            var posicaoAtual = { lat: position.coords.latitude, lng: position.coords.longitude };

            var map = new google.maps.Map(document.getElementById('map'), {
                center: posicaoAtual,
                scrollwheel: false,
                disableDefaultUI: true,
                zoom: 7
            });

            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            this.geocoder = new google.maps.Geocoder();

            this.geocoder.geocode({ 'address': this.model.ENDERECO + ', Brasil', 'region': 'BR' }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {

                        var campo = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };

                        // Set destination, origin and travel mode.
                        var request = {
                            destination: campo,
                            origin: posicaoAtual,
                            travelMode: google.maps.TravelMode.DRIVING,
                            drivingOptions: {
                                departureTime: new Date(Date.now()),
                                trafficModel: google.maps.TrafficModel.OPTIMISTIC
                            }
                        };

                        console.log("rota");

                        // Pass the directions request to the directions service.
                        var directionsService = new google.maps.DirectionsService();
                        directionsService.route(request, function (result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(result);
                                var route = result.routes[0];
                                var distancia;
                                var tempo;

                                // For each route, display summary information.
                                for (var i = 0; i < route.legs.length; i++) {
                                    distancia = route.legs[i].distance.text;
                                    tempo = route.legs[i].duration.text;
                                    modelo.TEMPO = tempo;
                                    modelo.DISTANCIA = distancia;
                                }

                                console.log("direcao ok");
                            } else {
                                window.alert('Directions request failed due to ' + status);
                            }

                        });
                    }
                }
            });
        });
    }


    carregarNoMapa() {

        let carregandoMapa = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        carregandoMapa.present();


        this.geocoder = new google.maps.Geocoder();

        this.geocoder.geocode({ 'address': this.model.ENDERECO + ', Brasil', 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {

                    var myLatLng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };

                    // Create a map object and specify the DOM element for display.
                    var map = new google.maps.Map(document.getElementById('map'), {
                        compass: true,
                        myLocationButton: true,
                        indoorPicker: true,
                        zoomControl: false,
                        center: myLatLng,
                        zoom: 15,
                        disableDefaultUI: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });

                    // Create a marker and set its position.
                    var marker = new google.maps.Marker({
                        map: map,
                        position: myLatLng,
                    });

                    marker.setPosition(myLatLng);
                }
            }

            carregandoMapa.dismiss();

        });
    }

    disableMap() {
        console.log("disable map");
    }

    enableMap() {
        console.log("enable map");
    }

    addConnectivityListeners() {

        let onOnline = () => {

            setTimeout(() => {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {

                    this.loadGoogleMaps();

                } else {

                    if (!this.mapInitialised) {
                        this.carregarNoMapa();
                    }

                    this.enableMap();
                }
            }, 2000);

        };

        let onOffline = () => {
            this.disableMap();
        };

        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);

    }

    addInfoWindow(marker, content) {

        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }

    campo(ID) {
        this.societyService.campo(ID).subscribe(
            data => {
                this.model = data[0];
                this.loadGoogleMaps();
            },
            err => {
                this.showAlert("Erro ao realizar a operação.");
                console.log(err);
            },
            () => console.log('Listar Campo')
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
            title: 'Campo',
            subTitle: this.texto,
            buttons: ['OK']
        });
        alert.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}