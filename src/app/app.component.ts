import { Component, OnInit } from '@angular/core';
import { IImages, IEntries } from './interfaces/entries';
import { ImagesService } from './services/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'challenge-frontend-modyo';
  success = 0
  errors = 0
  images: IEntries[] = []
  unknown = "./assets/images/question.svg";
  toCompare: number | null = null
  disabledButton: boolean = false

  constructor(public imagesService: ImagesService) {

  }

  ngOnInit() {
    this.getEntries()
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

        this.success++

      } else {
        this.toCompare = null
        this.closeAll()
        this.errors++

      }

    }, 1500);

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
