import angular from 'angular';
import configRouter from './app.config';
import handleRoutingErrors from './guard/handler-router.guard';

import { CommonModule } from './common/common.module';
import { CoreModule } from './services/core.module';
import { ModelsModule } from './models/models.module';
import { AuthLayoutModule } from './layout/auth-layout/auth-layout.module';
import { HomeLayoutModule } from './layout/home-layout/home-layout.module';
import { AppSignin } from './pages/auth/signin.module';
import { AppChat } from './pages/chat/chat.module';

angular
  .module('WebChat', [
    CommonModule,
    CoreModule,
    ModelsModule,
    HomeLayoutModule,
    AuthLayoutModule,
    AppSignin,
    AppChat,
  ])
  .config(configRouter)
  .run(handleRoutingErrors);
