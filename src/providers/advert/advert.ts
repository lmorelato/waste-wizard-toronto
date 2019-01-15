import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular'
import { AdExtras, AdMobOptions, AdMobPro } from "@ionic-native/admob-pro";


@Injectable()
export class AdvertProvider {

  private adMobId: {
    appId: string,
    banner: string,
    interstitial: string
  };

  private adOptions: AdMobOptions = <AdMobOptions>{};
  private adExtras: AdExtras = <AdExtras>{};

  constructor(private adMob: AdMobPro, private platform: Platform) {
    platform.ready().then(() => { });
    this.initAds();
  }

  public initAds(): void {
    if (!this.isValid()) return;
    this.setAdMobIds();
    this.setAdMobOptions();
  }

  private setAdMobIds(): void {
    if (this.platform.is('android')) {
      this.adMobId = {
        appId: "",
        banner: "",
        interstitial: ""
      }
    }
    else if (this.platform.is('ios')) {
      this.adMobId = {
        appId: "",
        banner: "",
        interstitial: ""
      }
    }
  }

  private setAdMobOptions(): void {
    if (!this.isValid()) return;

    this.adOptions = {
      position: this.adMob.AD_POSITION.BOTTOM_CENTER,
      isTesting: false,
      autoShow: true,
      overlap: true,
      adExtras: this.adExtras
    }

    this.adMob.setOptions(this.adOptions)
  }

  private isMobile(): boolean {
    return (this.platform.is('android') || this.platform.is('ios'));
  }

  private isValid(): boolean {
    if (!this.adMob) return false;
    if (!this.isMobile()) return false;
    return true;
  }

  public showInterstitial(): Promise<any> {
    if (!this.isValid()) return;
    return this.adMob.prepareInterstitial({ adId: this.adMobId.interstitial });
  }

  public showBanner(): Promise<any> {
    if (!this.isValid()) return;
    return this.adMob.createBanner({ adId: this.adMobId.banner });
  }

  public removeAds(): void {
    if (!this.isValid()) return;
    this.adMob.removeBanner();
  }
}
