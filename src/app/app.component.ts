import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: any;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.platform.ready().then(() => {
      this.initApp();
    });
  }

  initApp() {
    this.statusBar.styleDefault();
    this.rootPage = TabsPage;
    this.splashScreen.hide();
  }
}
