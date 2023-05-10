var actionCarmarId = ''
var CNO = ''
function Device_PTZ(direction) {
            $.ajax({
                    type:"get",
                    dataType:"json",
                    url:BASE_URL+"front/v1/camera/ptz/"+actionCarmarId+'/'+direction,
                    data: {
                      cno: CNO
                    },
                    success: function(data){
                      if(data.code!==200){
                        MessageShow(data.message);
                      }
                    },
                    error: function(){

                        MessageShow("请求错误");

                    }

            });
};

function device_preset() {
            $.ajax({
                    type:"post",
                    dataType:"json",
                    url:"/device_preset/",
                    data: {
                    index: $("#device_index").val(),
                    deviceSerial: $("#deviceSerial").val(),
                    },
                    success: function(data){
                    LoginSuccess = data.success;
                    if(LoginMessages != '1')
                    {
                       MessageShow(data.Return_Message);
                    }
                    else
                    {

                    }
                    },
                    error: function(){

                        MessageShow("请求错误");

                    }

            });
};

function change_cam_url(cam_type, id,code,cno) {
  actionCarmarId = code
  CNO = cno
            $.ajax({
                    type:"get",
                    dataType:"json",
                    url: BASE_URL+"front/v1/camera/getCamera/"+code,
                    data: {
                    cam_type: cam_type,
                    cno: cno
                    },
                    success: function(data){
                      if(data.code != 200){
                        return MessageShow(data.message);
                      }
                      
                        open_url = data.data.openUrl;
                        // if(open_url){
                        //   var urlList = open_url.split('/')
                        //   urlList[urlList.length-1] = cno+'.hd.live'
                        //   open_url = urlList.join('/')
                        //   console.log(open_url)
                        // }
                        
                        accessToken = data.accessToken;
                        document.getElementById("hik_iframe").innerHTML = '<iframe src="https://open.ys7.com/ezopen/h5/iframe_se?url=' + open_url + '&autoplay=1&templete=0&id=video-container&accessToken=' + data.data.accessToken + '"  id="EZUIKitPlayer-video-container" allowfullscreen="true" allow="autoplay" frameborder="0" class="cams_content_row_left_video"></iframe>';
                        // $(" div[ name='all_button' ] ").attr('class', 'item');
                        // $("#choose_" + id).attr('class', 'item active');
                        // $("#deviceSerial").val(code);
                    },
                    error: function(){

                        MessageShow("请求错误");

                    }

            });
};