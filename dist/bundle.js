/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "75dbf628b2e9673d8411";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/object-assign/index.js":
/*!******************************************************!*\
  !*** /Users/rir/node_modules/object-assign/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack:////Users/rir/node_modules/object-assign/index.js?");

/***/ }),

/***/ "../../../node_modules/prop-types/checkPropTypes.js":
/*!************************************************************!*\
  !*** /Users/rir/node_modules/prop-types/checkPropTypes.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar printWarning = function() {};\n\nif (true) {\n  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"../../../node_modules/prop-types/lib/ReactPropTypesSecret.js\");\n  var loggedTypeFailures = {};\n  var has = Function.call.bind(Object.prototype.hasOwnProperty);\n\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\n/**\n * Assert that the values match with the type specs.\n * Error messages are memorized and will only be shown once.\n *\n * @param {object} typeSpecs Map of name to a ReactPropType\n * @param {object} values Runtime values that need to be type-checked\n * @param {string} location e.g. \"prop\", \"context\", \"child context\"\n * @param {string} componentName Name of the component for error messages.\n * @param {?Function} getStack Returns the component stack.\n * @private\n */\nfunction checkPropTypes(typeSpecs, values, location, componentName, getStack) {\n  if (true) {\n    for (var typeSpecName in typeSpecs) {\n      if (has(typeSpecs, typeSpecName)) {\n        var error;\n        // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          if (typeof typeSpecs[typeSpecName] !== 'function') {\n            var err = Error(\n              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +\n              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'\n            );\n            err.name = 'Invariant Violation';\n            throw err;\n          }\n          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);\n        } catch (ex) {\n          error = ex;\n        }\n        if (error && !(error instanceof Error)) {\n          printWarning(\n            (componentName || 'React class') + ': type specification of ' +\n            location + ' `' + typeSpecName + '` is invalid; the type checker ' +\n            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +\n            'You may have forgotten to pass an argument to the type checker ' +\n            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +\n            'shape all require an argument).'\n          );\n        }\n        if (error instanceof Error && !(error.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error.message] = true;\n\n          var stack = getStack ? getStack() : '';\n\n          printWarning(\n            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')\n          );\n        }\n      }\n    }\n  }\n}\n\n/**\n * Resets warning cache when testing.\n *\n * @private\n */\ncheckPropTypes.resetWarningCache = function() {\n  if (true) {\n    loggedTypeFailures = {};\n  }\n}\n\nmodule.exports = checkPropTypes;\n\n\n//# sourceURL=webpack:////Users/rir/node_modules/prop-types/checkPropTypes.js?");

/***/ }),

/***/ "../../../node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!**********************************************************************!*\
  !*** /Users/rir/node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n\n\n//# sourceURL=webpack:////Users/rir/node_modules/prop-types/lib/ReactPropTypesSecret.js?");

/***/ }),

