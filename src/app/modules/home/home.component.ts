import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { IImages, IEntries } from '../../interfaces/entries';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string = ''
  success = 0
  errors = 0
  images: IEntries[] = []
  unknown = "./assets/images/question.svg";
  toCompare: number | null = null
  disabledButton: boolean = false
  messageWinner:string = ''

  constructor(
    private router: Router,
    public localService: LocalService,
    public imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    this.checkLoged()
  }

  checkLoged() {
    let username = this.localService.getData('username')
    console.log("username", username)
    if (!username) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
      return;
    }

    this.username = username
    this.getEntries()
    this.getScores()
  }

  /**
   * this funtion is for get all entries of images for challenge
   * with all images duplicate the result for compare peers
   */
  getEntries() {
    this.images = []
    this.imagesService.getImages().subscribe((response: any) => {

      let images = [...response.entries!];

      const myClonedArray: IEntries[] = [];
      images.forEach(val => myClonedArray.push(Object.assign({}, val)));

      images = images.concat(myClonedArray);

      this.images = this.shuffleArray(images)

    })
  }

  getScores(){
    
    let success = this.localService.getData(this.username+'success'),
    errors = this.localService.getData(this.username+'errors');

    this.success = success ? parseFloat(success) : 0
    this.errors = errors ? parseFloat(errors) : 0

  }

  /**
   * 
   * @param inputArray:IEntries is the all entries for shuffles and have a order diff 
   * @returns IEntries entries with the disorder aplicated
   */
  shuffleArray(inputArray:IEntries[]) {
    inputArray.sort(() => Math.random() - 0.5);
    return inputArray
  }

  /**
   * in this function compare data for find coincidences and aplicated show and valid errors  
   * @param index index of entry with image for compare by uuid and index for 
   * @returns null
   */
  compareImages(index: number) {

    let image: IEntries = this.images[index]

    if (this.images[index].show) {
      this.images[index].show = false
      return
    }
    this.images[index].show = true

    if (this.toCompare == null) {
      this.toCompare = index;
      return
    }

    this.disabledButton = true

    setTimeout(() => {
      this.disabledButton = false


      if (this.toCompare == null) {
        return
      }

      let uuid = this.images[this.toCompare].fields.image.uuid

      if (image.fields.image.uuid == uuid && index !== this.toCompare) {

        this.images[index].finded = true
        this.images[this.toCompare].finded = true

        this.makeLoad(true)

      } else {
        this.toCompare = null
        this.closeAll()
        this.makeLoad(false)

      }

    }, 1500);

  }

  makeLoad(operation:boolean){
    if(operation === true){
      this.success++;
      this.localService.saveData(this.username+'success', JSON.stringify(this.success));
      this.validWinner()
    }else{
      this.errors++;
      this.localService.saveData(this.username+'errors', JSON.stringify(this.errors))
    }
  }

  validWinner(){
    if(this.success == this.images.length/2){
      this.messageWinner = "Congratulation " + this.username + " you are Winner, you have the best memory you are asome"
    }
  }

  /**
   * is for close other images opener after analise data
   */
  closeAll() {
    this.images.map(el => {
      if (!el.finded) {
        el.show = false;
      }
      return el;
    })
  }

}
