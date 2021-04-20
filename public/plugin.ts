/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import { Plugin, CoreSetup, CoreStart, IUiSettingsClient, HttpSetup, AppMountParameters } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';

export interface ObservabilityDependencies extends Partial<CoreStart> {
    uiSettings: IUiSettingsClient;
    http: HttpSetup;
}

export class ObservabilityPlugin implements Plugin<CustomObservabilitySetup, CustomObservabilityStart> {
    public setup(core: CoreSetup) {
        core.application.register({
          id: 'opensearch-explorer',
          title: 'Explorer',
          category: {
            id: 'opensearchplugins',
            label: 'OpenSearch Plugins',
            order: 400,
          },
          order: 1000,
          async mount(params: AppMountParameters) {
            const { Observability } = await import('./components/index');
            const [coreStart, depsStart] = await core.getStartServices();
            return Observability(coreStart, depsStart as AppPluginStartDependencies, params);
          },
        });
    }
    public start() {}
    public stop() {}
}

export type CustomObservabilitySetup = ReturnType<ObservabilityPlugin['setup']>;
export type CustomObservabilityStart = ReturnType<ObservabilityPlugin['start']>;