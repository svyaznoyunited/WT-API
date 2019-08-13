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

    aData = [
      dUser.DocID
      ,SqlLiteral( data.firstname )
      ,SqlLiteral( data.middlename )
      ,SqlLiteral( data.lastname )
      ,SqlLiteral( data.phone )
      ,SqlLiteral( data.phone )
    ];

    aFields = [
      'id'
      ,'firstname'
      ,'middlename'
      ,'lastname'
      ,'login'
      ,'tab_number'
    ];

    deltaSQL = "sql: ";
    deltaSQL += "INSERT INTO wt_flat.dbo.wt_x_sap_org_delta( ";
    deltaSQL += aFields.join( ',' );
    deltaSql += " ) ";
    deltaSQL += "VALUES( ";
    deltaSQL += aData.join( ',' );
    deltaSQL += " )";
    COMMITINSERT( deltaSQL );

    return {
      err: false
      , desc: 'Пользователь создан!'
    }

  } catch ( errCreateUser ) {
    return {
      err: true
      , desc: errCreateUser
    }
  }
}

RESPONSE_OBJECT = __main__();
