//This code is 100% not mine but I fixed it and enhanced it :)
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var fs_1 = require("fs");
var table_1 = require("table");
var ytdl_core_1 = __importStar(require("ytdl-core"));
var readline_1 = require("readline");
module.exports = function ytdownload(url, logging, output_directory) {
    if (logging === void 0) { logging = true; }
    return new Promise(function (resolve, reject) {
        fs_1.mkdir("videos", function (err) {
            if (err && err.code !== "EEXIST")
                reject("[YTDownload] " + err + " \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh");
            ytdl_core_1.getInfo(url)
                .then(function (info) {
                var video = ytdl_core_1.default(info.videoDetails.video_url);
                var video_title = info.videoDetails.title
                video_title = video_title.replace(/[^\w\s]/g, "")
                var filePath = `${output_directory}/${video_title}.mp4`;

                video.pipe(fs_1.createWriteStream(filePath));
                if (logging) {
                    var data = table_1.table([
                        ["YTDownload", "Status", "Percent"],
                        [
                            info.videoDetails.title,
                            "Starting Download",
                            "0%",
                        ],
                    ]);
                    console.info(data);
                }
                video.on("end", function () {
                    if (logging) {
                        var data = table_1.table([
                            ["YTDownload", "Status", "Percent"],
                            [
                                info.videoDetails.title,
                                "Download Finished",
                                "100%",
                            ],
                        ]);
                        console.log("\n" + data);
                    }
                    resolve(filePath);
                });
                video.on("error", function (error) {
                    return reject(false);
                });
                video.on("progress", function (chunk, downloaded, total) {
                    var percent = ((downloaded * 100) / total).toFixed(3);
                    readline_1.clearLine(process.stdout, 0);
                    readline_1.cursorTo(process.stdout, 0);
                    process.stdout.write(`Name: ${video_title} | Percent: ${percent}%`);
                });
            })
                .catch(function (err) {
                return reject(false);
            });
        });
    });
};
