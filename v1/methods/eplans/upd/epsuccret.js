var data = ROFR( "data" );

var SQL = "sql: ";
SQL += "UPDATE wt_flat.dbo.education_plan_success_creteria SET ";
SQL += "obj_id = " + data.obj_id
SQL += ",field = " + SqlLiteral (data.field)
SQL += ",value = " + SqlLiteral (data.value)
SQL += " WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: "ok" }
} else {
  RESPONSE_OBJECT = { result: "neok" }
}
