import { Component} from '@angular/core';
import { ViewController } from "ionic-angular";
import { SocietyService } from '../../../../providers/SocietyService';

@Component({
    selector: "cidades-popover",
    templateUrl: "cidades-popover.html",
    providers: [SocietyService]
})

export class CidadesPopover {

    cidades: Array<any>;

    constructor(public viewCtrl: ViewController, private societyService: SocietyService) {
        this.listCidades();
    }

    close() {
        this.viewCtrl.dismiss();
    }

    listCidades() {
        this.societyService.listCidade().subscribe(
            data => {
                this.cidades = data;
            },
            err => {
                console.log(err);
            },
            () => console.log('Listar Cidades')
            );
    }

    onSelect(cinemaId: string) {
        this.viewCtrl.dismiss(cinemaId);
    }

}