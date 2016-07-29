import {configure} from '../src/index';

describe('index', function() {
  describe('export', function() {
    it('Should export configure', function() {
      expect(configure).toBeDefined();
    });
  });
});