/***/ "../../../node_modules/react/cjs/react.development.js":
/*!**************************************************************!*\
  !*** /Users/rir/node_modules/react/cjs/react.development.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v16.9.0\n * react.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nvar _assign = __webpack_require__(/*! object-assign */ \"../../../node_modules/object-assign/index.js\");\nvar checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ \"../../../node_modules/prop-types/checkPropTypes.js\");\n\n// TODO: this is special because it gets imported during build.\n\nvar ReactVersion = '16.9.0';\n\n// The Symbol used to tag the ReactElement-like types. If there is no native Symbol\n// nor polyfill, then a plain number is used for performance.\nvar hasSymbol = typeof Symbol === 'function' && Symbol.for;\n\nvar REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;\nvar REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;\nvar REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;\nvar REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;\nvar REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;\nvar REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;\nvar REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;\n// TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary\n// (unstable) APIs that have been removed. Can we remove the symbols?\n\nvar REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;\nvar REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;\nvar REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;\nvar REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;\nvar REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;\nvar REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;\nvar REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;\nvar REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;\n\nvar MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;\nvar FAUX_ITERATOR_SYMBOL = '@@iterator';\n\nfunction getIteratorFn(maybeIterable) {\n  if (maybeIterable === null || typeof maybeIterable !== 'object') {\n    return null;\n  }\n  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];\n  if (typeof maybeIterator === 'function') {\n    return maybeIterator;\n  }\n  return null;\n}\n\n// Do not require this module directly! Use normal `invariant` calls with\n// template literal strings. The messages will be converted to ReactError during\n// build, and in production they will be minified.\n\n// Do not require this module directly! Use normal `invariant` calls with\n// template literal strings. The messages will be converted to ReactError during\n// build, and in production they will be minified.\n\nfunction ReactError(error) {\n  error.name = 'Invariant Violation';\n  return error;\n}\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\n/**\n * Forked from fbjs/warning:\n * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js\n *\n * Only change is we use console.warn instead of console.error,\n * and do nothing when 'console' is not supported.\n * This really simplifies the code.\n * ---\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar lowPriorityWarning = function () {};\n\n{\n  var printWarning = function (format) {\n    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    var argIndex = 0;\n    var message = 'Warning: ' + format.replace(/%s/g, function () {\n      return args[argIndex++];\n    });\n    if (typeof console !== 'undefined') {\n      console.warn(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n\n  lowPriorityWarning = function (condition, format) {\n    if (format === undefined) {\n      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');\n    }\n    if (!condition) {\n      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {\n        args[_key2 - 2] = arguments[_key2];\n      }\n\n      printWarning.apply(undefined, [format].concat(args));\n    }\n  };\n}\n\nvar lowPriorityWarning$1 = lowPriorityWarning;\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar warningWithoutStack = function () {};\n\n{\n  warningWithoutStack = function (condition, format) {\n    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      args[_key - 2] = arguments[_key];\n    }\n\n    if (format === undefined) {\n      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');\n    }\n    if (args.length > 8) {\n      // Check before the condition to catch violations early.\n      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');\n    }\n    if (condition) {\n      return;\n    }\n    if (typeof console !== 'undefined') {\n      var argsWithFormat = args.map(function (item) {\n        return '' + item;\n      });\n      argsWithFormat.unshift('Warning: ' + format);\n\n      // We intentionally don't use spread (or .apply) directly because it\n      // breaks IE9: https://github.com/facebook/react/issues/13610\n      Function.prototype.apply.call(console.error, console, argsWithFormat);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      var argIndex = 0;\n      var message = 'Warning: ' + format.replace(/%s/g, function () {\n        return args[argIndex++];\n      });\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\nvar warningWithoutStack$1 = warningWithoutStack;\n\nvar didWarnStateUpdateForUnmountedComponent = {};\n\nfunction warnNoop(publicInstance, callerName) {\n  {\n    var _constructor = publicInstance.constructor;\n    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';\n    var warningKey = componentName + '.' + callerName;\n    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {\n      return;\n    }\n    warningWithoutStack$1(false, \"Can't call %s on a component that is not yet mounted. \" + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);\n    didWarnStateUpdateForUnmountedComponent[warningKey] = true;\n  }\n}\n\n/**\n * This is the abstract API for an update queue.\n */\nvar ReactNoopUpdateQueue = {\n  /**\n   * Checks whether or not this composite component is mounted.\n   * @param {ReactClass} publicInstance The instance we want to test.\n   * @return {boolean} True if mounted, false otherwise.\n   * @protected\n   * @final\n   */\n  isMounted: function (publicInstance) {\n    return false;\n  },\n\n  /**\n   * Forces an update. This should only be invoked when it is known with\n   * certainty that we are **not** in a DOM transaction.\n   *\n   * You may want to call this when you know that some deeper aspect of the\n   * component's state has changed but `setState` was not called.\n   *\n   * This will not invoke `shouldComponentUpdate`, but it will invoke\n   * `componentWillUpdate` and `componentDidUpdate`.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} callerName name of the calling function in the public API.\n   * @internal\n   */\n  enqueueForceUpdate: function (publicInstance, callback, callerName) {\n    warnNoop(publicInstance, 'forceUpdate');\n  },\n\n  /**\n   * Replaces all of the state. Always use this or `setState` to mutate state.\n   * You should treat `this.state` as immutable.\n   *\n   * There is no guarantee that `this.state` will be immediately updated, so\n   * accessing `this.state` after calling this method may return the old value.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {object} completeState Next state.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} callerName name of the calling function in the public API.\n   * @internal\n   */\n  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {\n    warnNoop(publicInstance, 'replaceState');\n  },\n\n  /**\n   * Sets a subset of the state. This only exists because _pendingState is\n   * internal. This provides a merging strategy that is not available to deep\n   * properties which is confusing. TODO: Expose pendingState or don't use it\n   * during the merge.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {object} partialState Next partial state to be merged with state.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} Name of the calling function in the public API.\n   * @internal\n   */\n  enqueueSetState: function (publicInstance, partialState, callback, callerName) {\n    warnNoop(publicInstance, 'setState');\n  }\n};\n\nvar emptyObject = {};\n{\n  Object.freeze(emptyObject);\n}\n\n/**\n * Base class helpers for the updating state of a component.\n */\nfunction Component(props, context, updater) {\n  this.props = props;\n  this.context = context;\n  // If a component has string refs, we will assign a different object later.\n  this.refs = emptyObject;\n  // We initialize the default updater but the real one gets injected by the\n  // renderer.\n  this.updater = updater || ReactNoopUpdateQueue;\n}\n\nComponent.prototype.isReactComponent = {};\n\n/**\n * Sets a subset of the state. Always use this to mutate\n * state. You should treat `this.state` as immutable.\n *\n * There is no guarantee that `this.state` will be immediately updated, so\n * accessing `this.state` after calling this method may return the old value.\n *\n * There is no guarantee that calls to `setState` will run synchronously,\n * as they may eventually be batched together.  You can provide an optional\n * callback that will be executed when the call to setState is actually\n * completed.\n *\n * When a function is provided to setState, it will be called at some point in\n * the future (not synchronously). It will be called with the up to date\n * component arguments (state, props, context). These values can be different\n * from this.* because your function may be called after receiveProps but before\n * shouldComponentUpdate, and this new state, props, and context will not yet be\n * assigned to this.\n *\n * @param {object|function} partialState Next partial state or function to\n *        produce next partial state to be merged with current state.\n * @param {?function} callback Called after state is updated.\n * @final\n * @protected\n */\nComponent.prototype.setState = function (partialState, callback) {\n  (function () {\n    if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {\n      {\n        throw ReactError(Error('setState(...): takes an object of state variables to update or a function which returns an object of state variables.'));\n      }\n    }\n  })();\n  this.updater.enqueueSetState(this, partialState, callback, 'setState');\n};\n\n/**\n * Forces an update. This should only be invoked when it is known with\n * certainty that we are **not** in a DOM transaction.\n *\n * You may want to call this when you know that some deeper aspect of the\n * component's state has changed but `setState` was not called.\n *\n * This will not invoke `shouldComponentUpdate`, but it will invoke\n * `componentWillUpdate` and `componentDidUpdate`.\n *\n * @param {?function} callback Called after update is complete.\n * @final\n * @protected\n */\nComponent.prototype.forceUpdate = function (callback) {\n  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');\n};\n\n/**\n * Deprecated APIs. These APIs used to exist on classic React classes but since\n * we would like to deprecate them, we're not going to move them over to this\n * modern base class. Instead, we define a getter that warns if it's accessed.\n */\n{\n  var deprecatedAPIs = {\n    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],\n    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']\n  };\n  var defineDeprecationWarning = function (methodName, info) {\n    Object.defineProperty(Component.prototype, methodName, {\n      get: function () {\n        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);\n        return undefined;\n      }\n    });\n  };\n  for (var fnName in deprecatedAPIs) {\n    if (deprecatedAPIs.hasOwnProperty(fnName)) {\n      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);\n    }\n  }\n}\n\nfunction ComponentDummy() {}\nComponentDummy.prototype = Component.prototype;\n\n/**\n * Convenience component with default shallow equality check for sCU.\n */\nfunction PureComponent(props, context, updater) {\n  this.props = props;\n  this.context = context;\n  // If a component has string refs, we will assign a different object later.\n  this.refs = emptyObject;\n  this.updater = updater || ReactNoopUpdateQueue;\n}\n\nvar pureComponentPrototype = PureComponent.prototype = new ComponentDummy();\npureComponentPrototype.constructor = PureComponent;\n// Avoid an extra prototype jump for these methods.\n_assign(pureComponentPrototype, Component.prototype);\npureComponentPrototype.isPureReactComponent = true;\n\n// an immutable object with a single mutable value\nfunction createRef() {\n  var refObject = {\n    current: null\n  };\n  {\n    Object.seal(refObject);\n  }\n  return refObject;\n}\n\n/**\n * Keeps track of the current dispatcher.\n */\nvar ReactCurrentDispatcher = {\n  /**\n   * @internal\n   * @type {ReactComponent}\n   */\n  current: null\n};\n\n/**\n * Keeps track of the current batch's configuration such as how long an update\n * should suspend for if it needs to.\n */\nvar ReactCurrentBatchConfig = {\n  suspense: null\n};\n\n/**\n * Keeps track of the current owner.\n *\n * The current owner is the component who should own any components that are\n * currently being constructed.\n */\nvar ReactCurrentOwner = {\n  /**\n   * @internal\n   * @type {ReactComponent}\n   */\n  current: null\n};\n\nvar BEFORE_SLASH_RE = /^(.*)[\\\\\\/]/;\n\nvar describeComponentFrame = function (name, source, ownerName) {\n  var sourceInfo = '';\n  if (source) {\n    var path = source.fileName;\n    var fileName = path.replace(BEFORE_SLASH_RE, '');\n    {\n      // In DEV, include code for a common special case:\n      // prefer \"folder/index.js\" instead of just \"index.js\".\n      if (/^index\\./.test(fileName)) {\n        var match = path.match(BEFORE_SLASH_RE);\n        if (match) {\n          var pathBeforeSlash = match[1];\n          if (pathBeforeSlash) {\n            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');\n            fileName = folderName + '/' + fileName;\n          }\n        }\n      }\n    }\n    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';\n  } else if (ownerName) {\n    sourceInfo = ' (created by ' + ownerName + ')';\n  }\n  return '\\n    in ' + (name || 'Unknown') + sourceInfo;\n};\n\nvar Resolved = 1;\n\n\nfunction refineResolvedLazyComponent(lazyComponent) {\n  return lazyComponent._status === Resolved ? lazyComponent._result : null;\n}\n\nfunction getWrappedName(outerType, innerType, wrapperName) {\n  var functionName = innerType.displayName || innerType.name || '';\n  return outerType.displayName || (functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName);\n}\n\nfunction getComponentName(type) {\n  if (type == null) {\n    // Host root, text node or just invalid type.\n    return null;\n  }\n  {\n    if (typeof type.tag === 'number') {\n      warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');\n    }\n  }\n  if (typeof type === 'function') {\n    return type.displayName || type.name || null;\n  }\n  if (typeof type === 'string') {\n    return type;\n  }\n  switch (type) {\n    case REACT_FRAGMENT_TYPE:\n      return 'Fragment';\n    case REACT_PORTAL_TYPE:\n      return 'Portal';\n    case REACT_PROFILER_TYPE:\n      return 'Profiler';\n    case REACT_STRICT_MODE_TYPE:\n      return 'StrictMode';\n    case REACT_SUSPENSE_TYPE:\n      return 'Suspense';\n    case REACT_SUSPENSE_LIST_TYPE:\n      return 'SuspenseList';\n  }\n  if (typeof type === 'object') {\n    switch (type.$$typeof) {\n      case REACT_CONTEXT_TYPE:\n        return 'Context.Consumer';\n      case REACT_PROVIDER_TYPE:\n        return 'Context.Provider';\n      case REACT_FORWARD_REF_TYPE:\n        return getWrappedName(type, type.render, 'ForwardRef');\n      case REACT_MEMO_TYPE:\n        return getComponentName(type.type);\n      case REACT_LAZY_TYPE:\n        {\n          var thenable = type;\n          var resolvedThenable = refineResolvedLazyComponent(thenable);\n          if (resolvedThenable) {\n            return getComponentName(resolvedThenable);\n          }\n          break;\n        }\n    }\n  }\n  return null;\n}\n\nvar ReactDebugCurrentFrame = {};\n\nvar currentlyValidatingElement = null;\n\nfunction setCurrentlyValidatingElement(element) {\n  {\n    currentlyValidatingElement = element;\n  }\n}\n\n{\n  // Stack implementation injected by the current renderer.\n  ReactDebugCurrentFrame.getCurrentStack = null;\n\n  ReactDebugCurrentFrame.getStackAddendum = function () {\n    var stack = '';\n\n    // Add an extra top frame while an element is being validated\n    if (currentlyValidatingElement) {\n      var name = getComponentName(currentlyValidatingElement.type);\n      var owner = currentlyValidatingElement._owner;\n      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));\n    }\n\n    // Delegate to the injected renderer-specific implementation\n    var impl = ReactDebugCurrentFrame.getCurrentStack;\n    if (impl) {\n      stack += impl() || '';\n    }\n\n    return stack;\n  };\n}\n\n/**\n * Used by act() to track whether you're inside an act() scope.\n */\n\nvar IsSomeRendererActing = {\n  current: false\n};\n\nvar ReactSharedInternals = {\n  ReactCurrentDispatcher: ReactCurrentDispatcher,\n  ReactCurrentBatchConfig: ReactCurrentBatchConfig,\n  ReactCurrentOwner: ReactCurrentOwner,\n  IsSomeRendererActing: IsSomeRendererActing,\n  // Used by renderers to avoid bundling object-assign twice in UMD bundles:\n  assign: _assign\n};\n\n{\n  _assign(ReactSharedInternals, {\n    // These should not be included in production.\n    ReactDebugCurrentFrame: ReactDebugCurrentFrame,\n    // Shim for React DOM 16.0.0 which still destructured (but not used) this.\n    // TODO: remove in React 17.0.\n    ReactComponentTreeHook: {}\n  });\n}\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar warning = warningWithoutStack$1;\n\n{\n  warning = function (condition, format) {\n    if (condition) {\n      return;\n    }\n    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;\n    var stack = ReactDebugCurrentFrame.getStackAddendum();\n    // eslint-disable-next-line react-internal/warning-and-invariant-args\n\n    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      args[_key - 2] = arguments[_key];\n    }\n\n    warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));\n  };\n}\n\nvar warning$1 = warning;\n\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\n\nvar RESERVED_PROPS = {\n  key: true,\n  ref: true,\n  __self: true,\n  __source: true\n};\n\nvar specialPropKeyWarningShown = void 0;\nvar specialPropRefWarningShown = void 0;\n\nfunction hasValidRef(config) {\n  {\n    if (hasOwnProperty.call(config, 'ref')) {\n      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;\n      if (getter && getter.isReactWarning) {\n        return false;\n      }\n    }\n  }\n  return config.ref !== undefined;\n}\n\nfunction hasValidKey(config) {\n  {\n    if (hasOwnProperty.call(config, 'key')) {\n      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;\n      if (getter && getter.isReactWarning) {\n        return false;\n      }\n    }\n  }\n  return config.key !== undefined;\n}\n\nfunction defineKeyPropWarningGetter(props, displayName) {\n  var warnAboutAccessingKey = function () {\n    if (!specialPropKeyWarningShown) {\n      specialPropKeyWarningShown = true;\n      warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);\n    }\n  };\n  warnAboutAccessingKey.isReactWarning = true;\n  Object.defineProperty(props, 'key', {\n    get: warnAboutAccessingKey,\n    configurable: true\n  });\n}\n\nfunction defineRefPropWarningGetter(props, displayName) {\n  var warnAboutAccessingRef = function () {\n    if (!specialPropRefWarningShown) {\n      specialPropRefWarningShown = true;\n      warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);\n    }\n  };\n  warnAboutAccessingRef.isReactWarning = true;\n  Object.defineProperty(props, 'ref', {\n    get: warnAboutAccessingRef,\n    configurable: true\n  });\n}\n\n/**\n * Factory method to create a new React element. This no longer adheres to\n * the class pattern, so do not use new to call it. Also, no instanceof check\n * will work. Instead test $$typeof field against Symbol.for('react.element') to check\n * if something is a React Element.\n *\n * @param {*} type\n * @param {*} props\n * @param {*} key\n * @param {string|object} ref\n * @param {*} owner\n * @param {*} self A *temporary* helper to detect places where `this` is\n * different from the `owner` when React.createElement is called, so that we\n * can warn. We want to get rid of owner and replace string `ref`s with arrow\n * functions, and as long as `this` and owner are the same, there will be no\n * change in behavior.\n * @param {*} source An annotation object (added by a transpiler or otherwise)\n * indicating filename, line number, and/or other information.\n * @internal\n */\nvar ReactElement = function (type, key, ref, self, source, owner, props) {\n  var element = {\n    // This tag allows us to uniquely identify this as a React Element\n    $$typeof: REACT_ELEMENT_TYPE,\n\n    // Built-in properties that belong on the element\n    type: type,\n    key: key,\n    ref: ref,\n    props: props,\n\n    // Record the component responsible for creating this element.\n    _owner: owner\n  };\n\n  {\n    // The validation flag is currently mutative. We put it on\n    // an external backing store so that we can freeze the whole object.\n    // This can be replaced with a WeakMap once they are implemented in\n    // commonly used development environments.\n    element._store = {};\n\n    // To make comparing ReactElements easier for testing purposes, we make\n    // the validation flag non-enumerable (where possible, which should\n    // include every environment we run tests in), so the test framework\n    // ignores it.\n    Object.defineProperty(element._store, 'validated', {\n      configurable: false,\n      enumerable: false,\n      writable: true,\n      value: false\n    });\n    // self and source are DEV only properties.\n    Object.defineProperty(element, '_self', {\n      configurable: false,\n      enumerable: false,\n      writable: false,\n      value: self\n    });\n    // Two elements created in two different places should be considered\n    // equal for testing purposes and therefore we hide it from enumeration.\n    Object.defineProperty(element, '_source', {\n      configurable: false,\n      enumerable: false,\n      writable: false,\n      value: source\n    });\n    if (Object.freeze) {\n      Object.freeze(element.props);\n      Object.freeze(element);\n    }\n  }\n\n  return element;\n};\n\n/**\n * https://github.com/reactjs/rfcs/pull/107\n * @param {*} type\n * @param {object} props\n * @param {string} key\n */\n\n\n/**\n * https://github.com/reactjs/rfcs/pull/107\n * @param {*} type\n * @param {object} props\n * @param {string} key\n */\nfunction jsxDEV(type, config, maybeKey, source, self) {\n  var propName = void 0;\n\n  // Reserved names are extracted\n  var props = {};\n\n  var key = null;\n  var ref = null;\n\n  if (hasValidRef(config)) {\n    ref = config.ref;\n  }\n\n  if (hasValidKey(config)) {\n    key = '' + config.key;\n  }\n\n  // Remaining properties are added to a new props object\n  for (propName in config) {\n    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n      props[propName] = config[propName];\n    }\n  }\n\n  // intentionally not checking if key was set above\n  // this key is higher priority as it's static\n  if (maybeKey !== undefined) {\n    key = '' + maybeKey;\n  }\n\n  // Resolve default props\n  if (type && type.defaultProps) {\n    var defaultProps = type.defaultProps;\n    for (propName in defaultProps) {\n      if (props[propName] === undefined) {\n        props[propName] = defaultProps[propName];\n      }\n    }\n  }\n\n  if (key || ref) {\n    var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;\n    if (key) {\n      defineKeyPropWarningGetter(props, displayName);\n    }\n    if (ref) {\n      defineRefPropWarningGetter(props, displayName);\n    }\n  }\n\n  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);\n}\n\n/**\n * Create and return a new ReactElement of the given type.\n * See https://reactjs.org/docs/react-api.html#createelement\n */\nfunction createElement(type, config, children) {\n  var propName = void 0;\n\n  // Reserved names are extracted\n  var props = {};\n\n  var key = null;\n  var ref = null;\n  var self = null;\n  var source = null;\n\n  if (config != null) {\n    if (hasValidRef(config)) {\n      ref = config.ref;\n    }\n    if (hasValidKey(config)) {\n      key = '' + config.key;\n    }\n\n    self = config.__self === undefined ? null : config.__self;\n    source = config.__source === undefined ? null : config.__source;\n    // Remaining properties are added to a new props object\n    for (propName in config) {\n      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n        props[propName] = config[propName];\n      }\n    }\n  }\n\n  // Children can be more than one argument, and those are transferred onto\n  // the newly allocated props object.\n  var childrenLength = arguments.length - 2;\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    var childArray = Array(childrenLength);\n    for (var i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 2];\n    }\n    {\n      if (Object.freeze) {\n        Object.freeze(childArray);\n      }\n    }\n    props.children = childArray;\n  }\n\n  // Resolve default props\n  if (type && type.defaultProps) {\n    var defaultProps = type.defaultProps;\n    for (propName in defaultProps) {\n      if (props[propName] === undefined) {\n        props[propName] = defaultProps[propName];\n      }\n    }\n  }\n  {\n    if (key || ref) {\n      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;\n      if (key) {\n        defineKeyPropWarningGetter(props, displayName);\n      }\n      if (ref) {\n        defineRefPropWarningGetter(props, displayName);\n      }\n    }\n  }\n  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);\n}\n\n/**\n * Return a function that produces ReactElements of a given type.\n * See https://reactjs.org/docs/react-api.html#createfactory\n */\n\n\nfunction cloneAndReplaceKey(oldElement, newKey) {\n  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);\n\n  return newElement;\n}\n\n/**\n * Clone and return a new ReactElement using element as the starting point.\n * See https://reactjs.org/docs/react-api.html#cloneelement\n */\nfunction cloneElement(element, config, children) {\n  (function () {\n    if (!!(element === null || element === undefined)) {\n      {\n        throw ReactError(Error('React.cloneElement(...): The argument must be a React element, but you passed ' + element + '.'));\n      }\n    }\n  })();\n\n  var propName = void 0;\n\n  // Original props are copied\n  var props = _assign({}, element.props);\n\n  // Reserved names are extracted\n  var key = element.key;\n  var ref = element.ref;\n  // Self is preserved since the owner is preserved.\n  var self = element._self;\n  // Source is preserved since cloneElement is unlikely to be targeted by a\n  // transpiler, and the original source is probably a better indicator of the\n  // true owner.\n  var source = element._source;\n\n  // Owner will be preserved, unless ref is overridden\n  var owner = element._owner;\n\n  if (config != null) {\n    if (hasValidRef(config)) {\n      // Silently steal the ref from the parent.\n      ref = config.ref;\n      owner = ReactCurrentOwner.current;\n    }\n    if (hasValidKey(config)) {\n      key = '' + config.key;\n    }\n\n    // Remaining properties override existing props\n    var defaultProps = void 0;\n    if (element.type && element.type.defaultProps) {\n      defaultProps = element.type.defaultProps;\n    }\n    for (propName in config) {\n      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n        if (config[propName] === undefined && defaultProps !== undefined) {\n          // Resolve default props\n          props[propName] = defaultProps[propName];\n        } else {\n          props[propName] = config[propName];\n        }\n      }\n    }\n  }\n\n  // Children can be more than one argument, and those are transferred onto\n  // the newly allocated props object.\n  var childrenLength = arguments.length - 2;\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    var childArray = Array(childrenLength);\n    for (var i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 2];\n    }\n    props.children = childArray;\n  }\n\n  return ReactElement(element.type, key, ref, self, source, owner, props);\n}\n\n/**\n * Verifies the object is a ReactElement.\n * See https://reactjs.org/docs/react-api.html#isvalidelement\n * @param {?object} object\n * @return {boolean} True if `object` is a ReactElement.\n * @final\n */\nfunction isValidElement(object) {\n  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;\n}\n\nvar SEPARATOR = '.';\nvar SUBSEPARATOR = ':';\n\n/**\n * Escape and wrap key so it is safe to use as a reactid\n *\n * @param {string} key to be escaped.\n * @return {string} the escaped key.\n */\nfunction escape(key) {\n  var escapeRegex = /[=:]/g;\n  var escaperLookup = {\n    '=': '=0',\n    ':': '=2'\n  };\n  var escapedString = ('' + key).replace(escapeRegex, function (match) {\n    return escaperLookup[match];\n  });\n\n  return '$' + escapedString;\n}\n\n/**\n * TODO: Test that a single child and an array with one item have the same key\n * pattern.\n */\n\nvar didWarnAboutMaps = false;\n\nvar userProvidedKeyEscapeRegex = /\\/+/g;\nfunction escapeUserProvidedKey(text) {\n  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');\n}\n\nvar POOL_SIZE = 10;\nvar traverseContextPool = [];\nfunction getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {\n  if (traverseContextPool.length) {\n    var traverseContext = traverseContextPool.pop();\n    traverseContext.result = mapResult;\n    traverseContext.keyPrefix = keyPrefix;\n    traverseContext.func = mapFunction;\n    traverseContext.context = mapContext;\n    traverseContext.count = 0;\n    return traverseContext;\n  } else {\n    return {\n      result: mapResult,\n      keyPrefix: keyPrefix,\n      func: mapFunction,\n      context: mapContext,\n      count: 0\n    };\n  }\n}\n\nfunction releaseTraverseContext(traverseContext) {\n  traverseContext.result = null;\n  traverseContext.keyPrefix = null;\n  traverseContext.func = null;\n  traverseContext.context = null;\n  traverseContext.count = 0;\n  if (traverseContextPool.length < POOL_SIZE) {\n    traverseContextPool.push(traverseContext);\n  }\n}\n\n/**\n * @param {?*} children Children tree container.\n * @param {!string} nameSoFar Name of the key path so far.\n * @param {!function} callback Callback to invoke with each child found.\n * @param {?*} traverseContext Used to pass information throughout the traversal\n * process.\n * @return {!number} The number of children in this subtree.\n */\nfunction traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {\n  var type = typeof children;\n\n  if (type === 'undefined' || type === 'boolean') {\n    // All of the above are perceived as null.\n    children = null;\n  }\n\n  var invokeCallback = false;\n\n  if (children === null) {\n    invokeCallback = true;\n  } else {\n    switch (type) {\n      case 'string':\n      case 'number':\n        invokeCallback = true;\n        break;\n      case 'object':\n        switch (children.$$typeof) {\n          case REACT_ELEMENT_TYPE:\n          case REACT_PORTAL_TYPE:\n            invokeCallback = true;\n        }\n    }\n  }\n\n  if (invokeCallback) {\n    callback(traverseContext, children,\n    // If it's the only child, treat the name as if it was wrapped in an array\n    // so that it's consistent if the number of children grows.\n    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);\n    return 1;\n  }\n\n  var child = void 0;\n  var nextName = void 0;\n  var subtreeCount = 0; // Count of children found in the current subtree.\n  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;\n\n  if (Array.isArray(children)) {\n    for (var i = 0; i < children.length; i++) {\n      child = children[i];\n      nextName = nextNamePrefix + getComponentKey(child, i);\n      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);\n    }\n  } else {\n    var iteratorFn = getIteratorFn(children);\n    if (typeof iteratorFn === 'function') {\n      {\n        // Warn about using Maps as children\n        if (iteratorFn === children.entries) {\n          !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;\n          didWarnAboutMaps = true;\n        }\n      }\n\n      var iterator = iteratorFn.call(children);\n      var step = void 0;\n      var ii = 0;\n      while (!(step = iterator.next()).done) {\n        child = step.value;\n        nextName = nextNamePrefix + getComponentKey(child, ii++);\n        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);\n      }\n    } else if (type === 'object') {\n      var addendum = '';\n      {\n        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();\n      }\n      var childrenString = '' + children;\n      (function () {\n        {\n          {\n            throw ReactError(Error('Objects are not valid as a React child (found: ' + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ').' + addendum));\n          }\n        }\n      })();\n    }\n  }\n\n  return subtreeCount;\n}\n\n/**\n * Traverses children that are typically specified as `props.children`, but\n * might also be specified through attributes:\n *\n * - `traverseAllChildren(this.props.children, ...)`\n * - `traverseAllChildren(this.props.leftPanelChildren, ...)`\n *\n * The `traverseContext` is an optional argument that is passed through the\n * entire traversal. It can be used to store accumulations or anything else that\n * the callback might find relevant.\n *\n * @param {?*} children Children tree object.\n * @param {!function} callback To invoke upon traversing each child.\n * @param {?*} traverseContext Context for traversal.\n * @return {!number} The number of children in this subtree.\n */\nfunction traverseAllChildren(children, callback, traverseContext) {\n  if (children == null) {\n    return 0;\n  }\n\n  return traverseAllChildrenImpl(children, '', callback, traverseContext);\n}\n\n/**\n * Generate a key string that identifies a component within a set.\n *\n * @param {*} component A component that could contain a manual key.\n * @param {number} index Index that is used if a manual key is not provided.\n * @return {string}\n */\nfunction getComponentKey(component, index) {\n  // Do some typechecking here since we call this blindly. We want to ensure\n  // that we don't block potential future ES APIs.\n  if (typeof component === 'object' && component !== null && component.key != null) {\n    // Explicit key\n    return escape(component.key);\n  }\n  // Implicit key determined by the index in the set\n  return index.toString(36);\n}\n\nfunction forEachSingleChild(bookKeeping, child, name) {\n  var func = bookKeeping.func,\n      context = bookKeeping.context;\n\n  func.call(context, child, bookKeeping.count++);\n}\n\n/**\n * Iterates through children that are typically specified as `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenforeach\n *\n * The provided forEachFunc(child, index) will be called for each\n * leaf child.\n *\n * @param {?*} children Children tree container.\n * @param {function(*, int)} forEachFunc\n * @param {*} forEachContext Context for forEachContext.\n */\nfunction forEachChildren(children, forEachFunc, forEachContext) {\n  if (children == null) {\n    return children;\n  }\n  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);\n  traverseAllChildren(children, forEachSingleChild, traverseContext);\n  releaseTraverseContext(traverseContext);\n}\n\nfunction mapSingleChildIntoContext(bookKeeping, child, childKey) {\n  var result = bookKeeping.result,\n      keyPrefix = bookKeeping.keyPrefix,\n      func = bookKeeping.func,\n      context = bookKeeping.context;\n\n\n  var mappedChild = func.call(context, child, bookKeeping.count++);\n  if (Array.isArray(mappedChild)) {\n    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {\n      return c;\n    });\n  } else if (mappedChild != null) {\n    if (isValidElement(mappedChild)) {\n      mappedChild = cloneAndReplaceKey(mappedChild,\n      // Keep both the (mapped) and old keys if they differ, just as\n      // traverseAllChildren used to do for objects as children\n      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);\n    }\n    result.push(mappedChild);\n  }\n}\n\nfunction mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {\n  var escapedPrefix = '';\n  if (prefix != null) {\n    escapedPrefix = escapeUserProvidedKey(prefix) + '/';\n  }\n  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);\n  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);\n  releaseTraverseContext(traverseContext);\n}\n\n/**\n * Maps children that are typically specified as `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenmap\n *\n * The provided mapFunction(child, key, index) will be called for each\n * leaf child.\n *\n * @param {?*} children Children tree container.\n * @param {function(*, int)} func The map function.\n * @param {*} context Context for mapFunction.\n * @return {object} Object containing the ordered map of results.\n */\nfunction mapChildren(children, func, context) {\n  if (children == null) {\n    return children;\n  }\n  var result = [];\n  mapIntoWithKeyPrefixInternal(children, result, null, func, context);\n  return result;\n}\n\n/**\n * Count the number of children that are typically specified as\n * `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrencount\n *\n * @param {?*} children Children tree container.\n * @return {number} The number of children.\n */\nfunction countChildren(children) {\n  return traverseAllChildren(children, function () {\n    return null;\n  }, null);\n}\n\n/**\n * Flatten a children object (typically specified as `props.children`) and\n * return an array with appropriately re-keyed children.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrentoarray\n */\nfunction toArray(children) {\n  var result = [];\n  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {\n    return child;\n  });\n  return result;\n}\n\n/**\n * Returns the first child in a collection of children and verifies that there\n * is only one child in the collection.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenonly\n *\n * The current implementation of this function assumes that a single child gets\n * passed without a wrapper, but the purpose of this helper function is to\n * abstract away the particular structure of children.\n *\n * @param {?object} children Child collection structure.\n * @return {ReactElement} The first and only `ReactElement` contained in the\n * structure.\n */\nfunction onlyChild(children) {\n  (function () {\n    if (!isValidElement(children)) {\n      {\n        throw ReactError(Error('React.Children.only expected to receive a single React element child.'));\n      }\n    }\n  })();\n  return children;\n}\n\nfunction createContext(defaultValue, calculateChangedBits) {\n  if (calculateChangedBits === undefined) {\n    calculateChangedBits = null;\n  } else {\n    {\n      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;\n    }\n  }\n\n  var context = {\n    $$typeof: REACT_CONTEXT_TYPE,\n    _calculateChangedBits: calculateChangedBits,\n    // As a workaround to support multiple concurrent renderers, we categorize\n    // some renderers as primary and others as secondary. We only expect\n    // there to be two concurrent renderers at most: React Native (primary) and\n    // Fabric (secondary); React DOM (primary) and React ART (secondary).\n    // Secondary renderers store their context values on separate fields.\n    _currentValue: defaultValue,\n    _currentValue2: defaultValue,\n    // Used to track how many concurrent renderers this context currently\n    // supports within in a single renderer. Such as parallel server rendering.\n    _threadCount: 0,\n    // These are circular\n    Provider: null,\n    Consumer: null\n  };\n\n  context.Provider = {\n    $$typeof: REACT_PROVIDER_TYPE,\n    _context: context\n  };\n\n  var hasWarnedAboutUsingNestedContextConsumers = false;\n  var hasWarnedAboutUsingConsumerProvider = false;\n\n  {\n    // A separate object, but proxies back to the original context object for\n    // backwards compatibility. It has a different $$typeof, so we can properly\n    // warn for the incorrect usage of Context as a Consumer.\n    var Consumer = {\n      $$typeof: REACT_CONTEXT_TYPE,\n      _context: context,\n      _calculateChangedBits: context._calculateChangedBits\n    };\n    // $FlowFixMe: Flow complains about not setting a value, which is intentional here\n    Object.defineProperties(Consumer, {\n      Provider: {\n        get: function () {\n          if (!hasWarnedAboutUsingConsumerProvider) {\n            hasWarnedAboutUsingConsumerProvider = true;\n            warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');\n          }\n          return context.Provider;\n        },\n        set: function (_Provider) {\n          context.Provider = _Provider;\n        }\n      },\n      _currentValue: {\n        get: function () {\n          return context._currentValue;\n        },\n        set: function (_currentValue) {\n          context._currentValue = _currentValue;\n        }\n      },\n      _currentValue2: {\n        get: function () {\n          return context._currentValue2;\n        },\n        set: function (_currentValue2) {\n          context._currentValue2 = _currentValue2;\n        }\n      },\n      _threadCount: {\n        get: function () {\n          return context._threadCount;\n        },\n        set: function (_threadCount) {\n          context._threadCount = _threadCount;\n        }\n      },\n      Consumer: {\n        get: function () {\n          if (!hasWarnedAboutUsingNestedContextConsumers) {\n            hasWarnedAboutUsingNestedContextConsumers = true;\n            warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');\n          }\n          return context.Consumer;\n        }\n      }\n    });\n    // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty\n    context.Consumer = Consumer;\n  }\n\n  {\n    context._currentRenderer = null;\n    context._currentRenderer2 = null;\n  }\n\n  return context;\n}\n\nfunction lazy(ctor) {\n  var lazyType = {\n    $$typeof: REACT_LAZY_TYPE,\n    _ctor: ctor,\n    // React uses these fields to store the result.\n    _status: -1,\n    _result: null\n  };\n\n  {\n    // In production, this would just set it on the object.\n    var defaultProps = void 0;\n    var propTypes = void 0;\n    Object.defineProperties(lazyType, {\n      defaultProps: {\n        configurable: true,\n        get: function () {\n          return defaultProps;\n        },\n        set: function (newDefaultProps) {\n          warning$1(false, 'React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');\n          defaultProps = newDefaultProps;\n          // Match production behavior more closely:\n          Object.defineProperty(lazyType, 'defaultProps', {\n            enumerable: true\n          });\n        }\n      },\n      propTypes: {\n        configurable: true,\n        get: function () {\n          return propTypes;\n        },\n        set: function (newPropTypes) {\n          warning$1(false, 'React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');\n          propTypes = newPropTypes;\n          // Match production behavior more closely:\n          Object.defineProperty(lazyType, 'propTypes', {\n            enumerable: true\n          });\n        }\n      }\n    });\n  }\n\n  return lazyType;\n}\n\nfunction forwardRef(render) {\n  {\n    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {\n      warningWithoutStack$1(false, 'forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');\n    } else if (typeof render !== 'function') {\n      warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);\n    } else {\n      !(\n      // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object\n      render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;\n    }\n\n    if (render != null) {\n      !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;\n    }\n  }\n\n  return {\n    $$typeof: REACT_FORWARD_REF_TYPE,\n    render: render\n  };\n}\n\nfunction isValidElementType(type) {\n  return typeof type === 'string' || typeof type === 'function' ||\n  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.\n  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE);\n}\n\nfunction memo(type, compare) {\n  {\n    if (!isValidElementType(type)) {\n      warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);\n    }\n  }\n  return {\n    $$typeof: REACT_MEMO_TYPE,\n    type: type,\n    compare: compare === undefined ? null : compare\n  };\n}\n\nfunction resolveDispatcher() {\n  var dispatcher = ReactCurrentDispatcher.current;\n  (function () {\n    if (!(dispatcher !== null)) {\n      {\n        throw ReactError(Error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\\n1. You might have mismatching versions of React and the renderer (such as React DOM)\\n2. You might be breaking the Rules of Hooks\\n3. You might have more than one copy of React in the same app\\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.'));\n      }\n    }\n  })();\n  return dispatcher;\n}\n\nfunction useContext(Context, unstable_observedBits) {\n  var dispatcher = resolveDispatcher();\n  {\n    !(unstable_observedBits === undefined) ? warning$1(false, 'useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\\n\\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '') : void 0;\n\n    // TODO: add a more generic warning for invalid values.\n    if (Context._context !== undefined) {\n      var realContext = Context._context;\n      // Don't deduplicate because this legitimately causes bugs\n      // and nobody should be using this in existing code.\n      if (realContext.Consumer === Context) {\n        warning$1(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');\n      } else if (realContext.Provider === Context) {\n        warning$1(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');\n      }\n    }\n  }\n  return dispatcher.useContext(Context, unstable_observedBits);\n}\n\nfunction useState(initialState) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useState(initialState);\n}\n\nfunction useReducer(reducer, initialArg, init) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useReducer(reducer, initialArg, init);\n}\n\nfunction useRef(initialValue) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useRef(initialValue);\n}\n\nfunction useEffect(create, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useEffect(create, inputs);\n}\n\nfunction useLayoutEffect(create, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useLayoutEffect(create, inputs);\n}\n\nfunction useCallback(callback, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useCallback(callback, inputs);\n}\n\nfunction useMemo(create, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useMemo(create, inputs);\n}\n\nfunction useImperativeHandle(ref, create, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useImperativeHandle(ref, create, inputs);\n}\n\nfunction useDebugValue(value, formatterFn) {\n  {\n    var dispatcher = resolveDispatcher();\n    return dispatcher.useDebugValue(value, formatterFn);\n  }\n}\n\nvar emptyObject$1 = {};\n\nfunction useResponder(responder, listenerProps) {\n  var dispatcher = resolveDispatcher();\n  {\n    if (responder == null || responder.$$typeof !== REACT_RESPONDER_TYPE) {\n      warning$1(false, 'useResponder: invalid first argument. Expected an event responder, but instead got %s', responder);\n      return;\n    }\n  }\n  return dispatcher.useResponder(responder, listenerProps || emptyObject$1);\n}\n\n// Within the scope of the callback, mark all updates as being allowed to suspend.\nfunction withSuspenseConfig(scope, config) {\n  var previousConfig = ReactCurrentBatchConfig.suspense;\n  ReactCurrentBatchConfig.suspense = config === undefined ? null : config;\n  try {\n    scope();\n  } finally {\n    ReactCurrentBatchConfig.suspense = previousConfig;\n  }\n}\n\n/**\n * ReactElementValidator provides a wrapper around a element factory\n * which validates the props passed to the element. This is intended to be\n * used only in DEV and could be replaced by a static type checker for languages\n * that support it.\n */\n\nvar propTypesMisspellWarningShown = void 0;\n\n{\n  propTypesMisspellWarningShown = false;\n}\n\nfunction getDeclarationErrorAddendum() {\n  if (ReactCurrentOwner.current) {\n    var name = getComponentName(ReactCurrentOwner.current.type);\n    if (name) {\n      return '\\n\\nCheck the render method of `' + name + '`.';\n    }\n  }\n  return '';\n}\n\nfunction getSourceInfoErrorAddendum(source) {\n  if (source !== undefined) {\n    var fileName = source.fileName.replace(/^.*[\\\\\\/]/, '');\n    var lineNumber = source.lineNumber;\n    return '\\n\\nCheck your code at ' + fileName + ':' + lineNumber + '.';\n  }\n  return '';\n}\n\nfunction getSourceInfoErrorAddendumForProps(elementProps) {\n  if (elementProps !== null && elementProps !== undefined) {\n    return getSourceInfoErrorAddendum(elementProps.__source);\n  }\n  return '';\n}\n\n/**\n * Warn if there's no key explicitly set on dynamic arrays of children or\n * object keys are not valid. This allows us to keep track of children between\n * updates.\n */\nvar ownerHasKeyUseWarning = {};\n\nfunction getCurrentComponentErrorInfo(parentType) {\n  var info = getDeclarationErrorAddendum();\n\n  if (!info) {\n    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;\n    if (parentName) {\n      info = '\\n\\nCheck the top-level render call using <' + parentName + '>.';\n    }\n  }\n  return info;\n}\n\n/**\n * Warn if the element doesn't have an explicit key assigned to it.\n * This element is in an array. The array could grow and shrink or be\n * reordered. All children that haven't already been validated are required to\n * have a \"key\" property assigned to it. Error statuses are cached so a warning\n * will only be shown once.\n *\n * @internal\n * @param {ReactElement} element Element that requires a key.\n * @param {*} parentType element's parent's type.\n */\nfunction validateExplicitKey(element, parentType) {\n  if (!element._store || element._store.validated || element.key != null) {\n    return;\n  }\n  element._store.validated = true;\n\n  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);\n  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {\n    return;\n  }\n  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;\n\n  // Usually the current owner is the offender, but if it accepts children as a\n  // property, it may be the creator of the child that's responsible for\n  // assigning it a key.\n  var childOwner = '';\n  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {\n    // Give the component that originally created this child.\n    childOwner = ' It was passed a child from ' + getComponentName(element._owner.type) + '.';\n  }\n\n  setCurrentlyValidatingElement(element);\n  {\n    warning$1(false, 'Each child in a list should have a unique \"key\" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);\n  }\n  setCurrentlyValidatingElement(null);\n}\n\n/**\n * Ensure that every element either is passed in a static location, in an\n * array with an explicit keys property defined, or in an object literal\n * with valid key property.\n *\n * @internal\n * @param {ReactNode} node Statically passed child of any type.\n * @param {*} parentType node's parent's type.\n */\nfunction validateChildKeys(node, parentType) {\n  if (typeof node !== 'object') {\n    return;\n  }\n  if (Array.isArray(node)) {\n    for (var i = 0; i < node.length; i++) {\n      var child = node[i];\n      if (isValidElement(child)) {\n        validateExplicitKey(child, parentType);\n      }\n    }\n  } else if (isValidElement(node)) {\n    // This element was passed in a valid location.\n    if (node._store) {\n      node._store.validated = true;\n    }\n  } else if (node) {\n    var iteratorFn = getIteratorFn(node);\n    if (typeof iteratorFn === 'function') {\n      // Entry iterators used to provide implicit keys,\n      // but now we print a separate warning for them later.\n      if (iteratorFn !== node.entries) {\n        var iterator = iteratorFn.call(node);\n        var step = void 0;\n        while (!(step = iterator.next()).done) {\n          if (isValidElement(step.value)) {\n            validateExplicitKey(step.value, parentType);\n          }\n        }\n      }\n    }\n  }\n}\n\n/**\n * Given an element, validate that its props follow the propTypes definition,\n * provided by the type.\n *\n * @param {ReactElement} element\n */\nfunction validatePropTypes(element) {\n  var type = element.type;\n  if (type === null || type === undefined || typeof type === 'string') {\n    return;\n  }\n  var name = getComponentName(type);\n  var propTypes = void 0;\n  if (typeof type === 'function') {\n    propTypes = type.propTypes;\n  } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||\n  // Note: Memo only checks outer props here.\n  // Inner props are checked in the reconciler.\n  type.$$typeof === REACT_MEMO_TYPE)) {\n    propTypes = type.propTypes;\n  } else {\n    return;\n  }\n  if (propTypes) {\n    setCurrentlyValidatingElement(element);\n    checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);\n    setCurrentlyValidatingElement(null);\n  } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {\n    propTypesMisspellWarningShown = true;\n    warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');\n  }\n  if (typeof type.getDefaultProps === 'function') {\n    !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;\n  }\n}\n\n/**\n * Given a fragment, validate that it can only be provided with fragment props\n * @param {ReactElement} fragment\n */\nfunction validateFragmentProps(fragment) {\n  setCurrentlyValidatingElement(fragment);\n\n  var keys = Object.keys(fragment.props);\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    if (key !== 'children' && key !== 'key') {\n      warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);\n      break;\n    }\n  }\n\n  if (fragment.ref !== null) {\n    warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');\n  }\n\n  setCurrentlyValidatingElement(null);\n}\n\nfunction jsxWithValidation(type, props, key, isStaticChildren, source, self) {\n  var validType = isValidElementType(type);\n\n  // We warn in this case but don't throw. We expect the element creation to\n  // succeed and there will likely be errors in render.\n  if (!validType) {\n    var info = '';\n    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {\n      info += ' You likely forgot to export your component from the file ' + \"it's defined in, or you might have mixed up default and named imports.\";\n    }\n\n    var sourceInfo = getSourceInfoErrorAddendum(source);\n    if (sourceInfo) {\n      info += sourceInfo;\n    } else {\n      info += getDeclarationErrorAddendum();\n    }\n\n    var typeString = void 0;\n    if (type === null) {\n      typeString = 'null';\n    } else if (Array.isArray(type)) {\n      typeString = 'array';\n    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {\n      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';\n      info = ' Did you accidentally export a JSX literal instead of a component?';\n    } else {\n      typeString = typeof type;\n    }\n\n    warning$1(false, 'React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);\n  }\n\n  var element = jsxDEV(type, props, key, source, self);\n\n  // The result can be nullish if a mock or a custom function is used.\n  // TODO: Drop this when these are no longer allowed as the type argument.\n  if (element == null) {\n    return element;\n  }\n\n  // Skip key warning if the type isn't valid since our key validation logic\n  // doesn't expect a non-string/function type and can throw confusing errors.\n  // We don't want exception behavior to differ between dev and prod.\n  // (Rendering will throw with a helpful message and as soon as the type is\n  // fixed, the key warnings will appear.)\n  if (validType) {\n    var children = props.children;\n    if (children !== undefined) {\n      if (isStaticChildren) {\n        for (var i = 0; i < children.length; i++) {\n          validateChildKeys(children[i], type);\n        }\n      } else {\n        validateChildKeys(children, type);\n      }\n    }\n  }\n\n  if (props.key !== undefined) {\n    warning$1(false, 'React.jsx: Spreading a key to JSX is a deprecated pattern. ' + 'Explicitly pass a key after spreading props in your JSX call. ' + 'E.g. <ComponentName {...props} key={key} />');\n  }\n\n  if (type === REACT_FRAGMENT_TYPE) {\n    validateFragmentProps(element);\n  } else {\n    validatePropTypes(element);\n  }\n\n  return element;\n}\n\n// These two functions exist to still get child warnings in dev\n// even with the prod transform. This means that jsxDEV is purely\n// opt-in behavior for better messages but that we won't stop\n// giving you warnings if you use production apis.\nfunction jsxWithValidationStatic(type, props, key) {\n  return jsxWithValidation(type, props, key, true);\n}\n\nfunction jsxWithValidationDynamic(type, props, key) {\n  return jsxWithValidation(type, props, key, false);\n}\n\nfunction createElementWithValidation(type, props, children) {\n  var validType = isValidElementType(type);\n\n  // We warn in this case but don't throw. We expect the element creation to\n  // succeed and there will likely be errors in render.\n  if (!validType) {\n    var info = '';\n    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {\n      info += ' You likely forgot to export your component from the file ' + \"it's defined in, or you might have mixed up default and named imports.\";\n    }\n\n    var sourceInfo = getSourceInfoErrorAddendumForProps(props);\n    if (sourceInfo) {\n      info += sourceInfo;\n    } else {\n      info += getDeclarationErrorAddendum();\n    }\n\n    var typeString = void 0;\n    if (type === null) {\n      typeString = 'null';\n    } else if (Array.isArray(type)) {\n      typeString = 'array';\n    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {\n      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';\n      info = ' Did you accidentally export a JSX literal instead of a component?';\n    } else {\n      typeString = typeof type;\n    }\n\n    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);\n  }\n\n  var element = createElement.apply(this, arguments);\n\n  // The result can be nullish if a mock or a custom function is used.\n  // TODO: Drop this when these are no longer allowed as the type argument.\n  if (element == null) {\n    return element;\n  }\n\n  // Skip key warning if the type isn't valid since our key validation logic\n  // doesn't expect a non-string/function type and can throw confusing errors.\n  // We don't want exception behavior to differ between dev and prod.\n  // (Rendering will throw with a helpful message and as soon as the type is\n  // fixed, the key warnings will appear.)\n  if (validType) {\n    for (var i = 2; i < arguments.length; i++) {\n      validateChildKeys(arguments[i], type);\n    }\n  }\n\n  if (type === REACT_FRAGMENT_TYPE) {\n    validateFragmentProps(element);\n  } else {\n    validatePropTypes(element);\n  }\n\n  return element;\n}\n\nfunction createFactoryWithValidation(type) {\n  var validatedFactory = createElementWithValidation.bind(null, type);\n  validatedFactory.type = type;\n  // Legacy hook: remove it\n  {\n    Object.defineProperty(validatedFactory, 'type', {\n      enumerable: false,\n      get: function () {\n        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');\n        Object.defineProperty(this, 'type', {\n          value: type\n        });\n        return type;\n      }\n    });\n  }\n\n  return validatedFactory;\n}\n\nfunction cloneElementWithValidation(element, props, children) {\n  var newElement = cloneElement.apply(this, arguments);\n  for (var i = 2; i < arguments.length; i++) {\n    validateChildKeys(arguments[i], newElement.type);\n  }\n  validatePropTypes(newElement);\n  return newElement;\n}\n\nvar hasBadMapPolyfill = void 0;\n\n{\n  hasBadMapPolyfill = false;\n  try {\n    var frozenObject = Object.freeze({});\n    var testMap = new Map([[frozenObject, null]]);\n    var testSet = new Set([frozenObject]);\n    // This is necessary for Rollup to not consider these unused.\n    // https://github.com/rollup/rollup/issues/1771\n    // TODO: we can remove these if Rollup fixes the bug.\n    testMap.set(0, 0);\n    testSet.add(0);\n  } catch (e) {\n    // TODO: Consider warning about bad polyfills\n    hasBadMapPolyfill = true;\n  }\n}\n\nfunction createFundamentalComponent(impl) {\n  // We use responder as a Map key later on. When we have a bad\n  // polyfill, then we can't use it as a key as the polyfill tries\n  // to add a property to the object.\n  if (true && !hasBadMapPolyfill) {\n    Object.freeze(impl);\n  }\n  var fundamantalComponent = {\n    $$typeof: REACT_FUNDAMENTAL_TYPE,\n    impl: impl\n  };\n  {\n    Object.freeze(fundamantalComponent);\n  }\n  return fundamantalComponent;\n}\n\nfunction createEventResponder(displayName, responderConfig) {\n  var getInitialState = responderConfig.getInitialState,\n      onEvent = responderConfig.onEvent,\n      onMount = responderConfig.onMount,\n      onUnmount = responderConfig.onUnmount,\n      onOwnershipChange = responderConfig.onOwnershipChange,\n      onRootEvent = responderConfig.onRootEvent,\n      rootEventTypes = responderConfig.rootEventTypes,\n      targetEventTypes = responderConfig.targetEventTypes;\n\n  var eventResponder = {\n    $$typeof: REACT_RESPONDER_TYPE,\n    displayName: displayName,\n    getInitialState: getInitialState || null,\n    onEvent: onEvent || null,\n    onMount: onMount || null,\n    onOwnershipChange: onOwnershipChange || null,\n    onRootEvent: onRootEvent || null,\n    onUnmount: onUnmount || null,\n    rootEventTypes: rootEventTypes || null,\n    targetEventTypes: targetEventTypes || null\n  };\n  // We use responder as a Map key later on. When we have a bad\n  // polyfill, then we can't use it as a key as the polyfill tries\n  // to add a property to the object.\n  if (true && !hasBadMapPolyfill) {\n    Object.freeze(eventResponder);\n  }\n  return eventResponder;\n}\n\n// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:\n\n\n// In some cases, StrictMode should also double-render lifecycles.\n// This can be confusing for tests though,\n// And it can be bad for performance in production.\n// This feature flag can be used to control the behavior:\n\n\n// To preserve the \"Pause on caught exceptions\" behavior of the debugger, we\n// replay the begin phase of a failed component inside invokeGuardedCallback.\n\n\n// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:\n\n\n// Gather advanced timing metrics for Profiler subtrees.\n\n\n// Trace which interactions trigger each commit.\n\n\n// Only used in www builds.\n // TODO: true? Here it might just be false.\n\n// Only used in www builds.\n\n\n// Only used in www builds.\n\n\n// Disable javascript: URL strings in href for XSS protection.\n\n\n// React Fire: prevent the value and checked attributes from syncing\n// with their related DOM properties\n\n\n// These APIs will no longer be \"unstable\" in the upcoming 16.7 release,\n// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.\n\n\n\n\n// See https://github.com/react-native-community/discussions-and-proposals/issues/72 for more information\n// This is a flag so we can fix warnings in RN core before turning it on\n\n\n// Experimental React Flare event system and event components support.\nvar enableFlareAPI = false;\n\n// Experimental Host Component support.\nvar enableFundamentalAPI = false;\n\n// New API for JSX transforms to target - https://github.com/reactjs/rfcs/pull/107\nvar enableJSXTransformAPI = false;\n\n// We will enforce mocking scheduler with scheduler/unstable_mock at some point. (v17?)\n// Till then, we warn about the missing mock, but still fallback to a sync mode compatible version\n\n// Temporary flag to revert the fix in #15650\n\n\n// For tests, we flush suspense fallbacks in an act scope;\n// *except* in some of our own tests, where we test incremental loading states.\n\n\n// Changes priority of some events like mousemove to user-blocking priority,\n// but without making them discrete. The flag exists in case it causes\n// starvation problems.\n\n\n// Add a callback property to suspense to notify which promises are currently\n// in the update queue. This allows reporting and tracing of what is causing\n// the user to see a loading state.\n\n\n// Part of the simplification of React.createElement so we can eventually move\n// from React.createElement to React.jsx\n// https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md\n\nvar React = {\n  Children: {\n    map: mapChildren,\n    forEach: forEachChildren,\n    count: countChildren,\n    toArray: toArray,\n    only: onlyChild\n  },\n\n  createRef: createRef,\n  Component: Component,\n  PureComponent: PureComponent,\n\n  createContext: createContext,\n  forwardRef: forwardRef,\n  lazy: lazy,\n  memo: memo,\n\n  useCallback: useCallback,\n  useContext: useContext,\n  useEffect: useEffect,\n  useImperativeHandle: useImperativeHandle,\n  useDebugValue: useDebugValue,\n  useLayoutEffect: useLayoutEffect,\n  useMemo: useMemo,\n  useReducer: useReducer,\n  useRef: useRef,\n  useState: useState,\n\n  Fragment: REACT_FRAGMENT_TYPE,\n  Profiler: REACT_PROFILER_TYPE,\n  StrictMode: REACT_STRICT_MODE_TYPE,\n  Suspense: REACT_SUSPENSE_TYPE,\n  unstable_SuspenseList: REACT_SUSPENSE_LIST_TYPE,\n\n  createElement: createElementWithValidation,\n  cloneElement: cloneElementWithValidation,\n  createFactory: createFactoryWithValidation,\n  isValidElement: isValidElement,\n\n  version: ReactVersion,\n\n  unstable_withSuspenseConfig: withSuspenseConfig,\n\n  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals\n};\n\nif (enableFlareAPI) {\n  React.unstable_useResponder = useResponder;\n  React.unstable_createResponder = createEventResponder;\n}\n\nif (enableFundamentalAPI) {\n  React.unstable_createFundamental = createFundamentalComponent;\n}\n\n// Note: some APIs are added with feature flags.\n// Make sure that stable builds for open source\n// don't modify the React object to avoid deopts.\n// Also let's not expose their names in stable builds.\n\nif (enableJSXTransformAPI) {\n  {\n    React.jsxDEV = jsxWithValidation;\n    React.jsx = jsxWithValidationDynamic;\n    React.jsxs = jsxWithValidationStatic;\n  }\n}\n\n\n\nvar React$2 = Object.freeze({\n\tdefault: React\n});\n\nvar React$3 = ( React$2 && React ) || React$2;\n\n// TODO: decide on the top-level export form.\n// This is hacky but makes it work with both Rollup and Jest.\nvar react = React$3.default || React$3;\n\nmodule.exports = react;\n  })();\n}\n\n\n//# sourceURL=webpack:////Users/rir/node_modules/react/cjs/react.development.js?");

