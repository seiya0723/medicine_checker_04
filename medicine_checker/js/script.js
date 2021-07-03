window.addEventListener("load" , function (){

    //前に読み込んだjsonのキャッシュが残るので、キャッシュを削除して読み込ませる
    //注意:この方法はローカルのjsonファイルを読み込むことはできない。(同一オリジンポリシー(ブラウザのセキュリティ)による)
    //TODO:そのため、別途JSONファイルの中身をJSに直接書き込む
    /*
    $.ajaxSetup({ cache: false }); 
    $.getJSON("data/medicine.json" , function(data) {
        //TODO:ここに読み込んだ後の処理を書く
        console.log(data);
    });
    */


    //テキストボックスでEnterを押すと、submitされてしまう問題の対処。
    $(document).on("keypress", "input:not(.allow_submit)", function(event) {
        return event.which !== 13;
    });

    //検索ボタンが押される。テキストボックスでEnterを押すと、検索実行
    $("#search_button").on("click", function(){ search() });
    $("#search_text").on("keydown", function(e) { if( e.keyCode === 13 ) { search(); } });
    

    //動的に表示非表示される要素に対しては、$(document).on([トリガー],[要素],[処理])とする。
    $(document).on("click",".stack",function(){ stack( $(this).val() ); });

});

function required_search(){
    console.log($("#search_text").val());
}



//検索の処理
function search(){

    let form_elem   = "#search_form";

    let data    = new FormData( $(form_elem).get(0) );
    let url     = $(form_elem).prop("action");
    let method  = $(form_elem).prop("method");

    //これをjson形式にする
    for (let pair of data.entries() ){ console.log(pair); }

    let json    = {};
    for (let pair of data.entries() ){
        json[pair[0]]   = pair[1];
    }
    console.log(json)

    $.ajax({
        url: url,
        type: method,
        data: json,
        contentType: 'application/json',
        dataType: 'json'
    }).done( function(data, status, xhr ) { 

        if (data.error){
        }
        else{
            $("#search_result").html(data.content);
        }

    }).fail( function(xhr, status, error) {
        console.log(status + ":" + error );
    }); 


}

//医薬品情報をテーブルにスタックする処理
function stack(pk){

    let url     = "/single/" + pk + "/";
    let method  = "GET";

    $.ajax({
        url: url,
        type: method,
        dataType: 'json'
    }).done( function(data, status, xhr ) { 

        if (data.error){
            console.log("stack error");
        }
        else{
            console.log(data.medicine);

            let name            = data.medicine["name"       ].replace(/\n/g,"<br>")
            let effect          = data.medicine["effect"     ].replace(/\n/g,"<br>")
            let caution         = data.medicine["caution"    ].replace(/\n/g,"<br>")
            let dosage          = data.medicine["dosage"     ].replace(/\n/g,"<br>")
            let side_effect     = data.medicine["side_effect"].replace(/\n/g,"<br>")

            $("#table_name"       ).append("<th class='" + pk + "'>" + name         + "</th>",);
            $("#table_effect"     ).append("<td class='" + pk + "'>" + effect       + "</td>",);
            $("#table_caution"    ).append("<td class='" + pk + "'>" + caution      + "</td>",);
            $("#table_dosage"     ).append("<td class='" + pk + "'>" + dosage       + "</td>",);
            $("#table_side_effect").append("<td class='" + pk + "'>" + side_effect  + "</td>",);
        }

    }).fail( function(xhr, status, error) {
        console.log(status + ":" + error );
    }); 

}


