const gulp = require("gulp");
const mapapps = require('ct-mapapps-gulp-js');
const isProduction = process.env.NODE_ENV === "production";
console.info(`Configuring gulp build for ${isProduction ? "production" : "development"}`);

const localOverrides = (function () {
    if (isProduction) {
        // Never override defaults in production mode
        return undefined;
    }

    try {
        return require("./gulpfile.overrides");
    } catch (e) {
        // File may not exist
        return undefined;
    }
})();

mapapps.registerTasks({
    /* A detailed description of available setting is available at https://www.npmjs.com/package/ct-mapapps-gulp-js */
    /* a list of themes inside this project */
    compress: isProduction,
    createAPIDoc: localOverrides?.createAPIDoc ?? false,
    rollupBuildMaxWorkers: localOverrides?.rollupBuildMaxWorkers ?? 3,
    rollupConfig: {
        debug: !isProduction
    },
    themes: [],
    /* state that the custom theme will be dependant from map.apps everlasting theme that provides the base styles */
    hasBaseThemes: true,
    /* state that we want to support vuetify components and therefore need the vuetify core styles*/
    hasVuetify: true,
    themeChangeTargets: {
    }
});

gulp.task("default",
    gulp.series(
        "copy-resources",
        "themes-copy",
        gulp.parallel(
            "js-lint",
            //"style-lint",
            "js-transpile",
            "rollup-build",
            "themes-compile"
        )
    )
);

gulp.task("compress",
    gulp.series(
        "default",
        "themes-compress"
    )
);
