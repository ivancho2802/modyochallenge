import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have all records images entries`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    setTimeout(() => {

      //let imagesCards = fixture.nativeElement.query(By.css(".card"));
      let imagesCards:any = fixture.debugElement.queryAll(By.css('div.col>button'))
      //let imagesCards:any = fixture.debugElement.queryAll(By.css('button'))
  
      expect(imagesCards.length).toEqual(20);

    }, 1000);
  });

  it(`should have pears`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    setTimeout(() => {
      let count = 0
      let imagesuuid:any = fixture.debugElement.queryAll(By.css('div.col>button'));
      for (const iterator of imagesuuid) {
        if(iterator.value == "a4452fe5-ca10-4b35-ad7a-62fc44c60d27"){
          count++;
        }
      }
      expect(count).toEqual(3);

    }, 1000);

  });
});
