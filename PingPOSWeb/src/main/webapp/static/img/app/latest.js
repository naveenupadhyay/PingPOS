(function() {

function isMobile() {
  var mobile = function(agent) {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4));
  };
  return mobile(navigator.userAgent || navigator.vendor || window.opera);
}

if (isMobile()) {

(function() { var requirejs = { skipDataMain: true };
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.1.11',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite and existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part, length = ary.length;
            for (i = 0; i < length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                        //End of the line. Keep at least one non-dot
                        //path segment at the front so it can be mapped
                        //correctly to disk. Otherwise, there is likely
                        //no path mapping for a path starting with '..'.
                        //This can still fail, but catches the most reasonable
                        //uses of ..
                        break;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI,
                baseParts = baseName && baseName.split('/'),
                normalizedBaseParts = baseParts,
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name && name.charAt(0) === '.') {
                //If have a base name, try to normalize against it,
                //otherwise, assume it is a top-level require that will
                //be relative to baseUrl in the end.
                if (baseName) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = name.split('/');
                    lastIndex = name.length - 1;

                    // If wanting node ID compatibility, strip .js from end
                    // of IDs. Have to do this here, and not in nameToUrl
                    // because node allows either .js or non .js to map
                    // to same file.
                    if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                        name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                    }

                    name = normalizedBaseParts.concat(name);
                    trimDots(name);
                    name = name.join('/');
                } else if (name.indexOf('./') === 0) {
                    // No baseName, so this is ID is resolved relative
                    // to baseUrl, pull off the leading dot.
                    name = name.substring(2);
                }
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);
                context.require([id]);
                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        normalizedName = normalize(name, parentName, applyMap);
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                //Array splice in the values since the context code has a
                //local var ref to defQueue, so cannot just reassign the one
                //on context.
                apsp.apply(defQueue,
                           [defQueue.length, 0].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return  getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if(args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs ? url +
                                        ((url.indexOf('?') === -1 ? '?' : '&') +
                                         config.urlArgs) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError('scripterror', 'Script error for: ' + data.id, evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/jrburke/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/jrburke/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one.
                if (!cfg.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                 //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };

    define.amd = {
        jQuery: true
    };


    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));

define("requireLib", function(){});

(function() {
  define('library/utility/is-mobile',[],function() {
    var mobile;
    mobile = function(agent) {
      return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4));
    };
    return mobile(navigator.userAgent || navigator.vendor || window.opera);
  });

}).call(this);

(function() {
  define('namespace',[],function() {
    var CID, root;
    root = this;
    if (!(CID = root.CID)) {
      CID = root.CID = function() {
        CID.q || (CID.q = []);
        CID.q.push(arguments);
        return CID.l = 1 * new Date;
      };
    }
    if (CID.q == null) {
      CID.q = [];
    }
    if (CID.amd == null) {
      CID.amd = {
        requirejs: requirejs,
        require: require,
        define: define
      };
    }
    return CID;
  });

}).call(this);

(function() {
  define('constants',[],function() {
    return {
      APP: 'chatbar',
      BUFFER: {
        ELEMENT: 'element',
        PADDING: 'padding'
      },
      CALL_STEPS: ['dialing', 'navigating', 'waiting', 'connecting'],
      CAPABILITIES: {
        CHAT: 'http://chatid.com/chat',
        CALLBACK: 'http://chatid.com/callback'
      },
      CHAT_TEXT: {
        NO_AGENTS: 'No agents are currently available',
        NO_CHATID: 'This ChatID does not exist'
      },
      CONN_STATUS: {
        UNTRIED: 'untried',
        PREPARED: 'prepared',
        CONNECTED: 'connected',
        DISCONNECTED: 'disconnected'
      },
      CTA_TYPES: {
        REACTIVE: 'reactive',
        GREETER: 'greeter'
      },
      CTA_DESIGNS: {
        BUTTON: 'button',
        CHAT_WINDOW: 'chat_window',
        CORNER: 'corner'
      },
      DISPLAY: {
        CLOSED: 'closed',
        MINIMIZED: 'minimized',
        EXPANDED: 'expanded',
        POPPED: 'popped'
      },
      KEYS: {
        ENTER: 13,
        ESCAPE: 27
      },
      INFO_MESSAGES: {
        JOIN: 'join',
        END: 'end',
        CALL: 'call'
      },
      LOG_LEVELS: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        LOG: 3,
        DEBUG: 4
      },
      MESSAGE_TYPES: {
        BUBBLE: 'bubble',
        INFO: 'info'
      },
      PAGE_TYPES: {
        GLOBAL: 'global',
        PDP: 'pdp',
        RECEIPT: 'receipt'
      },
      SCREENS: {
        CHAT_SCREENS: 'chat_screens',
        CALLBACK_SCREENS: 'callback_screens',
        WELCOME: 'welcome',
        CONNECTING: 'connecting',
        CONVERSATION: 'conversation',
        CALL_STATUS: 'call_status',
        REQUEST_END: 'request_end',
        FEEDBACK: 'feedback',
        THANKS: 'thanks',
        ERROR: 'error'
      },
      STORE: {
        ALL_CONNECTIONS: 'cid_conns',
        CONSUMER_ID: 'cid_csid',
        SESSION_ID: 'cid_session',
        LOGGING: 'cid_log',
        CTA_HISTORY: 'cid_ctas',
        PREVIEW: 'cid_preview',
        LAST_VIZ: 'cid_f_viz',
        STATE: 'cid_f_state'
      },
      TOGGLE: {
        ACTIVATE: 'activate',
        DEACTIVATE: 'deactivate'
      },
      WHO: {
        AGENT: 'agent',
        SYSTEM: 'system',
        USER: 'user'
      },
      XMPP_MESSAGE: {
        CHAT: 'chat',
        ERROR: 'error',
        GONE: 'gone',
        NOTICE: 'notice'
      }
    };
  });

}).call(this);

