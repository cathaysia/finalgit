// ex: set ft=antlr:
// https://git-scm.com/docs/revisions#Documentation/revisions.txt
// https://git-scm.com/docs/git-rev-list/zh_HANS-CN
grammar reversion;
import reversionRules;
@header {
    // @ts-ignore
}

reversion: rules EOF;

rules: rev
    | rev_expression
    | 'since' '=' date
    | 'until' '=' date
    | 'after' '=' date
    | 'skip' '=' DIGIT
    | 'before' '=' date
    | 'max-age' '=' date
    | 'min-age' '=' date
    | 'author' '=' ANY+
    | 'commiter' '=' ANY+
    | 'grep' '=' ANY+
    | rules '..'
    | rules '...'
    | rules (' ' rules)+
    | rules '..' rules
    | rules '...' rules
    | '..' rules
    | '...' rules
    ;

rev: refname
    | OID
    | '^' rev
    ;

refname: 'HEAD'
    | '@'
    ;

rev_expression: rev rev_direction rev_position
    | rev rev_direction DIGIT
    | ':/' (ANY | ' ')+
    | rev ':' ANY+ // path
    | ':' DIGIT ':' ANY+
    ;

rev_position: '@'
    | '!'
    | SIGNED_DIGIT
    | '-'
    | '{' ref_anchor? '}'
    ;

rev_direction: '@'
    | '^'
    | '~'
    ;

ref_anchor: date
    | SIGNED_DIGIT
    | DIGIT
    | '/' .+?
    | iso_8601
    ;

date: 'yesterday'
    | 'today'
    | time_point (' ' time_point)* ' ' TIME_DIRECTION
    ;

time_point: (TIME_VALUE | DIGIT) ' ' TIME_UINT;

TIME_VALUE: 'one'
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

TIME_UINT: 'second'
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
