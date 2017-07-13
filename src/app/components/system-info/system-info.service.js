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

import config from 'shared/config/config.module.js';
import urlJoin from 'url-join';

class SystemInfoService {
  constructor ($q, $http, gatewayUrl) {
    'ngInject';
    this.q = $q;
    this.http = $http;
    this.gatewayUrl = gatewayUrl;
  }

  getSystemInfo (systemId) {
    return this.http.get(urlJoin(this.gatewayUrl, 'systems', '0.0.1', 'systems', systemId), {
      params: {
        sort: '-timeStamp',
        limit: 1
      }
    });
  }

  getCpuInfo (systemId) {
    return this.http.get(urlJoin(this.gatewayUrl, 'system-cpu', '0.0.1', 'systems', systemId), {
      params: {
        sort: '-timeStamp',
        limit: 1
      }
    });
  }

  getMemoryInfo (systemId) {
    return this.http.get(urlJoin(this.gatewayUrl, 'system-memory', '0.0.1', 'systems', systemId), {
      params: {
        sort: '-timeStamp'
      }
    });
  }
}

export default angular
  .module('systemInfo.service', [config])
  .service('systemInfoService', SystemInfoService)
  .name;
