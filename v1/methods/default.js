function DEFAULT() {

  function __pareseFields( sFields ) {
    var aFields = sFields.split(',');
    var str = '';
    var I = 0;
    for ( field in aFields ) {
      I++;
      s = Trim( field );
      a = '';
      if ( StrContains( field, '__as__', true ) ) {
        s = field.split( '__as__' )[0];
        a = ' AS ' + field.split( '__as__' )[1];
      }
      if ( StrBegins( s, '__str__' ) ) {
        f = StrReplace( s, '__str__', '' );
        s = 'CAST(' + f + ' AS VARCHAR) ';
        s += a ? a : ' AS ' + f;
        a = '';
      }
      if ( I != 1 ) {
        s = ',' + s;
      }
      str += s + a;
    }
    return str;
  }

  function GET( SELECT, FROM, WHERE, LIMIT ) {
    var SQL = 'sql: ';
        SQL += SELECT;
        SQL += ' '
        SQL += FROM;
        SQL += ' ';
        SQL += WHERE;

    if ( DEBUG ) {
      return {d: XQuery( SQL ), q: SQL};
    } else {
      return XQuery( SQL );
    }
  }

  var CATALOG = REQUEST.GetOptProperty( 'object', null );
  var FIELDS = REQUEST.GetOptProperty( 'fields', '*' );
  var FILTER = REQUEST.GetOptProperty( 'filter', '' );
  var LIMIT = Int( REQUEST.GetOptProperty( 'limit', '1000' ) );

  var XPR_SELECT;
  var XPR_FROM;
  var XPR_WHERE;

  /* Перечень допустимых каталогов */
  var CATALOGS = [
    'collaborator'
    ,'subdivision_group_subdivision'
    ,'position_common'
    ,'wt_flat.dbo.wt_x_sap_org_delta'
    ,'group'
  	,'course'
  	,'assessment'
  	,'poll'
    ,'wt_flat.dbo.education_plan'
    ,'wt_flat.dbo.access_catalogs'
    ,'wt_flat.dbo.access_catalog_fields'
    ,'wt_flat.dbo.access_operators'
    ,'wt_flat.dbo.access'
  ];

  //Check catalog
  if ( !CATALOG ) {
    if (!DEBUG) {
      EXCEPTION( 'Не передан объект' )
    } else {
      RESPONSE({
        desc: 'Не передан объект'
        ,query: Request.Query
        ,form: Request.Form
        ,body: Request.Body
        ,method: Request.Method
      });
    }
  }

  //Assign fields
  XPR_SELECT = 'SELECT';
  XPR_SELECT += ' TOP ' + LIMIT + ' ';
  XPR_SELECT += FIELDS == '*' ? '*': __pareseFields( FIELDS );

  for ( object in CATALOGS ) {
    if ( object == CATALOG ) {
      ctname = StrBegins( object, 'wt_flat.dbo' ) ? object : object + 's'
      XPR_FROM = 'FROM ' + ctname;
      break;
    }
  }
  if ( !XPR_FROM ) {
    EXCEPTION( 'Недопустимый объект ' + CATALOG );
  }

  //Filtering, if required
  if ( FILTER ) {
    XPR_WHERE = 'WHERE 1=1'
    try {
      for ( expr in tools.read_object( FILTER ) ) {
        XPR_WHERE += ' AND ' + expr;
      }
    } catch( errParseFilter ) {
      EXCEPTION( errParseFilter );
    }
  } else {
    XPR_WHERE = '';
  }

  RESPONSE( GET( XPR_SELECT, XPR_FROM, XPR_WHERE, LIMIT ) );

}

DEFAULT();
