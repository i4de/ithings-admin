function getMode(mode) {
  if (mode === 'r') {
    return '读'
  } else {
    return '读写'
  }
}

function getDefine(define) {
  var ret = ''
  switch (define.type) {
    case 'struct':
      ret = '-'
      break
    case 'enum':
      var mapping = define.mapping
      for (var key in mapping) {
        ret = ret + key + '-' + mapping[key] + '\n'
      }
      break
    default:
      ret = '数值范围:' + define.min + '-' + define.max + '\n' +
          '初始值:' + define.start + '\n'
      '步长:' + define.step + '\n'
      '单位:' + define.unit
  }
  return ret
}

export function parseProperty(template) {
  console.log('parseProperty', template)
  var ret = {
    funcType: '属性',
    name: template.name,
    id: template.id,
    dataType: template.define.type,
    define: getDefine(template.define),
    mode: getMode(template.mode),
    required: template.required,
    meta: template,
  }
  var define = template.define
  if (define.type == 'struct') {
    var detail = []
    define.specs.forEach(function(value, index, array) {
      detail.push({
        name: value.name,
        id: value.id,
        dataType: value.dataType.type,
        define: getDefine(value.dataType)
      })
    })
    ret.detail = detail
    ret.hasDetail = true
  }
  return ret
}

export function parseAction(template) {
  console.log('parseAction', template)
  var ret = {
    funcType: '行为',
    name: template.name,
    id: template.id,
    required: template.required,
    meta: template,
  }
  return ret
}

export function parseEvent(template) {
  console.log('parseEvent', template)
  var ret = {
    funcType: '事件',
    name: template.name,
    id: template.id,
    dataType: template.type,
    mode: getMode(template.mode),
    define: '-',
    required: template.required,
    meta: template,
  }

  return ret
}

export function parseModelTemplate(template) {
  console.log('parseModelTemplate', template)
  var ret = []
  if (template.properties != undefined) {
    template?.properties.forEach(function(value, index, array) {
      ret.push(parseProperty(value))
    })
  }
  if (template.events != undefined) {
    template?.events.forEach(function(value, index, array) {
      ret.push(parseEvent(value))
    })
  }
  if (template.action != undefined) {
    template.action.forEach(function(value, index, array) {
      ret.push(parseAction(value))
    })
  }

  console.log('解析后的属性为:', ret)
  // return JSON.stringify(template)
  return ret
}
