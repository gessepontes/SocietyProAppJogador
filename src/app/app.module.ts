import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PessoaPage } from '../pages/pessoa/pessoa/pessoa';
import { CampoListPage } from '../pages/campo/campo-list/campo-list';
import { CampoDetailsPage } from '../pages/campo/campo-details/campo-details';
import { TimeListPage } from '../pages/time/time-list/time-list';
import { TimePage } from '../pages/time/time/time';
import { ArtilhariaPage } from '../pages/jogador/artilharia/artilharia';
import { PartidaListPage } from '../pages/partida/partida-list/partida-list';
import { PartidaJogadorPage } from '../pages/partida/partida-jogador/partida-jogador';
import { CidadesPopover } from '../pages/campo/campo-list/cidades-popover/cidades-popover';
import { PartidaGolPage } from '../pages/partida/partida-gol/partida-gol';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ReenvioPage } from '../pages/reenvio/reenvio';
import { ArtilhariaCampeonatoPage } from '../pages/campeonato/artilharia/artilharia/artilharia';
import { ArtilhariaCampeonatoListPage } from '../pages/campeonato/artilharia/artilharia-list/artilharia-list';
import { ClassificacaoPage } from '../pages/campeonato/classificacao/classificacao/classificacao';
import { ClassificacaoCampeonatoListPage } from '../pages/campeonato/classificacao/classificacao-list-campeonato/classificacao-list-campeonato';
import { ClassificacaoGrupoListPage } from '../pages/campeonato/classificacao/classificacao-list-grupo/classificacao-list-grupo';
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
import { JogadorListPage } from '../pages/jogador/jogador-list/jogador-list';

import { ChartsModule } from 'ng2-charts/components/charts/charts';

import { CepPipe } from '../pipe/cep-pipe';
import { DataPipe } from '../pipe/data-pipe';

import { SocialSharing } from '@ionic-native/social-sharing';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HomePage2 } from '../pages/home2/home';
import { CampeonatoPage } from '../pages/campeonato/campeonato/campeonato';
import { EstatisticaPage } from '../pages/estatistica/estatistica';
import { FrequenciaPage } from '../pages/jogador/frequencia/frequencia';

import { CampoAgendamentoPage } from '../pages/campo/campo-agendamentos/campo-agendamentos';
import { CampoHorarioAgendadoPage } from '../pages/campo/campo-horarios/campo-horarios';
import { CampoReciboPage } from '../pages/campo/campo-recibo/campo-recibo';

import { CalendarModule } from "ion2-calendar";

@NgModule({
    declarations: [
        MyApp, FrequenciaPage, ClassificacaoCampeonatoListPage, CampoAgendamentoPage, CampoHorarioAgendadoPage,
        PessoaPage, CampoReciboPage, ClassificacaoGrupoListPage, CidadesPopover,  
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
         HomePage2, JogadorListPage, CampeonatoPage, EstatisticaPage
    ],
    imports: [
        ChartsModule,
        IonicModule.forRoot(MyApp, {
            iconMode: 'md',
            tabsPlacement: 'top'
        }), CalendarModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp, FrequenciaPage, ClassificacaoCampeonatoListPage, CampoAgendamentoPage, CampoHorarioAgendadoPage,       
        PessoaPage, CampoReciboPage, ClassificacaoGrupoListPage, CampoReciboPage, CidadesPopover,
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
        HomePage2, JogadorListPage, CampeonatoPage, EstatisticaPage
    ],
    providers: [                
        SocialSharing, ScreenOrientation,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: LOCALE_ID, useValue: "pt-BR" }
    ]
})
export class AppModule { }
