function __main__() {
    var role = REQUEST.GetOptProperty( 'role_id', false );
    if ( !role ) {
      return { access: false, desc: 'Не передана роль' }
    }

    var SQL = 'sql: ';
    SQL += 'SELECT crs.* FROM wt_flat.dbo.careers crs ';
    if ( role != 'admin' ) {
      SQL += 'JOIN wt_flat.dbo.career_access crsacs ON crs.access = crsacs.id '
      SQL += "WHERE crsacs.name = 'byrole' AND crsacs.value = " + SqlLiteral( role );
    }
    var R = XQuery( SQL );
    if ( ArrayCount( R ) <= 0 ) {
      return { access: false, desc: 'Для роли нет обучения' }
    } else {
      return { access: true, objects: R }
    }
}

RESPONSE_OBJECT = __main__();