(function() {
  var __slice = [].slice;

  define('embed/utility',[],function() {
    return {
      pick: function() {
        var key, keys, obj, picked, _i, _len;
        obj = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        picked = {};
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          picked[key] = obj[key];
        }
        return picked;
      }
    };
  });

}).call(this);

(function() {
  var __slice = [].slice;

  define('library/logging/console',['constants'], function(_arg) {
    var Console, LOG_LEVELS, formatLogMessage, isObject, logStyles, method, _fn, _i, _len, _ref;
    LOG_LEVELS = _arg.LOG_LEVELS;
    logStyles = function(color) {
      return "padding: 0 2px;\nborder-radius: 3px;\nbackground-color: " + color + ";\ncolor: #000";
    };
    isObject = function(obj) {
      return obj === Object(obj);
    };
    formatLogMessage = function(args) {
      var arg;
      return ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          if (isObject(arg)) {
            _results.push(JSON.stringify(arg));
          } else {
            _results.push(arg);
          }
        }
        return _results;
      })()).join(' ');
    };
    Console = (function() {
      function Console(_arg1) {
        var _ref;
        _ref = _arg1 != null ? _arg1 : {}, this.logLevel = _ref.logLevel, this.name = _ref.name, this.color = _ref.color;
        if (this.name == null) {
          this.name = 'chatbar';
        }
        if (this.color == null) {
          this.color = '#74c780';
        }
        if (this.logLevel == null) {
          this.logLevel = LOG_LEVELS.INFO;
        }
      }

      Console.prototype.tryLog = function(method, styles, args) {
        var message, prefix;
        if (typeof console === 'undefined') {
          return;
        }
        if (this.logLevel < LOG_LEVELS[method.toUpperCase()]) {
          return;
        }
        try {
          return console[method].apply(console, ["%c" + this.name + " " + method, styles].concat(__slice.call(args)));
        } catch (_error) {
          prefix = "" + this.name + " " + method + "\t";
          message = formatLogMessage(args);
          if (console[method]) {
            return console[method](prefix, message);
          } else {
            return console.log(prefix, message);
          }
        }
      };

      return Console;

    })();
    _ref = ['debug', 'log', 'info', 'warn', 'error'];
    _fn = function(method) {
      return Console.prototype[method] = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return this.tryLog(method, logStyles(this.color), args);
      };
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      method = _ref[_i];
      _fn(method);
    }
    return Console;
  });

}).call(this);

