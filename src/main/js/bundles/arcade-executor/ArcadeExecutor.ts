/*
 * Copyright (C) con terra GmbH
 */

import FeatureLayer from "esri/layers/FeatureLayer";
import arcade from "esri/arcade";
type SimpleVariable = __esri.SimpleVariable;

const profile = {
    variables: [{
        name: "$feature",
        type: "feature"
    } as SimpleVariable,
    {
        name: "$layer",
        type: "featureSet"
    } as SimpleVariable]
};
export class ArcadeExecutor {

    async evaluateExpressionForLayer(arcadeExpression: string, selectedLayer: FeatureLayer): Promise<string> {

        const executor = await arcade.createArcadeExecutor(arcadeExpression, profile);

        selectedLayer.outFields = executor.fieldsUsed;
        const { features } = await selectedLayer.queryFeatures();

        return executor.execute({
            "$feature": features.at(0),
            "$layer": selectedLayer
        });
    }
}
