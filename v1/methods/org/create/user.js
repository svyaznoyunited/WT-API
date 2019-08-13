function __main__() {
  try {
    var dUser = tools.new_doc_by_name( 'collaborator' );
    var teUser = dUser.TopElem;
    var data = ROFR( 'data' );

    if ( !data && DEBUG ) {
      EXCEPTION( 'Данные не переданы. Переменная data пуста. Нужен объект форматированый как строка.' );
    }

    teUser.firstname = data.firstname;
    teUser.lastname = data.lastname;
    teUser.middlename = data.middlename;
    teUser.login = data.phone;
    teUser.password = data.phone;
    teUser.code = '#TEMP_CODE';
    teUser.comment = 'Пользолватель создан вручную;';
    teUser.phone = data.phone;
    teUser.is_candidate = false;
    bIT = teUser.custom_elems.AddChild();
    bIT.name = 'is_trainee';
    bIT.value = true;
    bIT = teUser.custom_elems.AddChild();
    bIT.name = 'tab_number';
    bIT.value = data.phone;
    iREGID = teUser.custom_elems.AddChild();
    iREGID.name = 'region_id';
    iREGID.value = 6690432344213308352;

    dUser.BindToDb();
    dUser.Save();

    sData = [
      dUser.DocID
      ,SqlLiteral( data.firstname )
      ,SqlLiteral( data.middlename )
      ,SqlLiteral( data.lastname )
      ,SqlLiteral( data.phone )
      ,SqlLiteral( data.phone )
    ];

    deltaSQL = "sql: ";
    deltaSQL += "INSERT INTO wt_flat.dbo.wt_x_sap_org_delta( id, firstname, middlename, lastname, login, tab_number ) ";
    deltaSQL += "VALUES( ";
    deltaSQL += sData.join( ',' );
    deltaSQL += " )";
    COMMITINSERT( deltaSQL );

    return {
      err: false
      , desc: 'Пользователь создан!'
    }

  } catch ( errCreateUser ) {
    EXCEPTION( 'Ошибка: ' + errCreateUser );
  }
}

RESPONSE_OBJECT = __main__();
