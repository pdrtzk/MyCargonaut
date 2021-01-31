import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {PostService} from './post.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Post, PostType} from '../../shared/post.model';
import {Hold} from '../../shared/hold.model';
import {Vehicle} from '../../shared/vehicle.model';
import {Cargonaut} from '../../shared/cargonaut.model';

describe('PostService', () => {
  let service: PostService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = new PostService(httpClient);
  });

  afterEach(() => {
    // no pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create Post', async () => {
    const testPost: Post = {
      description: 'Test Post'
    };
    const author: Cargonaut = {
      firstname: 'Donald',
      lastname: 'Duck',
      id: 123
    };
    const result = {message: 'Bewertung abgegben'};
    service.createPost(author, testPost).then(res => {
    });
    const req = httpTestingController.expectOne('https://mycargonaut.herokuapp.com/api/post/123');
    expect(req.request.method).toEqual('POST');
    req.flush(result);
    httpTestingController.verify();
  });

  it('getAllPosts should be a get request', async () => {
    const testData = {posts: []};
    service.getAllPosts().then(res => {
      expect(res.length).toEqual(0);
    });
    const req = httpTestingController.expectOne('https://mycargonaut.herokuapp.com/api/posts');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('getSpecificPost should work', async () => {
    const testData = {
      posts: [{id: 5, description: 'Test1'}, {id: 7, description: 'Test2'}]
    };
    service.getSpecificPost(5).then(res => {
      expect(res.description).toEqual('Test1');
    });
    const req = httpTestingController.expectOne('https://mycargonaut.herokuapp.com/api/post/5');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('updating Post should send PUT request', async () => {
    const testData = {
      posts: [{id: 5, description: 'Test1'}, {id: 7, description: 'Test2'}]
    };
    service.updatePost({description: 'updated!'}, 5).then(res => {});
    const req = httpTestingController.expectOne('https://mycargonaut.herokuapp.com/api/post/5');
    expect(req.request.method).toEqual('PUT');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('getMorePosts Post should get posts', async () => {
    const testData = {
      posts: [{id: 5, description: 'Test1'}, {id: 7, description: 'Test2'}]
    };
    service.getMorePosts().then(res => {});
    const req = httpTestingController.expectOne('https://mycargonaut.herokuapp.com/api/posts');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });
});

function getPosts(): Post[] {
  const testPost: Post[] = [
    {
      startlocation: 'Berlin',
      endlocation: 'Potsdam',
      start_time: new Date(2021, 1, 2, 12, 12, 12, 12),
      end_time: new Date(2021, 1, 2, 12, 12, 12, 12),
      payment: 'EC',
      hold: new Hold(1, 2, 3),
      vehicle: new Vehicle(),
      seats: 2,
      vehicleType: 'PKW',
      type: PostType.SEARCHING,
      author: {
        id: 1
      },
      price: 10,
      description: 'Eine Description'
    },
    {
      startlocation: 'Hamburg',
      endlocation: 'Kiel',
      start_time: new Date(2021, 1, 10, 12, 12, 12, 12),
      end_time: new Date(2021, 1, 11, 12, 12, 12, 12),
      payment: 'PayPal',
      hold: new Hold(3, 2, 1),
      vehicle: new Vehicle(),
      seats: 2,
      vehicleType: 'PKW',
      type: PostType.OFFER,
      author: {
        id: 1
      },
      price: 20,
      description: 'Eine weitere Description'
    }
  ];
  return testPost;
}

