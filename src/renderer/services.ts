import $http from './utils/request';

import request, { MethodType, ResponseBody } from './utils/request';

export const login = (params: any) => $http(MethodType.POST, '/admin/login', params, true);

