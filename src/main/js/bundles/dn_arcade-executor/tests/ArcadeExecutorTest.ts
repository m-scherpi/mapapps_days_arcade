/*
 * Copyright (C) con terra GmbH
 */
import { assert } from "chai";

import md from "module";
import FeatureLayer from "esri/layers/FeatureLayer";
import Graphic from "esri/Graphic";
import {ArcadeExecutor} from "../ArcadeExecutor";

describe(md.id, function() {
    it("expect arcade expression will be evaluated", async function() {

        const features = [
            {
                geometry: {
                    type: "point",
                    x: -100,
                    y: 38
                },
                attributes: {
                    ObjectID: 1,
                    field1: "value1",
                    field2: "value2"
                }
            } as unknown as Graphic
        ];

        const layer = new FeatureLayer({
            source: features,  // autocast as a Collection of new Graphic()
            objectIdField: "ObjectID",
            fields: [{
                name: "field1",
                type: "string"
            },
            {
                name: "field2",
                type: "string"
            }
            ]
        });

        const executor = new ArcadeExecutor();
        const expression = await executor.evaluateExpressionForLayer("$feature.field1 + ' ' + $feature.field2", layer);
        assert.equal(expression, "value1 value2");
    });
});
