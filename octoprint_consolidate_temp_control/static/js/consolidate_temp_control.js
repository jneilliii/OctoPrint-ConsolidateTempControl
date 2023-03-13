$(function() {
	function ConsolidateTempControlViewModel(parameters) {
		var self = this;

		self.controlViewModel = parameters[0];
		self.temperatureViewModel = parameters[1];
		self.settings = parameters[2];
		self.touchui = parameters[3];
		self.dragonorder = parameters[4];
		self.webcamtab = parameters[5];
		self.uicustomizer = parameters[6];
        self.classicWebcamViewModel = parameters[7];
		self.tab_order_selector = ko.pureComputed(function(){
								var tabs = ko.utils.arrayMap(self.settings.settings.plugins.consolidate_temp_control.tab_order(), function(tab) {
										return tab.selector();
									});
								return tabs;
							});

		self.onBeforeBinding = function(){
			// don't load when touchui is active and hide tab.
			if (self.touchui && self.touchui.isActive()) {
				$('#tab_plugin_consolidate_temp_control_link, #tab_plugin_consolidate_temp_control').remove();
				return;
			}

			// move original temp and control tab content and remove tab links.
			ko.utils.arrayForEach(self.tab_order_selector(), function(tab) {
				$(tab).appendTo('#tab_plugin_consolidate_temp_control > div.row-fluid').removeClass('tab-pane');
			});
			$('#temp_link, #control_link, #tab_plugin_plotlytempgraph_link').remove();

			if(self.settings.settings.plugins.consolidate_temp_control.layout() == 'horizontal' && (screen.width >= parseInt(self.settings.settings.plugins.consolidate_temp_control.resolution_threshold(), 10) && self.settings.settings.plugins.consolidate_temp_control.resolution_threshold() >= 0)){
				// page container adjustments
				$('div.page-container').css({'min-width':'1900px'});

				// navbar adjustments
				if(self.settings.settings.plugins.consolidate_temp_control.resize_navbar()){
					$('#navbar > div.navbar-inner > div.container').css({'width':'100%'});
					$('#navbar > div.navbar-inner > div.row-fluid > div.nav-collapse').css({'padding-right':'20px'});
				}

				// main content adjustments
				$('div.container.octoprint-container').addClass('row-fluid');
				$('div.container.octoprint-container.row-fluid > div.row').css({'margin-left':'20px','padding-right':'20px'});

				// sidebar adjustments
				if (!self.dragonorder) {
					if($('div#settings_plugin_themeify').length == 0){
						$('div.container.octoprint-container > div.row > div.accordion.span4').removeClass('span4').addClass('span2');
					}
					$('#files div.row-fluid.upload-buttons > span.btn.btn-primary.fileinput-button.span6:nth-child(2) > span').text('Upload SD');
				}

				// tabs adjustments
				$('#tab_plugin_consolidate_temp_control > div.row-fluid > div').addClass('span6');
				if($('div#settings_plugin_themeify').length == 0 && !self.dragonorder && !self.uicustomizer){
					$('div.container.octoprint-container > div.row > div.tabbable.span8').removeClass('span8').addClass('span10');
					$('div#tabs_content div.tab-pane:not("#tab_plugin_consolidate_temp_control")').wrapInner('<div class="span6"></div>');
					$('div#tabs_content div.tab-pane:not("#tab_plugin_consolidate_temp_control") div.span6').wrap('<div class="row-fluid"></div>');
				}

                if(self.classicWebcamViewModel){
                    $('#webcam_plugin_classicwebcam_real > div > div').removeClass('span6');
                }

				// footer adjustments
				$('div.container.octoprint-container > div.footer').css({'padding-left':'20px','padding-right':'20px'});
			} else {
				$('#temp, #control').removeClass('span6');
			}
		}

		self.onAfterBinding = function(){
			self.active_settings = ko.toJSON(self.settings.settings.plugins.consolidate_temp_control);
		}

		self.onEventSettingsUpdated = function(){
			if(ko.toJSON(self.settings.settings.plugins.consolidate_temp_control) !== self.active_settings) {
				$('#reloadui_overlay_wrapper > div > div > p:nth-child(2)').html('Consolidated Temp Control layout changes detected, you must reload now for these new changes to take effect. This will not interrupt any print jobs you might have ongoing.');
				$('#reloadui_overlay').modal();
			}
		}

		// fix control tab
		self.onTabChange = function(current, previous) {
			if ((current === "#tab_plugin_consolidate_temp_control") || (current === "#temp") || (current === "#control") || (current === "#tab_plugin_webcamtab")) {
				var selected = OctoPrint.coreui.selectedTab;
				if (self.webcamtab) {
					OctoPrint.coreui.selectedTab = "#tab_plugin_webcamtab";
					self.controlViewModel.onTabChange("#tab_plugin_webcamtab", previous);
				} else if (!self.classicWebcamViewModel) {
					OctoPrint.coreui.selectedTab = "#control";
					self.controlViewModel.onTabChange("#control", previous);
				} else if (self.classicWebcamViewModel) {
                    self.classicWebcamViewModel._enableWebcam();
                }
				OctoPrint.coreui.selectedTab = selected;
			} else if (previous === "#tab_plugin_consolidate_temp_control") {
                if(!self.classicWebcamViewModel) {
                    self.controlViewModel.onTabChange(current, "#control");
                } else {
                    self.classicWebcamViewModel._disableWebcam();
                }
			}
		};

		self.onAllBound = function(allViewModels) {
			var selected = OctoPrint.coreui.selectedTab;
			if (self.webcamtab) {
				OctoPrint.coreui.selectedTab = "#tab_plugin_webcamtab";
			} else {
				OctoPrint.coreui.selectedTab = "#control";
			}
			self.controlViewModel.onAllBound(allViewModels);
			OctoPrint.coreui.selectedTab = selected;
			if (selected == "#tab_plugin_consolidate_temp_control" || selected == "#temp") {
				self.temperatureViewModel._initializePlot();
			}
		};

        if(!self.classicWebcamViewModel) {
            self.controlViewModel.onBrowserTabVisibilityChange = function (status) {
                if (status) {
                    var selected = OctoPrint.coreui.selectedTab;
                    if (self.webcamtab) {
                        OctoPrint.coreui.selectedTab = "#tab_plugin_webcamtab";
                    } else {
                        OctoPrint.coreui.selectedTab = "#control";
                    }
                    self.controlViewModel._enableWebcam();
                    OctoPrint.coreui.selectedTab = selected;
                } else {
                    self.controlViewModel._disableWebcam();
                }
            };
        }

		// fix temperature tab
		self.onAfterTabChange = function(current, previous) {
			if ((current === "#tab_plugin_consolidate_temp_control") || (current === "#temp") || (current === "#control")) {
				if (!self.temperatureViewModel.plot) {
					self.temperatureViewModel._initializePlot();
				} else {
					self.temperatureViewModel.updatePlot();
				}
				self.temperatureViewModel.onAfterTabChange("#temp", previous);
			}
		}
	}

	OCTOPRINT_VIEWMODELS.push({
		construct: ConsolidateTempControlViewModel,
		dependencies: ["controlViewModel", "temperatureViewModel", "settingsViewModel", "touchUIViewModel", "dragon_orderViewModel", "WebcamTabViewModel", "UICustomizerViewModel", "classicWebcamViewModel"],
		optional: ["touchUIViewModel", "dragon_orderViewModel", "WebcamTabViewModel", "UICustomizerViewModel", "classicWebcamViewModel"],
		elements: ["#consolidate_temp_control_settings_form"]
	});
});
