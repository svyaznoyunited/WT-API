function main() {
  var TO = GPFR( 'to' );
  if ( !TO ) {
    return { 'err': true, 'desc': 'To is required' }
  }
  var RESPONSE_OBJECT;
  var PLAN;
  var PLAN_RESULT = {};
  EvalCodeUrl( '../get/plan.js' );
  PLAN = RESPONSE_OBJECT;

  if ( ArrayCount( PLAN.steps ) == 0 ) {
    return { 'err': true, 'desc': 'Plan is empty' }
  }

  PLAN_RESULT.id = NEWID();

  var aResFields = [
    'id'
    ,'plan_id'
    ,'person_id'
    ,'current_state'
    ,'start_date'
    ,'end_date'
    ,'expire_date'
    ,'is_complete'
  ]

  var aResValues = [
    SqlLiteral( PLAN_RESULT.id )
    ,SqlLiteral( PLAN.plan.id )
    ,TO
    ,'0'
    ,'GETDATE()'
    ,'NULL'
    ,'DATEADD( HOUR, '+PLAN.plan.expired_time+', GETDATE() )'
    ,'0'
  ]

  var ResultSQL = "sql: ";
  ResultSQL += "INSERT INTO wt_flat.dbo.education_plan_result("+aResFields.join(',')+")";
  ResultSQL += " VALUES (" + aResValues.join(',') + ")";

  var aStepFields = [
    'id'
    ,'step_id'
    ,'result_id'
    ,'current_state'
    ,'start_date'
    ,'end_date'
    ,'expire_date'
  ];

  var aLearnFields = [
    'id'
    ,'result_step_id'
    ,'step_learning_id'
    ,'education_type'
    ,'assigned_education'
    ,'result_education'
    ,'state'
    ,'expire_date'
  ];

  var ResultStepSQL = "sql: ";
  ResultStepSQL += "INSERT INTO wt_flat.dbo.education_plan_result_steps("+aStepFields.join(',')+") VALUES ";

  var ResultLearnSQL = "sql: ";
  ResultLearnSQL += "INSERT INTO wt_flat.dbo.education_plan_result_step_learnings("+aLearnFields.join(',')+") VALUES ";

  for ( step in PLAN.steps ) {
    thisStepID = NEWID();
    aStepValues = [
      SqlLiteral( thisStepID )
      ,SqlLiteral( step.step.id )
      ,SqlLiteral( PLAN_RESULT.id )
      ,'0'
      ,'GETDATE()'
      ,'NULL'
      ,'DATEADD( HOUR, '+step.step.expired_time+', GETDATE() )'
    ];
    ResultStepSQL += StrEnds(ResultStepSQL, ' ') ? '' : ',';
    ResultStepSQL += "("+aStepValues.join(',')+")";

    for ( learning in step.learnings  ) {
      aLearnValues = [
        'NEWID()'
        ,SqlLiteral( thisStepID )
        ,SqlLiteral( learning.id )
        ,SqlLiteral( learning.education_type )
        ,'NULL'
        ,'NULL'
        ,'0'
        ,'DATEADD( HOUR, '+learning.expired_time+', GETDATE() )'
      ];
      ResultLearnSQL += StrEnds(ResultLearnSQL, ' ') ? '' : ',';
      ResultLearnSQL += "("+aLearnValues.join(',')+")";
    }

  }
  if (
    COMMITINSERT( ResultSQL )
    && COMMITINSERT( ResultStepSQL )
    && COMMITINSERT( ResultLearnSQL )
  ) {
    return {err: false}
  } else {
    return {err: true}
  }

}
RESPONSE_OBJECT = main();
