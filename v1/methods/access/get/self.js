function main() {
  var accessid = GPFR( 'accessid' );
  if ( !accessid ) {
    return { err: true, desc: 'accessID is required!' }
  }

  var ACSOBJ = {};
  ACSOBJ.access = {};
  ACSOBJ.rules = [];

  var SQL = "sql: ";
  SQL += "SELECT id, name, ISNULL( archived, 0 ) AS archived FROM wt_flat.dbo.access "
  SQL += "WHERE id = " + SqlLiteral( accessid );
  SQL += " AND ISNULL( archived, 0 ) = 0"

  ACSOBJ.access = ArrayOptFirstElem( XQuery( SQL ), {} );
  if ( ACSOBJ.access == {} ) {
    return { err: true, desc: 'No such access rule.' }
  }

//********************************************************************************

  SQL = "sql: ";
  SQL += "SELECT id, access_id, catalog, alias, field, operator, value, ISNULL( archived, 0 ) AS archived FROM wt_flat.dbo.access_rules "
  SQL += "WHERE plan_id = " + SqlLiteral( accessid );
  SQL += " AND ISNULL( archived, 0 ) = 0"
  ACSOBJ.rules = XQuery( SQL );

  return PLANOBJ;

}

RESPONSE_OBJECT = main();
