/**
 * @name CompleteTimestamps
 * @author DevilBro
 * @authorId 278543574059057154
 * @version 1.5.5
 * @description Replaces Timestamps with your own custom Timestamps
 * @invite Jx3TjNS
 * @donate https://www.paypal.me/MircoWittrien
 * @patreon https://www.patreon.com/MircoWittrien
 * @website https://mwittrien.github.io/
 * @source https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/CompleteTimestamps/
 * @updateUrl https://mwittrien.github.io/BetterDiscordAddons/Plugins/CompleteTimestamps/CompleteTimestamps.plugin.js
 */

module.exports = (_ => {
	const config = {
		"info": {
			"name": "CompleteTimestamps",
			"author": "DevilBro",
			"version": "1.5.5",
			"description": "Replaces Timestamps with your own custom Timestamps"
		},
		"changeLog": {
			"improved": {
				"New Settings": "Changed the Settings Panel for the Plugin, Settings got reset sowwy ~w~"
			}
		}
	};

	return !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
		getName () {return config.info.name;}
		getAuthor () {return config.info.author;}
		getVersion () {return config.info.version;}
		getDescription () {return `The Library Plugin needed for ${config.info.name} is missing. Open the Plugin Settings to download it. \n\n${config.info.description}`;}
		
		downloadLibrary () {
			require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
				if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", {type: "success"}));
				else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
			});
		}
		
		load () {
			if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, {pluginQueue: []});
			if (!window.BDFDB_Global.downloadModal) {
				window.BDFDB_Global.downloadModal = true;
				BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`, {
					confirmText: "Download Now",
					cancelText: "Cancel",
					onCancel: _ => {delete window.BDFDB_Global.downloadModal;},
					onConfirm: _ => {
						delete window.BDFDB_Global.downloadModal;
						this.downloadLibrary();
					}
				});
			}
			if (!window.BDFDB_Global.pluginQueue.includes(config.info.name)) window.BDFDB_Global.pluginQueue.push(config.info.name);
		}
		start () {this.load();}
		stop () {}
		getSettingsPanel () {
			let template = document.createElement("template");
			template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${config.info.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
			template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
			return template.content.firstElementChild;
		}
	} : (([Plugin, BDFDB]) => {
		var currentMode, tooltipIsSame;
	
		return class CompleteTimestamps extends Plugin {
			onLoad () {
				this.defaults = {
					general: {
						showInChat:				{value: true, 			description: "Replace Chat Timestamps with complete Timestamps"},
						showInEmbed:			{value: true, 			description: "Replace Embed Timestamps with complete Timestamps"},
						showInAuditLogs:		{value: true, 			description: "Replace Audit Log Timestamps with complete Timestamps"},
						changeForChat:			{value: true, 			description: "Change the Time for Chat Time Tooltips"},
						changeForEdit:			{value: true, 			description: "Change the Time for Edited Time Tooltips"}
					},
					dates: {
						timestampDate:			{value: {}, 			description: "Chat Timestamp"},
						tooltipDate:			{value: {}, 			description: "Tooltip Timestamp"}
					}
				};
				
				this.patchedModules = {
					after: {
						Message: "default",
						MessageHeader: "default",
						MessageContent: "type",
						Embed: "render",
						SystemMessage: "default",
						AuditLog: "render"
					}
				};
				
				this.css = `
					${BDFDB.dotCN.messagetimestamp} {
						z-index: 1;
					}
				`;
			}
			
			onStart () {
				this.forceUpdateAll();
			}
			
			onStop () {
				this.forceUpdateAll();
				
				BDFDB.DOMUtils.removeLocalStyle(this.name + "CompactCorrection");
			}

			getSettingsPanel (collapseStates = {}) {
				let settingsPanel;
				return settingsPanel = BDFDB.PluginUtils.createSettingsPanel(this, {
					collapseStates: collapseStates,
					children: _ => {
						let settingsItems = [];
						
						settingsItems.push(Object.keys(this.defaults.general).map(key => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
							type: "Switch",
							plugin: this,
							keys: ["general", key],
							label: this.defaults.general[key].description,
							value: this.settings.general[key]
						})));
						
						settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.FormComponents.FormDivider, {
							className: BDFDB.disCN.marginbottom8
						}));
						
						settingsItems.push(Object.keys(this.defaults.dates).map(key => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.DateInput, Object.assign({}, this.settings.dates[key], {
							label: this.defaults.dates[key].description,
							onChange: valueObj => {
								this.SettingsUpdated = true;
								this.settings.dates[key] = valueObj;
								BDFDB.DataUtils.save(this.settings.dates, this, "dates");
							}
						}))));
						
						return settingsItems.flat(10);
					}
				});
			}

			onSettingsClosed () {
				if (this.SettingsUpdated) {
					delete this.SettingsUpdated;
					this.forceUpdateAll();
				}
			}
		
			forceUpdateAll () {
				currentMode = null;
				tooltipIsSame = BDFDB.equals(this.settings.dates.timestampDate, this.settings.dates.tooltipDate);
				
				BDFDB.PatchUtils.forceAllUpdates(this);
				BDFDB.MessageUtils.rerenderAll();
			}

			processMessage (e) {
				if (this.settings.general.changeForChat && BDFDB.ObjectUtils.get(e, "instance.props.childrenHeader.type.type.displayName") == "MessageTimestamp") {
					let [children, index] = BDFDB.ReactUtils.findParent(e.returnvalue, {name: e.instance.props.childrenHeader.type});
					if (index > -1) this.changeTimestamp(children, index, {child: false, tooltip: true});
				}
			}
			
			processMessageHeader (e) {
				let [children, index] = BDFDB.ReactUtils.findParent(e.returnvalue, {name: "MessageTimestamp"});
				if (index > -1) {
					this.changeTimestamp(children, index, {child: this.settings.general.showInChat, tooltip: this.settings.general.changeForChat});
					this.setMaxWidth(children[index], e.instance.props.compact);
				}
			}
			
			processMessageContent (e) {
				if (e.instance.props.message.editedTimestamp && this.settings.general.changeForEdit) {
					let [children, index] = BDFDB.ReactUtils.findParent(e.returnvalue, {name: "SuffixEdited"});
					if (index > -1) this.changeTimestamp(children, index, {child: false, tooltip: true});
				}
			}

			processEmbed (e) {
				if (e.instance.props.embed && e.instance.props.embed.timestamp && this.settings.general.showInEmbed) {
					let process = returnvalue => {
						let [children, index] = BDFDB.ReactUtils.findParent(returnvalue, {props: [["className", BDFDB.disCN.embedfootertext]]});
						if (index > -1) {
							if (BDFDB.ArrayUtils.is(children[index].props.children)) children[index].props.children[children[index].props.children.length - 1] = this.formatTimestamp(this.settings.dates.timestampDate, e.instance.props.embed.timestamp._i);
							else children[index].props.children = this.formatTimestamp(this.settings.dates.timestampDate, e.instance.props.embed.timestamp._i);
						}
					};
					if (typeof e.returnvalue.props.children == "function") {
						let childrenRender = e.returnvalue.props.children;
						e.returnvalue.props.children = (...args) => {
							let children = childrenRender(...args);
							process(children);
							return children;
						};
					}
					else process(e.returnvalue);
				}
			}

			processSystemMessage (e) {
				if (e.instance.props.timestamp && this.settings.general.showInChat) {
					let [children, index] = BDFDB.ReactUtils.findParent(e.returnvalue, {name: "time"});
					if (index > -1) children[index].props.children = this.formatTimestamp(this.settings.dates.timestampDate, e.instance.props.timestamp._i);
				}
			}

			processAuditLog (e) {
				if (e.instance.props.log && this.settings.general.showInAuditLogs) {
					if (typeof e.returnvalue.props.children == "function") {
						let childrenRender = e.returnvalue.props.children;
						e.returnvalue.props.children = (...args) => {
							let children = childrenRender(...args);
							this.editLog(e.instance.props.log, children);
							return children;
						};
					}
					else this.editLog(e.instance.props.log, e.returnvalue);
				}
			}
			
			editLog (log, returnvalue) {
				if (!log || !returnvalue) return;
				let [children, index] = BDFDB.ReactUtils.findParent(returnvalue, {props: [["className", "timestamp-1mruiI"]]});
				if (index > -1) children[index].props.children = this.formatTimestamp(this.settings.dates.timestampDate, log.timestampStart._i);
			}
			
			changeTimestamp (parent, index, change = {}) {
				let type = parent[index].type && parent[index].type.type || parent[index].type;
				if (typeof type != "function") return;
				let stamp = type(parent[index].props), tooltipWrapper;
				if (stamp.type.displayName == "Tooltip") tooltipWrapper = stamp;
				else {
					let [children, tooltipIndex] = BDFDB.ReactUtils.findParent(stamp, {name: "Tooltip"});
					if (tooltipIndex > -1) tooltipWrapper = children[tooltipIndex];
				}
				if (tooltipWrapper) {
					if (change.tooltip) {
						tooltipWrapper.props.text = this.formatTimestamp(this.settings.dates.tooltipDate, parent[index].props.timestamp._i, true);
						tooltipWrapper.props.delay = 0;
					}
					if (change.child && typeof tooltipWrapper.props.children == "function") {
						if (tooltipIsSame) tooltipWrapper.props.delay = 99999999999999999999;
						let timestamp = this.formatTimestamp(this.settings.dates.timestampDate, parent[index].props.timestamp._i);
						let renderChildren = tooltipWrapper.props.children;
						tooltipWrapper.props.children = (...args) => {
							let renderedChildren = renderChildren(...args);
							if (BDFDB.ArrayUtils.is(renderedChildren.props.children)) renderedChildren.props.children[1] = timestamp;
							else renderChildren.props.children = timestamp;
							return renderedChildren;
						};
					}
				}
				parent[index] = stamp;
			}
			
			formatTimestamp (format, date) {
				return BDFDB.LibraryModules.StringUtils.upperCaseFirstChar(BDFDB.LibraryComponents.DateInput.format(format, date));
			}
			
			setMaxWidth (timestamp, compact) {
				if (currentMode != compact) {
					currentMode = compact;
					if (timestamp.props.className && typeof timestamp.type == "string") {
						let tempTimestamp = BDFDB.DOMUtils.create(`<div class="${BDFDB.disCN.messagecompact}"><${timestamp.type} class="${timestamp.props.className}" style="width: auto !important;">${this.formatTimestamp(this.settings.dates.timestampDate, new Date(253402124399995))}</${timestamp.type}></div>`);
						document.body.appendChild(tempTimestamp);
						let width = BDFDB.DOMUtils.getRects(tempTimestamp.firstElementChild).width + 10;
						tempTimestamp.remove();
						BDFDB.DOMUtils.appendLocalStyle(this.name + "CompactCorrection", `
							${BDFDB.dotCN.messagecompact + BDFDB.dotCN.messagewrapper} {
								padding-left: ${44 + width}px;
							}
							${BDFDB.dotCNS.messagecompact + BDFDB.dotCN.messagecontents} {
								margin-left: -${44 + width}px;
								padding-left: ${44 + width}px;
								text-indent: calc(-${44 + width}px - -1rem);
							}
							${BDFDB.dotCNS.messagecompact + BDFDB.dotCN.messagetimestamp} {
								width: ${width}px;
							}
						`);
					}
					 
				}
			}
		};
	})(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();
