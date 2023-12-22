# Consolidate Temp Control

Based on foosel's original [Proof of Concept](https://github.com/foosel/OctoPrint-ConsolidateTempControl/), this plugin consolidates the temperature and control tabs into one. Modifications to foosel's original source includes making the layout vertical as in the original or horizontal (default setting) to be more compatible with widescreen displays. Also implemented hack to hide original Temperature and Control tabs from view and ordering.

![Screenshot](screenshot.png)

![Screenshot](screenshot_settings.png)

## Known Issues
  - Occasionaly the webcam stream isn't detected.  Swapping tabs or refreshing the page usually brings it back.

## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/jneilliii/OctoPrint-ConsolidateTempControl/archive/master.zip

## Most recent changelog

**[0.1.8](https://github.com/jneilliii/OctoPrint-ConsolidateTempControl/releases/tag/0.1.8)** (11/22/2020)

**Added**

* resolution threshold option for horizontal mode to switch to vertical mode automatically
* release channels for OctoPrint 1.5.0+ for future rc testing, similar to OctoPrint as described [here](https://community.octoprint.org/t/how-to-use-the-release-channels-to-help-test-release-candidates/402)

**Updated**

* knockout sortable library for OctoPrint 1.5.0 compatibility

**Fixed**

* conflicts with Themeify and DragonOrder

### [All releases](https://github.com/jneilliii/OctoPrint-ConsolidateTempControl/releases)

## Get Help

If you experience issues with this plugin or need assistance please use the issue tracker by clicking issues above.

### Additional Plugins

Check out my other plugins [here](https://plugins.octoprint.org/by_author/#jneilliii)

### Sponsors
- Andreas Lindermayr
- [@TheTuxKeeper](https://github.com/thetuxkeeper)
- [@tideline3d](https://github.com/tideline3d/)
- [SimplyPrint](https://simplyprint.io/)
- [Andrew Beeman](https://github.com/Kiendeleo)
- [Calanish](https://github.com/calanish)
- [Lachlan Bell](https://lachy.io/)
- [Jonny Bergdahl](https://github.com/bergdahl)
- [Leigh Johnson](https://github.com/leigh-johnson)
- [Stephen Berry](https://github.com/berrystephenw)
- [Steve Dougherty](https://github.com/Thynix)
## Support My Efforts
I, jneilliii, programmed this plugin for fun and do my best effort to support those that have issues with it, please return the favor and leave me a tip or become a Patron if you find this plugin helpful and want me to continue future development.

[![Patreon](patreon-with-text-new.png)](https://www.patreon.com/jneilliii) [![paypal](paypal-with-text.png)](https://paypal.me/jneilliii)

<small>No paypal.me? Send funds via PayPal to jneilliii&#64;gmail&#46;com</small>
