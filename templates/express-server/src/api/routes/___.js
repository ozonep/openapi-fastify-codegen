const express = require('express');
const {{camelCase operation_name}} = require('../services/{{operation_name}}');

const router = new express.Router();

{{#each headOperation}}
  {{#each this.path}}
    {{#validMethod @key}}
/**
 {{#each this.descriptionLines}}
 * {{{this}}}
 {{/each}}
 */
router.{{@key}}('{{../subresource}}', async (req, res, next) => {
  const options = {
  {{#if this.requestBody}}
  body: req.body{{#compare (lookup this.parameters 'length') 0 operator = '>' }},{{/compare}}
  {{/if}}
    {{#each this.parameters}}
      {{#equal this.in "query"}}
        {{{quote this.name}}}: req.query['{{this.name}}']{{#unless @last}},{{/unless}}
      {{/equal}}
      {{#equal this.in "path"}}
        {{{quote this.name}}}: req.params['{{this.name}}']{{#unless @last}},{{/unless}}
      {{/equal}}
      {{#equal this.in "header"}}
        {{{quote this.name}}}: req.header['{{this.name}}']{{#unless @last}},{{/unless}}
      {{/equal}}
    {{/each}}
    };

    try {
      const result = await {{camelCase ../../operation_name}}.{{this.operationId}}(options);
      {{#ifNoSuccessResponses this.responses}}
        res.header('X-Result', result.data).status(200).send();
      {{else}}
        res.status(result.status || 200).send(result.data);
      {{/ifNoSuccessResponses}}
      } catch (err) {
      {{#ifNoErrorResponses this.responses}}
        return res.status(500).send({
          status: 500,
          error: 'Server Error'
        });
      {{else}}
      next(err);
      {{/ifNoErrorResponses}}
      }
    });
    {{/validMethod}}
  {{/each}}
{{/each}}

{{#each operation}}
  {{#each this.path}}
    {{#validMethod @key}}
/**
 {{#each this.descriptionLines}}
 * {{{this}}}
 {{/each}}
 */
router.{{@key}}('{{../subresource}}', async (req, res, next) => {
  const options = {
    {{#if this.requestBody}}
    body: req.body{{#compare (lookup this.parameters 'length') 0 operator = '>' }},{{/compare}}
    {{/if}}
    {{#each this.parameters}}
      {{#equal this.in "query"}}
    {{{quote this.name}}}: req.query['{{this.name}}']{{#unless @last}},{{/unless}}
      {{/equal}}
      {{#equal this.in "path"}}
    {{{quote this.name}}}: req.params['{{this.name}}']{{#unless @last}},{{/unless}}
      {{/equal}}
      {{#equal this.in "header"}}
    {{{quote this.name}}}: req.header['{{this.name}}']{{#unless @last}},{{/unless}}
      {{/equal}}
      {{#match @../key "(post|put)"}}
        {{#equal ../in "body"}}
    {{{quote this.name}}}: req.body['{{this.name}}']{{#unless @last}},{{/unless}}
        {{/equal}}
      {{/match}}
    {{/each}}
  };

  try {
    const result = await {{camelCase ../../operation_name}}.{{this.operationId}}(options);
    {{#ifNoSuccessResponses this.responses}}
    res.status(200).send(result.data);
    {{else}}
    res.status(result.status || 200).send(result.data);
    {{/ifNoSuccessResponses}}
  } catch (err) {
    {{#ifNoErrorResponses this.responses}}
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
    {{else}}
    next(err);
    {{/ifNoErrorResponses}}
  }
});

    {{/validMethod}}
  {{/each}}
{{/each}}
module.exports = router;
