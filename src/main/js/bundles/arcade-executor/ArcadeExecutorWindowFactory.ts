/*
 * Copyright (C) con terra GmbH
 */

import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import ArcadeExecutorWindow from "./ArcadeExecutorWindow.ts.vue";
import {InjectedReference} from "apprt-core/InjectedReference";
import MapWidgetModel from "map-widget/MapWidgetModel";
import FeatureLayer from "esri/layers/FeatureLayer";
import LabelClass from "esri/layers/support/LabelClass";
import {ArcadeExecutor} from "./ArcadeExecutor";

export class ArcadeExecutorWindowFactory {
    mapWidgetModel: InjectedReference<MapWidgetModel>;
    _i18n!: InjectedReference<any>;
    #selectedLayer: FeatureLayer;
    #vm: any;

    createInstance(): any {

        const map = this.mapWidgetModel!.map;
        const layerNames = map.layers.map((layer) => layer.type === "feature" ? layer.title : "")
            .filter(item => item !== "").toArray();

        const i18n: any = this._i18n.get();
        const vm = this.#vm =  new Vue<{ layerNames: Array<string>,
            fieldNames: Array<string>, resultValue: string, errorMessage: string,
            i18n: Record<string, any> }>(ArcadeExecutorWindow);
        const executor = new ArcadeExecutor();
        vm.i18n = i18n;
        vm.layerNames = layerNames;
        vm.fieldNames = [];

        vm.$on("layer-change", (selectedLayer: string) => {
            const layer = map.layers.find((layer) => layer instanceof FeatureLayer &&
                layer.title === selectedLayer);
            this.#selectedLayer = (layer as FeatureLayer);
            const fields = (layer as FeatureLayer).fields;

            vm.fieldNames = fields.map(field => field.name);
        });

        vm.$on("evaluate-arcade", async (arcadeExpression: string) => {
            vm.errorMessage = "";
            const resultValue = await executor.evaluateExpressionForLayer(arcadeExpression, this.#selectedLayer);
            if(!resultValue){
                vm.errorMessage = i18n.error.noresult;
            }
            vm.resultValue = `${resultValue ?? ""}`;
        });

        vm.$on("apply-label", (arcadeExpression: string) => {
            if(arcadeExpression && arcadeExpression.length > 0){
                const labelClass = {
                    labelExpressionInfo: {
                        expression: arcadeExpression
                    }
                } as LabelClass;
                try {
                    vm.errorMessage = "";
                    this.#selectedLayer.labelingInfo = [ labelClass ];
                } catch (e) {
                    // internal errors won't be catched here...
                    vm.errorMessage = e.message;
                }
            }
        });

        return VueDijit(vm);
    }

    destroyInstance(): any{
        this.#vm.$off();
    }
}
