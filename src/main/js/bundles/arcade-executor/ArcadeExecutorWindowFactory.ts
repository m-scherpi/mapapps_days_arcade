/*
 * Copyright (C) con terra GmbH
 */

import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import ArcadeExecutor from "./ArcadeExecutor.ts.vue";
import {InjectedReference} from "apprt-core/InjectedReference";
import MapWidgetModel from "map-widget/MapWidgetModel";
import FeatureLayer from "esri/layers/FeatureLayer";

export class ArcadeExecutorWindowFactory {
    mapWidgetModel: InjectedReference<MapWidgetModel>;

    createInstance(): any {

        const map = this.mapWidgetModel!.map;
        const layerNames = map.layers.map((layer) => layer.type === "feature" ? layer.title : "")
            .filter(item => item !== "").toArray();
        const vm = new Vue<{ layerNames: Array<string>, fieldNames: Array<string> }>(ArcadeExecutor);
        vm.layerNames = layerNames;
        vm.fieldNames = [];
        vm.$on("layer-change", (selectedLayer: string) => {
            const layer = map.layers.find((layer) => layer instanceof FeatureLayer &&
                layer.title === selectedLayer);
            const fields = (layer as FeatureLayer).fields;

            vm.fieldNames = fields.map(field => field.name);
        });

        return VueDijit(vm);
    }
}
