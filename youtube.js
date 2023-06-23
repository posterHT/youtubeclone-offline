// API'nin yüklenmesini bekleyin
// API'nin yüklenmesini bekleyin
// API'nin yüklenmesini bekleyin

function _(id) {
    return document.getElementById(id);
}
function search() {
    var q = _("searchTextBox").value;
    list_kw = q;
    _("vidlist").innerHTML = "";
    start();
}
gapi.load('client', start);

var list_kw = "";
var api_key_list =
    ["AIzaSyAE93O-0VosPtGB3TcElOI800d4OXFx7RI",
        "AIzaSyDPR_kqXedcL6wCUfgM5WxUcDzBNIMua9g",
        "AIzaSyA-eRFnoje-ZLAPAix5eWxPDKPcXs6NGlo",
        "AIzaSyAJkUMil_HH9L6tZLJlYd3J7seP0zgyO-g",
        "AIzaSyDKqOcUegkGW9L72jF_PddPJxb4ff-0IZo",
        "AIzaSyC-a-XhcdXs8c53-Awj6-3dRdS3ur3KKGc"];

var api_key_select = 0;

var maxResults = 10;
function start() {
    // API istemcisini yükleyin
    gapi.client.init({
        apiKey: api_key_list[api_key_select], // YouTube Data API v3 için API anahtarınızı buraya girin
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    }).then(function () {
        // API başarıyla yüklendi
        // Aranan kelimeyle videoları listelemek için API isteğini yapın
        console.log("API SELECTED:" + api_key_select);
        return gapi.client.youtube.search.list({
            part: 'snippet',
            q: list_kw, // Aranacak kelimeyi buraya girin
            maxResults: maxResults, // Alınacak sonuç sayısı
        });
    }).then(function (response) {
        // Yanıtı işleyin
        VideoListLoad(response);
    }, function (error) {
        // Hata durumunda işleyin
        api_key_select++;
        if (api_key_select >= api_key_list.count)
            return;
        start();
    });
}
var pageToken = "";

function NextPage() {
    gapi.client.youtube.search.list({
        part: 'snippet',
        q: list_kw,
        maxResults: maxResults,
        pageToken: pageToken,
    }).then(function (response) {
        // Yanıtı işleyin
        console.log("----------NEXT PAGE STARTED------------");
        VideoListLoad(response);

    }).catch(function (error) {
        // Hata durumunda işleyin
        api_key_select++;
        start();
    });
}

var videoIdList = [];



window.addEventListener("scroll", function () {
    // Sayfa her scroll olduğunda çağrılacak kodları buraya yazın
    if ((window.innerHeight + window.pageYOffset) + 15 >= document.body.offsetHeight) {
        // Sayfa en alta gelindiğinde handleScroll fonksiyonunu çağırın
        NextPage();
    }
});

function VideoListLoad(response) {
    var videos = response.result.items;
    // Video ID'leri toplayın
    var videoIds = videos.map(function (video) {
        return video.id.videoId;
    });

    // Video ID'lerini kullanarak tek bir API isteği yapın
    var st_videos;

    gapi.client.youtube.videos.list({
        'part': 'snippet,statistics',
        'id': videoIds.join(',')
    }).then(function (st_response) {
        st_videos = st_response.result.items;

        st_videos.forEach(function (item) {
            let title, channelId, channelTitle, description;
            let thumbnail_url;
            let id = item.id;

            var snippet = item.snippet;
            var statistic = item.statistics;

            title = snippet.title;
            channelId = snippet.channelId;
            channelTitle = snippet.channelTitle;
            description = snippet.description;
            thumbnail_url = snippet.thumbnails.medium.url;


            let commentCount, likeCount, viewCount;
            commentCount = statistic.commentCount;
            likeCount = statistic.likeCount;
            viewCount = statistic.viewCount;

            if (videoIdList.indexOf(id) == -1) {
                newVideo(title, viewCount, channelTitle, thumbnail_url, id, likeCount);
                videoIdList.push(id);
            }
        });
    }, function (eror) {
        api_key_select++;
        start();
    });
    console.log("----------NEXT PAGE ENDED------------");
    pageToken = response.result.nextPageToken;

}
