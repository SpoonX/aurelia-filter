// import {Filter} from '../src/filter';
import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
// import {Container} from 'aurelia-dependency-injection';

describe('Filter', () => {
  let component;


  beforeEach( ()=> {
    component = StageComponent
      .withResources('test/resources/dummy')
      .inView('')
      .boundTo({});

    component.configure = function(aurelia) {
      aurelia.use
        .standardConfiguration()
        .feature('src', config => {});
    };
  });

  afterEach(() => {
    component.dispose();
  });

  describe('.compose()', function() {
    it('Should xy', function(done) {
      // let container = new Container();
      // let filter = container.get(Filter);

      component.create(bootstrap).then(function() {
        done();
      });
    });
  });
});
