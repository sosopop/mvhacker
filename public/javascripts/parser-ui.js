/**
 * Created by sosopop on 2016/6/22.
 */
function  getVideoInfo( info) {
    if ( info == "")
    {
        return "...";
    }
    return info;
}
function showResult(data) {
    var timeCount = new Date().getTime() - timeStart;
    $("#page_header").animate({marginTop:"10px"},200,"linear",function () {
        $("#input_set").removeAttr("disabled");
        $("#info_panel").show();
        $("#url_panel").show();
        $("#json_panel").show();
        $("#time_info").show();
        $("#time_info").text((timeCount / 1000).toFixed(2) + " seconds");
        $("#video_title").text(getVideoInfo(data.data.title));
        //$("#video_director").text(getVideoInfo(data.data.director));
        //$("#video_actor").text(getVideoInfo(data.data.actor));
        //$("#video_release").text(getVideoInfo(data.data.release));
        //$("#video_type").text(getVideoInfo(data.data.type));
        $("#video_time_length").text(getVideoInfo(data.data.timeLength));
        $("#original_url").text(getVideoInfo(data.data.from));
        $("#thumbnail_url").text(getVideoInfo(data.data.thumbnail));
        $("#video_desc").text(getVideoInfo(data.data.description));
        $("#video_thumbnail").attr("src", data.data.thumbnail);
        $("#json_result").text(JSON.stringify(data, null, "    "));
        $("#video_url_container").empty();
        for ( var i = 0; i <  data.data.streams.length; i++){
            $("#video_url_container").append($('<div class="row bottom-span"><div class="col-md-12"><span class="text-warning">Quality</span>&nbsp;&nbsp;&nbsp;<span class="label label-info">'+data.data.streams[i].quality+'</span>&nbsp;&nbsp;&nbsp;<span class="text-warning">Type</span>&nbsp;&nbsp;&nbsp;<span class="label label-info">'+data.data.streams[i].type+'</span></div></div>'));
            var segs = data.data.streams[i].segs;
            var segStr  = '<div class="row"><div class="col-md-12"><table class="table table-striped table-hover "><thead><tr class="info"><th>#</th> <th>Time&nbsp;length</th> <th>File&nbsp;size</th> <th>Url</th> </tr> </thead> <tbody>';
            if ( segs){
                for ( var j = 0; j < segs.length; j++){
                    segStr += '<tr><td>'+j+'</td><td>'+segs[j].timeLength+'</td><td>'+segs[j].fileSize+'</td><td><a href="'+segs[j].url+'">'+segs[j].url+'</a></td></tr>';
                }
            }
            segStr += '</tbody></table></div></div><hr />';
            $("#video_url_container").append($(segStr));
        }
    });
}
var timeStart = new Date().getTime();
$(document).ready(function () {
    $("#btn_go").click(function () {
        $("#info_panel").hide();
        $("#url_panel").hide();
        $("#json_panel").hide();
        $("#time_info").hide();
        $("#input_set").attr("disabled", "true");
        timeStart = new Date().getTime();
        $.ajax({
            type: "GET",
            url: "parse",
            data: {
                url: $("#video_page_url").val()
            },
            dataType: "json",
            success: function (data) {
                showResult(data);
            },
            error: function () {
                $("#input_set").removeAttr("disabled");
            }
        });
    });
});