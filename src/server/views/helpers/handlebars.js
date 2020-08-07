const crypto = require('crypto');
const _ = require('lodash');
const Handlebars = require('handlebars');
const moment = require('moment');

const replacer = (key, value) => {
  if (_.isObject(value)) {
    return _.transform(value, (result, v, k) => {
      result[Handlebars.Utils.escapeExpression(k)] = v;
    });
  } else if (_.isString(value)) {
    return Handlebars.Utils.escapeExpression(value);
  } else {
    return value;
  }
};

// For jobs that don't have a valid ID, produce a random ID we can use in its place.
const idMapping = new WeakMap();

const isNumber = (n) => {
  if (typeof num === "number") {
    return num - num === 0;
  }
  if (typeof num === "string" && num.trim() !== "") {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

const helpers = {
  json(obj, pretty = false) {
    const args = [obj, replacer];
    if (pretty) {
      args.push(2);
    }
    return new Handlebars.SafeString(JSON.stringify(...args));
  },

  isNumber(operand) {
    return parseInt(operand, 10).toString() === String(operand);
  },

  adjustedPage(currentPage, pageSize, newPageSize) {
    const firstId = (currentPage - 1) * pageSize;
    return _.ceil(firstId / newPageSize) + 1;
  },

  block(name) {
    const blocks = this._blocks;
    const content = blocks && blocks[name];
    return content ? content.join('\n') : null;
  },

  contentFor(name, options) {
    const blocks = this._blocks || (this._blocks = {});
    const block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
  },

  hashIdAttr(obj) {
    const { id } = obj;
    if (typeof id === 'string') {
      return crypto.createHash('sha256').update(id).digest('hex');
    }
    let mapping = idMapping.get(obj);
    if (!mapping) {
      mapping = crypto.randomBytes(32).toString('hex');
      idMapping.set(obj, mapping);
    }
    return mapping;
  },

  encodeURI(value) {
    if (typeof value === "string") {
      return encodeURIComponent(value);
    }
  },

  capitalize(s) {
    if (typeof value !== "string") {
      return "";
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  add(a, b) {
    if (isNumber(a) && isNumber(b)) {
      return Number(a) + Number(b);
    }

    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }

    return "";
  },

  subtract(a, b) {
    if (!isNumber(a)) {
      throw new TypeError("expected the first argument to be a number");
    }
    if (!isNumber(b)) {
      throw new TypeError("expected the second argument to be a number");
    }
    return Number(a) - Number(b);
  },

  length(value) {
    if (value !== null && typeof value === 'object') {
      value = Object.keys(value);
    }
    if (typeof value === "string" || Array.isArray(value)) {
      return value.length;
    }
    return 0;
  },

  moment(date, format) {
    moment(date).format(format)
  },
};

module.exports = function registerHelpers(hbs, { queues }) {
  _.each(helpers, (fn, helper) => {
    hbs.registerHelper(helper, fn);
  });

  hbs.registerHelper('useCdn', () => {
    return queues.useCdn;
  });
};
