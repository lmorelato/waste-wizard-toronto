import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { WizardProvider } from "../../providers/wizard/wizard";
import { DetailPage } from "../detail/detail";
import { AdvertProvider } from '../../providers/advert/advert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;
  text: string = "";
  keywords: string[];

  constructor(
    public navCtrl: NavController,
    private wizardProvider: WizardProvider,
    private adProvider: AdvertProvider) { }

  public ionViewWillEnter() {
   
  }

  public ionViewDidEnter() {
    this.adProvider.showBanner();
    setTimeout(() => { this.content.resize(); }, 500);
  }

  public search() {
    if (this.text.length < 2) {
      this.keywords = [];
      return;
    }
    this.wizardProvider
      .getKeywordsByText(this.text)
      .subscribe((data: string[]) => this.keywords = data);
  }

  public select(text: string) {
    this.navCtrl.push(DetailPage, {
      keyword: text.replace("<span class='highlight'>", "").replace("</span>", "")
    });
  }

}
