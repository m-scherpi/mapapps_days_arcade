<template>
    <div>
        <v-select
            v-model="selectedLayer"
            :items="layerNames"
            label="Layers"
            @change="layerChanged"
        />

        <v-expansion-panel
            v-if="selectedLayer !== '' && fieldNames.length > 0"
        >
            <v-expansion-panel-content>
                <template #header>
                    <div>Possible Fields</div>
                </template>
                <div
                    style="height: 250px; overflow: auto"
                >
                    <ul
                        v-for="(field,i) in fieldNames"
                        :key="i"
                    >
                        <li>{{ field }}</li>
                    </ul>
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-textarea
            v-if="selectedLayer"
            v-model="arcadeExpr"
            label="Arcade Expression"
            placeholder="e.g. $feature.name"
            outline
        />
        <v-btn
            v-if="selectedLayer"
            class="primary"
            round
            block
            @click.stop="evaluateArcade"
        >
            <v-icon>
                icon-app-launch
            </v-icon>
            <span
                class="ml-1"
            >
                Evaluate
            </span>
        </v-btn>
        <v-textarea
            v-if="resultValue && resultValue.length > 0"
            v-model="resultValue"
            outline
            disabled
        />
        <v-btn
            v-if="resultValue && resultValue.length > 0"
            class="primary"
            round
            block
            @click.stop="applyLabel"
        >
            <v-icon>
                icon-sign-success
            </v-icon>
            <span
                class="ml-1"
            >
                Apply to layer
            </span>
        </v-btn>
    </div>
</template>

<script lang="ts">
    import { ref } from "vue";

    export default {

        name: "arcade-executor",
        props: {
            // eslint-disable-next-line vue/require-default-prop
            layerNames: {
                type: Array<string>
            },
            // eslint-disable-next-line vue/require-default-prop
            fieldNames: {
                type: Array<string>
            },
            // eslint-disable-next-line vue/require-default-prop
            resultValue: {
                type: String
            }
        },
        setup(props: any, { emit }: Record<any, any>): Record<any, any>{
            const selectedLayer = ref("");
            const arcadeExpr = ref("");

            const layerChanged = () => {
                emit("layer-change", selectedLayer.value);
            };

            const evaluateArcade = () => {
                emit("evaluate-arcade", arcadeExpr.value);
            };

            const applyLabel = () => {
                emit("apply-label", arcadeExpr.value);
            };

            return {
                selectedLayer,
                arcadeExpr,
                evaluateArcade,
                layerChanged,
                applyLabel
            };
        }
    };
</script>
