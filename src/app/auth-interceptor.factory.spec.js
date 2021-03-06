/**
 * Copyright 2012-2017 Red Hat, Inc.
 *
 * Thermostat is distributed under the GNU General Public License,
 * version 2 or any later version (with a special exception described
 * below, commonly known as the "Classpath Exception").
 *
 * A copy of GNU General Public License (GPL) is included in this
 * distribution, in the file COPYING.
 *
 * Linking Thermostat code with other modules is making a combined work
 * based on Thermostat.  Thus, the terms and conditions of the GPL
 * cover the whole combination.
 *
 * As a special exception, the copyright holders of Thermostat give you
 * permission to link this code with independent modules to produce an
 * executable, regardless of the license terms of these independent
 * modules, and to copy and distribute the resulting executable under
 * terms of your choice, provided that you also meet, for each linked
 * independent module, the terms and conditions of the license of that
 * module.  An independent module is a module which is not derived from
 * or based on Thermostat code.  If you modify Thermostat, you may
 * extend this exception to your version of the software, but you are
 * not obligated to do so.  If you do not wish to do so, delete this
 * exception statement from your version.
 */

describe('authInterceptorFactory', () => {

  let authSvc, interceptor;
  beforeEach(() => {
    angular.mock.module('authModule', $provide => {
      'ngInject';

      let refreshError = sinon.spy();
      let refreshSuccess = sinon.stub().returns({ error: refreshError });
      authSvc = {
        status: sinon.stub().returns('mockStatus'),
        login: sinon.stub().yields(),
        logout: sinon.stub().yields(),
        refreshSuccess: refreshSuccess,
        refreshError: refreshError,
        refresh: sinon.stub().returns({
          success: refreshSuccess,
          error: refreshError
        }),
        token: 'fakeToken'
      };
      $provide.value('authService', authSvc);
    });

    angular.mock.module('authInterceptorFactory');

    angular.mock.inject(authInterceptorFactory => {
      'ngInject';
      interceptor = authInterceptorFactory;
    });
  });

  it('should exist', () => {
    should.exist(interceptor);
  });

  it('should return an interceptor object', () => {
    interceptor.should.be.an.Object();
    interceptor.should.have.properties('request');
    interceptor.should.have.size(1);
  });

  describe('request interceptor', () => {

    let fn;
    beforeEach(() => {
      fn = interceptor.request;
    });

    it('should refresh authService when token exists', () => {
      authSvc.refresh.should.not.be.called();
      fn();
      authSvc.refresh.should.be.calledOnce();
    });

    it('should append header if token refresh succeeds', () => {
      let cfg = {};
      fn(cfg);
      authSvc.refreshSuccess.should.be.calledWith(sinon.match.func);
      authSvc.refreshSuccess.yield();
      cfg.should.deepEqual({ headers: { Authorization: 'Bearer fakeToken'} });
    });

    it('should do nothing if token refresh fails', () => {
      let cfg = {};
      fn(cfg);
      authSvc.refreshError.should.be.calledWith(sinon.match.func);
      authSvc.refreshError.yield();
      cfg.should.deepEqual({});
    });

    it('should do nothing if token does not exist', () => {
      delete authSvc.token;
      let cfg = {};
      fn(cfg);
      authSvc.refresh.should.not.be.called();
      cfg.should.deepEqual({});
    });

  });

});
