# Lottie To Flare
Converter from Lottie's Bodymovin JSON format to the Flare editor's file format. 

# Goal
Edit Lottie files in Flare and export them to Flutter or anywhere Flare runs. The code for the converter is integrated into Flare so Lottie files can be directly dragged and dropped into Flare. 

# Converter Tool
<img src="./readme_assets/preview.png" align="right" width="300">
This repository contains the converter code and a tool for debugging/testing the converter. This standalone tool is helpful for tracking down missing features and validating conversions. The tool allows the user to input JSON or link to a Lottie file. It generates the corresponding Flare editor JSON on the right. A download button is provided which will package the JSON as a flr2d file ready to be imported into Flare (just drag and drop the downloaded file over the Flare editor window). The resulting format is identical to what Flare uses internally (documentation will be provided).

[Try it out.](https://2d-inc.github.io/lottie_to_flare/)

# Flare Plugin
The converter is integrated into Flare so you can directly drag & drop in a Lottie .json file. We're publishing it as an open source project to allow the community to contribute directly to the converter. Help us add the features you want!


