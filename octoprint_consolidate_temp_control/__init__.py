# coding=utf-8
from __future__ import absolute_import, division, print_function

import octoprint.plugin

class ConsolidateTempControlPlugin(octoprint.plugin.TemplatePlugin,
                                   octoprint.plugin.AssetPlugin,
                                   octoprint.plugin.SettingsPlugin):

	##-- Settings mixin
	def get_settings_defaults(self):
		return dict(tab_order=[dict(name="Temperature",selector="#temp"),dict(name="Control",selector="#control")], layout="horizontal", resize_navbar=True, resolution_threshold=0)

	##-- Template mixin
	def get_template_configs(self):
		return [
			dict(type="tab", name="Command & Control", custom_bindings=False),
			dict(type="settings", custom_bindings=True)
		]

	##-- AssetPlugin mixin
	def get_assets(self):
		return dict(js=["js/jquery-ui.min.js","js/knockout-sortable.1.2.0.js","js/consolidate_temp_control.js"])

	##~~ Softwareupdate hook
	def update_hook(self):
		return dict(
			consolidate_temp_control=dict(
				displayName="Consolidate Temp Control",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="jneilliii",
				repo="OctoPrint-ConsolidateTempControl",
				current=self._plugin_version,
				stable_branch=dict(
					name="Stable", branch="master", comittish=["master"]
				),
				prerelease_branches=[
					dict(
						name="Release Candidate",
						branch="rc",
						comittish=["rc", "master"],
					)
				],

				# update method: pip
				pip="https://github.com/jneilliii/OctoPrint-ConsolidateTempControl/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Consolidate Temp Control"
__plugin_pythoncompat__ = ">=2.7,<4"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = ConsolidateTempControlPlugin()
	
	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.update_hook
	}

	global __plugin_settings_overlay__
	__plugin_settings_overlay__ = dict(appearance=dict(components=dict(order=dict(tab=["plugin_consolidate_temp_control","temperature","control"]))))
