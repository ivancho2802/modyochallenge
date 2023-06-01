import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ImagesService } from './images.service';

describe('ImagesService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImagesService]

    });
  });

  it('should be created', () => {
    const service: ImagesService = TestBed.get(ImagesService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
   const service: ImagesService = TestBed.get(ImagesService);
   expect(service.getImages).toBeTruthy();
  });
});
