import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController) { }

  public ionViewWillEnter() {
   
  }

  public ionViewDidEnter() {
    
  }

  public ionViewWillLeave() {
    
  }

}
