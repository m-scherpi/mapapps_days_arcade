/*
 * Copyright (C) con terra GmbH
 */

// TODO: This module is really problematic because node's own "module" is also picked up by the compiler
declare module "module" {
    export const id: string;
}
declare module "require";
