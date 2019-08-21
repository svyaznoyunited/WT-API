var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.id ) );
aData.push( SqlLiteral( data.access_id ) );
aData.push( SqlLiteral( data.catalog ) );
aData.push( SqlLiteral ( data.alias ) );
aData.push( SqlLiteral ( data.field ) );
aData.push( SqlLiteral ( data.operator ) );
aData.push( SqlLiteral ( data.value ) );
aData.push( data.archived );

var SQL = "sql: ";
SQL += "INSERT INTO wt_flat.dbo.access_rules (id, access_id, catalog, alias, field, operator, value, archived ) ";
SQL += "VALUES (" + aData.join( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