/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define('domready',definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})
;
/*
    json2.js
    2014-02-04

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) define('json2', factory);
  else root.JSON = factory();
}(this, function() {
    

    var JSON = {};

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }

    return JSON;

}));

(function() {
  define('library/logging/pixel',['domready', 'constants', 'json2'], function(domready, _arg, JSON) {
    var APP, PixelLogger, setAttr;
    APP = _arg.APP;
    setAttr = function(el, attr, value) {
      if (el.setAttribute) {
        return el.setAttribute(attr, value);
      } else {
        return el[attr] = value;
      }
    };
    return PixelLogger = (function() {
      function PixelLogger(options) {
        if (options == null) {
          options = {};
        }
        this.console = options.console, this.channel = options.channel, this.csid = options.csid, this.appVersion = options.appVersion, this.pixelUrl = options.pixelUrl, this.debugMode = options.debugMode;
      }

      PixelLogger.prototype.track = function(code, properties) {
        var data, encoded, img,
          _this = this;
        if (properties == null) {
          properties = {};
        }
        data = {
          channel: this.channel,
          csid: this.csid,
          app: APP,
          app_version: this.appVersion,
          timestamp: +(new Date) / 1000,
          code: code,
          properties: properties
        };
        if (this.debugMode) {
          this.console.debug('[pixel event blocked]', data);
          return;
        }
        encoded = encodeURIComponent(JSON.stringify(data));
        img = document.createElement('img');
        setAttr(img, 'src', "" + this.pixelUrl + "?data=" + encoded);
        setAttr(img, 'width', 1);
        setAttr(img, 'height', 1);
        img.style.display = 'none';
        return domready(function() {
          document.body.appendChild(img);
          return _this.console.debug('[pixel event sent]', data);
        });
      };

      return PixelLogger;

    })();
  });

}).call(this);

(function() {
  define('library/logging/bug-net',['namespace'], function(CID) {
    var BugNet;
    return BugNet = (function() {
      function BugNet(_arg) {
        var onError,
          _this = this;
        this.scriptHost = _arg.scriptHost, this.pixel = _arg.pixel, this.internals = _arg.internals, this.debugMode = _arg.debugMode;
        if (this.debugMode) {
          return;
        }
        require.config({
          enforceDefine: true
        });
        onError = window.onerror;
        window.onerror = function(message, url, line, character) {
          var data, e, trace;
          if (url.indexOf(_this.scriptHost) >= 0) {
            trace = "" + url + ":" + line;
            if (character) {
              trace += ":" + character;
            }
            data = {
              message: message,
              trace: trace
            };
            data.internals = (function() {
              try {
                return this.internals();
              } catch (_error) {
                e = _error;
                return e;
              }
            }).call(_this);
            CID.console.warn(data);
            _this.pixel.track('exception', data);
          }
          return typeof onError === "function" ? onError.apply(null, arguments) : void 0;
        };
        require.onError = function(error) {
          var data;
          data = {
            name: error.name,
            message: error.message,
            stack: error.stack
          };
          CID.console.warn(data);
          return _this.pixel.track('requirejs_error', data);
        };
      }

      return BugNet;

    })();
  });

}).call(this);

(function() {
  define('helpers/configure',['constants'], function(_arg) {
    var LOG_LEVELS, checkDebugMode;
    LOG_LEVELS = _arg.LOG_LEVELS;
    checkDebugMode = function() {
      if (typeof localStorage !== "undefined" && localStorage !== null ? localStorage.getItem('IM_CHATID') : void 0) {
        return true;
      } else if (window.location.search.indexOf('cid_debug') !== -1) {
        if (typeof localStorage !== "undefined" && localStorage !== null) {
          localStorage.setItem('IM_CHATID', true);
        }
        return true;
      } else {
        return false;
      }
    };
    return function(config, overrides, options) {
      var debugMode, key, value, _ref;
      if (options == null) {
        options = {};
      }
      for (key in overrides) {
        value = overrides[key];
        config[key] = value;
      }
      if (options.pageData) {
        config.PAGE_DATA = options.pageData;
      }
      if (options.popupPath) {
        config.POPUP_PATH = options.popupPath;
      }
      if (options.popupChatId) {
        config.POPUP_CHATID = options.popupChatId;
      }
      _ref = options.__backdoor;
      for (key in _ref) {
        value = _ref[key];
        config[key] = value;
      }
      if (debugMode = checkDebugMode()) {
        config.DEBUG_MODE = debugMode;
      }
      if (config.DEBUG_MODE) {
        config.LOG_LEVEL = Math.max(config.LOG_LEVEL, LOG_LEVELS.DEBUG);
      }
      if (config.PREVIEW_MODE) {
        return config.LOG_LEVEL = Math.max(config.LOG_LEVEL, LOG_LEVELS.INFO);
      }
    };
  });

}).call(this);

(function() {
  define('helpers/short-circuit',['namespace'], function(CID) {
    return function() {
      var e, ie, ua;
      if (location.search.match(/cid_disable/) && !CID.enable) {
        return 'cid_disable';
      }
      if (CID.loaded) {
        return 'already_loaded';
      }
      if (((function() {
        try {
          return window.self !== window.top;
        } catch (_error) {
          e = _error;
          return true;
        }
      })())) {
        return 'child_window';
      }
      CID.loaded = true;
      window.cidNoConflict = true;
      ua = navigator.userAgent;
      ie = 0;
      if (/MSIE/.test(ua)) {
        ie = parseInt(/MSIE \d+[.]\d+/.exec(ua)[0].split(' ')[1], 10);
      } else if (/Trident/.test(ua)) {
        ie = parseInt(/rv:\d+[.]\d+/.exec(ua)[0].split(':')[1], 10);
      }
      if (ie && ie < 7) {
        return 'less_than_ie7';
      }
    };
  });

}).call(this);

define('text',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});
define('json',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

define("json!embed/../../config.json", function(){ return {
  "MAIN_BASE_URL": "http://127.0.0.1:8000/build/main/stable/latest",
  "MAIN_VERSION": "latest",
  "EMBED_BASE_URL": "http://127.0.0.1:8000/build/embed",
  "EMBED_VERSION": "4ccac7f",
  "SCRIPT_HOST": "127.0.0.1:8000",
  "BOSH_URL": "https://muc-chat.api.chatid.com/http-bind",
  "CALLBACK_BASE_URL": "https://fc.chatid.com/api/v2",
  "DIRECTORY_URL": "https://directory.chatid.com/chatids",
  "LOGGING_HOST": "https://ls.chatid.com",
  "BEHAVIOR_RENDER_DEBOUNCE": 50,
  "BEHAVIOR_START_CHAT_TIMEOUT": 180000,
  "BEHAVIOR_STRETCH_FOOTER": "element",
  "BEHAVIOR_TYPING_DELAY": 1000,
  "BEHAVIOR_PROMPT_CHANNEL": true,
  "BEHAVIOR_PROMPT_CHATID": false,
  "BOSH_CHECK_CONNECTION_INTERVAL": 5000,
  "BOSH_MAX_ALIASES": 10,
  "BOSH_SESSION_VARIABLE": "u",
  "CALLBACK_POLL_INTERVAL": 5000,
  "CAMPAIGN_ACTIONS_ENABLED": true,
  "CHANNEL_ACTIONS": [],
  "CHANNEL_BASE_DOMAIN": null,
  "CHANNEL_CAMPAIGNS": [],
  "CHANNEL_CTAS": [],
  "CHANNEL_NAME": "demo.chatbar",
  "CHANNEL_POSTCHAT_SURVEY": true,
  "CHANNEL_PRECHAT_SURVEY": [],
  "CHANNEL_TITLE": "ChatID",
  "DEBUG_MODE": false,
  "LOG_LEVEL": 2,
  "DIRECTORY_FETCH_DEBOUNCE": 500,
  "DIRECTORY_OVERRIDE": {},
  "DISCOVERY_MAP": {},
  "LOGGING_RETRY_LIMIT": 10,
  "LOGGING_FLUSH_INTERVAL": 4000,
  "LOGGING_ENABLED": false,
  "LOGGING_SHARE": true,
  "PREVIEW_MODE": false,
  "POPUP_AUTO_CHAT": false,
  "POPUP_CHATID": null,
  "POPUP_ONLY": false,
  "POPUP_PATH": "",
  "STYLE_COLOR_BUTTON": "#77c682",
  "STYLE_COLOR_MAIN": "#77c682",
  "STYLE_CUSTOM_CSS": "",
  "UI_AGENT_NAME_DEFAULT": "Agent",
  "UI_ANIMATE_MINIMIZE": true,
  "UI_BUDDY_LIST_DOCKED": false,
  "UI_BUDDY_LIST_ENABLED": true,
  "UI_BUDDY_LIST_SIDE": "right",
  "UI_DOCK_ENABLED": true,
  "UI_DOCK_TAB_SHARP_CORNERS": false,
  "UI_SHOW_AGENT_NICK": false,
  "UI_WINDOW_FLEX_WIDTH": false,
  "UI_WINDOW_HEIGHT": 275,
  "UI_WINDOW_BUFFER": 172,
  "UI_WINDOW_SIDE": "right"
};});

(function() {
  define('embed/embed',['namespace', 'constants', 'embed/utility', 'library/logging/console', 'library/logging/pixel', 'library/logging/bug-net', 'helpers/configure', 'helpers/short-circuit', 'json!../../config.json'], function(CID, _arg, _arg1, Console, PixelLogger, BugNet, configure, shortCircuit, defaultConfig) {
    var Embed, STORE, pick;
    STORE = _arg.STORE;
    pick = _arg1.pick;
    return Embed = (function() {
      function Embed(implementation) {
        this.implementation = implementation;
        configure(this.config, this.implementation.config, CID.options);
        this.initialize();
      }

      Embed.prototype.initialize = function() {
        var bugNet, console, pixel, reason,
          _this = this;
        console = CID.console = new Console({
          logLevel: this.config.LOG_LEVEL,
          name: 'chatid',
          color: '#74c780'
        });
        pixel = new PixelLogger({
          console: console,
          channel: this.config.CHANNEL_NAME,
          csid: 'not_available',
          appVersion: 'not_available',
          pixelUrl: "" + this.config.LOGGING_HOST + "/p.gif",
          debugMode: this.config.DEBUG_MODE
        });
        if (Math.random() <= 0.01) {
          pixel.track('config_load', {
            latency: +(new Date) - CID.l
          });
        }
        bugNet = new BugNet({
          scriptHost: this.config.SCRIPT_HOST,
          pixel: pixel,
          internals: (function() {}),
          debugMode: this.config.DEBUG_MODE
        });
        if (reason = shortCircuit()) {
          pixel.track(reason);
          return;
        }
        require.config({
          paths: {
            initialize: "" + this.config.MAIN_BASE_URL + "/initialize"
          }
        });
        CID.l = +(new Date);
        return require(['initialize'], function(initialize) {
          var config, _base, _base1;
          if (typeof (_base = _this.implementation).onLoad === "function") {
            _base.onLoad();
          }
          config = initialize({
            config: _this.config,
            pixel: pixel,
            bugNet: bugNet
          });
          return typeof (_base1 = _this.implementation).onInitialize === "function" ? _base1.onInitialize(config) : void 0;
        });
      };

      Embed.prototype.config = pick(defaultConfig, 'CHANNEL_NAME', 'DEBUG_MODE', 'LOGGING_HOST', 'LOG_LEVEL', 'MAIN_BASE_URL', 'SCRIPT_HOST', 'EMBED_BASE_URL', 'EMBED_VERSION');

      return Embed;

    })();
  });

}).call(this);

(function() {
  define('embed/instance',['library/utility/is-mobile', 'embed/embed'], function(isMobile, Embed) {
    if (isMobile) {
      return require(['implementation/mobile'], function(MobileImplementation) {
        return new Embed(new MobileImplementation);
      });
    } else {
      return require(['implementation/desktop'], function(DesktopImplementation) {
        return new Embed(new DesktopImplementation);
      });
    }
  });

}).call(this);


define('text!embed/channels/walmart/desktop/cta-pdp-001.jst',[],function () { return '<span class=\'cta-prompt pull-left\'>\n  Have questions about this product?\n  <% if (this.label.length < 10) { print("Get certified assistance."); } %>\n</span>\n<button class=\'btn pull-right\' data-ref=\'button\'>\n  <img src=\'https://chatidcdn.com/assets/generic/icon-bubble-white.png\' />\n  Chat with <%= this.label %>\n</button>\n';});


define('text!embed/channels/walmart/desktop/cta-pdp-ribbon.jst',[],function () { return '<span data-ref=\'button\'>\n  <img src=\'https://chatidcdn.com/assets/generic/icon-bubble-white.png\' />\n  Chat Available\n</span>\n';});


define('text!embed/channels/walmart/mobile/cta-pdp-mobile.jst',[],function () { return '<div class=\'ResponsiveContainer\'>\n    <div class="Grid-col slide-panel-trigger about-product-section" style="padding:8px 0 12px 0">\n        <h2 class="heading-a">CHAT with <%- ctx.name %></h2>\n        <p class="about-item-preview-text" style="padding:0 0 12px 0">A certified Expert from <%- ctx.name %> is ready to assist you.</p>\n        <button class="btn btn-block" ref="button" >\n            <span style="font-size:20px">\n                Chat with <%- ctx.article %> <%- ctx.name %> Expert\n            </span>\n        </button>\n    </div>\n</div>\n';});


define('text!embed/channels/walmart/mobile/cta-pdp-mobile-ribbon.jst',[],function () { return '<span class="js-price-flag flag flag-special-buy hide-content display-block" ref="button"><%- ctx.name %> chat available</span>\n';});

(function() {
  define('embed/channels/walmart/common/config',['text!embed/channels/walmart/desktop/cta-pdp-001.jst', 'text!embed/channels/walmart/desktop/cta-pdp-ribbon.jst', 'text!embed/channels/walmart/mobile/cta-pdp-mobile.jst', 'text!embed/channels/walmart/mobile/cta-pdp-mobile-ribbon.jst'], function(pdpCTA001, pdpCTARibbon, pdpCTAMobile, pdpCTAMobileRibbon) {
    return {
      CHANNEL_CTAS: [
        {
          id: 'walmart-cta001',
          description: "Blue button below product title and ratings",
          type: 'reactive',
          design: 'button',
          options: {
            container: '#chatid-cta-pdp',
            template: pdpCTA001
          }
        }, {
          id: 'walmart-cta002',
          description: "Blue ribbon in ribbon area next to price",
          type: 'reactive',
          design: 'button',
          options: {
            container: '#chatid-cta-pdp-ribbon',
            template: pdpCTARibbon
          }
        }, {
          id: 'walmart-cta003',
          description: "Mobile CTA",
          type: 'reactive',
          design: 'button',
          options: {
            container: '#chatid-cta-mobile',
            template: pdpCTAMobile
          }
        }, {
          id: 'walmart-cta004',
          description: "Mobile Ribbon CTA",
          type: 'reactive',
          design: 'button',
          options: {
            container: '#chatid-cta-mobile-ribbon',
            template: pdpCTAMobileRibbon
          }
        }, {
          id: 'walmart-cta999',
          description: "IT'S CTA999!!!",
          type: 'reactive',
          design: 'button',
          options: {
            container: '#chatid-cta-pdp',
            template: ""
          }
        }
      ],
      CHANNEL_ACTIONS: [
        {
          id: 'walmart-action001',
          description: "primary pdp cta",
          app: 'desktop',
          method: 'ctas.insert',
          options: {
            cta_id: 'walmart-cta001'
          }
        }, {
          id: 'walmart-action002',
          description: "ribbon pdp cta",
          app: 'desktop',
          method: 'ctas.insert',
          options: {
            cta_id: 'walmart-cta002'
          }
        }, {
          id: 'walmart-action003',
          description: "mobile cta",
          app: 'mobile',
          method: 'ctas.insert',
          options: {
            cta_id: 'walmart-cta003'
          }
        }, {
          id: 'walmart-action004',
          description: "mobile ribbon cta",
          app: 'mobile',
          method: 'ctas.insert',
          options: {
            cta_id: 'walmart-cta004'
          }
        }
      ],
      CHANNEL_CAMPAIGNS: [
        {
          id: 'walmart-campaign001',
          description: "samsung pdp chat",
          targets: [
            {
              operation: 'deactivate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'Samsung',
                  tags: 'Phone|Printer|Laptop|Computer Accessories|Monitor'
                }
              }
            }, {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'Samsung',
                  tags: 'TV|Tablet|Video|Audio|Theater|Speaker'
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'samsung'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'samsung'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'samsung'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'samsung'
              }
            }
          ]
        }, {
          id: 'walmart-campaign002',
          description: "dyson pdp chat",
          targets: [
            {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'Dyson'
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'dyson'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'dyson'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'dyson'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'dyson'
              }
            }
          ]
        }, {
          id: 'walmart-campaign003',
          description: "southshore pdp chat",
          targets: [],
          actions: []
        }, {
          id: 'walmart-campaign004',
          description: "monster pdp chat",
          targets: [
            {
              operation: 'deactivate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'Monster High|Monster Moto'
                }
              }
            }, {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'Monster',
                  tags: 'Electronics'
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'monsterproducts'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'monsterproducts'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'monsterproducts'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'monsterproducts'
              }
            }
          ]
        }, {
          id: 'walmart-campaign006',
          description: "hp pdp chat",
          targets: [
            {
              operation: 'deactivate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'HP',
                  tags: 'Accessories'
                }
              }
            }, {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'HP',
                  tags: 'Printers|Desktop Computers|Laptop'
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'hp'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'hp'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'hp'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'hp'
              }
            }
          ]
        }, {
          id: 'walmart-campaign007',
          description: "dell pdp chat",
          targets: [
            {
              operation: 'deactivate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: '^Dell$',
                  tags: 'Bedding',
                  name: 'Refurbish|Latitude|\bBed\b|\bBedding\b'
                }
              }
            }, {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: '^Dell$'
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'dell'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'dell'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'dell'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'dell'
              }
            }
          ]
        }, {
          id: 'walmart-campaign005',
          description: "Intel pdp chat",
          targets: [],
          actions: []
        }, {
          id: 'walmart-campaign008',
          description: "Electrolux pdp chat",
          targets: [
            {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  name: 'Electrolux',
                  model: "FPSC07K5NS|FPTT02D7MS|FPTT04D7MS|FPDC12D7MS|FPTC10D7NS|FPKT58D7NS|FPJB56B7MS|FPPG12K7MS|FPCO06D7MS|EL4650A|EL4305AZ|EL4300B|EL4040A|EL4071A|EL3000A|EL1030A|EL1022A|EL1010A|EL1064A|EL1014A|EL500AZ|ELAP15D7PW|ELAP45D8PW|AS3401A|955A|AS3101A|8711AZ|AS1101B|4870MZ|3500AE|AS1061A|AS1051A|AS1041A|990A|AS3011A|1934B|3684F|AS3001A|439AZ|AS2011A|3670G|AS2000A|80A|41A|71B|313A|30A|AS100B|169D|66699A\-4|69900A\-4|69944\-4|69955A\-4|63034|63006|63025|63027|63028|63029|68306|63030|63031|63032|63035|64521|64522|64523|64526|64524|64525|68303|68304|68305|68307|62630F\-2|62647F\-2|62632F\-4|62963F\-2|62636D\-2|66643F\-2|64221D\-2|69116D\-4|62640F\-2|62637F\-2|62653F\-2|64912\-2|68990|68991|68992|69996|EL023|EL024|62607\-6|62609\-6|62645D\-2|62461|62642D\-4|AS2003PAB|AS2003FUF|4703F|4704RES|AS2001FUF|AS2001TIS|AS2002PMA|AS2002TLU|150A|470AZ|4773AZ|96JZ|5403A|R4870K|431DX|5400A|3281AZ|3276BVZ|AS1049A|AS1000A|AS1050A|AS1055AX|EL1000B|EL1019A|EL2003A|EL8501AZ|EL8502F|EL4101A|EL8602A|EL4042A"
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'electrolux'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'electrolux'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'electrolux'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'electrolux'
              }
            }
          ]
        }, {
          id: 'walmart-campaign009',
          description: "Arm & Hammer pdp chat",
          targets: [
            {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  name: 'Arm & Hammer',
                  model: "FPSC07K5NS|FPTT02D7MS|FPTT04D7MS|FPDC12D7MS|FPTC10D7NS|FPKT58D7NS|FPJB56B7MS|FPPG12K7MS|FPCO06D7MS|EL4650A|EL4305AZ|EL4300B|EL4040A|EL4071A|EL3000A|EL1030A|EL1022A|EL1010A|EL1064A|EL1014A|EL500AZ|ELAP15D7PW|ELAP45D8PW|AS3401A|955A|AS3101A|8711AZ|AS1101B|4870MZ|3500AE|AS1061A|AS1051A|AS1041A|990A|AS3011A|1934B|3684F|AS3001A|439AZ|AS2011A|3670G|AS2000A|80A|41A|71B|313A|30A|AS100B|169D|66699A\-4|69900A\-4|69944\-4|69955A\-4|63034|63006|63025|63027|63028|63029|68306|63030|63031|63032|63035|64521|64522|64523|64526|64524|64525|68303|68304|68305|68307|62630F\-2|62647F\-2|62632F\-4|62963F\-2|62636D\-2|66643F\-2|64221D\-2|69116D\-4|62640F\-2|62637F\-2|62653F\-2|64912\-2|68990|68991|68992|69996|EL023|EL024|62607\-6|62609\-6|62645D\-2|62461|62642D\-4|AS2003PAB|AS2003FUF|4703F|4704RES|AS2001FUF|AS2001TIS|AS2002PMA|AS2002TLU|150A|470AZ|4773AZ|96JZ|5403A|R4870K|431DX|5400A|3281AZ|3276BVZ|AS1049A|AS1000A|AS1050A|AS1055AX|EL1000B|EL1019A|EL2003A|EL8501AZ|EL8502F|EL4101A|EL8602A|EL4042A"
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'armhammer'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'armhammer'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'armhammer'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'armhammer'
              }
            }
          ]
        }, {
          id: 'walmart-campaign010',
          description: "Frigidaire pdp chat",
          targets: [
            {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  name: 'Frigidaire',
                  model: "FPSC07K5NS|FPTT02D7MS|FPTT04D7MS|FPDC12D7MS|FPTC10D7NS|FPKT58D7NS|FPJB56B7MS|FPPG12K7MS|FPCO06D7MS|EL4650A|EL4305AZ|EL4300B|EL4040A|EL4071A|EL3000A|EL1030A|EL1022A|EL1010A|EL1064A|EL1014A|EL500AZ|ELAP15D7PW|ELAP45D8PW|AS3401A|955A|AS3101A|8711AZ|AS1101B|4870MZ|3500AE|AS1061A|AS1051A|AS1041A|990A|AS3011A|1934B|3684F|AS3001A|439AZ|AS2011A|3670G|AS2000A|80A|41A|71B|313A|30A|AS100B|169D|66699A\-4|69900A\-4|69944\-4|69955A\-4|63034|63006|63025|63027|63028|63029|68306|63030|63031|63032|63035|64521|64522|64523|64526|64524|64525|68303|68304|68305|68307|62630F\-2|62647F\-2|62632F\-4|62963F\-2|62636D\-2|66643F\-2|64221D\-2|69116D\-4|62640F\-2|62637F\-2|62653F\-2|64912\-2|68990|68991|68992|69996|EL023|EL024|62607\-6|62609\-6|62645D\-2|62461|62642D\-4|AS2003PAB|AS2003FUF|4703F|4704RES|AS2001FUF|AS2001TIS|AS2002PMA|AS2002TLU|150A|470AZ|4773AZ|96JZ|5403A|R4870K|431DX|5400A|3281AZ|3276BVZ|AS1049A|AS1000A|AS1050A|AS1055AX|EL1000B|EL1019A|EL2003A|EL8501AZ|EL8502F|EL4101A|EL8602A|EL4042A"
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'frigidaire'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'frigidaire'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'frigidaire'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'frigidaire'
              }
            }
          ]
        }, {
          id: 'walmart-campaign011',
          description: "Eureka pdp chat",
          targets: [
            {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  name: 'Eureka',
                  model: "^980B$|^169J$|FPSC07K5NS|FPTT02D7MS|FPTT04D7MS|FPDC12D7MS|FPTC10D7NS|FPKT58D7NS|FPJB56B7MS|FPPG12K7MS|FPCO06D7MS|EL4650A|EL4305AZ|EL4300B|EL4040A|EL4071A|EL3000A|EL1030A|EL1022A|EL1010A|EL1064A|EL1014A|EL500AZ|ELAP15D7PW|ELAP45D8PW|AS3401A|955A|AS3101A|8711AZ|AS1101B|4870MZ|3500AE|AS1061A|AS1051A|AS1041A|990A|AS3011A|1934B|3684F|AS3001A|439AZ|AS2011A|3670G|AS2000A|80A|41A|71B|313A|30A|AS100B|169D|66699A\-4|69900A\-4|69944\-4|69955A\-4|63034|63006|63025|63027|63028|63029|68306|63030|63031|63032|63035|64521|64522|64523|64526|64524|64525|68303|68304|68305|68307|62630F\-2|62647F\-2|62632F\-4|62963F\-2|62636D\-2|66643F\-2|64221D\-2|69116D\-4|62640F\-2|62637F\-2|62653F\-2|64912\-2|68990|68991|68992|69996|EL023|EL024|62607\-6|62609\-6|62645D\-2|62461|62642D\-4|AS2003PAB|AS2003FUF|4703F|4704RES|AS2001FUF|AS2001TIS|AS2002PMA|AS2002TLU|150A|470AZ|4773AZ|96JZ|5403A|R4870K|431DX|5400A|3281AZ|3276BVZ|AS1049A|AS1000A|AS1050A|AS1055AX|EL1000B|EL1019A|EL2003A|EL8501AZ|EL8502F|EL4101A|EL8602A|EL4042A"
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'eureka'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'eureka'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'eureka'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'eureka'
              }
            }
          ]
        }, {
          id: 'walmart-campaign012',
          description: "LG pdp chat",
          targets: [
            {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: '^LG$'
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'lg'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'lg'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'lg'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'lg'
              }
            }
          ]
        }, {
          id: 'walmart-campaign013',
          description: "Lenovo pdp chat",
          targets: [
            {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'Lenovo'
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'lenovo'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'lenovo'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'lenovo'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'lenovo'
              }
            }
          ]
        }, {
          id: 'walmart-campaign014',
          description: "Magic Chef pdp chat",
          targets: [
            {
              operation: 'activate',
              rules: {
                page_type: 'pdp',
                metadata: {
                  brand: 'Magic Chef'
                }
              }
            }
          ],
          actions: [
            {
              id: 'walmart-action001',
              options: {
                target: 'magicchef'
              }
            }, {
              id: 'walmart-action002',
              options: {
                target: 'magicchef'
              }
            }, {
              id: 'walmart-action003',
              options: {
                target: 'magicchef'
              }
            }, {
              id: 'walmart-action004',
              options: {
                target: 'magicchef'
              }
            }
          ]
        }
      ],
      CHANNEL_BASE_DOMAIN: 'walmart.com',
      CHANNEL_TITLE: 'Walmart',
      CHANNEL_POSTCHAT_SURVEY: true,
      LOGGING_ENABLED: true,
      STYLE_COLOR_MAIN: '#007DC6'
    };
  });

}).call(this);

(function() {
  define('embed/channels/walmart/common/utils',[],function() {
    return {
      getPDPData: function() {
        var $, brand, buyingOptions, currency, el, merchant_sku, model, name, productData, sale_price, strOrNull, tags, unit_price, _ref, _ref1, _ref2, _ref3;
        $ = window.jQuery;
        strOrNull = function(val) {
          if (val) {
            return "" + val;
          } else {
            return null;
          }
        };
        productData = window.require('product/data');
        buyingOptions = productData.buyingOptions || {};
        brand = (_ref = productData.analyticsData) != null ? _ref.brand : void 0;
        name = productData.productName;
        merchant_sku = strOrNull(buyingOptions.usItemId);
        model = $.trim($('.js-product-specs .main-table tr:contains("Model No") td:last-child').text() || $('meta[itemprop=model]').attr('content'));
        sale_price = strOrNull((_ref1 = buyingOptions.price) != null ? _ref1.currencyAmount : void 0);
        unit_price = strOrNull(((_ref2 = buyingOptions.wasPrice) != null ? _ref2.currencyAmount : void 0) || sale_price);
        currency = strOrNull((_ref3 = buyingOptions.price) != null ? _ref3.currencyUnit : void 0);
        tags = (function() {
          var _i, _len, _ref4, _results;
          _ref4 = $('.breadcrumb-list-mini a');
          _results = [];
          for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
            el = _ref4[_i];
            _results.push($.trim($(el).text()));
          }
          return _results;
        })();
        return {
          brand: brand,
          name: name,
          merchant_sku: merchant_sku,
          model: model,
          unit_price: unit_price,
          sale_price: sale_price,
          currency: currency,
          tags: tags
        };
      }
    };
  });

}).call(this);

(function() {
  var __slice = [].slice;

  define('library/utility/extend',[],function() {
    return function() {
      var key, obj, source, sources, val, _i, _len;
      obj = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = sources.length; _i < _len; _i++) {
        source = sources[_i];
        for (key in source) {
          val = source[key];
          obj[key] = val;
        }
      }
      return obj;
    };
  });

}).call(this);

(function() {
  define('library/utility/anticipate',[],function() {
    var anticipate;
    return anticipate = function(options, tries) {
      var attempts, condition, fail, interval, progress, success;
      if (tries == null) {
        tries = 0;
      }
      condition = options.condition, progress = options.progress, fail = options.fail, success = options.success, interval = options.interval, attempts = options.attempts;
      if (++tries >= attempts) {
        return fail();
      }
      if (condition()) {
        return success();
      } else {
        progress(tries);
        return setTimeout(function() {
          return anticipate(options, tries);
        }, interval);
      }
    };
  });

}).call(this);

(function() {
  define('embed/channels/walmart/beacon-pixels',[],function() {
    var beaconPixels, e;
    e = encodeURIComponent;
    return beaconPixels = {
      'samsung': function(csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/vm/ttap.gif?id=10694189&brand=Samsung&chatidid=" + (e(csid)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\"/>";
      },
      'dyson': function(csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/vm/ttap.gif?id=10694190&brand=Dyson&chatidid=" + (e(csid)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\"/>";
      },
      'southshorefurniture': function(csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/vm/ttap.gif?id=10694195&brand=South%20Shore%20Furniture&chatidid=" + (e(csid)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\"/>";
      },
      'impression': function(itemId, csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/chat-widget.gif?async=1&itemId=" + (e(itemId)) + "&chatId=" + (e(csid)) + "&u=chatAvailableShown&r=" + (e(location.href)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\" />";
      },
      'interaction': function(itemId, csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/chat-widget.gif?async=1&itemId=" + (e(itemId)) + "&chatId=" + (e(csid)) + "&u=chatAvailableInteracted&r=" + (e(location.href)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\" />";
      }
    };
  });

}).call(this);

define('css',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

define("css!embed/channels/walmart/desktop/style",function(){return (function() {var cssText = '#chatid-cta-pdp {\n  font-size: 14px;\n  overflow: hidden;\n  margin-top: 10px;\n}\n#chatid-cta-pdp img,\n#chatid-cta-pdp-ribbon img {\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 0.3em;\n  margin-top: -2px;\n}\n#chatid-cta-pdp .cta-prompt {\n  margin-top: 4px;\n}\n#chatid-cta-pdp .btn {\n  height: 30px;\n  font-size: 14px;\n  padding: 0 10px;\n  line-height: 30px;\n  font-weight: 600;\n}\n#chatid-cta-pdp-ribbon {\n  cursor: pointer;\n  background: #007dc6 !important;\n}\n#chatid-cta-pdp-ribbon.cidf-hide {\n  background: transparent !important;\n}\n#chatid-cta-pdp-ribbon img {\n  width: 12px;\n  height: 12px;\n}\n.price-flags {\n  position: relative;\n  z-index: 2;\n}\n.lt-ie9 #chatid-cta-pdp .btn {\n  padding-left: 30px;\n}\n.lt-ie9 #chatid-cta-pdp img {\n  margin-left: -20px;\n}\n.lt-ie9 #chatid-cta-pdp-ribbon {\n  padding-left: 26px;\n}\n.lt-ie9 #chatid-cta-pdp-ribbon img {\n  margin-left: -16px;\n}\n';var __s = document.createElement('style');__s.setAttribute('type', 'text/css');(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(__s);if (__s.styleSheet) {__s.styleSheet.cssText = cssText;} else {__s.appendChild(document.createTextNode(cssText));}})();});
(function() {
  define('implementation/desktop',['namespace', 'embed/channels/walmart/common/config', 'embed/channels/walmart/common/utils', 'library/utility/extend', 'library/utility/anticipate', 'embed/channels/walmart/beacon-pixels', 'css!embed/channels/walmart/desktop/style'], function(CID, config, extend, anticipate, beaconPixels, customCss) {
    var WalmartDesktopImplementation;
    return WalmartDesktopImplementation = (function() {
      function WalmartDesktopImplementation() {}

      WalmartDesktopImplementation.prototype.config = extend(config, {
        CHANNEL_NAME: 'walmart',
        STYLE_CUSTOM_CSS: customCss
      });

      WalmartDesktopImplementation.prototype.support = function(config) {
        var continueWithProductData, verifyProductData;
        if (config.POPUP_CHATID) {
          return;
        }
        U.hookEvents();
        continueWithProductData = function() {
          var $, $priceFlags, $productSubhead, product, productData;
          $ = CID.amd.require('jquery');
          productData = window.require('product/data');
          if (productData.analyticsData.pageType !== 'ProductPage') {
            return CID.chatbar.debug("[walmart support] not a pdp");
          }
          $productSubhead = $('.product-subhead');
          if ($productSubhead.length) {
            $productSubhead.after("<div id='chatid-cta-pdp'></div>");
          }
          $priceFlags = $('.price-flags');
          if ($priceFlags.length) {
            $priceFlags.append("<span class='js-price-flag flag flag-alt cidf-hide' id='chatid-cta-pdp-ribbon' style='background:transparent;'></span>");
          }
          product = U.getPDPData();
          return CID('page.setType', 'pdp', product);
        };
        verifyProductData = function() {
          return anticipate({
            condition: function() {
              var _ref;
              return ((_ref = window.require) != null ? typeof _ref.defined === "function" ? _ref.defined('product/data') : void 0 : void 0) && window.require('product/data');
            },
            progress: function(tries) {
              return CID.chatbar.debug("[walmart support] no 'product/data' module found (attempt " + tries + ")");
            },
            fail: function() {
              return CID.chatbar.debug("[walmart support] could not find 'product/data' module");
            },
            success: function() {
              return continueWithProductData();
            },
            interval: 100,
            attempts: 40
          });
        };
        return verifyProductData();
      };

      return WalmartDesktopImplementation;

    })();
  });

}).call(this);

(function() {
  define('implementation/mobile',['namespace', 'embed/channels/walmart/common/config', 'embed/channels/walmart/common/utils', 'library/utility/extend', 'library/utility/anticipate'], function(CID, config, U, extend, anticipate) {
    var WalmartMobileImplementation;
    return WalmartMobileImplementation = (function() {
      function WalmartMobileImplementation() {}

      WalmartMobileImplementation.prototype.config = extend(config, {
        MAIN_BASE_URL: 'https://chatidcdn.com/chatbar/latest',
        CHANNEL_NAME: 'walmart.mobile'
      });

      WalmartMobileImplementation.prototype.loadCID = function() {
        var _this = this;
        return anticipate({
          condition: function() {
            var _ref;
            return window.jQuery && ((_ref = window.requirejs) != null ? typeof _ref.defined === "function" ? _ref.defined('product/data') : void 0 : void 0) && window.jQuery('.product-controls.product-buying-table-row.product-buying-table-row-alt.module').length;
          },
          progress: function(tries) {
            return CID.console.debug("[walmart support] waiting for modules to load (attempt " + tries);
          },
          fail: function() {
            return CID.console.debug("[walmart support] could not load required modules");
          },
          success: function() {
            var product;
            CID.console.debug('[walmart support] product/data found!');
            _this.addContainer();
            product = U.getPDPData();
            return CID('page.setType', 'pdp', product);
          },
          interval: 100,
          attempts: 80
        });
      };

      WalmartMobileImplementation.prototype.addContainer = function() {
        var $, $about, $flags;
        $ = window.jQuery;
        $about = $('div.ResponsiveContainer.about-container');
        $about.before("<div id='chatid-cta-mobile'></div>");
        $flags = $('.product-price-flag.price-flags');
        return $flags.append("<div id='chatid-cta-mobile-ribbon'></div>");
      };

      WalmartMobileImplementation.prototype.onInitialize = function() {
        return this.loadCID();
      };

      return WalmartMobileImplementation;

    })();
  });

}).call(this);


require(["embed/instance"]);
})();
} else {

  (function(c,h,a,t,_,i,d){c[_]=c[_]||function(){
    (c[_].q=c[_].q||[]).push(arguments)},c[_].l=1*new Date();i=h.createElement(a),
    d=h.getElementsByTagName(a)[0];i.async=1;i.src=t;d.parentNode.insertBefore(i,d)
  })(window,document,'script','https://chatidcdn.com/chatbar/main/dedicated/walmart/main.js','CID');
  CID('initialize', 'walmart');

}

})();
