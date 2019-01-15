import { Component, ViewChild } from '@angular/core';

import { NavParams, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WizardProvider } from "../../providers/wizard/wizard";
import { Item } from "../../models/item.interface";
import { AdvertProvider } from "../../providers/advert/advert";

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  @ViewChild(Content) content: Content;
  keyword: string;
  items: Item[];

  constructor(
    private navParams: NavParams,
    private storage: Storage,
    private wizardProvider: WizardProvider,
    private adProvider: AdvertProvider) { }

  public ionViewWillEnter() {
    this.storage.get('count').then((val: number) => {     
      if (val++ == 1) this.adProvider.showInterstitial();
      if (val >= 3) val = 0;
      this.storage.set('count', val);
    });

    this.getItems();
  }

  public ionViewDidEnter() {
    setTimeout(() => { this.content.resize(); }, 500);
  }

  public getItems(): void {
    this.keyword = this.navParams.get('keyword');

    if (this.keyword) {
      this.wizardProvider
        .getItemsByKeyword(this.keyword)
        .subscribe((data: Item[]) => {
          this.items = data;
          this.formatData();
        });
    }
  }

  formatData() {
    for (let index = 0; index < this.items.length; index++) {
      let keys: string[] = this.items[index].keywords.split(",");
      let key: string = keys.filter(item => item.indexOf(this.keyword) >= 0)[0];
      this.items[index].keywords = key;
    }
  }
}


