/*
 * 这个是压缩上传图片的方法
 * files是input[type='file']的对象
 * fun是回调函数 运行fun的时候会默认提供一个src参数，src是方法运行成功后返回的src地址
 * 由于图片是进行了base64加密的，所以用的时候记得base64解密
 */
function imgZip(files,fun){
	var _this = this;
	var file = files.files[0];
	if(!/image\/\w+/.test(file.type)){
		alert("只能上传图片！");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e){
		var img = new Image,
			mxa_width = 800,//最大图片宽度
			max_height = 600,//最大图片高度
			quality = 0.8,//图片的保真度，1是最大的，越大越清晰
			canvas = document.createElement("canvas"),
			drawer = canvas.getContext("2d");
		img.src = this.result;
		img.onload = function(){
			var scale = img.width/img.height;
			canvas.width = img.width;
			canvas.height = img.height;
			//判断宽度高度是否大于最大值
			if(img.width>mxa_width){
				canvas.width = mxa_width;
				canvas.height = mxa_width/scale;
			}
			if(img.height>max_height){
				canvas.width = max_height*scale;
				canvas.height = max_height;
			}
			drawer.drawImage(img,0,0,canvas.width,canvas.height);
			var src = canvas.toDataURL("image/jpeg",quality);
			fun(src,_this);
		}
	}
	this.getDownUrl = function(src){
		return src.replace('image/jpeg', 'image/octet-stream');
	}
	return _this;
}