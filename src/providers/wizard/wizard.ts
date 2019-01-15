import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';


import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';

import { Item } from "../../models/item.interface";

@Injectable()
export class WizardProvider {

  //Variables...............................................................................................................
  baseUrl: string = "./assets/data/db.json";
  //........................................................................................................................

  //Constructor.............................................................................................................
  constructor(private http: Http) {

  }
  //........................................................................................................................

  //Methods.................................................................................................................
  /**
   * Returns array of item 
   */
  getItems(): Observable<Item[]> {
    return this.get(`${this.baseUrl}`);
  }

  /**
   * Returns array of item by keyword
   * @param keyword 
   */
  getItemsByKeyword(keyword: string): Observable<Item[]> {
    keyword = keyword.trim().toLowerCase();

    return this.getItems()
      .map(list => list.filter(item => item.keywords.toLowerCase().indexOf(keyword) >= 0));
  }

  /**
   * Returns array of keyword by text
   * @param text text to search
   */
  getKeywordsByText(text: string): Observable<string[]> {
    text = text.trim().toLowerCase();
    let regEx = new RegExp(text, "ig");

    //Filtering items by text
    return this.getItemsByKeyword(text)
      //Mapping to string[] of keywords
      .map(list => list.map(item => item.keywords))
      //Joining to a single string
      .reduce((acc, val) => acc.concat(val.join(",")), "")
      //Mapping to string[]
      .map(item => item.split(","))
      //Filtering agian by text
      .map(list => list.filter(item => item.toLowerCase().indexOf(text) >= 0))
      //Removing spaces
      .map(list => list.map(item => item.trim().replace(regEx, `<span class='highlight'>${text}</span>`)));    
  }
  //........................................................................................................................

  //Utils...................................................................................................................  
  get(url: string): Observable<any> {
    return this.http.get(url)
      //.do(this.log)
      .map(this.parse)
      //.do(this.log)
      .catch(this.handleError);
  }

  log(response: Response): void {
    console.log(response);
  }

  parse(response: Response): any {
    return response.json()
  }

  handleError(error: Response | any): ErrorObservable {
    return Observable.throw(error.json().error || "Server Error");
  }
  //........................................................................................................................

}
