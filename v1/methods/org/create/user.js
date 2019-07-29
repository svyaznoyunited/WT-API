function __main__() {
  try {
    var dUser = tools.create_doc_by_name( 'collaborator' );
    var teUser = dUser.TopElem;
    var data = tools.read_object( REQUEST.GetOptProperty( 'data', {} ) );

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

    dUser.BindToDb();
    dUser.Save();

    sData = [
      dUser.DocID
      ,SqlLiteral( data.firstname )
      ,SqlLiteral( data.middlename )
      ,SqlLiteral( data.lastname )
    ];

    deltaSQL = "sql: ";
    deltaSQL += "INSERT INTO wt_flat.dbo.wt_x_sap_org_delta( id, firstname, middlename, lastname ) ";
    deltaSQL += "VALUES( ";
    deltaSQL += sData.join( ',' );
    deltaSQL += " )";
    ArrayOptFirstElem( XQuery( deltaSQL ) );

    return {
      err: false
      , desc: 'Пользователь создан!'
    }

  } catch ( errCreateUser ) {
    EXCEPTION( errCreateUser );
  }
}

RESPONSE_OBJECT = __main__();
