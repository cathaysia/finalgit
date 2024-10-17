// ex: set ft=antlr:
// https://git-scm.com/docs/revisions#Documentation/revisions.txt
// https://git-scm.com/docs/git-rev-list/zh_HANS-CN
grammar reversion;
import reversionRules;
@header {
    // @ts-ignore
}

reversion: rules EOF;

rules: rev # revSingle
    | rev_expression # revExpression
    | 'since' '=' date # revSince
    | 'until' '=' date # revUntil
    | 'after' '=' date # revAfter
    | 'skip' '=' DIGIT # revSkip
    | 'before' '=' date # revBefore
    | 'max-age' '=' date # revMaxAge
    | 'min-age' '=' date # revMinAge
    | 'author' '=' ANY+ # revAuthor
    | 'commiter' '=' ANY+ # revCommiter
    | 'grep' '=' ANY+ # revGrep
    | rules '..' # revRangeAfter1
    | rules '...' # revRangeAfter2
    | rules (' ' rules)+ # revMulti
    | rules '..' rules # revRange1
    | rules '...' rules # revRange2
    | '..' rules # revRangeBefore1
    | '...' rules # revRangeBefore2
    ;

rev: refname # refName
    | OID # refOID
    | '^' rev # revExclude
    ;

refname: 'HEAD'
    | '@'
    ;

rev_expression: rev rev_direction rev_position # exprPos
    | rev rev_direction DIGIT # exprDigit
    | ':/' (ANY | ' ')+ # exprText
    | rev ':' ANY+ # exprRevText
    | ':' DIGIT ':' ANY+ # exprDigitText
    ;

rev_position: '@' # posHead
    | '!' # posExclude
    | SIGNED_DIGIT # posNeg
    | '-' # posReverse
    | '{' ref_anchor? '}' # posAnchor
    ;

rev_direction: '@'
    | '^'
    | '~'
    ;

ref_anchor: date # anchorDate
    | SIGNED_DIGIT # anchorSignedDigit
    | DIGIT # anchorDigit
    | '/' ANY+? # anchorText
    | iso_8601 # anchorIso
    ;

date: 'yesterday' # dateYesterday
    | 'today' # dateToday
    | iso_8601 # dateIso8601
    | time_point (' ' time_point)* ' ' TIME_DIRECTION # dateTimePoint
    ;

time_point: time_value ' ' time_unit # timePointValue
    | DIGIT ' ' time_unit # timePointDigit
    ;

time_value: 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
    | 'nine'
    | 'ten'
    ;

time_unit: 'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'year'
    | 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    | 'weeks'
    | 'months'
    | 'years'
    ;

TIME_DIRECTION: 'ago' | 'after' ;

// iso 8061
iso_8601: ISO_DATE (' ' ISO_TIME IS_TIME_POSTFIX?)?
    ;