/***/ }),

/***/ "../../../node_modules/react/index.js":
/*!**********************************************!*\
  !*** /Users/rir/node_modules/react/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ \"../../../node_modules/react/cjs/react.development.js\");\n}\n\n\n//# sourceURL=webpack:////Users/rir/node_modules/react/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/app.css":
/*!***********************************************!*\
  !*** ./node_modules/css-loader!./src/app.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".app {\\n    margin: 1rem;\\n    font-family: Arial, Helvetica, sans-serif;\\n  }\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/app.css?./node_modules/css-loader");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack:///./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar printWarning = function() {};\n\nif (true) {\n  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\n  var loggedTypeFailures = {};\n  var has = Function.call.bind(Object.prototype.hasOwnProperty);\n\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\n/**\n * Assert that the values match with the type specs.\n * Error messages are memorized and will only be shown once.\n *\n * @param {object} typeSpecs Map of name to a ReactPropType\n * @param {object} values Runtime values that need to be type-checked\n * @param {string} location e.g. \"prop\", \"context\", \"child context\"\n * @param {string} componentName Name of the component for error messages.\n * @param {?Function} getStack Returns the component stack.\n * @private\n */\nfunction checkPropTypes(typeSpecs, values, location, componentName, getStack) {\n  if (true) {\n    for (var typeSpecName in typeSpecs) {\n      if (has(typeSpecs, typeSpecName)) {\n        var error;\n        // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          if (typeof typeSpecs[typeSpecName] !== 'function') {\n            var err = Error(\n              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +\n              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'\n            );\n            err.name = 'Invariant Violation';\n            throw err;\n          }\n          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);\n        } catch (ex) {\n          error = ex;\n        }\n        if (error && !(error instanceof Error)) {\n          printWarning(\n            (componentName || 'React class') + ': type specification of ' +\n            location + ' `' + typeSpecName + '` is invalid; the type checker ' +\n            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +\n            'You may have forgotten to pass an argument to the type checker ' +\n            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +\n            'shape all require an argument).'\n          );\n        }\n        if (error instanceof Error && !(error.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error.message] = true;\n\n          var stack = getStack ? getStack() : '';\n\n          printWarning(\n            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')\n          );\n        }\n      }\n    }\n  }\n}\n\n/**\n * Resets warning cache when testing.\n *\n * @private\n */\ncheckPropTypes.resetWarningCache = function() {\n  if (true) {\n    loggedTypeFailures = {};\n  }\n}\n\nmodule.exports = checkPropTypes;\n\n\n//# sourceURL=webpack:///./node_modules/prop-types/checkPropTypes.js?");

/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n\n\n//# sourceURL=webpack:///./node_modules/prop-types/lib/ReactPropTypesSecret.js?");

/***/ }),

/***/ "./node_modules/react-dom/cjs/react-dom.development.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-dom/cjs/react-dom.development.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!*****************************************!*\
  !*** ./node_modules/react-dom/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction checkDCE() {\n  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */\n  if (\n    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||\n    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'\n  ) {\n    return;\n  }\n  if (true) {\n    // This branch is unreachable because this function is only called\n    // in production, but the condition is true only in development.\n    // Therefore if the branch is still here, dead code elimination wasn't\n    // properly applied.\n    // Don't change the message. React DevTools relies on it. Also make sure\n    // this message doesn't occur elsewhere in this function, or it will cause\n    // a false positive.\n    throw new Error('^_^');\n  }\n  try {\n    // Verify that the code above has been dead code eliminated (DCE'd).\n    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);\n  } catch (err) {\n    // DevTools shouldn't crash React, no matter what.\n    // We should still report in case we break this code.\n    console.error(err);\n  }\n}\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/react-dom.development.js */ \"./node_modules/react-dom/cjs/react-dom.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/react-dom/index.js?");

/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler-tracing.development.js":
/*!*********************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler-tracing.development.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v0.18.0\n * scheduler-tracing.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\n// Helps identify side effects in render-phase lifecycle hooks and setState\n// reducers by double invoking them in Strict Mode.\n\n // To preserve the \"Pause on caught exceptions\" behavior of the debugger, we\n// replay the begin phase of a failed component inside invokeGuardedCallback.\n\n // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:\n\n // Gather advanced timing metrics for Profiler subtrees.\n\n // Trace which interactions trigger each commit.\n\nvar enableSchedulerTracing = true; // SSR experiments\n\n\n // Only used in www builds.\n\n // Only used in www builds.\n\n // Disable javascript: URL strings in href for XSS protection.\n\n // React Fire: prevent the value and checked attributes from syncing\n// with their related DOM properties\n\n // These APIs will no longer be \"unstable\" in the upcoming 16.7 release,\n// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.\n\n\n // Experimental React Flare event system and event components support.\n\n // Experimental Host Component support.\n\n // Experimental Scope support.\n\n // New API for JSX transforms to target - https://github.com/reactjs/rfcs/pull/107\n\n // We will enforce mocking scheduler with scheduler/unstable_mock at some point. (v17?)\n// Till then, we warn about the missing mock, but still fallback to a legacy mode compatible version\n\n // For tests, we flush suspense fallbacks in an act scope;\n// *except* in some of our own tests, where we test incremental loading states.\n\n // Add a callback property to suspense to notify which promises are currently\n// in the update queue. This allows reporting and tracing of what is causing\n// the user to see a loading state.\n// Also allows hydration callbacks to fire when a dehydrated boundary gets\n// hydrated or deleted.\n\n // Part of the simplification of React.createElement so we can eventually move\n// from React.createElement to React.jsx\n// https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md\n\n\n\n\n\n // Flag to turn event.target and event.currentTarget in ReactNative from a reactTag to a component instance\n\nvar DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.\n\nvar interactionIDCounter = 0;\nvar threadIDCounter = 0; // Set of currently traced interactions.\n// Interactions \"stack\"–\n// Meaning that newly traced interactions are appended to the previously active set.\n// When an interaction goes out of scope, the previous set (if any) is restored.\n\nexports.__interactionsRef = null; // Listener(s) to notify when interactions begin and end.\n\nexports.__subscriberRef = null;\n\nif (enableSchedulerTracing) {\n  exports.__interactionsRef = {\n    current: new Set()\n  };\n  exports.__subscriberRef = {\n    current: null\n  };\n}\n\nfunction unstable_clear(callback) {\n  if (!enableSchedulerTracing) {\n    return callback();\n  }\n\n  var prevInteractions = exports.__interactionsRef.current;\n  exports.__interactionsRef.current = new Set();\n\n  try {\n    return callback();\n  } finally {\n    exports.__interactionsRef.current = prevInteractions;\n  }\n}\nfunction unstable_getCurrent() {\n  if (!enableSchedulerTracing) {\n    return null;\n  } else {\n    return exports.__interactionsRef.current;\n  }\n}\nfunction unstable_getThreadID() {\n  return ++threadIDCounter;\n}\nfunction unstable_trace(name, timestamp, callback) {\n  var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;\n\n  if (!enableSchedulerTracing) {\n    return callback();\n  }\n\n  var interaction = {\n    __count: 1,\n    id: interactionIDCounter++,\n    name: name,\n    timestamp: timestamp\n  };\n  var prevInteractions = exports.__interactionsRef.current; // Traced interactions should stack/accumulate.\n  // To do that, clone the current interactions.\n  // The previous set will be restored upon completion.\n\n  var interactions = new Set(prevInteractions);\n  interactions.add(interaction);\n  exports.__interactionsRef.current = interactions;\n  var subscriber = exports.__subscriberRef.current;\n  var returnValue;\n\n  try {\n    if (subscriber !== null) {\n      subscriber.onInteractionTraced(interaction);\n    }\n  } finally {\n    try {\n      if (subscriber !== null) {\n        subscriber.onWorkStarted(interactions, threadID);\n      }\n    } finally {\n      try {\n        returnValue = callback();\n      } finally {\n        exports.__interactionsRef.current = prevInteractions;\n\n        try {\n          if (subscriber !== null) {\n            subscriber.onWorkStopped(interactions, threadID);\n          }\n        } finally {\n          interaction.__count--; // If no async work was scheduled for this interaction,\n          // Notify subscribers that it's completed.\n\n          if (subscriber !== null && interaction.__count === 0) {\n            subscriber.onInteractionScheduledWorkCompleted(interaction);\n          }\n        }\n      }\n    }\n  }\n\n  return returnValue;\n}\nfunction unstable_wrap(callback) {\n  var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;\n\n  if (!enableSchedulerTracing) {\n    return callback;\n  }\n\n  var wrappedInteractions = exports.__interactionsRef.current;\n  var subscriber = exports.__subscriberRef.current;\n\n  if (subscriber !== null) {\n    subscriber.onWorkScheduled(wrappedInteractions, threadID);\n  } // Update the pending async work count for the current interactions.\n  // Update after calling subscribers in case of error.\n\n\n  wrappedInteractions.forEach(function (interaction) {\n    interaction.__count++;\n  });\n  var hasRun = false;\n\n  function wrapped() {\n    var prevInteractions = exports.__interactionsRef.current;\n    exports.__interactionsRef.current = wrappedInteractions;\n    subscriber = exports.__subscriberRef.current;\n\n    try {\n      var returnValue;\n\n      try {\n        if (subscriber !== null) {\n          subscriber.onWorkStarted(wrappedInteractions, threadID);\n        }\n      } finally {\n        try {\n          returnValue = callback.apply(undefined, arguments);\n        } finally {\n          exports.__interactionsRef.current = prevInteractions;\n\n          if (subscriber !== null) {\n            subscriber.onWorkStopped(wrappedInteractions, threadID);\n          }\n        }\n      }\n\n      return returnValue;\n    } finally {\n      if (!hasRun) {\n        // We only expect a wrapped function to be executed once,\n        // But in the event that it's executed more than once–\n        // Only decrement the outstanding interaction counts once.\n        hasRun = true; // Update pending async counts for all wrapped interactions.\n        // If this was the last scheduled async work for any of them,\n        // Mark them as completed.\n\n        wrappedInteractions.forEach(function (interaction) {\n          interaction.__count--;\n\n          if (subscriber !== null && interaction.__count === 0) {\n            subscriber.onInteractionScheduledWorkCompleted(interaction);\n          }\n        });\n      }\n    }\n  }\n\n  wrapped.cancel = function cancel() {\n    subscriber = exports.__subscriberRef.current;\n\n    try {\n      if (subscriber !== null) {\n        subscriber.onWorkCanceled(wrappedInteractions, threadID);\n      }\n    } finally {\n      // Update pending async counts for all wrapped interactions.\n      // If this was the last scheduled async work for any of them,\n      // Mark them as completed.\n      wrappedInteractions.forEach(function (interaction) {\n        interaction.__count--;\n\n        if (subscriber && interaction.__count === 0) {\n          subscriber.onInteractionScheduledWorkCompleted(interaction);\n        }\n      });\n    }\n  };\n\n  return wrapped;\n}\n\nvar subscribers = null;\n\nif (enableSchedulerTracing) {\n  subscribers = new Set();\n}\n\nfunction unstable_subscribe(subscriber) {\n  if (enableSchedulerTracing) {\n    subscribers.add(subscriber);\n\n    if (subscribers.size === 1) {\n      exports.__subscriberRef.current = {\n        onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,\n        onInteractionTraced: onInteractionTraced,\n        onWorkCanceled: onWorkCanceled,\n        onWorkScheduled: onWorkScheduled,\n        onWorkStarted: onWorkStarted,\n        onWorkStopped: onWorkStopped\n      };\n    }\n  }\n}\nfunction unstable_unsubscribe(subscriber) {\n  if (enableSchedulerTracing) {\n    subscribers.delete(subscriber);\n\n    if (subscribers.size === 0) {\n      exports.__subscriberRef.current = null;\n    }\n  }\n}\n\nfunction onInteractionTraced(interaction) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onInteractionTraced(interaction);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onInteractionScheduledWorkCompleted(interaction) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onInteractionScheduledWorkCompleted(interaction);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkScheduled(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkScheduled(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkStarted(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkStarted(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkStopped(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkStopped(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkCanceled(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkCanceled(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nexports.unstable_clear = unstable_clear;\nexports.unstable_getCurrent = unstable_getCurrent;\nexports.unstable_getThreadID = unstable_getThreadID;\nexports.unstable_trace = unstable_trace;\nexports.unstable_wrap = unstable_wrap;\nexports.unstable_subscribe = unstable_subscribe;\nexports.unstable_unsubscribe = unstable_unsubscribe;\n  })();\n}\n\n\n//# sourceURL=webpack:///./node_modules/scheduler/cjs/scheduler-tracing.development.js?");

/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler.development.js":
/*!*************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler.development.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v0.18.0\n * scheduler.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\nvar enableSchedulerDebugging = false;\nvar enableIsInputPending = false;\nvar enableProfiling = true;\n\nvar requestHostCallback;\n\nvar requestHostTimeout;\nvar cancelHostTimeout;\nvar shouldYieldToHost;\nvar requestPaint;\n\n\n\nif ( // If Scheduler runs in a non-DOM environment, it falls back to a naive\n// implementation using setTimeout.\ntypeof window === 'undefined' || // Check if MessageChannel is supported, too.\ntypeof MessageChannel !== 'function') {\n  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,\n  // fallback to a naive implementation.\n  var _callback = null;\n  var _timeoutID = null;\n\n  var _flushCallback = function () {\n    if (_callback !== null) {\n      try {\n        var currentTime = exports.unstable_now();\n        var hasRemainingTime = true;\n\n        _callback(hasRemainingTime, currentTime);\n\n        _callback = null;\n      } catch (e) {\n        setTimeout(_flushCallback, 0);\n        throw e;\n      }\n    }\n  };\n\n  var initialTime = Date.now();\n\n  exports.unstable_now = function () {\n    return Date.now() - initialTime;\n  };\n\n  requestHostCallback = function (cb) {\n    if (_callback !== null) {\n      // Protect against re-entrancy.\n      setTimeout(requestHostCallback, 0, cb);\n    } else {\n      _callback = cb;\n      setTimeout(_flushCallback, 0);\n    }\n  };\n\n  requestHostTimeout = function (cb, ms) {\n    _timeoutID = setTimeout(cb, ms);\n  };\n\n  cancelHostTimeout = function () {\n    clearTimeout(_timeoutID);\n  };\n\n  shouldYieldToHost = function () {\n    return false;\n  };\n\n  requestPaint = exports.unstable_forceFrameRate = function () {};\n} else {\n  // Capture local references to native APIs, in case a polyfill overrides them.\n  var performance = window.performance;\n  var _Date = window.Date;\n  var _setTimeout = window.setTimeout;\n  var _clearTimeout = window.clearTimeout;\n\n  if (typeof console !== 'undefined') {\n    // TODO: Scheduler no longer requires these methods to be polyfilled. But\n    // maybe we want to continue warning if they don't exist, to preserve the\n    // option to rely on it in the future?\n    var requestAnimationFrame = window.requestAnimationFrame;\n    var cancelAnimationFrame = window.cancelAnimationFrame; // TODO: Remove fb.me link\n\n    if (typeof requestAnimationFrame !== 'function') {\n      console.error(\"This browser doesn't support requestAnimationFrame. \" + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');\n    }\n\n    if (typeof cancelAnimationFrame !== 'function') {\n      console.error(\"This browser doesn't support cancelAnimationFrame. \" + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');\n    }\n  }\n\n  if (typeof performance === 'object' && typeof performance.now === 'function') {\n    exports.unstable_now = function () {\n      return performance.now();\n    };\n  } else {\n    var _initialTime = _Date.now();\n\n    exports.unstable_now = function () {\n      return _Date.now() - _initialTime;\n    };\n  }\n\n  var isMessageLoopRunning = false;\n  var scheduledHostCallback = null;\n  var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main\n  // thread, like user events. By default, it yields multiple times per frame.\n  // It does not attempt to align with frame boundaries, since most tasks don't\n  // need to be frame aligned; for those that do, use requestAnimationFrame.\n\n  var yieldInterval = 5;\n  var deadline = 0; // TODO: Make this configurable\n  // TODO: Adjust this based on priority?\n\n  var maxYieldInterval = 300;\n  var needsPaint = false;\n\n  if (enableIsInputPending && navigator !== undefined && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined) {\n    var scheduling = navigator.scheduling;\n\n    shouldYieldToHost = function () {\n      var currentTime = exports.unstable_now();\n\n      if (currentTime >= deadline) {\n        // There's no time left. We may want to yield control of the main\n        // thread, so the browser can perform high priority tasks. The main ones\n        // are painting and user input. If there's a pending paint or a pending\n        // input, then we should yield. But if there's neither, then we can\n        // yield less often while remaining responsive. We'll eventually yield\n        // regardless, since there could be a pending paint that wasn't\n        // accompanied by a call to `requestPaint`, or other main thread tasks\n        // like network events.\n        if (needsPaint || scheduling.isInputPending()) {\n          // There is either a pending paint or a pending input.\n          return true;\n        } // There's no pending input. Only yield if we've reached the max\n        // yield interval.\n\n\n        return currentTime >= maxYieldInterval;\n      } else {\n        // There's still time left in the frame.\n        return false;\n      }\n    };\n\n    requestPaint = function () {\n      needsPaint = true;\n    };\n  } else {\n    // `isInputPending` is not available. Since we have no way of knowing if\n    // there's pending input, always yield at the end of the frame.\n    shouldYieldToHost = function () {\n      return exports.unstable_now() >= deadline;\n    }; // Since we yield every frame regardless, `requestPaint` has no effect.\n\n\n    requestPaint = function () {};\n  }\n\n  exports.unstable_forceFrameRate = function (fps) {\n    if (fps < 0 || fps > 125) {\n      console.error('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing framerates higher than 125 fps is not unsupported');\n      return;\n    }\n\n    if (fps > 0) {\n      yieldInterval = Math.floor(1000 / fps);\n    } else {\n      // reset the framerate\n      yieldInterval = 5;\n    }\n  };\n\n  var performWorkUntilDeadline = function () {\n    if (scheduledHostCallback !== null) {\n      var currentTime = exports.unstable_now(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync\n      // cycle. This means there's always time remaining at the beginning of\n      // the message event.\n\n      deadline = currentTime + yieldInterval;\n      var hasTimeRemaining = true;\n\n      try {\n        var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);\n\n        if (!hasMoreWork) {\n          isMessageLoopRunning = false;\n          scheduledHostCallback = null;\n        } else {\n          // If there's more work, schedule the next message event at the end\n          // of the preceding one.\n          port.postMessage(null);\n        }\n      } catch (error) {\n        // If a scheduler task throws, exit the current browser task so the\n        // error can be observed.\n        port.postMessage(null);\n        throw error;\n      }\n    } else {\n      isMessageLoopRunning = false;\n    } // Yielding to the browser will give it a chance to paint, so we can\n    // reset this.\n\n\n    needsPaint = false;\n  };\n\n  var channel = new MessageChannel();\n  var port = channel.port2;\n  channel.port1.onmessage = performWorkUntilDeadline;\n\n  requestHostCallback = function (callback) {\n    scheduledHostCallback = callback;\n\n    if (!isMessageLoopRunning) {\n      isMessageLoopRunning = true;\n      port.postMessage(null);\n    }\n  };\n\n  requestHostTimeout = function (callback, ms) {\n    taskTimeoutID = _setTimeout(function () {\n      callback(exports.unstable_now());\n    }, ms);\n  };\n\n  cancelHostTimeout = function () {\n    _clearTimeout(taskTimeoutID);\n\n    taskTimeoutID = -1;\n  };\n}\n\nfunction push(heap, node) {\n  var index = heap.length;\n  heap.push(node);\n  siftUp(heap, node, index);\n}\nfunction peek(heap) {\n  var first = heap[0];\n  return first === undefined ? null : first;\n}\nfunction pop(heap) {\n  var first = heap[0];\n\n  if (first !== undefined) {\n    var last = heap.pop();\n\n    if (last !== first) {\n      heap[0] = last;\n      siftDown(heap, last, 0);\n    }\n\n    return first;\n  } else {\n    return null;\n  }\n}\n\nfunction siftUp(heap, node, i) {\n  var index = i;\n\n  while (true) {\n    var parentIndex = Math.floor((index - 1) / 2);\n    var parent = heap[parentIndex];\n\n    if (parent !== undefined && compare(parent, node) > 0) {\n      // The parent is larger. Swap positions.\n      heap[parentIndex] = node;\n      heap[index] = parent;\n      index = parentIndex;\n    } else {\n      // The parent is smaller. Exit.\n      return;\n    }\n  }\n}\n\nfunction siftDown(heap, node, i) {\n  var index = i;\n  var length = heap.length;\n\n  while (index < length) {\n    var leftIndex = (index + 1) * 2 - 1;\n    var left = heap[leftIndex];\n    var rightIndex = leftIndex + 1;\n    var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.\n\n    if (left !== undefined && compare(left, node) < 0) {\n      if (right !== undefined && compare(right, left) < 0) {\n        heap[index] = right;\n        heap[rightIndex] = node;\n        index = rightIndex;\n      } else {\n        heap[index] = left;\n        heap[leftIndex] = node;\n        index = leftIndex;\n      }\n    } else if (right !== undefined && compare(right, node) < 0) {\n      heap[index] = right;\n      heap[rightIndex] = node;\n      index = rightIndex;\n    } else {\n      // Neither child is smaller. Exit.\n      return;\n    }\n  }\n}\n\nfunction compare(a, b) {\n  // Compare sort index first, then task id.\n  var diff = a.sortIndex - b.sortIndex;\n  return diff !== 0 ? diff : a.id - b.id;\n}\n\n// TODO: Use symbols?\nvar NoPriority = 0;\nvar ImmediatePriority = 1;\nvar UserBlockingPriority = 2;\nvar NormalPriority = 3;\nvar LowPriority = 4;\nvar IdlePriority = 5;\n\nvar runIdCounter = 0;\nvar mainThreadIdCounter = 0;\nvar profilingStateSize = 4;\nvar sharedProfilingBuffer = enableProfiling ? // $FlowFixMe Flow doesn't know about SharedArrayBuffer\ntypeof SharedArrayBuffer === 'function' ? new SharedArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : // $FlowFixMe Flow doesn't know about ArrayBuffer\ntypeof ArrayBuffer === 'function' ? new ArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : null // Don't crash the init path on IE9\n: null;\nvar profilingState = enableProfiling && sharedProfilingBuffer !== null ? new Int32Array(sharedProfilingBuffer) : []; // We can't read this but it helps save bytes for null checks\n\nvar PRIORITY = 0;\nvar CURRENT_TASK_ID = 1;\nvar CURRENT_RUN_ID = 2;\nvar QUEUE_SIZE = 3;\n\nif (enableProfiling) {\n  profilingState[PRIORITY] = NoPriority; // This is maintained with a counter, because the size of the priority queue\n  // array might include canceled tasks.\n\n  profilingState[QUEUE_SIZE] = 0;\n  profilingState[CURRENT_TASK_ID] = 0;\n} // Bytes per element is 4\n\n\nvar INITIAL_EVENT_LOG_SIZE = 131072;\nvar MAX_EVENT_LOG_SIZE = 524288; // Equivalent to 2 megabytes\n\nvar eventLogSize = 0;\nvar eventLogBuffer = null;\nvar eventLog = null;\nvar eventLogIndex = 0;\nvar TaskStartEvent = 1;\nvar TaskCompleteEvent = 2;\nvar TaskErrorEvent = 3;\nvar TaskCancelEvent = 4;\nvar TaskRunEvent = 5;\nvar TaskYieldEvent = 6;\nvar SchedulerSuspendEvent = 7;\nvar SchedulerResumeEvent = 8;\n\nfunction logEvent(entries) {\n  if (eventLog !== null) {\n    var offset = eventLogIndex;\n    eventLogIndex += entries.length;\n\n    if (eventLogIndex + 1 > eventLogSize) {\n      eventLogSize *= 2;\n\n      if (eventLogSize > MAX_EVENT_LOG_SIZE) {\n        console.error(\"Scheduler Profiling: Event log exceeded maximum size. Don't \" + 'forget to call `stopLoggingProfilingEvents()`.');\n        stopLoggingProfilingEvents();\n        return;\n      }\n\n      var newEventLog = new Int32Array(eventLogSize * 4);\n      newEventLog.set(eventLog);\n      eventLogBuffer = newEventLog.buffer;\n      eventLog = newEventLog;\n    }\n\n    eventLog.set(entries, offset);\n  }\n}\n\nfunction startLoggingProfilingEvents() {\n  eventLogSize = INITIAL_EVENT_LOG_SIZE;\n  eventLogBuffer = new ArrayBuffer(eventLogSize * 4);\n  eventLog = new Int32Array(eventLogBuffer);\n  eventLogIndex = 0;\n}\nfunction stopLoggingProfilingEvents() {\n  var buffer = eventLogBuffer;\n  eventLogSize = 0;\n  eventLogBuffer = null;\n  eventLog = null;\n  eventLogIndex = 0;\n  return buffer;\n}\nfunction markTaskStart(task, ms) {\n  if (enableProfiling) {\n    profilingState[QUEUE_SIZE]++;\n\n    if (eventLog !== null) {\n      // performance.now returns a float, representing milliseconds. When the\n      // event is logged, it's coerced to an int. Convert to microseconds to\n      // maintain extra degrees of precision.\n      logEvent([TaskStartEvent, ms * 1000, task.id, task.priorityLevel]);\n    }\n  }\n}\nfunction markTaskCompleted(task, ms) {\n  if (enableProfiling) {\n    profilingState[PRIORITY] = NoPriority;\n    profilingState[CURRENT_TASK_ID] = 0;\n    profilingState[QUEUE_SIZE]--;\n\n    if (eventLog !== null) {\n      logEvent([TaskCompleteEvent, ms * 1000, task.id]);\n    }\n  }\n}\nfunction markTaskCanceled(task, ms) {\n  if (enableProfiling) {\n    profilingState[QUEUE_SIZE]--;\n\n    if (eventLog !== null) {\n      logEvent([TaskCancelEvent, ms * 1000, task.id]);\n    }\n  }\n}\nfunction markTaskErrored(task, ms) {\n  if (enableProfiling) {\n    profilingState[PRIORITY] = NoPriority;\n    profilingState[CURRENT_TASK_ID] = 0;\n    profilingState[QUEUE_SIZE]--;\n\n    if (eventLog !== null) {\n      logEvent([TaskErrorEvent, ms * 1000, task.id]);\n    }\n  }\n}\nfunction markTaskRun(task, ms) {\n  if (enableProfiling) {\n    runIdCounter++;\n    profilingState[PRIORITY] = task.priorityLevel;\n    profilingState[CURRENT_TASK_ID] = task.id;\n    profilingState[CURRENT_RUN_ID] = runIdCounter;\n\n    if (eventLog !== null) {\n      logEvent([TaskRunEvent, ms * 1000, task.id, runIdCounter]);\n    }\n  }\n}\nfunction markTaskYield(task, ms) {\n  if (enableProfiling) {\n    profilingState[PRIORITY] = NoPriority;\n    profilingState[CURRENT_TASK_ID] = 0;\n    profilingState[CURRENT_RUN_ID] = 0;\n\n    if (eventLog !== null) {\n      logEvent([TaskYieldEvent, ms * 1000, task.id, runIdCounter]);\n    }\n  }\n}\nfunction markSchedulerSuspended(ms) {\n  if (enableProfiling) {\n    mainThreadIdCounter++;\n\n    if (eventLog !== null) {\n      logEvent([SchedulerSuspendEvent, ms * 1000, mainThreadIdCounter]);\n    }\n  }\n}\nfunction markSchedulerUnsuspended(ms) {\n  if (enableProfiling) {\n    if (eventLog !== null) {\n      logEvent([SchedulerResumeEvent, ms * 1000, mainThreadIdCounter]);\n    }\n  }\n}\n\n/* eslint-disable no-var */\n// Math.pow(2, 30) - 1\n// 0b111111111111111111111111111111\n\nvar maxSigned31BitInt = 1073741823; // Times out immediately\n\nvar IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out\n\nvar USER_BLOCKING_PRIORITY = 250;\nvar NORMAL_PRIORITY_TIMEOUT = 5000;\nvar LOW_PRIORITY_TIMEOUT = 10000; // Never times out\n\nvar IDLE_PRIORITY = maxSigned31BitInt; // Tasks are stored on a min heap\n\nvar taskQueue = [];\nvar timerQueue = []; // Incrementing id counter. Used to maintain insertion order.\n\nvar taskIdCounter = 1; // Pausing the scheduler is useful for debugging.\n\nvar isSchedulerPaused = false;\nvar currentTask = null;\nvar currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.\n\nvar isPerformingWork = false;\nvar isHostCallbackScheduled = false;\nvar isHostTimeoutScheduled = false;\n\nfunction advanceTimers(currentTime) {\n  // Check for tasks that are no longer delayed and add them to the queue.\n  var timer = peek(timerQueue);\n\n  while (timer !== null) {\n    if (timer.callback === null) {\n      // Timer was cancelled.\n      pop(timerQueue);\n    } else if (timer.startTime <= currentTime) {\n      // Timer fired. Transfer to the task queue.\n      pop(timerQueue);\n      timer.sortIndex = timer.expirationTime;\n      push(taskQueue, timer);\n\n      if (enableProfiling) {\n        markTaskStart(timer, currentTime);\n        timer.isQueued = true;\n      }\n    } else {\n      // Remaining timers are pending.\n      return;\n    }\n\n    timer = peek(timerQueue);\n  }\n}\n\nfunction handleTimeout(currentTime) {\n  isHostTimeoutScheduled = false;\n  advanceTimers(currentTime);\n\n  if (!isHostCallbackScheduled) {\n    if (peek(taskQueue) !== null) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    } else {\n      var firstTimer = peek(timerQueue);\n\n      if (firstTimer !== null) {\n        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n      }\n    }\n  }\n}\n\nfunction flushWork(hasTimeRemaining, initialTime) {\n  if (enableProfiling) {\n    markSchedulerUnsuspended(initialTime);\n  } // We'll need a host callback the next time work is scheduled.\n\n\n  isHostCallbackScheduled = false;\n\n  if (isHostTimeoutScheduled) {\n    // We scheduled a timeout but it's no longer needed. Cancel it.\n    isHostTimeoutScheduled = false;\n    cancelHostTimeout();\n  }\n\n  isPerformingWork = true;\n  var previousPriorityLevel = currentPriorityLevel;\n\n  try {\n    if (enableProfiling) {\n      try {\n        return workLoop(hasTimeRemaining, initialTime);\n      } catch (error) {\n        if (currentTask !== null) {\n          var currentTime = exports.unstable_now();\n          markTaskErrored(currentTask, currentTime);\n          currentTask.isQueued = false;\n        }\n\n        throw error;\n      }\n    } else {\n      // No catch in prod codepath.\n      return workLoop(hasTimeRemaining, initialTime);\n    }\n  } finally {\n    currentTask = null;\n    currentPriorityLevel = previousPriorityLevel;\n    isPerformingWork = false;\n\n    if (enableProfiling) {\n      var _currentTime = exports.unstable_now();\n\n      markSchedulerSuspended(_currentTime);\n    }\n  }\n}\n\nfunction workLoop(hasTimeRemaining, initialTime) {\n  var currentTime = initialTime;\n  advanceTimers(currentTime);\n  currentTask = peek(taskQueue);\n\n  while (currentTask !== null && !(enableSchedulerDebugging && isSchedulerPaused)) {\n    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {\n      // This currentTask hasn't expired, and we've reached the deadline.\n      break;\n    }\n\n    var callback = currentTask.callback;\n\n    if (callback !== null) {\n      currentTask.callback = null;\n      currentPriorityLevel = currentTask.priorityLevel;\n      var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;\n      markTaskRun(currentTask, currentTime);\n      var continuationCallback = callback(didUserCallbackTimeout);\n      currentTime = exports.unstable_now();\n\n      if (typeof continuationCallback === 'function') {\n        currentTask.callback = continuationCallback;\n        markTaskYield(currentTask, currentTime);\n      } else {\n        if (enableProfiling) {\n          markTaskCompleted(currentTask, currentTime);\n          currentTask.isQueued = false;\n        }\n\n        if (currentTask === peek(taskQueue)) {\n          pop(taskQueue);\n        }\n      }\n\n      advanceTimers(currentTime);\n    } else {\n      pop(taskQueue);\n    }\n\n    currentTask = peek(taskQueue);\n  } // Return whether there's additional work\n\n\n  if (currentTask !== null) {\n    return true;\n  } else {\n    var firstTimer = peek(timerQueue);\n\n    if (firstTimer !== null) {\n      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n    }\n\n    return false;\n  }\n}\n\nfunction unstable_runWithPriority(priorityLevel, eventHandler) {\n  switch (priorityLevel) {\n    case ImmediatePriority:\n    case UserBlockingPriority:\n    case NormalPriority:\n    case LowPriority:\n    case IdlePriority:\n      break;\n\n    default:\n      priorityLevel = NormalPriority;\n  }\n\n  var previousPriorityLevel = currentPriorityLevel;\n  currentPriorityLevel = priorityLevel;\n\n  try {\n    return eventHandler();\n  } finally {\n    currentPriorityLevel = previousPriorityLevel;\n  }\n}\n\nfunction unstable_next(eventHandler) {\n  var priorityLevel;\n\n  switch (currentPriorityLevel) {\n    case ImmediatePriority:\n    case UserBlockingPriority:\n    case NormalPriority:\n      // Shift down to normal priority\n      priorityLevel = NormalPriority;\n      break;\n\n    default:\n      // Anything lower than normal priority should remain at the current level.\n      priorityLevel = currentPriorityLevel;\n      break;\n  }\n\n  var previousPriorityLevel = currentPriorityLevel;\n  currentPriorityLevel = priorityLevel;\n\n  try {\n    return eventHandler();\n  } finally {\n    currentPriorityLevel = previousPriorityLevel;\n  }\n}\n\nfunction unstable_wrapCallback(callback) {\n  var parentPriorityLevel = currentPriorityLevel;\n  return function () {\n    // This is a fork of runWithPriority, inlined for performance.\n    var previousPriorityLevel = currentPriorityLevel;\n    currentPriorityLevel = parentPriorityLevel;\n\n    try {\n      return callback.apply(this, arguments);\n    } finally {\n      currentPriorityLevel = previousPriorityLevel;\n    }\n  };\n}\n\nfunction timeoutForPriorityLevel(priorityLevel) {\n  switch (priorityLevel) {\n    case ImmediatePriority:\n      return IMMEDIATE_PRIORITY_TIMEOUT;\n\n    case UserBlockingPriority:\n      return USER_BLOCKING_PRIORITY;\n\n    case IdlePriority:\n      return IDLE_PRIORITY;\n\n    case LowPriority:\n      return LOW_PRIORITY_TIMEOUT;\n\n    case NormalPriority:\n    default:\n      return NORMAL_PRIORITY_TIMEOUT;\n  }\n}\n\nfunction unstable_scheduleCallback(priorityLevel, callback, options) {\n  var currentTime = exports.unstable_now();\n  var startTime;\n  var timeout;\n\n  if (typeof options === 'object' && options !== null) {\n    var delay = options.delay;\n\n    if (typeof delay === 'number' && delay > 0) {\n      startTime = currentTime + delay;\n    } else {\n      startTime = currentTime;\n    }\n\n    timeout = typeof options.timeout === 'number' ? options.timeout : timeoutForPriorityLevel(priorityLevel);\n  } else {\n    timeout = timeoutForPriorityLevel(priorityLevel);\n    startTime = currentTime;\n  }\n\n  var expirationTime = startTime + timeout;\n  var newTask = {\n    id: taskIdCounter++,\n    callback: callback,\n    priorityLevel: priorityLevel,\n    startTime: startTime,\n    expirationTime: expirationTime,\n    sortIndex: -1\n  };\n\n  if (enableProfiling) {\n    newTask.isQueued = false;\n  }\n\n  if (startTime > currentTime) {\n    // This is a delayed task.\n    newTask.sortIndex = startTime;\n    push(timerQueue, newTask);\n\n    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {\n      // All tasks are delayed, and this is the task with the earliest delay.\n      if (isHostTimeoutScheduled) {\n        // Cancel an existing timeout.\n        cancelHostTimeout();\n      } else {\n        isHostTimeoutScheduled = true;\n      } // Schedule a timeout.\n\n\n      requestHostTimeout(handleTimeout, startTime - currentTime);\n    }\n  } else {\n    newTask.sortIndex = expirationTime;\n    push(taskQueue, newTask);\n\n    if (enableProfiling) {\n      markTaskStart(newTask, currentTime);\n      newTask.isQueued = true;\n    } // Schedule a host callback, if needed. If we're already performing work,\n    // wait until the next time we yield.\n\n\n    if (!isHostCallbackScheduled && !isPerformingWork) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    }\n  }\n\n  return newTask;\n}\n\nfunction unstable_pauseExecution() {\n  isSchedulerPaused = true;\n}\n\nfunction unstable_continueExecution() {\n  isSchedulerPaused = false;\n\n  if (!isHostCallbackScheduled && !isPerformingWork) {\n    isHostCallbackScheduled = true;\n    requestHostCallback(flushWork);\n  }\n}\n\nfunction unstable_getFirstCallbackNode() {\n  return peek(taskQueue);\n}\n\nfunction unstable_cancelCallback(task) {\n  if (enableProfiling) {\n    if (task.isQueued) {\n      var currentTime = exports.unstable_now();\n      markTaskCanceled(task, currentTime);\n      task.isQueued = false;\n    }\n  } // Null out the callback to indicate the task has been canceled. (Can't\n  // remove from the queue because you can't remove arbitrary nodes from an\n  // array based heap, only the first one.)\n\n\n  task.callback = null;\n}\n\nfunction unstable_getCurrentPriorityLevel() {\n  return currentPriorityLevel;\n}\n\nfunction unstable_shouldYield() {\n  var currentTime = exports.unstable_now();\n  advanceTimers(currentTime);\n  var firstTask = peek(taskQueue);\n  return firstTask !== currentTask && currentTask !== null && firstTask !== null && firstTask.callback !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();\n}\n\nvar unstable_requestPaint = requestPaint;\nvar unstable_Profiling = enableProfiling ? {\n  startLoggingProfilingEvents: startLoggingProfilingEvents,\n  stopLoggingProfilingEvents: stopLoggingProfilingEvents,\n  sharedProfilingBuffer: sharedProfilingBuffer\n} : null;\n\nexports.unstable_ImmediatePriority = ImmediatePriority;\nexports.unstable_UserBlockingPriority = UserBlockingPriority;\nexports.unstable_NormalPriority = NormalPriority;\nexports.unstable_IdlePriority = IdlePriority;\nexports.unstable_LowPriority = LowPriority;\nexports.unstable_runWithPriority = unstable_runWithPriority;\nexports.unstable_next = unstable_next;\nexports.unstable_scheduleCallback = unstable_scheduleCallback;\nexports.unstable_cancelCallback = unstable_cancelCallback;\nexports.unstable_wrapCallback = unstable_wrapCallback;\nexports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;\nexports.unstable_shouldYield = unstable_shouldYield;\nexports.unstable_requestPaint = unstable_requestPaint;\nexports.unstable_continueExecution = unstable_continueExecution;\nexports.unstable_pauseExecution = unstable_pauseExecution;\nexports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;\nexports.unstable_Profiling = unstable_Profiling;\n  })();\n}\n\n\n//# sourceURL=webpack:///./node_modules/scheduler/cjs/scheduler.development.js?");

/***/ }),

/***/ "./node_modules/scheduler/index.js":
/*!*****************************************!*\
  !*** ./node_modules/scheduler/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ \"./node_modules/scheduler/cjs/scheduler.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/scheduler/index.js?");

/***/ }),

/***/ "./node_modules/scheduler/tracing.js":
/*!*******************************************!*\
  !*** ./node_modules/scheduler/tracing.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler-tracing.development.js */ \"./node_modules/scheduler/cjs/scheduler-tracing.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/scheduler/tracing.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/app.css":
/*!*********************!*\
  !*** ./src/app.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../node_modules/css-loader!./app.css */ \"./node_modules/css-loader/index.js!./src/app.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../node_modules/css-loader!./app.css */ \"./node_modules/css-loader/index.js!./src/app.css\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../node_modules/css-loader!./app.css */ \"./node_modules/css-loader/index.js!./src/app.css\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/app.css?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../../../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.css */ \"./src/app.css\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(App, _Component);\n\n  function App() {\n    _classCallCheck(this, App);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"App\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Rebecca Rossman Portfolio\"));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../../../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.js */ \"./src/app.js\");\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), document.getElementById('root'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });