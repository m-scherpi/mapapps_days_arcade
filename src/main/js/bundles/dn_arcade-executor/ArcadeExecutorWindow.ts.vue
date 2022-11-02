<template>
    <div>
        <v-alert
            :value="errorMessage.length > 0"
            type="warning"
        >
            {{ errorMessage }}
        </v-alert>
        <v-select
            v-model="selectedLayer"
            :items="layerNames"
            :label="i18n.arcade.layer"
            @change="layerChanged"
        />
        <v-expansion-panel
            v-if="selectedLayer !== '' && fieldNames.length > 0"
            class="mb-4"
        >
            <v-expansion-panel-content>
                <template #header>
                    <div>{{ i18n.arcade.usableFields }}</div>
                </template>
                <div
                    style="height: 250px; overflow: auto"
                >
                    <ul
                        v-for="(field,i) in fieldNames"
                        :key="i"
                    >
                        <li>$feature.{{ field }}</li>
                    </ul>
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-textarea
            v-if="selectedLayer"
            v-model="arcadeExpr"
            :label="i18n.arcade.expressionLabel"
            :placeholder="i18n.arcade.placeholder"
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
                {{ i18n.arcade.evaluate }}
            </span>
        </v-btn>
        <v-textarea
            v-if="resultValue && resultValue.length > 0"
            v-model="resultValue"
            :label="i18n.arcade.resultLabel"
            class="mt-5"
            outline
            disabled
        />
        <v-btn
            v-if="resultValue && resultValue.length > 0"
            class="primary mt-1"
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
                {{ i18n.arcade.apply }}
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
            },
            // eslint-disable-next-line vue/require-default-prop
            i18n: {
                type: Object
            },
            errorMessage: {
                type: String,
                default: ""
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
