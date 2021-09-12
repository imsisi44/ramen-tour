//inputタグ
let nextInput = (num, index)=> {
  let html = `<div class="up-image__group__dropbox" data-index="${num}" index="${index}">
                <input class="item_imgs__default" 
                type="file" 
                multiple= "multiple"
                accept="image/*"></input></div>`;
  return html; 
}
//プレビュー用のimgタグ
let previewImages = (src)=> {   
  let html = `<div class="preview preview_unsave">
                <div class="img_box">
                  <img src="${src}" class="preview_image"></div>
                <div class="preview_btn">削除</div></div>`;
  return html;
}

$(document).on('change','input[type= "file"]', function(e) {
  let reader = new FileReader();  //画像を読み込む
  let file = e.target.files[0];   //inputから1つ目のfileを取得
  reader.readAsDataURL(file);     //画像ファイルのURLを取得

  //画像読み込みが完了したらプレビュー表示
  reader.onload = function(e) {
  }
});

reader.onload = function(e) {
  //imgタグ
  if ($('.preview').length <= 4) { 
    $('.previews').append(previewImages(e.target.result));
  } else {
    $('.previews_2nd_row').append(previewImages(e.target.result));
  }
  let preview_count = $('.preview').length;
  let preview_unsave_count = $('.preview_unsave').length;
  let preview_save_count = $('.preview_saved').length;
  let preview_saved_count = $('.hidden-destroy').length;
  //データの入ったinputタグ
  if (preview_count <= 5) {
    $('.up-image__group__dropbox').removeClass('up-image__group__dropbox').addClass('image-preview').appendTo('.item_imgs');
  } else {
    $('.up-image__group__dropbox').removeClass('up-image__group__dropbox').addClass('image-preview').appendTo('.item_imgs_2nd_row');
  }
  //新しいinputタグを追加
  if (preview_count <= 4) {
    $('.item_imgs').prepend(nextInput(preview_count + 1, preview_unsave_count + 1));
  } else {

 $('.item_imgs_2nd_row').prepend(nextInput(preview_count + 1, preview_unsave_count + 1));
  }
  //プレビュー画像が５枚になったら１段目inputを消し、２段目にinputを表示
  if (preview_total_num == 5) {
    $('.item_imgs').css('display', 'none');
    $('.under_group').css('display', 'block');
    $('.item_imgs_2nd_row').css('display', 'block');
  }
  //プレビュー画像が10枚になったら2段目inputを消す
  if (preview_total_num == 10) {
    $('.item_imgs_2nd_row').css('display', 'none');
  }
  //識別のための管理番号をつけ直す
  $('.preview').each(function(i) {
    $(this).attr('data-index', (i+1));
  });
  $('.preview_unsave').each(function(i) {
    $(this).attr('index', (i+1));
  });
  $('.image-preview').each(function(i) {
    $(this).attr('index', (i+1));
    $(this).attr('data-index', (preview_save_count+i+1));
    $(this).children().attr('name', "item[item_imgs_attributes][" + (preview_saved_count+i) + "][src]");
    $(this).children().attr('data-index', (i+1));
  });
}

$(document).on("click",'.preview_btn', function() {
  let targetIndex = $(this).parent().data("name");
  $(this).parent().remove();
  if (targetIndex >= 0) {
    let hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    hiddenCheck.prop('checked', true)
  }
  let preview_num = $(this).parent().attr('index');
  let preview_total_num = $(this).parent().attr('data-index');
  let preview_count = $('.preview').length;
  let preview_unsave_count = $('.preview_unsave').length;
  let preview_save_count = $('.preview_saved').length;
  let preview_saved_count = $('.hidden-destroy').length;

  if (preview_num >= 0) {
    $('.image-preview[index ='+preview_num+']').remove();
  }
  //管理番号をつけ直す
  $('.preview').each(function(i) {
    $(this).attr('data-index', (i+1));
  });
  $('.preview_unsave').each(function(i) {
    $(this).attr('index', (i+1));
  });
  $('.image-preview').each(function(i) {
    $(this).attr('index', (i+1));
    $(this).attr('data-index', (preview_save_count+i+1));
    $(this).children().attr('name', "item[item_imgs_attributes][" + (preview_saved_count+i+1) + "][src]");
    $(this).children().attr('data-index', (i+1));
  });

  if (preview_count == 4 ) {
    $('.item_imgs_2nd_row').find('.up-image__group__dropbox').remove();
    $('.item_imgs').prepend(nextInput(preview_count + 1, preview_unsave_count + 1));
    $('.item_imgs_2nd_row').css('display', 'none');
    $('.item_imgs').css('display', 'block');
    $('.image_text_message').css('display', 'none');
  } else if (preview_count >=5 && preview_count <=8 && preview_total_num <= 5) {
    $('.preview[data-index ='+5+']').appendTo('.previews');
    $('.image-preview[data-index ='+5+']').appendTo('.item_imgs');
  } else if (preview_count == 9) {
    $('.item_imgs_2nd_row').css('display', 'block');
    if (preview_total_num <= 5) {
      $('.preview[data-index ='+5+']').appendTo('.previews');
      $('.preview[data-index ='+5+']').attr('index', (5));
      $('.image-preview[data-index ='+5+']').appendTo('.item_imgs');
    }
  }
});

window.onload = function () {
  //画像削除用のチェックボックス
  $('.hidden-destroy').hide();
  let image_num = $('.preview').length;
  //DBに保存済みの画像が5枚以上の場合
  if (image_num >= 5) {
    $('.item_imgs').css('display', 'none');
    $('.under_group').css('display', 'block');
    $('.item_imgs_2nd_row').css('display', 'block');
    $('.item_imgs').find('.up-image__group__dropbox').remove();
    $('.item_imgs_2nd_row').prepend(nextInput(image_num+1));
  }
  //DBに保存済みの画像が10枚の場合
  if (image_num == 10) {
    $('.item_imgs_2nd_row').css('display', 'none');
  }
}

//領域に入ったとき
$(document).on('dragenter', ".item_imgs, .item_imgs_2nd_row", function(){
  $(".item_imgs, .item_imgs_2nd_row").css('border', '1px solid greenyellow');
});
//領域から出たとき
$(document).on('dragleave', ".item_imgs, .item_imgs_2nd_row", function(){
  $(".item_imgs, .item_imgs_2nd_row").css('border', '1px dashed rgb(204, 204, 204)');
});
//領域上にあるとき
$(document).on('dragover', ".item_imgs, .item_imgs_2nd_row", function(e){
  e.preventDefault();
});
// ドロップした時
$(document).on('drop', ".item_imgs, .item_imgs_2nd_row", function(e){
  e.preventDefault();
  $(".item_imgs, .item_imgs_2nd_row").css('border', '1px dashed rgb(204, 204, 204)');
  let file = e.originalEvent.dataTransfer.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  $(".up-image__group__dropbox").children('.item_imgs__default')[0].files = e.originalEvent.dataTransfer.files;
  // ファイル形式を画像だけに制限
  if (!file.type.match('image.*')) {
    alert('画像を選択してください');
    return;
  }
  reader.onload = function(e) {
    :
   //上記のファイル選択による画像アップロードのコードと同じ
    :
  }
});
