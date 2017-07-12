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

describe('timeStampToDate filter', () => {
  let metricToBigIntStub = sinon.stub().returns('a');
  let bigIntToStringStub = sinon.stub().returns('b');
  let stringToNumberStub = sinon.stub().returns('c');
  let unixToDateStub = sinon.stub().returns('Dec 31, 1969 7:00 PM');
  let fn;

  beforeEach(() => {
    angular.mock.module('app.filters');
    angular.mock.module('app.filters', $provide => {
      'ngInject';
      $provide.value('metricToBigIntFilter', metricToBigIntStub);
      $provide.value('bigIntToStringFilter', bigIntToStringStub);
      $provide.value('stringToNumberFilter', stringToNumberStub);
      $provide.value('unixToDateFilter', unixToDateStub);
    });

    angular.mock.inject(timeStampToDateFilter => {
      'ngInject';
      fn = timeStampToDateFilter;
    });
  });

  it('should follow the pipeline', () => {
    let timestamp = 1497624324;
    fn(timestamp).should.equal('Dec 31, 1969 7:00 PM');
    metricToBigIntStub.should.be.calledWith(timestamp);
    bigIntToStringStub.should.be.calledWith('a');
    stringToNumberStub.should.be.calledWith('b');
    unixToDateStub.should.be.calledWith('c');
  });

});
