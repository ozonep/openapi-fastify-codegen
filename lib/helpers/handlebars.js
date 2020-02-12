/**
 * This module registers different convenient Handlebars helpers.
 * @module HandlebarsHelper
 */

import _ from 'lodash';
import Handlebars from 'handlebars';

/**
 * Compares two values.
 */
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
  if (arguments.length < 3) throw new Error('Handlebars Helper equal needs 2 parameters');
  if (lvalue != rvalue) return options.inverse(this);

  return options.fn(this);
});

/**
 * Checks if a string ends with a provided value.
 */
Handlebars.registerHelper('endsWith', function(lvalue, rvalue, options) {
  if (arguments.length < 3) throw new Error('Handlebars Helper equal needs 2 parameters');
  if (lvalue.lastIndexOf(rvalue) !== lvalue.length-1 || lvalue.length-1 < 0) return options.inverse(this);

  return options.fn(this);
});

/**
 * Checks if a method is a valid HTTP method.
 */
Handlebars.registerHelper('validMethod', function(method, options) {
  const authorized_methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLIK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND'];
  if (arguments.length < 2) throw new Error('Handlebars Helper validMethod needs 1 parameter');
  if (authorized_methods.indexOf(method.toUpperCase()) === -1) return options.inverse(this);
  return options.fn(this);
});

/**
 * Checks if a collection of responses contains no error responses.
 */
Handlebars.registerHelper('ifNoErrorResponses', function(responses, options) {
  const codes = responses ? Object.keys(responses) : [];
  if (codes.find(code => Number(code) >= 400)) return options.inverse(this);

  return options.fn(this);
});

/**
 * Checks if a collection of responses contains no success responses.
 */
Handlebars.registerHelper('ifNoSuccessResponses', function(responses, options) {
  const codes = responses ? Object.keys(responses) : [];
  if (codes.find(code => Number(code) >= 200 && Number(code) < 300)) return options.inverse(this);

  return options.fn(this);
});

/**
 * Checks if a string matches a RegExp.
 */
Handlebars.registerHelper('match', function(lvalue, rvalue, options) {
  if (arguments.length < 3) throw new Error('Handlebars Helper match needs 2 parameters');
  if (!lvalue.match(rvalue)) return options.inverse(this);

  return options.fn(this);
});

/**
 * Provides different ways to compare two values (i.e. equal, greater than, different, etc.)
 */
Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
  if (arguments.length < 3) throw new Error('Handlebars Helper "compare" needs 2 parameters');

  const operator = options.hash.operator || '==';
  const operators = {
    '==':       (l,r) => { return l == r; },
    '===':      (l,r) => { return l === r; },
    '!=':       (l,r) => { return l != r; },
    '<':        (l,r) => { return l < r; },
    '>':        (l,r) => { return l > r; },
    '<=':       (l,r) => { return l <= r; },
    '>=':       (l,r) => { return l >= r; },
    typeof:     (l,r) => { return typeof l == r; }
  };

  if (!operators[operator]) throw new Error(`Handlebars Helper 'compare' doesn't know the operator ${operator}`);

  const result = operators[operator](lvalue,rvalue);

  if (result) return options.fn(this);

  return options.inverse(this);
});

/**
 * Capitalizes a string.
 */
Handlebars.registerHelper('capitalize', function(str) {
  return _.capitalize(str);
});

/**
 * Converts a string to its camel-cased version.
 */
Handlebars.registerHelper('camelCase', function(str) {
  return _.camelCase(str);
});

/**
 * Converts a multi-line string to a single line.
 */
Handlebars.registerHelper('inline', function(str) {
  return str ? str.replace(/\n/g, '') : '';
});

/**
 * Quotes a JS identifier, if necessary.
 */
Handlebars.registerHelper('quote', function(str) {
  return /[$&@-]/.test(str) ? `'${str}'` : str
});
