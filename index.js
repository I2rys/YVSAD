//Dependencies
const YTDownload = require("./ytdownload.js")
const Usetube = require("usetube")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
async function Main(){
    var videos = await Usetube.searchVideo(Self_Args.slice(1).join(" "))
    videos = videos.videos

    if(!videos){
        console.log("No videos found with that keyword.")
        process.exit()
    }

    var video_index = 0

    download()
    async function download(){
        if(video_index == videos.length){
            console.log("Finished downloading videos.")
            process.exit()
        }

        YTDownload(`http://www.youtube.com/watch?v=${videos[video_index].id}`, false, `${__dirname}/${Self_Args[0]}`).then((done)=>{
            console.log(`\nDownload status: Success | Download link: http://www.youtube.com/watch?v=${videos[video_index].id}`)
            video_index += 1
            download()
            return
        }).catch((err)=>{
            console.log(`\nDownload status: Fail | Download link: http://www.youtube.com/watch?v=${videos[video_index].id}`)
            video_index += 1
            download()
            return
        })
    }
}

//Main
if(!Self_Args.length){
    console.log("node index.js <output_directory> <keyword>")
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid output_directory.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid keyword.")
    process.exit()
}

Main()
