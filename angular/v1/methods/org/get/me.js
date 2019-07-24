
/**
  Один агрумент - fields;
  Строка полей через запятую без пробелов.
  доступные поля в переменной __default_fields
**/
function __main__(){
  var __FIELDS__ = {
    "id": "CAST( c.id AS VARCHAR ) AS id"
    ,"fullname": "cs.fullname"
    ,"position_name": "cs.position_name"
    ,"position_id": "CAST( cs.position_id AS VARCHAR ) as postition_id"
    ,"unitId": "CAST( cs.position_parent_id AS VARCHAR ) AS unitId"
    ,"unit": "cs.position_parent_name AS unit"
    ,"is_dismiss": "cs.is_dismiss"
    ,"sex": "cs.sex"
    ,"birth_date": "cs.birth_date"
    ,"hire_date": "cs.hire_date"
    ,"dismiss_date": "cs.dismiss_date"
    ,"login": "cs.[login]"
    ,"current_state": "cs.current_state"
    ,"service_number": "c.[data].value( '(collaborator/custom_elems/custom_elem[name=''tab_number'']/value)[1]', 'VARCHAR( 100 )' ) AS service_number"
    ,"firstname": "c.[data].value( '(collaborator/firstname)[1]', 'VARCHAR( 100 )' ) AS firstname"
    ,"lastname": "c.[data].value( '(collaborator/lastname)[1]', 'VARCHAR( 100 )' ) AS lastname"
    ,"middlename": "c.[data].value( '(collaborator/middlename)[1]', 'VARCHAR( 100 )' ) AS middlename"
    ,"role": "c.[data].value( '(collaborator/access/access_role)[1]', 'VARCHAR(20)' ) AS [role]"
  }
  var __default_fields = "id,fullname,position_name,position_id,unitId,unit,is_dismiss,sex,birth_date,hire_date,dismiss_date,login,current_state,service_number,firstname,lastname,middlename,role"
  if ( REQUEST.GetOptProperty( 'info', false ) == '' ) {
    return [{ fields: __default_fields.split( ',' ) }];
  }
  var FIELDS = REQUEST.GetOptProperty( 'fields', __default_fields );
  var aFields = FIELDS.split( ',' );
  var SQL = 'sql: SELECT ';
  var I = 0;
  for ( field in aFields ) {
    I++;
    try {
      SQL += I>1 ? ' ,' + Trim( __FIELDS__[field] ) : Trim( __FIELDS__[field] );
    } catch( err ) {
      continue;
    }
  }
  SQL += ' FROM collaborators cs JOIN collaborator c ON cs.id = c.id WHERE cs.id = ' + __USER__;
  return XQuery( SQL );
}
RESPONSE_OBJECT = ArrayFirstElem( __main__() );
