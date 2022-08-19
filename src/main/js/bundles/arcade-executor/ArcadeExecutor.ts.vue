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
                <ul
                    v-for="(field,i) in fieldNames"
                    :key="i"
                >
                    <li>{{ field }}</li>
                </ul>
            </v-expansion-panel-content>
        </v-expansion-panel>
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
            }
        },
        setup(props: any, { emit }: Record<any, any>): Record<any, any>{
            const selectedLayer = ref("");
            const layerChanged = () => {
                emit("layer-change", selectedLayer.value);
            };
            return {
                selectedLayer,
                layerChanged
            };
        }
    };
</script>
