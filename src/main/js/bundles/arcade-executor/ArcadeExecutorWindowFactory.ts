/*
 * Copyright (C) con terra GmbH
 */

import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import ArcadeExecutor from "./ArcadeExecutor.ts.vue";


export class ArcadeExecutorWindowFactory {

    createInstance(): any {
        const vm = new Vue(ArcadeExecutor);
        return VueDijit(vm);
    }
}
