import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PessoaPage } from '../pages/pessoa/pessoa/pessoa';
import { CampoListPage } from '../pages/campo/campo-list/campo-list';
import { CampoDetailsPage } from '../pages/campo/campo-details/campo-details';
import { TimeListPage } from '../pages/time/time-list/time-list';
import { TimePage } from '../pages/time/time/time';
import { ArtilhariaPage } from '../pages/jogador/artilharia/artilharia';
import { PartidaListPage } from '../pages/partida/partida-list/partida-list';
import { PartidaJogadorPage } from '../pages/partida/partida-jogador/partida-jogador';
import { PartidaGolPage } from '../pages/partida/partida-gol/partida-gol';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ReenvioPage } from '../pages/reenvio/reenvio';
import { ArtilhariaCampeonatoPage } from '../pages/campeonato/artilharia/artilharia/artilharia';
import { ArtilhariaCampeonatoListPage } from '../pages/campeonato/artilharia/artilharia-list/artilharia-list';
import { ClassificacaoPage } from '../pages/campeonato/classificacao/classificacao';
import { BidPage } from '../pages/campeonato/bid/bid/bid';
import { BidListPage } from '../pages/campeonato/bid/bid-list/bid-list';
import { BidTimeListPage } from '../pages/campeonato/bid/bid-time-list/bid-time-list';
import { SuspensaoPage } from '../pages/campeonato/suspensao/suspensao/suspensao';
import { SuspensaoListPage } from '../pages/campeonato/suspensao/suspensao-list/suspensao-list';
import { SumulaCampeonatoListPage } from '../pages/campeonato/sumula/sumula-list-campeonato/sumula-list-campeonato';
import { SumulaListPage } from '../pages/campeonato/sumula/sumula-list/sumula-list';
import { SumulaPage } from '../pages/campeonato/sumula/sumula/sumula';
import { RankingPage } from '../pages/ranking/ranking';
import { PartidaCampeonatoListPage } from '../pages/campeonato/partida/partida-list-campeonato/partida-list-campeonato';
import { PartidaCampeonatoPage } from '../pages/campeonato/partida/partida-list/partida-list';
import { ArbitroListPage } from '../pages/pessoa/arbitro-list/arbitro-list';

import { ChartsModule } from 'ng2-charts/components/charts/charts';

import { CepPipe } from '../pipe/cep-pipe';
import { DataPipe } from '../pipe/data-pipe';

import { TabsPage } from '../pages/tabs/tabs';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        PessoaPage,
        CampoListPage,
        TimeListPage,
        TimePage,
        PartidaListPage,
        PartidaJogadorPage,
        PartidaGolPage,
        CampoDetailsPage,
        ArtilhariaPage,
        LoginPage,
        RegisterPage,
        ReenvioPage,
        ArtilhariaCampeonatoPage,
        ArtilhariaCampeonatoListPage,
        ClassificacaoPage,
        BidPage,
        BidListPage,
        SuspensaoPage,
        SuspensaoListPage,
        SumulaCampeonatoListPage,
        SumulaListPage,
        SumulaPage,
        BidTimeListPage,
        RankingPage,
        PartidaCampeonatoPage,
        PartidaCampeonatoListPage,
        ArbitroListPage,
        CepPipe,
        DataPipe,
        TabsPage
    ],
    imports: [
        ChartsModule,
        IonicModule.forRoot(MyApp, {
            iconMode: 'md',
            tabsPlacement: 'top'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        PessoaPage,
        CampoListPage,
        TimeListPage,
        TimePage,
        PartidaListPage,
        PartidaGolPage,
        PartidaJogadorPage,
        CampoDetailsPage,
        ArtilhariaPage,
        LoginPage,
        RegisterPage,
        ReenvioPage,
        ArtilhariaCampeonatoPage,
        ArtilhariaCampeonatoListPage,
        BidPage,
        BidListPage,
        SuspensaoPage,
        SuspensaoListPage,
        SumulaCampeonatoListPage,
        ClassificacaoPage,
        SumulaPage,
        SumulaListPage,
        RankingPage,
        BidTimeListPage,
        PartidaCampeonatoPage,
        PartidaCampeonatoListPage,
        ArbitroListPage,
        TabsPage
    ],
    providers: [                
        SocialSharing, ScreenOrientation,
        { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
